import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Boolean, Integer, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship
from app.database import Base

contract_clauses_association = Table(
    "contract_clauses",
    Base.metadata,
    Column("contract_id", String(36), ForeignKey("contracts.id"), primary_key=True),
    Column("clause_id", Integer, ForeignKey("clauses.id"), primary_key=True)
)

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    # Cross-DB ID linking: Mongo ObjectId strings stored as VARCHAR foreign keys
    challenge_id = Column(String(64), nullable=False, index=True)
    application_id = Column(String(64), nullable=False, index=True)
    startup_id = Column(String(64), nullable=False, index=True)
    department_id = Column(String(64), nullable=False, index=True)

    title = Column(String(255), nullable=False)
    total_budget = Column(Float, nullable=False, default=0.0)
    status = Column(String(32), default="DRAFT", index=True)  # DRAFT, PENDING_SIGNATURE, SIGNED, ACTIVE, COMPLETED, TERMINATED

    # Digital Tamper-Evidence
    signed_pdf_url = Column(String(512), nullable=True)
    pdf_sha256_hash = Column(String(64), nullable=True)

    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    clauses = relationship("Clause", secondary=contract_clauses_association, back_populates="contracts")
    signatures = relationship("Signature", back_populates="contract", cascade="all, delete-orphan")
    milestones = relationship("Milestone", back_populates="contract", cascade="all, delete-orphan", order_by="Milestone.sequence_order")
    cyber_checklist_items = relationship("CyberChecklistItem", back_populates="contract", cascade="all, delete-orphan")
    kpi_records = relationship("KPIRecord", back_populates="contract", cascade="all, delete-orphan")
    scale_up_proposal = relationship("ScaleUpProposal", back_populates="contract", uselist=False, cascade="all, delete-orphan")
    replication_records = relationship("ReplicationRecord", back_populates="contract", cascade="all, delete-orphan")

class Clause(Base):
    __tablename__ = "clauses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(255), nullable=False)
    category = Column(String(64), nullable=False)  # IP_OWNERSHIP, DATA_LOCALIZATION, LIABILITY, TERMINATION, CONFIDENTIALITY
    version = Column(Integer, default=1)
    content = Column(Text, nullable=False)
    is_mandatory = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    contracts = relationship("Contract", secondary=contract_clauses_association, back_populates="clauses")

class Signature(Base):
    __tablename__ = "signatures"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False)
    signatory_name = Column(String(255), nullable=False)
    signatory_role = Column(String(64), nullable=False)  # STARTUP, DEPARTMENT
    sign_type = Column(String(64), default="AADHAAR_ESIGN")  # AADHAAR_ESIGN, DIGILOCKER, LEEGALITY, DIGIO
    status = Column(String(32), default="INITIATED")  # INITIATED, COMPLETED, REJECTED
    transaction_id = Column(String(128), unique=True, nullable=False)
    certificate_details = Column(Text, nullable=True)  # Signer info, timestamp, cert serial
    signed_at = Column(DateTime, nullable=True)

    contract = relationship("Contract", back_populates="signatures")

class CyberChecklistItem(Base):
    __tablename__ = "cyber_checklist_items"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False)
    item_key = Column(String(64), nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    is_compliant = Column(Boolean, default=False)
    attested_by = Column(String(128), nullable=True)
    attested_at = Column(DateTime, nullable=True)
    evidence_url = Column(String(512), nullable=True)

    contract = relationship("Contract", back_populates="cyber_checklist_items")
