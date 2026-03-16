from datetime import datetime
from pydantic import BaseModel

class DocumentCreate(BaseModel):
    transport_id: str
    filename: str
    document_type: str = 'other'
    storage_path: str

class DocumentResponse(DocumentCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
