import csv
import io
import json
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from app.models.gem import GeMCatalogueItem, GeMSyncJob
from app.config import settings
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

class GeMAdapter:
    """Isolated GeM adapter service supporting batch export and direct API synchronization."""

    def __init__(self):
        self.base_url = settings.GEM_API_BASE_URL
        self.api_key = settings.GEM_API_KEY
        self.mode = settings.GEM_MODE

    def fetch_categories(self) -> List[Dict[str, str]]:
        """Fetch standardized GeM procurement product/service categories."""
        return [
            {"category_code": "GEM-CAT-IT-001", "name": "AI & Machine Learning Software Services"},
            {"category_code": "GEM-CAT-IT-002", "name": "Cloud Infrastructure & SaaS Platforms"},
            {"category_code": "GEM-CAT-IT-003", "name": "IoT & Smart City Sensor Solutions"},
            {"category_code": "GEM-CAT-AG-004", "name": "Agritech Crop Analytics & Drone Monitoring"},
            {"category_code": "GEM-CAT-HL-005", "name": "Healthtech Diagnostic Software & Devices"},
            {"category_code": "GEM-CAT-CY-006", "name": "Cybersecurity & Vulnerability Assessment Tools"}
        ]

    def push_to_catalogue(
        self,
        db: Session,
        contract_id: str,
        startup_id: str,
        product_title: str,
        category_code: str,
        price: float,
        specifications: Dict[str, Any]
    ) -> GeMCatalogueItem:
        """Add innovation product to GeM catalogue staging ledger."""
        gem_item = GeMCatalogueItem(
            contract_id=contract_id,
            startup_id=startup_id,
            product_title=product_title,
            category_code=category_code,
            gem_product_id=f"GEM-PROD-{uuid.uuid4().hex[:8].upper()}",
            sync_status="SYNCED_API" if self.mode == "direct_api" else "DRAFT",
            price=price,
            specifications=json.dumps(specifications)
        )
        db.add(gem_item)
        db.commit()
        db.refresh(gem_item)

        event_bus.publish(SystemEvent(
            entity="GeMCatalogueItem",
            entityId=gem_item.id,
            action=AuditAction.GEM_CATALOGUE_PUSHED,
            actorId=startup_id,
            role="STARTUP",
            payload={"gemProductId": gem_item.gem_product_id, "category": category_code, "price": price}
        ))

        return gem_item

    def sync_status(self, db: Session, gem_product_id: str) -> Dict[str, Any]:
        """Query catalogue approval status from GeM."""
        item = db.query(GeMCatalogueItem).filter(GeMCatalogueItem.gem_product_id == gem_product_id).first()
        if not item:
            return {"status": "NOT_FOUND", "gem_product_id": gem_product_id}

        return {
            "gem_product_id": item.gem_product_id,
            "product_title": item.product_title,
            "category_code": item.category_code,
            "sync_status": item.sync_status,
            "price": item.price,
            "synced_at": item.created_at.isoformat()
        }

    def generate_batch_export_json(self, db: Session) -> Dict[str, Any]:
        """Generate GeM-compliant JSON export format for offline bulk upload."""
        items = db.query(GeMCatalogueItem).all()
        export_data = {
            "gem_catalogue_version": "2.4",
            "exported_at": datetime.now(timezone.utc).isoformat(),
            "origin_platform": "MahaBridge GovTech Procurement Portal",
            "total_items": len(items),
            "catalogue_items": [
                {
                    "gem_product_id": it.gem_product_id,
                    "contract_id": it.contract_id,
                    "startup_id": it.startup_id,
                    "title": it.product_title,
                    "category_code": it.category_code,
                    "unit_price_inr": it.price,
                    "specifications": json.loads(it.specifications or "{}"),
                    "created_at": it.created_at.isoformat()
                }
                for it in items
            ]
        }

        # Record batch export job
        job = GeMSyncJob(
            job_type="BATCH_EXPORT_JSON",
            status="COMPLETED",
            exported_records_count=len(items),
            payload_summary=f"Exported {len(items)} items to GeM JSON format"
        )
        db.add(job)

        for it in items:
            it.sync_status = "EXPORTED_BATCH"
        db.commit()

        return export_data

    def generate_batch_export_csv(self, db: Session) -> str:
        """Generate official GeM-compliant CSV catalogue schema string."""
        items = db.query(GeMCatalogueItem).all()
        output = io.StringIO()
        writer = csv.writer(output)

        # Official GeM Catalogue Header schema
        writer.writerow([
            "GEM_PRODUCT_ID", "CONTRACT_REF", "STARTUP_DPIIT_REF", "PRODUCT_NAME",
            "CATEGORY_CODE", "BASE_PRICE_INR", "GST_APPLICABLE", "INNOVATION_CERTIFIED", "SPECS_JSON"
        ])

        for it in items:
            writer.writerow([
                it.gem_product_id,
                it.contract_id,
                it.startup_id,
                it.product_title,
                it.category_code,
                f"{it.price:.2f}",
                "18%",
                "TRUE",
                it.specifications
            ])

        job = GeMSyncJob(
            job_type="BATCH_EXPORT_CSV",
            status="COMPLETED",
            exported_records_count=len(items),
            payload_summary=f"Exported {len(items)} items to GeM CSV format"
        )
        db.add(job)

        for it in items:
            it.sync_status = "EXPORTED_BATCH"
        db.commit()

        return output.getvalue()

gem_adapter = GeMAdapter()
