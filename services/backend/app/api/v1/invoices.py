from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.invoice import InvoiceCreate
from app.services.invoice_service import create_invoice, list_invoices

router = APIRouter()

@router.get('')
def get_invoices(db: Session = Depends(get_db)):
    return list_invoices(db)

@router.post('')
def post_invoice(payload: InvoiceCreate, db: Session = Depends(get_db)):
    return create_invoice(db, payload)
