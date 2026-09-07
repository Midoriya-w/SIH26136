from datetime import datetime, timezone
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.scale_up import ScaleUpProposal, ScaleUpApproval, ReplicationRecord
from app.models.contract import Contract
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

REQUIRED_ROLES = ["TECHNICAL_EVALUATOR", "FINANCE_DIRECTORATE", "SECRETARY"]

class ScaleUpService:
    @staticmethod
    def create_proposal(
        db: Session,
        contract_id: str,
        summary: str,
        target_budget: float
    ) -> ScaleUpProposal:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        existing = db.query(ScaleUpProposal).filter(ScaleUpProposal.contract_id == contract_id).first()
        if existing:
            return existing

        proposal = ScaleUpProposal(
            contract_id=contract_id,
            recommendation_summary=summary,
            target_scale_budget=target_budget,
            status="UNDER_REVIEW"
        )
        db.add(proposal)
        db.commit()
        db.refresh(proposal)

        event_bus.publish(SystemEvent(
            entity="ScaleUpProposal",
            entityId=proposal.id,
            action=AuditAction.SCALE_UP_RECOMMENDED,
            actorId="SYSTEM",
            role="COMMITTEE",
            payload={"contractId": contract_id, "targetBudget": target_budget}
        ))

        return proposal

    @staticmethod
    def add_approval(
        db: Session,
        proposal_id: str,
        approver_id: str,
        approver_name: str,
        approver_role: str,
        decision: str,
        comments: str = ""
    ) -> ScaleUpApproval:
        proposal = db.query(ScaleUpProposal).filter(ScaleUpProposal.id == proposal_id).first()
        if not proposal:
            raise HTTPException(status_code=404, detail="Scale-up proposal not found")

        # Record approval
        approval = ScaleUpApproval(
            proposal_id=proposal_id,
            approver_id=approver_id,
            approver_name=approver_name,
            approver_role=approver_role,
            decision=decision.upper(),
            comments=comments,
            decided_at=datetime.now(timezone.utc)
        )
        db.add(approval)
        db.commit()

        # Check all approvals
        all_approvals = db.query(ScaleUpApproval).filter(ScaleUpApproval.proposal_id == proposal_id).all()
        approved_roles = {a.approver_role for a in all_approvals if a.decision == "APPROVED"}

        if any(a.decision == "REJECTED" for a in all_approvals):
            proposal.status = "REJECTED"
        elif all(role in approved_roles for role in REQUIRED_ROLES):
            proposal.status = "APPROVED"

            event_bus.publish(SystemEvent(
                entity="ScaleUpProposal",
                entityId=proposal.id,
                action=AuditAction.SCALE_UP_APPROVED,
                actorId=approver_id,
                role=approver_role,
                payload={"contractId": proposal.contract_id, "approvedRoles": list(approved_roles)}
            ))

        db.commit()
        db.refresh(approval)
        return approval

    @staticmethod
    def register_replication(
        db: Session,
        contract_id: str,
        replicating_dept_id: str,
        replicating_dept_name: str,
        contact_officer: str = None,
        notes: str = None
    ) -> ReplicationRecord:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        record = ReplicationRecord(
            contract_id=contract_id,
            source_department_id=contract.department_id,
            replicating_department_id=replicating_dept_id,
            replicating_department_name=replicating_dept_name,
            status="EXPRESSION_OF_INTEREST",
            contact_officer=contact_officer,
            notes=notes
        )
        db.add(record)
        db.commit()
        db.refresh(record)

        event_bus.publish(SystemEvent(
            entity="ReplicationRecord",
            entityId=record.id,
            action=AuditAction.REPLICATION_INITIATED,
            actorId=contact_officer or "OFFICER",
            role="DEPARTMENT_OFFICER",
            payload={
                "contractId": contract_id,
                "sourceDept": contract.department_id,
                "replicatingDept": replicating_dept_id
            }
        ))

        return record

scale_up_service = ScaleUpService()
