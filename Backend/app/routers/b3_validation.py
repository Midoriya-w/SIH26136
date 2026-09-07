import os
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.validation import KPIRecord, ValidationCertificate
from app.schemas.validation_dto import (
    KPICreate, KPIUpdate, KPIResponse,
    CARSScoreBreakdown, ValidationCertificateResponse,
    AssignValidatorRequest, AssignValidatorResponse
)
from app.services.kpi_service import kpi_service
from app.security.rbac import get_current_user, require_roles, require_pilot_scope, TokenPayload
from app.config import settings

router = APIRouter(prefix="/validation", tags=["B3: Validation & Reporting"])

@router.get("/contract/{contract_id}/kpis", response_model=List[KPIResponse])
def get_pilot_kpis(contract_id: str, db: Session = Depends(get_db)):
    """Retrieve all KPI comparison records for a specific pilot."""
    return db.query(KPIRecord).filter(KPIRecord.contract_id == contract_id).all()

@router.post("/kpis", response_model=KPIResponse)
def add_kpi_metric(
    payload: KPICreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER", "INDEPENDENT_VALIDATOR"]))
):
    """Add a KPI baseline and target to evaluate during pilot execution."""
    return kpi_service.add_kpi(
        db=db,
        contract_id=payload.contract_id,
        metric_name=payload.metric_name,
        baseline=payload.baseline_value,
        target=payload.target_value,
        achieved=payload.achieved_value,
        unit=payload.unit
    )

@router.put("/kpis/{kpi_id}", response_model=KPIResponse)
def update_kpi_achieved(
    kpi_id: str,
    payload: KPIUpdate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["INDEPENDENT_VALIDATOR", "ADMIN"]))
):
    """Independent validator records achieved metric, updating variance % and rating."""
    return kpi_service.update_kpi(db=db, kpi_id=kpi_id, achieved_value=payload.achieved_value)

@router.get("/contract/{contract_id}/cars-score", response_model=CARSScoreBreakdown)
def calculate_cars_score(contract_id: str, db: Session = Depends(get_db)):
    """Compute Composite Adoption-Readiness Score (CARS) dynamically."""
    return kpi_service.compute_cars_score(contract_id=contract_id, db=db)

@router.post("/contract/{contract_id}/assign-validator", response_model=AssignValidatorResponse)
def assign_independent_validator(
    contract_id: str,
    payload: AssignValidatorRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Assign an independent validator with time-boxed, pilot-scoped token."""
    assignment, token = kpi_service.assign_time_boxed_validator(
        db=db,
        contract_id=contract_id,
        validator_id=payload.validator_id,
        assigned_by=user.userId,
        duration_days=payload.duration_days
    )
    return AssignValidatorResponse(
        id=assignment.id,
        validator_id=assignment.validator_id,
        contract_id=assignment.contract_id,
        valid_from=assignment.valid_from,
        valid_until=assignment.valid_until,
        is_active=assignment.is_active,
        scoped_token=token
    )

@router.post("/contract/{contract_id}/issue-certificate", response_model=ValidationCertificateResponse)
def issue_validation_certificate(
    contract_id: str,
    summary: str = "",
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["INDEPENDENT_VALIDATOR", "ADMIN"]))
):
    """Issue official Pilot Validation Certificate with CARS score and SHA-256 seal."""
    return kpi_service.issue_certificate(
        db=db,
        contract_id=contract_id,
        validator_id=user.userId,
        validator_name=f"Validator {user.userId}",
        summary=summary
    )

@router.get("/contract/{contract_id}/certificate/pdf")
def download_certificate_pdf(contract_id: str, db: Session = Depends(get_db)):
    """Download the official ReportLab generated validation certificate PDF."""
    cert = db.query(ValidationCertificate).filter(ValidationCertificate.contract_id == contract_id).first()
    if not cert:
        raise HTTPException(status_code=404, detail="Validation certificate not yet issued for this pilot")

    filename = os.path.basename(cert.pdf_url)
    file_path = os.path.join(settings.PDF_STORAGE_DIR, filename)
    return FileResponse(file_path, media_type="application/pdf", filename=filename)
