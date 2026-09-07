from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.scale_up import ScaleUpProposal, ReplicationRecord
from app.schemas.scale_up_dto import (
    ScaleUpProposalCreate, ScaleUpProposalResponse,
    ScaleUpApprovalCreate, ScaleUpApprovalResponse,
    ReplicationRecordCreate, ReplicationRecordResponse
)
from app.services.scale_up_service import scale_up_service
from app.security.rbac import get_current_user, require_roles, TokenPayload

router = APIRouter(prefix="/scale-up", tags=["B4: Scale-up & Replication"])

@router.post("/proposals", response_model=ScaleUpProposalResponse)
def create_scale_up_proposal(
    payload: ScaleUpProposalCreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Initiate a scale-up recommendation proposal for multi-tier committee evaluation."""
    return scale_up_service.create_proposal(
        db=db,
        contract_id=payload.contract_id,
        summary=payload.recommendation_summary,
        target_budget=payload.target_scale_budget
    )

@router.get("/proposals/contract/{contract_id}", response_model=ScaleUpProposalResponse)
def get_proposal_by_contract(contract_id: str, db: Session = Depends(get_db)):
    """Retrieve scale-up proposal and committee review history."""
    proposal = db.query(ScaleUpProposal).filter(ScaleUpProposal.contract_id == contract_id).first()
    if not proposal:
        raise HTTPException(status_code=404, detail="No scale-up proposal found for this contract")
    return proposal

@router.post("/proposals/{proposal_id}/approve", response_model=ScaleUpApprovalResponse)
def committee_sign_off(
    proposal_id: str,
    payload: ScaleUpApprovalCreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["COMMITTEE_MEMBER", "ADMIN"]))
):
    """Committee sign-off (Technical Evaluator, Finance Directorate, Secretary)."""
    # The approver role can be specified in token or defaults to COMMITTEE_MEMBER
    approver_role = user.departmentId or "TECHNICAL_EVALUATOR"
    return scale_up_service.add_approval(
        db=db,
        proposal_id=proposal_id,
        approver_id=user.userId,
        approver_name=f"Officer {user.userId}",
        approver_role=approver_role,
        decision=payload.decision,
        comments=payload.comments
    )

@router.post("/replications", response_model=ReplicationRecordResponse)
def register_department_replication(
    payload: ReplicationRecordCreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["DEPARTMENT_OFFICER", "ADMIN"]))
):
    """Track replication of the validated pilot by other state/central government departments."""
    return scale_up_service.register_replication(
        db=db,
        contract_id=payload.contract_id,
        replicating_dept_id=payload.replicating_department_id,
        replicating_dept_name=payload.replicating_department_name,
        contact_officer=payload.contact_officer,
        notes=payload.notes
    )

@router.get("/replications/contract/{contract_id}", response_model=List[ReplicationRecordResponse])
def get_replications_by_contract(contract_id: str, db: Session = Depends(get_db)):
    """Retrieve all cross-department replication records for this pilot."""
    return db.query(ReplicationRecord).filter(ReplicationRecord.contract_id == contract_id).all()
