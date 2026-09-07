from typing import List
from fastapi import APIRouter, Depends, Response
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.milestone import PaymentLedger
from app.schemas.milestone_dto import PaymentReleaseRequest, PaymentLedgerResponse
from app.services.payment_service import payment_service
from app.security.rbac import get_current_user, require_roles, TokenPayload

router = APIRouter(prefix="/payments", tags=["B2: Payments & PFMS Ledger"])

@router.post("/release", response_model=PaymentLedgerResponse)
def release_payment(
    payload: PaymentReleaseRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["FINANCE_OFFICER", "ADMIN"]))
):
    """Department finance officer releases payment tranche. Logs PFMS reference and encrypts bank details."""
    ledger = payment_service.release_payment(
        db=db,
        milestone_id=payload.milestone_id,
        beneficiary_acc=payload.beneficiary_account_number,
        ifsc_code=payload.ifsc_code,
        sanction_order=payload.treasury_sanction_order,
        officer_id=user.userId,
        amount=payload.amount
    )

    acc = ledger.beneficiary_acc_enc or ""
    masked_acc = f"XXXXXX{acc[-4:]}" if len(acc) >= 4 else "XXXX"

    return PaymentLedgerResponse(
        id=ledger.id,
        milestone_id=ledger.milestone_id,
        amount=ledger.amount,
        beneficiary_account_masked=masked_acc,
        ifsc_code=ledger.ifsc_code_enc,
        pfms_reference_no=ledger.pfms_reference_no,
        treasury_sanction_order=ledger.treasury_sanction_order,
        sanctioned_by=ledger.sanctioned_by,
        disbursed_at=ledger.disbursed_at,
        status=ledger.status
    )

@router.get("/ledger", response_model=List[PaymentLedgerResponse])
def get_payment_ledger(
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["FINANCE_OFFICER", "ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Retrieve full payment ledger with masked beneficiary accounts for privacy."""
    records = db.query(PaymentLedger).all()
    results = []
    for r in records:
        acc = r.beneficiary_acc_enc or ""
        masked_acc = f"XXXXXX{acc[-4:]}" if len(acc) >= 4 else "XXXX"
        results.append(PaymentLedgerResponse(
            id=r.id,
            milestone_id=r.milestone_id,
            amount=r.amount,
            beneficiary_account_masked=masked_acc,
            ifsc_code=r.ifsc_code_enc,
            pfms_reference_no=r.pfms_reference_no,
            treasury_sanction_order=r.treasury_sanction_order,
            sanctioned_by=r.sanctioned_by,
            disbursed_at=r.disbursed_at,
            status=r.status
        ))
    return results

@router.get("/export/csv")
def export_payment_ledger_csv(
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["FINANCE_OFFICER", "ADMIN"]))
):
    """Download payment ledger as CSV."""
    csv_content = payment_service.export_ledger_csv(db)
    return PlainTextResponse(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=PFMS_Payment_Ledger.csv"}
    )

@router.get("/export/excel")
def export_payment_ledger_excel(
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["FINANCE_OFFICER", "ADMIN"]))
):
    """Download payment ledger as Excel (.xlsx) file."""
    excel_bytes = payment_service.export_ledger_excel(db)
    return Response(
        content=excel_bytes,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": "attachment; filename=PFMS_Payment_Ledger.xlsx"}
    )
