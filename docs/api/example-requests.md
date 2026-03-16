# API Example Requests

Dieses Dokument enthält Beispielaufrufe für die wichtigsten Endpunkte des Backends.

## Health Check

```bash
curl http://localhost:8000/health
```

## Login

```bash
curl -X POST http://localhost:8000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@swiss-connect.ch",
    "password": "admin123"
  }'
```

## Benutzer anlegen

```bash
curl -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dispo2@swiss-connect.ch",
    "password": "secret123",
    "first_name": "Laura",
    "last_name": "Keller",
    "role": "dispatcher"
  }'
```

## Transport anlegen

```bash
curl -X POST http://localhost:8000/api/v1/transports \
  -H "Content-Type: application/json" \
  -d '{
    "reference": "SC-2026-0099",
    "origin_city": "Bern",
    "destination_city": "Genf",
    "goods_description": "Laborware",
    "pallets": 5,
    "weight_kg": 900,
    "price_chf": 0
  }'
```

## KI-Inferenz

```bash
curl -X POST http://localhost:8000/api/v1/ai/infer \
  -H "Content-Type: application/json" \
  -d '{
    "domain": "billing",
    "entity_id": "INV-2026-1001",
    "text": "Kunde meldet offene Rechnung und erste Mahnung"
  }'
```
