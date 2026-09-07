import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.security.crypto import EncryptedString

class Milestone(Base):
    __tablename__ = "milestones"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, index=True)
    sequence_order = Column(Integer, nullable=False, default=1)
    title = Column(String(255), nullable=False)
    deliverable_description = Column(Text, nullable=False)
    planned_date = Column(DateTime, nullable=False)
    actual_date = Column(DateTime, nullable=True)
    linked_amount = Column(Float, nullable=False, default=0.0)
    status = Column(String(32), default="PENDING", index=True)  # PENDING, SUBMITTED, VERIFIED, DISBURSED, OVERDUE
    delay_days = Column(Integer, default=0)

    contract = relationship("Contract", back_populates="milestones")
    proofs = relationship("DeliverableProof", back_populates="milestone", cascade="all, delete-orphan")
    payment_ledger = relationship("PaymentLedger", back_populates="milestone", uselist=False, cascade="all, delete-orphan")

class DeliverableProof(Base):
    __tablename__ = "deliverable_proofs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    milestone_id = Column(String(36), ForeignKey("milestones.id"), nullable=False, index=True)
    file_name = Column(String(255), nullable=False)
    file_url = Column(String(512), nullable=False)
    file_hash = Column(String(64), nullable=False)  # SHA-256 for audit integrity
    uploaded_by = Column(String(128), nullable=False)
    comments = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    milestone = relationship("Milestone", back_populates="proofs")

class PaymentLedger(Base):
    """Financial ledger tracking PFMS reference, Treasury Sanction, and AES-256 encrypted bank details."""
    __tablename__ = "payment_ledger"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    milestone_id = Column(String(36), ForeignKey("milestones.id"), nullable=False, unique=True, index=True)
    amount = Column(Float, nullable=False)

    # AES-256 Encrypted PII and Financial Fields
    beneficiary_acc_enc = Column(EncryptedString(255), nullable=False)
    ifsc_code_enc = Column(EncryptedString(255), nullable=False)

    pfms_reference_no = Column(String(128), unique=True, nullable=False, index=True)
    treasury_sanction_order = Column(String(128), nullable=False)
    sanctioned_by = Column(String(128), nullable=False)
    disbursed_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String(32), default="SETTLED")  # PENDING_SANCTION, PFMS_PROCESSED, SETTLED, FAILED

    milestone = relationship("Milestone", back_populates="payment_ledger")
