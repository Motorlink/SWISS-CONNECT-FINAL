# SWISS-CONNECT-FINAL

SWISS-CONNECT-FINAL ist ein konsolidierter Projektstand für eine digitale B2B-Transportplattform mit drei klar getrennten Oberflächen: einem operativen Portal, einer interaktiven Demo und einer Landing Page. Ergänzt wird dieser Stand durch ein FastAPI-Backend, eine dokumentierte KI-Betriebslogik sowie Infrastruktur- und Runbook-Dateien für die technische Übergabe.

## Projektstruktur

| Bereich | Zweck |
|---|---|
| `services/frontend` | Operatives Portal auf Basis von Next.js |
| `services/demo` | Vertriebsnahe Demo mit Tracking- und Sendungssimulation |
| `services/landing` | Marketing-Landing-Page für Produkt- und Leistungsdarstellung |
| `services/backend` | API, Authentifizierung, Transport- und KI-Endpunkte |
| `docs` | Architektur, Datenmodell, Betriebs- und Übergabedokumentation |
| `.github/workflows` | CI-Grundlagen für Backend und Frontend |
| `docker-compose.yml` | Lokaler Start der Kernservices |

## Technischer Schwerpunkt

Das Repository enthält eine fachlich strukturierte Grundlage für Transportabwicklung, Dokumente, Billing, Tracking und Support. Zusätzlich ist eine KI-Schicht beschrieben und teilweise umgesetzt. Diese Schicht arbeitet als Assistenzsystem für Klassifikation, Risikoerkennung, Dokumentenvollständigkeit und Billing-Hinweise.

## Lokaler Start

```bash
docker-compose up --build
```

Danach stehen die vorgesehenen Dienste lokal auf den Ports 8000, 3000, 3001 und 3002 zur Verfügung. Weitere Details befinden sich in `docs/runbooks/deployment.md` sowie in den Architekturunterlagen unter `docs/architecture`.

## Übergabestatus

Der aktuelle Umsetzungsstand ist in `STATUS.md` dokumentiert.
