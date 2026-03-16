from fastapi import APIRouter
from app.schemas.transport import TransportCreate

router = APIRouter()
TRANSPORTS = []

@router.get('')
def list_transports():
    return TRANSPORTS

@router.post('')
def create_transport(payload: TransportCreate):
    item = payload.model_dump()
    item['id'] = f'TR-{len(TRANSPORTS)+1:04d}'
    item['status'] = 'pending'
    TRANSPORTS.append(item)
    return item
