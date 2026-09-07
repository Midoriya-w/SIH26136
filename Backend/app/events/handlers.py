import logging
from datetime import datetime, timedelta, timezone
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction
from app.models.contract import Contract, Clause, CyberChecklistItem
from app.models.milestone import Milestone
from app.security.cert_in import CERT_IN_BASELINE_ITEMS

logger = logging.getLogger("event_handlers")

def handle_pilot_awarded(event: SystemEvent):
    """Automatically constructs Contract, Default Clauses, Milestones, and Cyber Checklist when PilotAwarded is received."""
    payload = event.payload
    challenge_id = payload.get("challengeId")
    application_id = payload.get("applicationId")
    startup_id = payload.get("startupId")
    department_id = payload.get("departmentId")
    agreed_budget = float(payload.get("agreedBudget", 500000.0))
    title = payload.get("title", f"Pilot Contract for Challenge {challenge_id}")

    db: Session = SessionLocal()
    try:
        # Check if contract already exists
        existing = db.query(Contract).filter(Contract.application_id == application_id).first()
        if existing:
            logger.info(f"Contract for application {application_id} already exists: {existing.id}")
            return

        # 1. Create Contract
        contract = Contract(
            challenge_id=challenge_id,
            application_id=application_id,
            startup_id=startup_id,
            department_id=department_id,
            title=title,
            total_budget=agreed_budget,
            status="DRAFT"
        )

        # 2. Attach Mandatory Clauses
        mandatory_clauses = db.query(Clause).filter(Clause.is_mandatory == True, Clause.is_active == True).all()
        contract.clauses = mandatory_clauses
        db.add(contract)
        db.flush()

        # 3. Create Default Milestones
        now = datetime.now(timezone.utc)
        m1 = Milestone(
            contract_id=contract.id,
            sequence_order=1,
            title="Phase 1: Architecture Blueprint & Cyber Security Clearance",
            deliverable_description="Submission of technical architecture, CERT-In gap assessment, and test environment deployment.",
            planned_date=now + timedelta(days=20),
            linked_amount=agreed_budget * 0.25,
            status="PENDING"
        )
        m2 = Milestone(
            contract_id=contract.id,
            sequence_order=2,
            title="Phase 2: MVP Pilot Deployment & On-Ground Operations",
            deliverable_description="Full rollout in designated pilot zone, live operational data ingestion, and departmental user onboarding.",
            planned_date=now + timedelta(days=50),
            linked_amount=agreed_budget * 0.45,
            status="PENDING"
        )
        m3 = Milestone(
            contract_id=contract.id,
            sequence_order=3,
            title="Phase 3: Independent Validation & Final Pilot Report",
            deliverable_description="Independent verification of baseline vs achieved KPIs, final pilot outcomes, and scale-up readiness report.",
            planned_date=now + timedelta(days=80),
            linked_amount=agreed_budget * 0.30,
            status="PENDING"
        )
        db.add_all([m1, m2, m3])

        # 4. Attach CERT-In Baseline Checklist Items
        for item in CERT_IN_BASELINE_ITEMS:
            chk = CyberChecklistItem(
                contract_id=contract.id,
                item_key=item["item_key"],
                title=item["title"],
                description=item["description"],
                is_compliant=False
            )
            db.add(chk)

        db.commit()
        logger.info(f"Successfully auto-created Contract {contract.id} from PilotAwarded event!")

        # Broadcast contract created
        event_bus.publish(SystemEvent(
            entity="Contract",
            entityId=contract.id,
            action=AuditAction.CONTRACT_CREATED,
            actorId=event.actorId,
            role=event.role,
            payload={
                "challengeId": challenge_id,
                "applicationId": application_id,
                "startupId": startup_id,
                "departmentId": department_id,
                "totalBudget": agreed_budget
            }
        ))

    except Exception as e:
        logger.error(f"Error handling PilotAwarded event: {e}", exc_info=True)
        db.rollback()
    finally:
        db.close()

def register_event_handlers():
    """Register all system event handlers to the global event bus."""
    event_bus.subscribe(AuditAction.PILOT_AWARDED, handle_pilot_awarded)
    logger.info("Registered PilotAwarded event listener on EventBus.")
