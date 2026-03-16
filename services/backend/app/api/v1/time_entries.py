from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.time_entry import TimeEntryCreate
from app.services.time_service import create_time_entry, list_time_entries

router = APIRouter()

@router.get('')
def get_time_entries(db: Session = Depends(get_db)):
    return list_time_entries(db)

@router.post('')
def post_time_entry(payload: TimeEntryCreate, db: Session = Depends(get_db)):
    return create_time_entry(db, payload)
