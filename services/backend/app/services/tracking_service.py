from sqlalchemy.orm import Session
from app.models.tracking_event import TrackingEvent
from app.schemas.tracking import TrackingEventCreate


def list_tracking_events(db: Session):
    return db.query(TrackingEvent).order_by(TrackingEvent.created_at.desc()).all()


def create_tracking_event(db: Session, payload: TrackingEventCreate):
    item = TrackingEvent(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
