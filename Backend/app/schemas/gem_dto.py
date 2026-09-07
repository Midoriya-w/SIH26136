from datetime import datetime
from typing import Dict, Any, Optional, List
from pydantic import BaseModel, ConfigDict

class GeMCataloguePushRequest(BaseModel):
    contract_id: str
    startup_id: str
    product_title: str
    category_code: str
    price: float
    specifications: Dict[str, Any]

class GeMCatalogueResponse(BaseModel):
    id: str
    contract_id: str
    startup_id: str
    product_title: str
    category_code: str
    gem_product_id: Optional[str] = None
    sync_status: str
    price: float
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)

class GeMBatchExportResponse(BaseModel):
    job_id: str
    export_format: str  # CSV or JSON
    records_count: int
    download_url: str
    status: str
