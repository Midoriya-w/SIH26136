import uuid
from typing import List, Optional
from fastapi import APIRouter
from app.events.bus import event_bus
from app.events.schema import SystemEvent, PilotAwardedPayload, AuditAction

router = APIRouter(prefix="/events", tags=["Shared Event Bus & Team A Integration"])

@router.post("/mock-pilot-awarded")
def simulate_pilot_awarded_event(payload: Optional[PilotAwardedPayload] = None):
    """Simulate Team A (A4) emitting a PilotAwarded event.
    Auto-provisions the contract, mandatory clauses, milestone schedule, and cyber checklist in Team B."""
    if not payload:
        sample_id = uuid.uuid4().hex[:6]
        payload = PilotAwardedPayload(
            challengeId=f"66a01f{sample_id}1001",   # Simulated MongoDB ObjectId string
            applicationId=f"66a02f{sample_id}2002",
            startupId=f"STARTUP-AGRI-AI-{sample_id.upper()}",
            departmentId="DEPT-AGRICULTURE-MAHA",
            agreedBudget=1250000.0,
            title="AI Smart Pest Detection & Crop Advisory Pilot"
        )

    event = SystemEvent(
        entity="Application",
        entityId=payload.applicationId,
        action=AuditAction.PILOT_AWARDED,
        actorId="TEAM_A_EVALUATION_PORTAL",
        role="EVALUATOR",
        payload=payload.model_dump()
    )

    event_bus.publish(event)
    return {
        "status": "EVENT_EMITTED",
        "action": AuditAction.PILOT_AWARDED,
        "message": "PilotAwarded event published. Contract and milestones auto-provisioned in Team B.",
        "payload": payload.model_dump()
    }

@router.post("/publish")
def publish_generic_event(event: SystemEvent):
    """Publish an arbitrary event to the shared event bus."""
    event_bus.publish(event)
    return {"status": "PUBLISHED", "action": event.action, "entityId": event.entityId}

@router.get("/history", response_model=List[SystemEvent])
def get_event_bus_history(limit: int = 50):
    """View the recent event bus audit stream."""
    return event_bus.get_history(limit=limit)
