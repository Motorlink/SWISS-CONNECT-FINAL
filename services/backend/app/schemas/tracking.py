from datetime import datetime
from pydantic import BaseModel

class TrackingEventCreate(BaseModel):
    transport_id: str
    status: str
    location: str
    latitude: float | None = None
    longitude: float | None = None

class TrackingEventResponse(TrackingEventCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
