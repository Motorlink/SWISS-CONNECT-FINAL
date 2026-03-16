# Local Development Runbook

Die lokale Entwicklung ist auf vier Teilanwendungen aufgeteilt: Backend, operatives Frontend, Demo und Landing Page.

## Schnellstart

| Schritt | Kommando |
|---|---|
| Abhängigkeiten Backend installieren | `pip3 install -r services/backend/requirements.txt` |
| Seed-Daten erzeugen | `./scripts/seed-backend.sh` |
| Alle Dienste lokal starten | `./scripts/start-all.sh` |

## Einzelstart

| Dienst | Startkommando |
|---|---|
| Backend | `cd services/backend && python3 -m uvicorn app.main:app --reload` |
| Frontend | `cd services/frontend && npm run dev` |
| Demo | `cd services/demo/client && npm run dev -- --host 0.0.0.0 --port 3001` |
| Landing | `cd services/landing && npm run dev -- --host 0.0.0.0 --port 3002` |

## Zielbild

Das operative Frontend soll die Backend-API nutzen, während Demo und Landing denselben fachlichen Kern in vertrieblicher und marketingnaher Form darstellen.
