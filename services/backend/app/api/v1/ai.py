from fastapi import APIRouter
from pydantic import BaseModel
from app.schemas.ai import FeedbackCreate
from app.services.ai_service import infer

router = APIRouter()
FEEDBACK = []

class InferenceRequest(BaseModel):
    domain: str
    entity_id: str
    text: str

@router.post('/infer')
def run_inference(payload: InferenceRequest):
    return infer(payload.domain, payload.entity_id, payload.text)

@router.get('/domains')
def list_domains():
    return {
        'domains': [
            'capabilities',
            'tracking',
            'export_customs',
            'billing',
            'contact',
        ]
    }

@router.post('/feedback')
def add_feedback(payload: FeedbackCreate):
    item = payload.model_dump()
    FEEDBACK.append(item)
    return {'status': 'stored', 'item': item}
