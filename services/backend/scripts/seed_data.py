from app.core.database import SessionLocal, Base, engine
from app.models.user import User
from app.models.transport import Transport
from app.models.document import Document
from app.models.invoice import Invoice
from app.models.tracking_event import TrackingEvent
from app.models.time_entry import TimeEntry
from app.models.model_version import ModelVersion
from app.core.security import get_password_hash

Base.metadata.create_all(bind=engine)
db = SessionLocal()
if db.query(User).count() == 0:
    admin = User(email='admin@swiss-connect.ch', hashed_password=get_password_hash('admin123'), first_name='Anna', last_name='Dispo', role='admin')
    dispatcher = User(email='ops@swiss-connect.ch', hashed_password=get_password_hash('ops123'), first_name='Marco', last_name='Leitner', role='dispatcher')
    db.add_all([admin, dispatcher])
    db.commit()
if db.query(Transport).count() == 0:
    t1 = Transport(reference='SC-2026-0001', status='in_progress', origin_city='Zug', destination_city='Basel', goods_description='Medizintechnik', pallets=8, weight_kg=1450, price_chf=1280, price_recommended=1280)
    t2 = Transport(reference='SC-2026-0002', status='pending', origin_city='Bern', destination_city='Zürich', goods_description='Laborequipment', pallets=4, weight_kg=620, price_chf=0, price_recommended=351)
    db.add_all([t1, t2])
    db.commit()
    db.refresh(t1)
    db.refresh(t2)
    db.add_all([
        Document(transport_id=t1.id, filename='cmr_sc_2026_0001.pdf', document_type='cmr', storage_path='/docs/cmr_sc_2026_0001.pdf'),
        Invoice(transport_id=t1.id, invoice_number='INV-2026-1001', amount_chf=1280, status='sent'),
        TrackingEvent(transport_id=t1.id, status='departed', location='Zug', latitude=47.1662, longitude=8.5155),
        TimeEntry(user_id=admin.id, transport_id=t1.id, activity_type='dispatch', duration_minutes=35, note='Tour geplant und Fahrer bestätigt'),
    ])
    for domain in ['capabilities','tracking','export_customs','billing','contact']:
        db.add(ModelVersion(domain=domain, version='1.0.0', status='production', dataset_size=25))
    db.commit()
print('Seed-Daten erfolgreich erstellt.')
