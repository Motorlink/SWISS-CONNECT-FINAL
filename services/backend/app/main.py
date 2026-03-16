from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import ai, auth, documents, invoices, time_entries, tracking, transports, users
from app.core.config import get_settings
from app.core.database import Base, engine
from app.models.document import Document
from app.models.feedback_event import FeedbackEvent
from app.models.inference_log import InferenceLog
from app.models.invoice import Invoice
from app.models.model_version import ModelVersion
from app.models.time_entry import TimeEntry
from app.models.tracking_event import TrackingEvent
from app.models.transport import Transport
from app.models.user import User

settings = get_settings()
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title='SWISS-CONNECT API',
    description='Digitale B2B-Transportplattform für die Schweiz',
    version='1.1.0',
    docs_url='/docs',
    redoc_url='/redoc',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[origin.strip() for origin in settings.cors_origins.split(',') if origin.strip()],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api/v1/auth', tags=['Auth'])
app.include_router(users.router, prefix='/api/v1/users', tags=['Users'])
app.include_router(transports.router, prefix='/api/v1/transports', tags=['Transports'])
app.include_router(documents.router, prefix='/api/v1/documents', tags=['Documents'])
app.include_router(invoices.router, prefix='/api/v1/invoices', tags=['Invoices'])
app.include_router(tracking.router, prefix='/api/v1/tracking', tags=['Tracking'])
app.include_router(time_entries.router, prefix='/api/v1/time-entries', tags=['Time'])
app.include_router(ai.router, prefix='/api/v1/ai', tags=['AI'])

@app.get('/health', tags=['Health'])
async def health_check():
    return {'status': 'healthy', 'environment': settings.environment}

@app.get('/', tags=['Root'])
async def root():
    return {
        'name': settings.app_name,
        'version': '1.1.0',
        'status': 'running',
        'docs': '/docs',
        'modules': ['auth', 'users', 'transports', 'documents', 'invoices', 'tracking', 'time', 'ai'],
    }
