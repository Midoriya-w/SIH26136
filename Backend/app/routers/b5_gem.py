from typing import List, Dict, Any
from fastapi import APIRouter, Depends, Response
from fastapi.responses import PlainTextResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.gem import GeMCatalogueItem
from app.schemas.gem_dto import GeMCataloguePushRequest, GeMCatalogueResponse
from app.services.gem_adapter import gem_adapter
from app.security.rbac import get_current_user, require_roles, TokenPayload

router = APIRouter(prefix="/gem", tags=["B5: GeM Integration Adapter"])

@router.get("/categories", response_model=List[Dict[str, str]])
def get_gem_categories():
    """Fetch standardized product/service categories from GeM taxonomy."""
    return gem_adapter.fetch_categories()

@router.post("/catalogue/push", response_model=GeMCatalogueResponse)
def push_to_gem_catalogue(
    payload: GeMCataloguePushRequest,
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["STARTUP", "ADMIN", "DEPARTMENT_OFFICER"]))
):
    """Publish a validated pilot solution into GeM catalogue staging ledger."""
    return gem_adapter.push_to_catalogue(
        db=db,
        contract_id=payload.contract_id,
        startup_id=payload.startup_id,
        product_title=payload.product_title,
        category_code=payload.category_code,
        price=payload.price,
        specifications=payload.specifications
    )

@router.get("/catalogue/status/{gem_product_id}")
def check_gem_sync_status(gem_product_id: str, db: Session = Depends(get_db)):
    """Check live synchronization and catalogue approval status on GeM."""
    return gem_adapter.sync_status(db=db, gem_product_id=gem_product_id)

@router.get("/export/json")
def export_gem_catalogue_json(
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["DEPARTMENT_OFFICER", "ADMIN"]))
):
    """Export GeM catalogue batch file in official JSON schema."""
    return gem_adapter.generate_batch_export_json(db=db)

@router.get("/export/csv")
def export_gem_catalogue_csv(
    db: Session = Depends(get_db),
    user: TokenPayload = Depends(require_roles(["DEPARTMENT_OFFICER", "ADMIN"]))
):
    """Export GeM catalogue batch file in official CSV schema."""
    csv_content = gem_adapter.generate_batch_export_csv(db=db)
    return PlainTextResponse(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=GeM_Batch_Catalogue_Export.csv"}
    )
