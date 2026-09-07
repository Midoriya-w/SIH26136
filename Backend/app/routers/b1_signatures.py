from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.contract_dto import SignatureInitRequest, SignatureWebhookPayload, SignatureResponse
from app.services.esign_service import esign_service
from app.security.rbac import get_current_user, TokenPayload

router = APIRouter(prefix="/signatures", tags=["B1: E-Signatures & Webhooks"])

@router.post("/initiate/{contract_id}", response_model=SignatureResponse)
def initiate_esignature(
    contract_id: str,
    payload: SignatureInitRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(get_current_user)
):
    """Initiate an Aadhaar eSign / DigiLocker signing session for the contract."""
    sig = esign_service.initiate_signature(
        db=db,
        contract_id=contract_id,
        signatory_name=payload.signatory_name,
        signatory_role=payload.signatory_role,
        sign_type=payload.sign_type
    )
    return sig

@router.post("/webhook", response_model=SignatureResponse)
def esign_webhook(payload: SignatureWebhookPayload, db: Session = Depends(get_db)):
    """Webhook listener for Aadhaar eSign/DigiLocker gateway callbacks.
    When both parties sign, triggers PDF generation and SHA-256 sealing."""
    sig = esign_service.handle_webhook(
        db=db,
        transaction_id=payload.transaction_id,
        status=payload.status,
        certificate_serial=payload.certificate_serial,
        signature_fingerprint=payload.signature_fingerprint
    )
    return sig
