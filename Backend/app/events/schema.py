from datetime import datetime, timezone
from enum import Enum
from typing import Dict, Any, Optional
from pydantic import BaseModel, Field

class AuditAction(str, Enum):
    # Day-1 agreed audit event taxonomy
    PILOT_AWARDED = "PILOT_AWARDED"
    CONTRACT_CREATED = "CONTRACT_CREATED"
    CLAUSES_UPDATED = "CLAUSES_UPDATED"
    SIGNATURE_INITIATED = "SIGNATURE_INITIATED"
    CONTRACT_SIGNED = "CONTRACT_SIGNED"
    PROOF_SUBMITTED = "PROOF_SUBMITTED"
    MILESTONE_VERIFIED = "MILESTONE_VERIFIED"
    MILESTONE_OVERDUE = "MILESTONE_OVERDUE"
    PAYMENT_SANCTIONED = "PAYMENT_SANCTIONED"
    PAYMENT_DISBURSED = "PAYMENT_DISBURSED"
    KPI_UPDATED = "KPI_UPDATED"
    VALIDATION_ISSUED = "VALIDATION_ISSUED"
    SCALE_UP_RECOMMENDED = "SCALE_UP_RECOMMENDED"
    SCALE_UP_APPROVED = "SCALE_UP_APPROVED"
    REPLICATION_INITIATED = "REPLICATION_INITIATED"
    GEM_CATALOGUE_PUSHED = "GEM_CATALOGUE_PUSHED"
    CERT_IN_ATTESTED = "CERT_IN_ATTESTED"

class SystemEvent(BaseModel):
    """Agreed shared Event Bus schema between Team A and Team B."""
    entity: str
    entityId: str
    action: str
    actorId: str
    role: str
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    payload: Dict[str, Any] = Field(default_factory=dict)

class PilotAwardedPayload(BaseModel):
    """Team A's PilotAwarded event payload."""
    challengeId: str
    applicationId: str
    startupId: str
    departmentId: str
    agreedBudget: float
    title: Optional[str] = "GovTech Innovation Pilot"
