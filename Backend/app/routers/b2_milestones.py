from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.milestone import Milestone
from app.schemas.milestone_dto import (
    MilestoneCreate, MilestoneResponse, DeliverableProofResponse, MilestoneVerifyRequest
)
from app.services.payment_service import payment_service
from app.services.cron_service import check_overdue_milestones
from app.security.rbac import get_current_user, require_roles, TokenPayload

router = APIRouter(prefix="/milestones", tags=["B2: Milestones & Deliverables"])

@router.get("/contract/{contract_id}", response_model=List[MilestoneResponse])
def get_contract_milestones(contract_id: str, db: Session = Depends(get_db)):
    """Retrieve all milestones for a specific contract."""
    return db.query(Milestone).filter(Milestone.contract_id == contract_id).order_by(Milestone.sequence_order).all()

@router.post("", response_model=MilestoneResponse)
def create_milestone(
    payload: MilestoneCreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Add an additional milestone to a contract."""
    milestone = Milestone(**payload.model_dump())
    db.add(milestone)
    db.commit()
    db.refresh(milestone)
    return milestone

@router.post("/{milestone_id}/submit-proof", response_model=DeliverableProofResponse)
async def submit_milestone_proof(
    milestone_id: str,
    file: UploadFile = File(...),
    comments: Optional[str] = Form("Milestone deliverable submitted for review."),
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["STARTUP", "ADMIN"]))
):
    """Upload milestone deliverable proof file (PDF/ZIP/DOC) with SHA-256 integrity hash."""
    file_bytes = await file.read()
    proof = payment_service.upload_proof(
        db=db,
        milestone_id=milestone_id,
        file_name=file.filename,
        file_bytes=file_bytes,
        uploaded_by=user.userId,
        comments=comments
    )
    return proof

@router.post("/{milestone_id}/verify", response_model=MilestoneResponse)
def verify_milestone(
    milestone_id: str,
    payload: MilestoneVerifyRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["DEPARTMENT_OFFICER", "ADMIN"]))
):
    """Department officer verification of milestone deliverable."""
    return payment_service.verify_milestone(
        db=db,
        milestone_id=milestone_id,
        is_approved=payload.is_approved,
        officer_id=user.userId,
        comments=payload.comments
    )

@router.post("/trigger-overdue-check")
def trigger_overdue_check(user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))):
    """Manually invoke the overdue milestone cron job and fire event bus notifications."""
    check_overdue_milestones()
    return {"message": "Overdue milestone check completed and notifications dispatched."}
