from fastapi import APIRouter, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.ai import FeedbackCreate
from app.services.ai_service import add_feedback, infer, list_feedback, list_model_versions

router = APIRouter()

class InferenceRequest(BaseModel):
    domain: str
    entity_id: str
    text: str

@router.get('/domains')
def get_domains():
    return {
        'domains': ['capabilities', 'tracking', 'export_customs', 'billing', 'contact']
    }

@router.get('/models')
def get_models(db: Session = Depends(get_db)):
    return list_model_versions(db)

@router.get('/feedback')
def get_feedback(db: Session = Depends(get_db)):
    return list_feedback(db)

@router.post('/feedback')
def post_feedback(payload: FeedbackCreate, db: Session = Depends(get_db)):
    return add_feedback(db, payload)

@router.post('/infer')
def post_inference(payload: InferenceRequest, db: Session = Depends(get_db)):
    return infer(db, payload.domain, payload.entity_id, payload.text)
