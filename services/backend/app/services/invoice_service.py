from sqlalchemy.orm import Session
from app.models.invoice import Invoice
from app.schemas.invoice import InvoiceCreate


def list_invoices(db: Session):
    return db.query(Invoice).order_by(Invoice.created_at.desc()).all()


def create_invoice(db: Session, payload: InvoiceCreate):
    item = Invoice(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
