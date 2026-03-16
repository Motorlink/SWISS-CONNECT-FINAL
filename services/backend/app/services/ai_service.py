from app.schemas.ai import InferenceResponse

DOMAIN_RULES = {
    'capabilities': ['transport', 'support', 'billing', 'document', 'customs'],
    'tracking': ['on_time', 'delayed', 'risk'],
    'export_customs': ['complete', 'missing_document', 'customs_risk'],
    'billing': ['invoice_ready', 'reminder_stage_1', 'payment_risk'],
    'contact': ['lead', 'support', 'complaint', 'dispatch_request'],
}

def infer(domain: str, entity_id: str, text: str) -> InferenceResponse:
    content = (text or '').lower()
    if domain == 'billing' and ('mahnung' in content or 'offen' in content):
        return InferenceResponse(domain=domain, entity_id=entity_id, prediction='payment_risk', confidence=0.86, explanation='Schlüsselwörter deuten auf offenen Posten oder Mahnprozess hin.')
    if domain == 'export_customs' and ('zoll' in content or 'export' in content or 'ausfuhr' in content):
        return InferenceResponse(domain=domain, entity_id=entity_id, prediction='missing_document', confidence=0.79, explanation='Export-/Zollbezug erkannt; Dokumentenvollständigkeit prüfen.')
    if domain == 'tracking' and ('verspät' in content or 'stau' in content):
        return InferenceResponse(domain=domain, entity_id=entity_id, prediction='delayed', confidence=0.83, explanation='Textsignal weist auf Verzögerung oder Verkehrsrisiko hin.')
    if domain == 'contact' and ('reklamation' in content or 'beschwerde' in content):
        return InferenceResponse(domain=domain, entity_id=entity_id, prediction='complaint', confidence=0.9, explanation='Reklamationssignal in Kontaktanfrage erkannt.')
    return InferenceResponse(domain=domain, entity_id=entity_id, prediction=DOMAIN_RULES.get(domain, ['unknown'])[0], confidence=0.62, explanation='Regelbasierte Basisklassifikation.')
