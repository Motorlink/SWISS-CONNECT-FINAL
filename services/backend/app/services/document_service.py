from sqlalchemy.orm import Session
from app.models.document import Document
from app.schemas.document import DocumentCreate


def list_documents(db: Session):
    return db.query(Document).order_by(Document.created_at.desc()).all()


def create_document(db: Session, payload: DocumentCreate):
    item = Document(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
