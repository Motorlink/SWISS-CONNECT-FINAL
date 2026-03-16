from sqlalchemy.orm import Session
from app.models.feedback_event import FeedbackEvent
from app.models.inference_log import InferenceLog
from app.models.model_version import ModelVersion
from app.schemas.ai import FeedbackCreate, InferenceResponse

DOMAIN_RULES = {
    'capabilities': ['transport', 'support', 'billing', 'document', 'customs'],
    'tracking': ['on_time', 'delayed', 'risk'],
    'export_customs': ['complete', 'missing_document', 'customs_risk'],
    'billing': ['invoice_ready', 'reminder_stage_1', 'payment_risk'],
    'contact': ['lead', 'support', 'complaint', 'dispatch_request'],
}


def ensure_default_models(db: Session):
    existing = db.query(ModelVersion).count()
    if existing == 0:
        for domain in DOMAIN_RULES:
            db.add(ModelVersion(domain=domain, version='1.0.0', status='production', dataset_size=0))
        db.commit()


def list_model_versions(db: Session):
    ensure_default_models(db)
    return db.query(ModelVersion).order_by(ModelVersion.domain.asc()).all()


def list_feedback(db: Session):
    return db.query(FeedbackEvent).order_by(FeedbackEvent.created_at.desc()).all()


def add_feedback(db: Session, payload: FeedbackCreate):
    item = FeedbackEvent(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


def infer(db: Session, domain: str, entity_id: str, text: str) -> InferenceResponse:
    ensure_default_models(db)
    content = (text or '').lower()
    if domain == 'billing' and ('mahnung' in content or 'offen' in content):
        prediction, confidence, explanation = 'payment_risk', 0.86, 'Schlüsselwörter deuten auf offenen Posten oder Mahnprozess hin.'
    elif domain == 'export_customs' and ('zoll' in content or 'export' in content or 'ausfuhr' in content):
        prediction, confidence, explanation = 'missing_document', 0.79, 'Export-/Zollbezug erkannt; Dokumentenvollständigkeit prüfen.'
    elif domain == 'tracking' and ('verspät' in content or 'stau' in content):
        prediction, confidence, explanation = 'delayed', 0.83, 'Textsignal weist auf Verzögerung oder Verkehrsrisiko hin.'
    elif domain == 'contact' and ('reklamation' in content or 'beschwerde' in content):
        prediction, confidence, explanation = 'complaint', 0.90, 'Reklamationssignal in Kontaktanfrage erkannt.'
    else:
        prediction, confidence, explanation = DOMAIN_RULES.get(domain, ['unknown'])[0], 0.62, 'Regelbasierte Basisklassifikation.'
    current_model = db.query(ModelVersion).filter(ModelVersion.domain == domain).order_by(ModelVersion.created_at.desc()).first()
    model_version = current_model.version if current_model else '1.0.0'
    log = InferenceLog(domain=domain, entity_id=entity_id, model_version=model_version, prediction=prediction, confidence=confidence, explanation=explanation)
    db.add(log)
    db.commit()
    return InferenceResponse(domain=domain, entity_id=entity_id, prediction=prediction, confidence=confidence, explanation=explanation)
