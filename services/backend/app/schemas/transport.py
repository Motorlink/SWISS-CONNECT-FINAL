from pydantic import BaseModel

class TransportCreate(BaseModel):
    reference: str
    origin_city: str
    destination_city: str
    goods_description: str
    pallets: int = 0
    weight_kg: float = 0
    price_chf: float = 0

class TransportResponse(TransportCreate):
    id: str
    status: str
