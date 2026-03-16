from sqlalchemy.orm import Session
from app.models.time_entry import TimeEntry
from app.schemas.time_entry import TimeEntryCreate


def list_time_entries(db: Session):
    return db.query(TimeEntry).order_by(TimeEntry.created_at.desc()).all()


def create_time_entry(db: Session, payload: TimeEntryCreate):
    item = TimeEntry(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
