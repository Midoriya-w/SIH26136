import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class KPIRecord(Base):
    __tablename__ = "kpi_records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, index=True)
    metric_name = Column(String(255), nullable=False)
    baseline_value = Column(Float, nullable=False)
    target_value = Column(Float, nullable=False)
    achieved_value = Column(Float, nullable=False, default=0.0)
    unit = Column(String(64), nullable=False, default="")
    variance_pct = Column(Float, nullable=False, default=0.0)
    status = Column(String(32), default="PENDING")  # PENDING, ACHIEVED, EXCEEDED, PARTIAL, FAILED

    contract = relationship("Contract", back_populates="kpi_records")

class ValidationCertificate(Base):
    __tablename__ = "validation_certificates"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, unique=True, index=True)
    certificate_number = Column(String(64), unique=True, nullable=False)
    validator_id = Column(String(128), nullable=False)
    validator_name = Column(String(255), nullable=False)
    cars_score = Column(Float, nullable=False)  # Composite Adoption-Readiness Score (0 to 100)
    recommendation = Column(String(64), nullable=False)  # SCALE_UP_RECOMMENDED, CONDITIONAL, NOT_RECOMMENDED
    summary = Column(Text, nullable=True)

    pdf_url = Column(String(512), nullable=False)
    sha256_hash = Column(String(64), nullable=False)
    issued_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    expiry_date = Column(DateTime, nullable=False)

class ValidatorAssignment(Base):
    """Time-boxed, pilot-scoped validator assignment."""
    __tablename__ = "validator_assignments"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    validator_id = Column(String(128), nullable=False, index=True)
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, index=True)
    assigned_by = Column(String(128), nullable=False)
    valid_from = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    valid_until = Column(DateTime, nullable=False)  # Time-boxed
    is_active = Column(Boolean, default=True)
