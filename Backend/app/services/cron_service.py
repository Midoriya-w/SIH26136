import logging
from datetime import datetime, timezone
from apscheduler.schedulers.background import BackgroundScheduler
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models.milestone import Milestone
from app.events.bus import event_bus
from app.events.schema import SystemEvent, AuditAction

logger = logging.getLogger("cron_service")

def check_overdue_milestones():
    """Scans all active milestones and flags those exceeding planned date."""
    db: Session = SessionLocal()
    try:
        now = datetime.now(timezone.utc)
        # Find milestones past planned_date not yet verified or disbursed
        milestones = db.query(Milestone).filter(
            Milestone.status.in_(["PENDING", "SUBMITTED"]),
            Milestone.planned_date < now
        ).all()

        for m in milestones:
            # Handle naive or aware datetimes
            p_date = m.planned_date if m.planned_date.tzinfo else m.planned_date.replace(tzinfo=timezone.utc)
            delay = (now - p_date).days
            m.delay_days = max(1, delay)
            m.status = "OVERDUE"

            logger.warning(f"Flagged Milestone {m.id} as OVERDUE with {m.delay_days} days delay.")

            event_bus.publish(SystemEvent(
                entity="Milestone",
                entityId=m.id,
                action=AuditAction.MILESTONE_OVERDUE,
                actorId="CRON_SYSTEM",
                role="SYSTEM",
                payload={
                    "contractId": m.contract_id,
                    "milestoneTitle": m.title,
                    "delayDays": m.delay_days,
                    "plannedDate": m.planned_date.isoformat()
                }
            ))

        db.commit()
    except Exception as e:
        logger.error(f"Error checking overdue milestones: {e}", exc_info=True)
    finally:
        db.close()

def start_scheduler() -> BackgroundScheduler:
    """Initialize and start background scheduler."""
    scheduler = BackgroundScheduler()
    # Runs every 60 minutes in production, or can be triggered manually via API
    scheduler.add_job(check_overdue_milestones, "interval", minutes=60, id="check_overdue_milestones")
    scheduler.start()
    logger.info("Background Cron Scheduler started for Overdue Milestone monitoring.")
    return scheduler
