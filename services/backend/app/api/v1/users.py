from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.schemas.user import UserCreate
from app.services.user_service import create_user, list_users

router = APIRouter()

@router.get('')
def get_users(db: Session = Depends(get_db)):
    return list_users(db)

@router.post('')
def post_user(payload: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, payload)
