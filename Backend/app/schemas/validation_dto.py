from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, Field, ConfigDict

class KPICreate(BaseModel):
    contract_id: str
    metric_name: str
    baseline_value: float
    target_value: float
    achieved_value: float
    unit: str

class KPIUpdate(BaseModel):
    achieved_value: float

class KPIResponse(BaseModel):
    id: str
    contract_id: str
    metric_name: str
    baseline_value: float
    target_value: float
    achieved_value: float
    unit: str
    variance_pct: float
    status: str
    model_config = ConfigDict(from_attributes=True)

class CARSScoreBreakdown(BaseModel):
    kpi_score: float  # weight 35%
    milestone_timeliness: float  # weight 25%
    cyber_compliance: float  # weight 20%
    user_feedback: float  # weight 20%
    composite_score: float  # out of 100
    recommendation: str  # SCALE_UP_RECOMMENDED, CONDITIONAL, NOT_RECOMMENDED

class ValidationCertificateResponse(BaseModel):
    id: str
    contract_id: str
    certificate_number: str
    validator_name: str
    cars_score: float
    recommendation: str
    summary: Optional[str] = None
    pdf_url: str
    sha256_hash: str
    issued_at: datetime
    expiry_date: datetime
    model_config = ConfigDict(from_attributes=True)

class AssignValidatorRequest(BaseModel):
    validator_id: str
    duration_days: int = 14  # Time-boxed window

class AssignValidatorResponse(BaseModel):
    id: str
    validator_id: str
    contract_id: str
    valid_from: datetime
    valid_until: datetime
    is_active: bool
    scoped_token: str
    model_config = ConfigDict(from_attributes=True)
