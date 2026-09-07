import uuid
from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.contract import Contract, Signature, Clause
from app.models.milestone import Milestone
from app.services.pdf_service import pdf_service
from app.services.storage_service import storage_service
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

class ESignService:
    @staticmethod
    def initiate_signature(
        db: Session,
        contract_id: str,
        signatory_name: str,
        signatory_role: str,
        sign_type: str = "AADHAAR_ESIGN"
    ) -> Signature:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        # Create signature request
        transaction_id = f"ESIGN-TXN-{uuid.uuid4().hex[:12].upper()}"
        signature = Signature(
            contract_id=contract_id,
            signatory_name=signatory_name,
            signatory_role=signatory_role,
            sign_type=sign_type,
            status="INITIATED",
            transaction_id=transaction_id
        )
        db.add(signature)

        contract.status = "PENDING_SIGNATURE"
        db.commit()
        db.refresh(signature)

        # Audit event
        event_bus.publish(SystemEvent(
            entity="Signature",
            entityId=signature.id,
            action=AuditAction.SIGNATURE_INITIATED,
            actorId=signatory_name,
            role=signatory_role,
            payload={"contractId": contract_id, "transactionId": transaction_id, "signType": sign_type}
        ))

        return signature

    @staticmethod
    def handle_webhook(
        db: Session,
        transaction_id: str,
        status: str,
        certificate_serial: str = None,
        signature_fingerprint: str = None
    ) -> Signature:
        """Process incoming e-Sign webhook callback from Aadhaar / DigiLocker / Leegality gateway."""
        sig = db.query(Signature).filter(Signature.transaction_id == transaction_id).first()
        if not sig:
            raise HTTPException(status_code=404, detail="Signature transaction not found")

        sig.status = status.upper()
        if sig.status == "COMPLETED":
            sig.signed_at = datetime.now(timezone.utc)
            sig.certificate_details = f"CertSerial={certificate_serial or 'GOI-CCA-2026'}|Fingerprint={signature_fingerprint or 'Aadhaar-SHA256'}"

        contract = db.query(Contract).filter(Contract.id == sig.contract_id).first()

        # Check if all required signatures for this contract are COMPLETED
        all_sigs = db.query(Signature).filter(Signature.contract_id == contract.id).all()
        has_startup = any(s.signatory_role == "STARTUP" and s.status == "COMPLETED" for s in all_sigs)
        has_dept = any(s.signatory_role == "DEPARTMENT" and s.status == "COMPLETED" for s in all_sigs)

        if has_startup and has_dept:
            contract.status = "ACTIVE"

            # Generate sealed PDF with ReportLab
            milestones = db.query(Milestone).filter(Milestone.contract_id == contract.id).order_by(Milestone.sequence_order).all()
            clauses = contract.clauses

            pdf_bytes = pdf_service.generate_contract_pdf(contract, clauses, milestones, all_sigs)
            pdf_filename = f"Contract_{contract.id[:8]}_Sealed.pdf"
            pdf_url, sha256_hash = storage_service.save_pdf(pdf_filename, pdf_bytes)

            contract.signed_pdf_url = pdf_url
            contract.pdf_sha256_hash = sha256_hash

            event_bus.publish(SystemEvent(
                entity="Contract",
                entityId=contract.id,
                action=AuditAction.CONTRACT_SIGNED,
                actorId=sig.signatory_name,
                role=sig.signatory_role,
                payload={
                    "contractId": contract.id,
                    "pdfUrl": pdf_url,
                    "sha256": sha256_hash,
                    "status": "ACTIVE"
                }
            ))

        db.commit()
        db.refresh(sig)
        return sig

esign_service = ESignService()
