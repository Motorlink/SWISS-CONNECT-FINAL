from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.tracking import TrackingEventCreate
from app.services.tracking_service import create_tracking_event, list_tracking_events

router = APIRouter()

@router.get('')
def get_tracking_events(db: Session = Depends(get_db)):
    return list_tracking_events(db)

@router.post('')
def post_tracking_event(payload: TrackingEventCreate, db: Session = Depends(get_db)):
    return create_tracking_event(db, payload)
