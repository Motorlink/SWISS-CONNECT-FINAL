from datetime import datetime
from pydantic import BaseModel

class TimeEntryCreate(BaseModel):
    user_id: str
    transport_id: str | None = None
    activity_type: str
    duration_minutes: int
    note: str = ''

class TimeEntryResponse(TimeEntryCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
