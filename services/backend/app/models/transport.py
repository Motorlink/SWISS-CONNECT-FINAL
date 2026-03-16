import uuid
from datetime import datetime
from sqlalchemy import DateTime, Float, Integer, String
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Transport(Base):
    __tablename__ = 'transports'
    id: Mapped[str] = mapped_column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    reference: Mapped[str] = mapped_column(String, unique=True, index=True)
    status: Mapped[str] = mapped_column(String, default='pending')
    origin_city: Mapped[str] = mapped_column(String)
    destination_city: Mapped[str] = mapped_column(String)
    goods_description: Mapped[str] = mapped_column(String)
    pallets: Mapped[int] = mapped_column(Integer, default=0)
    weight_kg: Mapped[float] = mapped_column(Float, default=0)
    price_chf: Mapped[float] = mapped_column(Float, default=0)
    price_recommended: Mapped[float] = mapped_column(Float, default=0)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)
