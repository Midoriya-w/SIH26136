from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, ConfigDict

class ScaleUpApprovalCreate(BaseModel):
    decision: str  # APPROVED, REJECTED, CONDITIONAL
    comments: Optional[str] = None

class ScaleUpApprovalResponse(BaseModel):
    id: str
    approver_id: str
    approver_name: str
    approver_role: str
    decision: str
    comments: Optional[str] = None
    decided_at: datetime
    model_config = ConfigDict(from_attributes=True)

class ScaleUpProposalCreate(BaseModel):
    contract_id: str
    recommendation_summary: str
    target_scale_budget: float

class ScaleUpProposalResponse(BaseModel):
    id: str
    contract_id: str
    recommendation_summary: str
    target_scale_budget: float
    status: str
    created_at: datetime
    approvals: List[ScaleUpApprovalResponse] = []
    model_config = ConfigDict(from_attributes=True)

class ReplicationRecordCreate(BaseModel):
    contract_id: str
    replicating_department_id: str
    replicating_department_name: str
    contact_officer: Optional[str] = None
    notes: Optional[str] = None

class ReplicationRecordResponse(BaseModel):
    id: str
    contract_id: str
    source_department_id: str
    replicating_department_id: str
    replicating_department_name: str
    status: str
    contact_officer: Optional[str] = None
    notes: Optional[str] = None
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)
