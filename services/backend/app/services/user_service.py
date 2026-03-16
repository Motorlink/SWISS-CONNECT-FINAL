from sqlalchemy.orm import Session
from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import get_password_hash


def list_users(db: Session):
    return db.query(User).order_by(User.created_at.desc()).all()


def create_user(db: Session, payload: UserCreate):
    user = User(
        email=payload.email,
        hashed_password=get_password_hash(payload.password),
        first_name=payload.first_name,
        last_name=payload.last_name,
        role=payload.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
