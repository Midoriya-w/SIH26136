from app.routers.auth_stub import router as auth_router
from app.routers.b1_contracts import router as contracts_router
from app.routers.b1_signatures import router as signatures_router
from app.routers.b2_milestones import router as milestones_router
from app.routers.b2_payments import router as payments_router
from app.routers.b3_validation import router as validation_router
from app.routers.b4_scale_up import router as scale_up_router
from app.routers.b5_gem import router as gem_router
from app.routers.b6_compliance import router as compliance_router
from app.routers.events_router import router as events_router

__all__ = [
    "auth_router",
    "contracts_router",
    "signatures_router",
    "milestones_router",
    "payments_router",
    "validation_router",
    "scale_up_router",
    "gem_router",
    "compliance_router",
    "events_router"
]
