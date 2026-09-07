from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict

class ClauseBase(BaseModel):
    title: str
    category: str  # IP_OWNERSHIP, DATA_LOCALIZATION, LIABILITY, etc.
    version: int = 1
    content: str
    is_mandatory: bool = True
    is_active: bool = True

class ClauseCreate(ClauseBase):
    pass

class ClauseResponse(ClauseBase):
    id: int
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class CyberChecklistItemResponse(BaseModel):
    id: int
    item_key: str
    title: str
    description: str
    is_compliant: bool
    attested_by: Optional[str] = None
    attested_at: Optional[datetime] = None
    evidence_url: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class CyberChecklistAttestRequest(BaseModel):
    item_key: str
    is_compliant: bool
    evidence_url: Optional[str] = None

class SignatureResponse(BaseModel):
    id: str
    signatory_name: str
    signatory_role: str
    sign_type: str
    status: str
    transaction_id: str
    signed_at: Optional[datetime] = None
    model_config = ConfigDict(from_attributes=True)

class ContractCreateRequest(BaseModel):
    challenge_id: str
    application_id: str
    startup_id: str
    department_id: str
    title: str
    total_budget: float
    clause_ids: Optional[List[int]] = None

class ContractResponse(BaseModel):
    id: str
    challenge_id: str
    application_id: str
    startup_id: str
    department_id: str
    title: str
    total_budget: float
    status: str
    signed_pdf_url: Optional[str] = None
    pdf_sha256_hash: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ContractDetailResponse(ContractResponse):
    clauses: List[ClauseResponse] = []
    signatures: List[SignatureResponse] = []
    cyber_checklist_items: List[CyberChecklistItemResponse] = []

class SignatureInitRequest(BaseModel):
    signatory_name: str
    signatory_role: str  # STARTUP or DEPARTMENT
    sign_type: str = "AADHAAR_ESIGN"  # AADHAAR_ESIGN, DIGILOCKER, LEEGALITY, DIGIO

class SignatureWebhookPayload(BaseModel):
    transaction_id: str
    status: str  # COMPLETED or REJECTED
    certificate_serial: Optional[str] = None
    timestamp: Optional[str] = None
    signature_fingerprint: Optional[str] = None
