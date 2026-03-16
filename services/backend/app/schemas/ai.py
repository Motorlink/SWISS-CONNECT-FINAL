from pydantic import BaseModel

class FeedbackCreate(BaseModel):
    domain: str
    entity_id: str
    predicted_label: str
    corrected_label: str
    comment: str = ''

class InferenceResponse(BaseModel):
    domain: str
    entity_id: str
    prediction: str
    confidence: float
    explanation: str
