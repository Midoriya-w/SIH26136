import os
import sys
import pytest
from fastapi.testclient import TestClient

# Ensure backend root is on path
backend_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_root not in sys.path:
    sys.path.insert(0, backend_root)

from app.main import app
from app.database import Base, engine, SessionLocal
from app.security.jwt import create_access_token

@pytest.fixture(scope="session", autouse=True)
def setup_test_db():
    """Ensure database schema is created before tests run."""
    Base.metadata.create_all(bind=engine)
    yield

@pytest.fixture
def client():
    """FastAPI TestClient instance."""
    with TestClient(app) as test_client:
        yield test_client

@pytest.fixture
def startup_auth_headers():
    """JWT Bearer token for Startup user."""
    token = create_access_token(
        user_id="STARTUP-TEST-USER-01",
        role="STARTUP",
        org_id="ORG-STARTUP-01",
        permissions=["read:contract", "write:proof", "sign:contract", "write:gem"]
    )
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def dept_auth_headers():
    """JWT Bearer token for Department Officer."""
    token = create_access_token(
        user_id="DEPT-OFFICER-PATIL",
        role="DEPARTMENT_OFFICER",
        department_id="DEPT-AGRICULTURE-MAHA",
        permissions=["read:contract", "verify:milestone", "sign:contract"]
    )
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def finance_auth_headers():
    """JWT Bearer token for Finance Officer."""
    token = create_access_token(
        user_id="FINANCE-OFFICER-01",
        role="FINANCE_OFFICER",
        department_id="DEPT-FINANCE-MAHA",
        permissions=["read:contract", "release:payment", "export:ledger"]
    )
    return {"Authorization": f"Bearer {token}"}

@pytest.fixture
def validator_auth_headers():
    """JWT Bearer token for Independent Validator."""
    token = create_access_token(
        user_id="VALIDATOR-IIT-BOMBAY",
        role="INDEPENDENT_VALIDATOR",
        permissions=["read:pilot", "write:kpi", "issue:certificate"]
    )
    return {"Authorization": f"Bearer {token}"}
