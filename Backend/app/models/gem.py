import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, Text, DateTime, ForeignKey
from app.database import Base

class GeMCatalogueItem(Base):
    __tablename__ = "gem_catalogue_items"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    contract_id = Column(String(36), ForeignKey("contracts.id"), nullable=False, index=True)
    startup_id = Column(String(64), nullable=False, index=True)
    product_title = Column(String(255), nullable=False)
    category_code = Column(String(64), nullable=False)
    gem_product_id = Column(String(128), nullable=True, index=True)
    sync_status = Column(String(32), default="DRAFT", index=True)  # DRAFT, EXPORTED_BATCH, SYNCED_API, FAILED
    price = Column(Float, nullable=False, default=0.0)
    specifications = Column(Text, nullable=True)  # JSON string of tech specs
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class GeMSyncJob(Base):
    __tablename__ = "gem_sync_jobs"

    id = Column(String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    job_type = Column(String(32), nullable=False)  # BATCH_EXPORT_CSV, BATCH_EXPORT_JSON, DIRECT_API_PUSH
    status = Column(String(32), default="COMPLETED")
    exported_records_count = Column(Integer, default=0)
    payload_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
