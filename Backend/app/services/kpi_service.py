import uuid
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, List
from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.validation import KPIRecord, ValidationCertificate, ValidatorAssignment
from app.models.contract import Contract, CyberChecklistItem
from app.models.milestone import Milestone
from app.services.pdf_service import pdf_service
from app.services.storage_service import storage_service
from app.security.jwt import create_access_token
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

class KPIService:
    @staticmethod
    def calculate_variance(baseline: float, target: float, achieved: float) -> tuple[float, str]:
        """Compute variance percentage and performance status."""
        if baseline == 0:
            variance_pct = 100.0 if achieved > 0 else 0.0
        else:
            variance_pct = ((achieved - baseline) / abs(baseline)) * 100.0

        target_diff = target - baseline
        achieved_diff = achieved - baseline

        if target_diff == 0:
            status = "ACHIEVED" if achieved >= target else "FAILED"
        elif target_diff > 0:
            if achieved >= target:
                status = "EXCEEDED" if achieved > target else "ACHIEVED"
            elif achieved > baseline:
                status = "PARTIAL"
            else:
                status = "FAILED"
        else:  # Lower is better (e.g. latency, error rate)
            if achieved <= target:
                status = "EXCEEDED" if achieved < target else "ACHIEVED"
            elif achieved < baseline:
                status = "PARTIAL"
            else:
                status = "FAILED"

        return round(variance_pct, 2), status

    @classmethod
    def add_kpi(
        cls,
        db: Session,
        contract_id: str,
        metric_name: str,
        baseline: float,
        target: float,
        achieved: float,
        unit: str
    ) -> KPIRecord:
        variance_pct, status = cls.calculate_variance(baseline, target, achieved)
        kpi = KPIRecord(
            contract_id=contract_id,
            metric_name=metric_name,
            baseline_value=baseline,
            target_value=target,
            achieved_value=achieved,
            unit=unit,
            variance_pct=variance_pct,
            status=status
        )
        db.add(kpi)
        db.commit()
        db.refresh(kpi)
        return kpi

    @classmethod
    def update_kpi(cls, db: Session, kpi_id: str, achieved_value: float) -> KPIRecord:
        kpi = db.query(KPIRecord).filter(KPIRecord.id == kpi_id).first()
        if not kpi:
            raise HTTPException(status_code=404, detail="KPI not found")

        variance_pct, status = cls.calculate_variance(kpi.baseline_value, kpi.target_value, achieved_value)
        kpi.achieved_value = achieved_value
        kpi.variance_pct = variance_pct
        kpi.status = status

        db.commit()
        db.refresh(kpi)

        event_bus.publish(SystemEvent(
            entity="KPIRecord",
            entityId=kpi.id,
            action=AuditAction.KPI_UPDATED,
            actorId="INDEPENDENT_VALIDATOR",
            role="INDEPENDENT_VALIDATOR",
            payload={"contractId": kpi.contract_id, "metric": kpi.metric_name, "achieved": achieved_value, "variance": variance_pct}
        ))
        return kpi

    @staticmethod
    def compute_cars_score(contract_id: str, db: Session) -> Dict[str, Any]:
        """Compute Composite Adoption-Readiness Score (CARS)."""
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        # 1. KPI Score (35% weight)
        kpis = db.query(KPIRecord).filter(KPIRecord.contract_id == contract_id).all()
        if not kpis:
            kpi_score = 75.0  # Default neutral baseline
        else:
            scores = []
            for k in kpis:
                if k.status in ["EXCEEDED", "ACHIEVED"]:
                    scores.append(100.0)
                elif k.status == "PARTIAL":
                    scores.append(60.0)
                else:
                    scores.append(20.0)
            kpi_score = sum(scores) / len(scores)

        # 2. Milestone Timeliness (25% weight)
        milestones = db.query(Milestone).filter(Milestone.contract_id == contract_id).all()
        if not milestones:
            timeliness_score = 100.0
        else:
            on_time = sum(1 for m in milestones if m.delay_days == 0 and m.status in ["VERIFIED", "DISBURSED"])
            timeliness_score = (on_time / len(milestones)) * 100.0

        # 3. Cyber Compliance (20% weight)
        cyber_items = db.query(CyberChecklistItem).filter(CyberChecklistItem.contract_id == contract_id).all()
        if not cyber_items:
            cyber_score = 80.0
        else:
            compliant_count = sum(1 for c in cyber_items if c.is_compliant)
            cyber_score = (compliant_count / len(cyber_items)) * 100.0

        # 4. User Feedback Score (20% weight)
        feedback_score = 88.0

        # Composite Formula
        cars = (0.35 * kpi_score) + (0.25 * timeliness_score) + (0.20 * cyber_score) + (0.20 * feedback_score)
        cars = round(cars, 1)

        if cars >= 80.0:
            rec = "SCALE_UP_RECOMMENDED"
        elif cars >= 60.0:
            rec = "CONDITIONAL_APPROVAL"
        else:
            rec = "NOT_RECOMMENDED"

        return {
            "kpi_score": round(kpi_score, 1),
            "milestone_timeliness": round(timeliness_score, 1),
            "cyber_compliance": round(cyber_score, 1),
            "user_feedback": round(feedback_score, 1),
            "composite_score": cars,
            "recommendation": rec
        }

    @classmethod
    def issue_certificate(
        cls,
        db: Session,
        contract_id: str,
        validator_id: str,
        validator_name: str,
        summary: str = ""
    ) -> ValidationCertificate:
        contract = db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            raise HTTPException(status_code=404, detail="Contract not found")

        breakdown = cls.compute_cars_score(contract_id, db)
        kpis = db.query(KPIRecord).filter(KPIRecord.contract_id == contract_id).all()

        cert_num = f"CERT-VAL-{datetime.now().year}-{uuid.uuid4().hex[:8].upper()}"
        expiry = datetime.now(timezone.utc) + timedelta(days=365)  # 1 year validity

        # Create cert entity first for numbering
        cert = ValidationCertificate(
            contract_id=contract_id,
            certificate_number=cert_num,
            validator_id=validator_id,
            validator_name=validator_name,
            cars_score=breakdown["composite_score"],
            recommendation=breakdown["recommendation"],
            summary=summary or f"Validation completed with CARS score of {breakdown['composite_score']}/100.",
            pdf_url="",
            sha256_hash="",
            issued_at=datetime.now(timezone.utc),
            expiry_date=expiry
        )

        # Generate Certificate PDF
        pdf_bytes = pdf_service.generate_validation_certificate_pdf(cert, contract, kpis)
        pdf_filename = f"Validation_Cert_{cert_num}.pdf"
        pdf_url, sha256_hash = storage_service.save_pdf(pdf_filename, pdf_bytes)

        cert.pdf_url = pdf_url
        cert.sha256_hash = sha256_hash

        db.add(cert)
        db.commit()
        db.refresh(cert)

        event_bus.publish(SystemEvent(
            entity="ValidationCertificate",
            entityId=cert.id,
            action=AuditAction.VALIDATION_ISSUED,
            actorId=validator_id,
            role="INDEPENDENT_VALIDATOR",
            payload={
                "contractId": contract_id,
                "certificateNumber": cert_num,
                "carsScore": breakdown["composite_score"],
                "recommendation": breakdown["recommendation"],
                "sha256": sha256_hash
            }
        ))

        return cert

    @staticmethod
    def assign_time_boxed_validator(
        db: Session,
        contract_id: str,
        validator_id: str,
        assigned_by: str,
        duration_days: int = 14
    ) -> tuple[ValidatorAssignment, str]:
        """Assign time-boxed, pilot-scoped validator role and return scoped JWT token."""
        now = datetime.now(timezone.utc)
        until = now + timedelta(days=duration_days)

        assignment = ValidatorAssignment(
            validator_id=validator_id,
            contract_id=contract_id,
            assigned_by=assigned_by,
            valid_from=now,
            valid_until=until,
            is_active=True
        )
        db.add(assignment)
        db.commit()
        db.refresh(assignment)

        # Generate pilot-scoped time-boxed token
        token = create_access_token(
            user_id=validator_id,
            role="INDEPENDENT_VALIDATOR",
            pilot_scope_id=contract_id,
            permissions=["read:pilot", "write:kpi", "issue:certificate"],
            expires_delta=timedelta(days=duration_days)
        )

        return assignment, token

kpi_service = KPIService()
