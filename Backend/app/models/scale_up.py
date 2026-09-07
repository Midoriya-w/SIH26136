import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class ScaleUpProposal(Base):
    __tablename__ = "scale_up_proposals"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, unique=True, index=True)
    recommendation_summary = Column(Text, nullable=False)
    target_scale_budget = Column(Float, nullable=False)
    status = Column(String(32), default="UNDER_REVIEW", index=True)  # UNDER_REVIEW, APPROVED, REJECTED, CONDITIONAL
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    contract = relationship("Contract", back_populates="scale_up_proposal")
    approvals = relationship("ScaleUpApproval", back_populates="proposal", cascade="all, delete-orphan")

class ScaleUpApproval(Base):
    """Committee sign-off workflow (Technical Evaluator, Finance Directorate, Secretary)."""
    __tablename__ = "scale_up_approvals"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    proposal_id = Column(String(36), ForeignKey("scale_up_proposals.id"), nullable=False, index=True)
    approver_id = Column(String(128), nullable=False)
    approver_name = Column(String(255), nullable=False)
    approver_role = Column(String(64), nullable=False)  # TECHNICAL_EVALUATOR, FINANCE_DIRECTORATE, SECRETARY
    decision = Column(String(32), nullable=False)  # APPROVED, REJECTED, CONDITIONAL
    comments = Column(Text, nullable=True)
    decided_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    proposal = relationship("ScaleUpProposal", back_populates="approvals")

class ReplicationRecord(Base):
    """Cross-department replication tracking linked to the original pilot/contract."""
    __tablename__ = "replication_records"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, index=True)
    source_department_id = Column(String(64), nullable=False)
    replicating_department_id = Column(String(64), nullable=False, index=True)
    replicating_department_name = Column(String(255), nullable=False)
    status = Column(String(32), default="EXPRESSION_OF_INTEREST")  # EXPRESSION_OF_INTEREST, MOU_SIGNED, REPLICATED
    contact_officer = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    contract = relationship("Contract", back_populates="replication_records")
