from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.transport import TransportCreate
from app.services.transport_service import create_transport, list_transports

router = APIRouter()

@router.get('')
def get_transports(db: Session = Depends(get_db)):
    return list_transports(db)

@router.post('')
def post_transport(payload: TransportCreate, db: Session = Depends(get_db)):
    return create_transport(db, payload)
