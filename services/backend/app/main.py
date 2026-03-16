from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, transports, ai

app = FastAPI(
    title='SWISS-CONNECT API',
    description='Digitale B2B-Transportplattform für die Schweiz',
    version='1.0.0',
    docs_url='/docs',
    redoc_url='/redoc',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(auth.router, prefix='/api/v1/auth', tags=['Auth'])
app.include_router(transports.router, prefix='/api/v1/transports', tags=['Transports'])
app.include_router(ai.router, prefix='/api/v1/ai', tags=['AI'])

@app.get('/health', tags=['Health'])
async def health_check():
    return {'status': 'healthy'}

@app.get('/', tags=['Root'])
async def root():
    return {
        'name': 'SWISS-CONNECT API',
        'version': '1.0.0',
        'status': 'running',
        'docs': '/docs',
    }
