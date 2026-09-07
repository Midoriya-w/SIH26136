import csv
import io
import uuid
from datetime import datetime, timezone
from typing import Tuple
from openpyxl import Workbook
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.milestone import Milestone, DeliverableProof, PaymentLedger
from app.services.storage_service import storage_service
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

class PaymentService:
    @staticmethod
    def upload_proof(
        db: Session,
        milestone_id: str,
        file_name: str,
        file_bytes: bytes,
        uploaded_by: str,
        comments: str = ""
    ) -> DeliverableProof:
        milestone = db.query(Milestone).filter(Milestone.id == milestone_id).first()
        if not milestone:
            raise HTTPException(status_code=404, detail="Milestone not found")

        file_url, file_hash = storage_service.save_proof(file_name, file_bytes)

        proof = DeliverableProof(
            milestone_id=milestone_id,
            file_name=file_name,
            file_url=file_url,
            file_hash=file_hash,
            uploaded_by=uploaded_by,
            comments=comments
        )
        db.add(proof)

        milestone.status = "SUBMITTED"
        db.commit()
        db.refresh(proof)

        event_bus.publish(SystemEvent(
            entity="DeliverableProof",
            entityId=proof.id,
            action=AuditAction.PROOF_SUBMITTED,
            actorId=uploaded_by,
            role="STARTUP",
            payload={"milestoneId": milestone_id, "fileHash": file_hash}
        ))

        return proof

    @staticmethod
    def verify_milestone(
        db: Session,
        milestone_id: str,
        is_approved: bool,
        officer_id: str,
        comments: str = ""
    ) -> Milestone:
        milestone = db.query(Milestone).filter(Milestone.id == milestone_id).first()
        if not milestone:
            raise HTTPException(status_code=404, detail="Milestone not found")

        if is_approved:
            milestone.status = "VERIFIED"
            milestone.actual_date = datetime.now(timezone.utc)
            action = AuditAction.MILESTONE_VERIFIED
        else:
            milestone.status = "PENDING"
            action = "MILESTONE_REJECTED"

        db.commit()
        db.refresh(milestone)

        event_bus.publish(SystemEvent(
            entity="Milestone",
            entityId=milestone.id,
            action=action,
            actorId=officer_id,
            role="DEPARTMENT_OFFICER",
            payload={"contractId": milestone.contract_id, "approved": is_approved, "comments": comments}
        ))

        return milestone

    @staticmethod
    def release_payment(
        db: Session,
        milestone_id: str,
        beneficiary_acc: str,
        ifsc_code: str,
        sanction_order: str,
        officer_id: str,
        amount: float = None
    ) -> PaymentLedger:
        milestone = db.query(Milestone).filter(Milestone.id == milestone_id).first()
        if not milestone:
            raise HTTPException(status_code=404, detail="Milestone not found")

        if milestone.status != "VERIFIED":
            raise HTTPException(status_code=400, detail=f"Cannot disburse funds: Milestone status is '{milestone.status}', must be 'VERIFIED'")

        disbursal_amount = amount or milestone.linked_amount
        pfms_ref = f"PFMS-{datetime.now().year}-{uuid.uuid4().hex[:10].upper()}"

        # PaymentLedger automatically encrypts beneficiary_acc_enc and ifsc_code_enc via AES-256 TypeDecorator
        ledger_entry = PaymentLedger(
            milestone_id=milestone_id,
            amount=disbursal_amount,
            beneficiary_acc_enc=beneficiary_acc,
            ifsc_code_enc=ifsc_code,
            pfms_reference_no=pfms_ref,
            treasury_sanction_order=sanction_order,
            sanctioned_by=officer_id,
            disbursed_at=datetime.now(timezone.utc),
            status="SETTLED"
        )
        db.add(ledger_entry)

        milestone.status = "DISBURSED"
        db.commit()
        db.refresh(ledger_entry)

        event_bus.publish(SystemEvent(
            entity="PaymentLedger",
            entityId=ledger_entry.id,
            action=AuditAction.PAYMENT_DISBURSED,
            actorId=officer_id,
            role="FINANCE_OFFICER",
            payload={
                "milestoneId": milestone_id,
                "amount": disbursal_amount,
                "pfmsReference": pfms_ref,
                "sanctionOrder": sanction_order
            }
        ))

        return ledger_entry

    @staticmethod
    def export_ledger_csv(db: Session) -> str:
        """Export payment ledger records as CSV formatted string."""
        records = db.query(PaymentLedger).all()
        output = io.StringIO()
        writer = csv.writer(output)
        writer.writerow([
            "Payment ID", "Milestone ID", "Amount (INR)", "Beneficiary Account (Masked)",
            "IFSC Code", "PFMS Reference No", "Treasury Sanction Order", "Sanctioned By", "Disbursed At", "Status"
        ])

        for r in records:
            acc = r.beneficiary_acc_enc or ""
            masked_acc = f"XXXXXX{acc[-4:]}" if len(acc) >= 4 else "XXXX"
            writer.writerow([
                r.id,
                r.milestone_id,
                f"{r.amount:.2f}",
                masked_acc,
                r.ifsc_code_enc,
                r.pfms_reference_no,
                r.treasury_sanction_order,
                r.sanctioned_by,
                r.disbursed_at.strftime("%Y-%m-%d %H:%M:%S") if r.disbursed_at else "",
                r.status
            ])

        return output.getvalue()

    @staticmethod
    def export_ledger_excel(db: Session) -> bytes:
        """Export payment ledger records as Excel (.xlsx) workbook bytes."""
        records = db.query(PaymentLedger).all()
        wb = Workbook()
        ws = wb.active
        ws.title = "PFMS Disbursals"

        headers = [
            "Payment ID", "Milestone ID", "Amount (INR)", "Beneficiary Account (Masked)",
            "IFSC Code", "PFMS Reference No", "Treasury Sanction Order", "Sanctioned By", "Disbursed At", "Status"
        ]
        ws.append(headers)

        for r in records:
            acc = r.beneficiary_acc_enc or ""
            masked_acc = f"XXXXXX{acc[-4:]}" if len(acc) >= 4 else "XXXX"
            ws.append([
                r.id,
                r.milestone_id,
                r.amount,
                masked_acc,
                r.ifsc_code_enc,
                r.pfms_reference_no,
                r.treasury_sanction_order,
                r.sanctioned_by,
                r.disbursed_at.strftime("%Y-%m-%d %H:%M:%S") if r.disbursed_at else "",
                r.status
            ])

        output = io.BytesIO()
        wb.save(output)
        return output.getvalue()

payment_service = PaymentService()
