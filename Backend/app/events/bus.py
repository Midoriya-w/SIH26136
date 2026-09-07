import logging
from typing import Callable, Dict, List
from app.events.schema import SystemEvent

logger = logging.getLogger("event_bus")

class EventBus:
    def __init__(self):
        self._listeners: Dict[str, List[Callable[[SystemEvent], None]]] = {}
        self._history: List[SystemEvent] = []

    def subscribe(self, action: str, callback: Callable[[SystemEvent], None]):
        """Register a callback for an event action."""
        if action not in self._listeners:
            self._listeners[action] = []
        self._listeners[action].append(callback)
        logger.info(f"Subscribed handler to action: {action}")

    def publish(self, event: SystemEvent):
        """Broadcast an event to all subscribers and append to event history."""
        self._history.append(event)
        logger.info(f"Event published: [{event.action}] entity={event.entity}:{event.entityId} actor={event.actorId}")

        handlers = self._listeners.get(event.action, [])
        # Also broadcast to wildcard '*' listeners
        handlers = handlers + self._listeners.get("*", [])

        for handler in handlers:
            try:
                handler(event)
            except Exception as e:
                logger.error(f"Error in event handler for {event.action}: {e}", exc_info=True)

    def get_history(self, limit: int = 50) -> List[SystemEvent]:
        """Return the most recent emitted events."""
        return self._history[-limit:]

# Global event bus singleton
event_bus = EventBus()
