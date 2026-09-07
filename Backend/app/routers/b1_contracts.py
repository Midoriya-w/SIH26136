import os
from datetime import datetime, timezone
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.contract import Contract, Clause, CyberChecklistItem
from app.models.milestone import Milestone
from app.schemas.contract_dto import (
    ClauseCreate, ClauseResponse,
    ContractCreateRequest, ContractResponse, ContractDetailResponse,
    CyberChecklistAttestRequest, CyberChecklistItemResponse
)
from app.security.rbac import get_current_user, require_roles, TokenPayload
from app.services.pdf_service import pdf_service
from app.services.storage_service import storage_service
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction
from app.config import settings

router = APIRouter(prefix="/contracts", tags=["B1: Contracts & Clauses"])

# Clauses Library
@router.get("/clauses", response_model=List[ClauseResponse])
def get_clause_library(db: Session = Depends(get_db)):
    """Retrieve versioned IP/data-ownership and legal clause library."""
    return db.query(Clause).filter(Clause.is_active == True).all()

@router.post("/clauses", response_model=ClauseResponse)
def create_clause(
    payload: ClauseCreate,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Add a new standardized or versioned legal clause."""
    clause = Clause(**payload.model_dump())
    db.add(clause)
    db.commit()
    db.refresh(clause)
    return clause

# Contracts
@router.get("", response_model=List[ContractResponse])
def list_contracts(db: Session = Depends(get_db)):
    """List all procurement pilot agreements."""
    return db.query(Contract).order_by(Contract.created_at.desc()).all()

@router.post("", response_model=ContractResponse)
def create_contract(
    payload: ContractCreateRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Create a new pilot contract and associate selected legal clauses."""
    contract = Contract(
        challenge_id=payload.challenge_id,
        application_id=payload.application_id,
        startup_id=payload.startup_id,
        department_id=payload.department_id,
        title=payload.title,
        total_budget=payload.total_budget,
        status="DRAFT"
    )

    if payload.clause_ids:
        clauses = db.query(Clause).filter(Clause.id.in_(payload.clause_ids)).all()
        contract.clauses = clauses
    else:
        # Default mandatory clauses
        clauses = db.query(Clause).filter(Clause.is_mandatory == True).all()
        contract.clauses = clauses

    db.add(contract)
    db.commit()
    db.refresh(contract)

    event_bus.publish(SystemEvent(
        entity="Contract",
        entityId=contract.id,
        action=AuditAction.CONTRACT_CREATED,
        actorId=user.userId,
        role=user.role,
        payload={"contractId": contract.id, "title": contract.title}
    ))

    return contract

@router.get("/{contract_id}", response_model=ContractDetailResponse)
def get_contract_details(contract_id: str, db: Session = Depends(get_db)):
    """Get full contract details including clauses, signatures, and cyber checklist."""
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract

@router.get("/{contract_id}/pdf")
def download_contract_pdf(contract_id: str, db: Session = Depends(get_db)):
    """Download the official ReportLab generated contract PDF."""
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    # If PDF is not generated yet, generate preview
    milestones = db.query(Milestone).filter(Milestone.contract_id == contract.id).order_by(Milestone.sequence_order).all()
    pdf_bytes = pdf_service.generate_contract_pdf(contract, contract.clauses, milestones, contract.signatures)

    filename = f"Contract_{contract.id[:8]}.pdf"
    pdf_url, sha256_hash = storage_service.save_pdf(filename, pdf_bytes)

    file_path = os.path.join(settings.PDF_STORAGE_DIR, filename)
    return FileResponse(file_path, media_type="application/pdf", filename=filename)

@router.get("/{contract_id}/verify-tamper")
def verify_tamper_evidence(contract_id: str, db: Session = Depends(get_db)):
    """Verify digital tamper-evidence by matching PDF SHA-256 against stored hash."""
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")

    if not contract.pdf_sha256_hash or not contract.signed_pdf_url:
        return {
            "status": "UNSEALED",
            "message": "Contract has not been cryptographically sealed yet (pending signatures)."
        }

    filename = os.path.basename(contract.signed_pdf_url)
    file_path = os.path.join(settings.PDF_STORAGE_DIR, filename)

    if not os.path.exists(file_path):
        return {"status": "FILE_MISSING", "error": "Signed document missing from storage"}

    with open(file_path, "rb") as f:
        current_hash = storage_service.calculate_sha256(f.read())

    is_valid = (current_hash == contract.pdf_sha256_hash)
    return {
        "contract_id": contract_id,
        "is_tamper_evident_valid": is_valid,
        "registered_hash": contract.pdf_sha256_hash,
        "calculated_hash": current_hash,
        "tamper_detected": not is_valid,
        "status": "TAMPER_FREE_AUTHENTIC" if is_valid else "TAMPER_DETECTED"
    }

@router.post("/{contract_id}/cyber-checklist/attest", response_model=CyberChecklistItemResponse)
def attest_cyber_checklist_item(
    contract_id: str,
    payload: CyberChecklistAttestRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["STARTUP", "ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Attest a CERT-In baseline cyber checklist item for this contract."""
    item = db.query(CyberChecklistItem).filter(
        CyberChecklistItem.contract_id == contract_id,
        CyberChecklistItem.item_key == payload.item_key
    ).first()

    if not item:
        raise HTTPException(status_code=404, detail="Cyber checklist item not found for this contract")

    item.is_compliant = payload.is_compliant
    item.attested_by = user.userId
    item.attested_at = datetime.now(timezone.utc)
    if payload.evidence_url:
        item.evidence_url = payload.evidence_url

    db.commit()
    db.refresh(item)

    event_bus.publish(SystemEvent(
        entity="CyberChecklistItem",
        entityId=str(item.id),
        action=AuditAction.CERT_IN_ATTESTED,
        actorId=user.userId,
        role=user.role,
        payload={"contractId": contract_id, "itemKey": payload.item_key, "isCompliant": payload.is_compliant}
    ))

    return item
