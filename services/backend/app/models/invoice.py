import uuid
from datetime import datetime
from sqlalchemy import DateTime, Float, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Invoice(Base):
    __tablename__ = 'invoices'
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    transport_id: Mapped[str] = mapped_column(String, index=True)
    invoice_number: Mapped[str] = mapped_column(String, unique=True)
    amount_chf: Mapped[float] = mapped_column(Float, default=0)
    status: Mapped[str] = mapped_column(String, default='draft')
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
