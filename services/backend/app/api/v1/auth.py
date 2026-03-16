from fastapi import APIRouter, HTTPException
from app.core.security import create_access_token, get_password_hash, verify_password
from app.schemas.auth import LoginRequest, TokenResponse

router = APIRouter()
FAKE_USER = {
    'email': 'admin@swiss-connect.ch',
    'hashed_password': get_password_hash('admin123'),
    'id': 'admin-1',
    'role': 'admin',
}

@router.post('/login', response_model=TokenResponse)
def login(payload: LoginRequest):
    if payload.email != FAKE_USER['email'] or not verify_password(payload.password, FAKE_USER['hashed_password']):
        raise HTTPException(status_code=401, detail='Ungültige Zugangsdaten')
    token = create_access_token({'sub': FAKE_USER['id'], 'role': FAKE_USER['role']})
    return TokenResponse(access_token=token)
