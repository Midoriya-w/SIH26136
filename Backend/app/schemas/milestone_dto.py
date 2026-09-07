from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict

class DeliverableProofResponse(BaseModel):
    id: str
    milestone_id: str
    file_name: str
    file_url: str
    file_hash: str
    uploaded_by: str
    comments: Optional[str] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class MilestoneCreate(BaseModel):
    contract_id: str
    sequence_order: int
    title: str
    deliverable_description: str
    planned_date: datetime
    linked_amount: float

class MilestoneResponse(BaseModel):
    id: str
    contract_id: str
    sequence_order: int
    title: str
    deliverable_description: str
    planned_date: datetime
    actual_date: Optional[datetime] = None
    linked_amount: float
    status: str
    delay_days: int
    proofs: List[DeliverableProofResponse] = []
    model_config = ConfigDict(from_attributes=True)

class MilestoneVerifyRequest(BaseModel):
    is_approved: bool
    comments: Optional[str] = "Milestone verified by department officer."

class PaymentReleaseRequest(BaseModel):
    milestone_id: str
    beneficiary_account_number: str
    ifsc_code: str
    treasury_sanction_order: str
    amount: Optional[float] = None  # If not provided, defaults to linked_amount

class PaymentLedgerResponse(BaseModel):
    id: str
    milestone_id: str
    amount: float
    # We return masked account and IFSC for security in response DTO
    beneficiary_account_masked: str
    ifsc_code: str
    pfms_reference_no: str
    treasury_sanction_order: str
    sanctioned_by: str
    disbursed_at: datetime
    status: str
    model_config = ConfigDict(from_attributes=True)
