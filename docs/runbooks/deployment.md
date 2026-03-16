# Deployment Runbook

## Lokaler Start

```bash
docker-compose up --build
```

Danach sind die Dienste unter folgenden Ports erreichbar:

| Dienst | URL |
|---|---|
| Backend API | http://localhost:8000 |
| Frontend Portal | http://localhost:3000 |
| Demo | http://localhost:3001 |
| Landing Page | http://localhost:3002 |

## Validierung

Nach dem Start sind mindestens folgende Prüfungen durchzuführen:

1. `GET /health` des Backends muss `healthy` liefern.
2. Login-Endpoint unter `/api/v1/auth/login` muss Token zurückgeben.
3. AI-Endpunkte unter `/api/v1/ai/domains` und `/api/v1/ai/infer` müssen reagieren.
4. Landing Page und Demo müssen ohne Buildfehler starten.
