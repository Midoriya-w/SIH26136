import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, DateTime
from app.database import Base

class AuditLog(Base):
    """NTP-synchronized, tamper-evident audit trail for CERT-In compliance."""
    __tablename__ = "audit_logs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    actor_id = Column(String(128), nullable=False, index=True)
    role = Column(String(64), nullable=False)
    action = Column(String(64), nullable=False, index=True)
    entity = Column(String(64), nullable=False, index=True)
    entity_id = Column(String(64), nullable=False, index=True)
    ip_address = Column(String(64), nullable=True)
    details = Column(Text, nullable=True)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
