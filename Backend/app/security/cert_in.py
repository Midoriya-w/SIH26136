from datetime import datetime, timezone
from typing import Dict, Any, List
from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response

# 18-Point CERT-In Baseline Checklist for Government Procurement Applications
CERT_IN_BASELINE_ITEMS = [
    {
        "item_key": "CERT_IN_01",
        "title": "Data Encryption at Rest",
        "description": "AES-256 encryption applied to all PII, financial ledgers, and bank details."
    },
    {
        "item_key": "CERT_IN_02",
        "title": "TLS 1.3 in Transit",
        "description": "Enforce HTTPS/TLS encryption across all public and internal endpoints."
    },
    {
        "item_key": "CERT_IN_03",
        "title": "Multi-Factor & Aadhaar eSign Authentication",
        "description": "Statutory non-repudiation for contract signing and financial release."
    },
    {
        "item_key": "CERT_IN_04",
        "title": "Time-Stamped Audit Trail",
        "description": "NTP-synchronized, tamper-evident audit logs maintained for minimum 180 days."
    },
    {
        "item_key": "CERT_IN_05",
        "title": "Role-Based Access Control (RBAC)",
        "description": "Strict least-privilege access enforced with pilot-scoped tokens."
    },
    {
        "item_key": "CERT_IN_06",
        "title": "6-Hour Incident Reporting Mechanism",
        "description": "Integration readiness to report cybersecurity incidents to incident@cert-in.org.in within 6 hours."
    },
    {
        "item_key": "CERT_IN_07",
        "title": "Input Sanitization & SQLi / XSS Prevention",
        "description": "Pydantic schema validation, SQLAlchemy parameterized queries, and strict DTO typing."
    },
    {
        "item_key": "CERT_IN_08",
        "title": "Tamper-Evident SHA-256 Document Hashing",
        "description": "SHA-256 checksum calculated and verified on all generated agreements and certificates."
    }
]

class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    """Adds enterprise security headers adhering to OWASP and CERT-In guidelines."""
    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = "default-src 'self'; frame-ancestors 'none';"
        return response
