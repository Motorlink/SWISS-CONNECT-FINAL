from datetime import datetime
from pydantic import BaseModel

class InvoiceCreate(BaseModel):
    transport_id: str
    invoice_number: str
    amount_chf: float
    status: str = 'draft'

class InvoiceResponse(InvoiceCreate):
    id: str
    created_at: datetime

    class Config:
        from_attributes = True
