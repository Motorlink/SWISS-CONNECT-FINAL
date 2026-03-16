from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.document import DocumentCreate
from app.services.document_service import create_document, list_documents

router = APIRouter()

@router.get('')
def get_documents(db: Session = Depends(get_db)):
    return list_documents(db)

@router.post('')
def post_document(payload: DocumentCreate, db: Session = Depends(get_db)):
    return create_document(db, payload)
