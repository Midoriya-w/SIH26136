import os
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from slowapi.errors import RateLimitExceeded
from slowapi import _rate_limit_exceeded_handler
from prometheus_fastapi_instrumentator import Instrumentator

from app.config import settings
from app.database import engine, Base, SessionLocal
from app.security.rate_limit import limiter
from app.security.cert_in import SecurityHeadersMiddleware
from app.events.handlers import register_event_handlers
from app.services.cron_service import start_scheduler
from app.models.contract import Clause

# Import all models to ensure metadata registration
import app.models

from app.routers import (
    auth_router,
    contracts_router,
    signatures_router,
    milestones_router,
    payments_router,
    validation_router,
    scale_up_router,
    gem_router,
    compliance_router,
    events_router
)

def seed_default_clauses():
    """Seed standard Government of India / MahaBridge procurement clauses if table is empty."""
    db = SessionLocal()
    try:
        count = db.query(Clause).count()
        if count == 0:
            default_clauses = [
                Clause(
                    title="Intellectual Property (IP) Ownership & Licensing",
                    category="IP_OWNERSHIP",
                    version=1,
                    content=(
                        "All background Intellectual Property remains the exclusive property of the Startup. "
                        "The Department is granted a non-exclusive, perpetual, royalty-free license to use the "
                        "solution developed during the pilot for non-commercial government operations within the State."
                    ),
                    is_mandatory=True,
                    is_active=True
                ),
                Clause(
                    title="Data Localization & Sovereignty (CERT-In / DPDPA 2023)",
                    category="DATA_LOCALIZATION",
                    version=1,
                    content=(
                        "All government datasets, citizen telemetry, and pilot execution logs must reside exclusively "
                        "on MeitY-empanelled cloud infrastructure within the geographical boundaries of India. "
                        "No cross-border transfer of sensitive data is permitted without prior cabinet authorization."
                    ),
                    is_mandatory=True,
                    is_active=True
                ),
                Clause(
                    title="Statutory Non-Disclosure & Confidentiality",
                    category="CONFIDENTIALITY",
                    version=1,
                    content=(
                        "Both parties agree to treat all exchanged information as strictly confidential under the "
                        "Official Secrets Act and Digital Personal Data Protection Act (DPDPA), surviving contract termination for 5 years."
                    ),
                    is_mandatory=True,
                    is_active=True
                ),
                Clause(
                    title="Liquidated Damages & Milestone Failure Remedies",
                    category="LIABILITY",
                    version=1,
                    content=(
                        "Delays attributable solely to the Startup beyond 30 days of the agreed milestone date "
                        "may incur a 0.5% penalty per week on the respective milestone tranche, capped at a maximum of 10%."
                    ),
                    is_mandatory=False,
                    is_active=True
                )
            ]
            db.add_all(default_clauses)
            db.commit()
    finally:
        db.close()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    Base.metadata.create_all(bind=engine)
    seed_default_clauses()
    register_event_handlers()
    scheduler = start_scheduler()
    yield
    # Shutdown
    scheduler.shutdown(wait=False)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Enterprise Post-Award Contracting, Milestone PFMS Disbursement, Independent Pilot Validation, and GeM Adapter Engine.",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# State & Rate Limiter
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Middlewares
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open for development / frontend integration
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(SecurityHeadersMiddleware)

# Prometheus Monitoring (/metrics)
Instrumentator().instrument(app).expose(app, endpoint="/metrics")

# Static Storage Mount (for PDF preview and proofs)
if os.path.exists(settings.STORAGE_DIR):
    app.mount("/storage", StaticFiles(directory=settings.STORAGE_DIR), name="storage")

# Register API Routers under /api/v1
api_prefix = settings.API_V1_STR
app.include_router(auth_router, prefix=api_prefix)
app.include_router(contracts_router, prefix=api_prefix)
app.include_router(signatures_router, prefix=api_prefix)
app.include_router(milestones_router, prefix=api_prefix)
app.include_router(payments_router, prefix=api_prefix)
app.include_router(validation_router, prefix=api_prefix)
app.include_router(scale_up_router, prefix=api_prefix)
app.include_router(gem_router, prefix=api_prefix)
app.include_router(compliance_router, prefix=api_prefix)
app.include_router(events_router, prefix=api_prefix)

@app.get("/")
def root():
    return {
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "status": "OPERATIONAL",
        "api_docs": "/docs",
        "metrics": "/metrics",
        "team": "Team B: Contracting, Execution & Compliance (Post-Award)"
    }
