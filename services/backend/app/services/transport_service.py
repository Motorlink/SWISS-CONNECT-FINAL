from sqlalchemy.orm import Session
from app.models.transport import Transport
from app.schemas.transport import TransportCreate


def list_transports(db: Session):
    return db.query(Transport).order_by(Transport.created_at.desc()).all()


def create_transport(db: Session, payload: TransportCreate):
    recommended = payload.price_chf if payload.price_chf > 0 else max(120.0, payload.weight_kg * 0.45 + payload.pallets * 18)
    item = Transport(
        reference=payload.reference,
        origin_city=payload.origin_city,
        destination_city=payload.destination_city,
        goods_description=payload.goods_description,
        pallets=payload.pallets,
        weight_kg=payload.weight_kg,
        price_chf=payload.price_chf,
        price_recommended=recommended,
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
