# Backend-Implementierungsstand: SWISS-CONNECT-FINAL

## Ziel der nächsten Umsetzungsetappe

Die nächste technische Etappe baut das Backend nicht mehr nur als Stub, sondern als fachlich konsistente Grundversion aus. Dafür werden folgende Bausteine umgesetzt:

| Bereich | Geplante Dateien |
|---|---|
| **Datenbankbasis** | `app/core/database.py`, `app/models/base.py` |
| **Fachmodelle** | `user.py`, `transport.py`, `document.py`, `invoice.py`, `tracking_event.py`, `time_entry.py` |
| **KI-Modelle** | `model_version.py`, `feedback_event.py`, `inference_log.py` |
| **Schemas** | `auth.py`, `user.py`, `transport.py`, `document.py`, `invoice.py`, `ai.py` |
| **Services** | `auth_service.py`, `transport_service.py`, `ai_service.py` |
| **API Router** | `auth.py`, `users.py`, `transports.py`, `documents.py`, `invoices.py`, `tracking.py`, `ai.py` |
| **App-Einstieg** | `app/main.py` mit Router-Registrierung |
| **Worker** | AI-Worker mit Heuristiken für Nachricht, Dokument, Preis und Feedback |

## Fachliche KI-Domänen

Die KI-Trainingslogik wird zunächst auf fünf Domänen ausgelegt:

| Domäne | Ursprung im Frontend | Zweck |
|---|---|---|
| **Capabilities** | Landing `Capabilities` | Vorgangs- und Prozessklassifikation |
| **Tracking** | Landing `Tracking` + Demo `Tracking` | ETA, Verzögerungs- und Risikoerkennung |
| **Export & Customs** | Landing `ExportCustoms` | Dokumentenpflichten und Vollständigkeitslogik |
| **Billing** | Landing `Billing` | Rechnungsempfehlung und Mahnlogik |
| **Contact / Support** | Landing `Contact` + Portal `Support` | Priorisierung, Routing und Entwurfserstellung |

## KI-Trainingszyklus im Code

| Stufe | Technische Repräsentation |
|---|---|
| **Inferenz** | `inference_log` speichert jede Vorhersage |
| **Feedback** | `feedback_event` speichert Bestätigung oder Korrektur |
| **Versionierung** | `model_version` beschreibt Modell, Datensatz und Status |
| **Freigabe** | Statuswechsel `training -> staging -> production` |

## Operative Anforderung

Die nächsten Schritte sollen unmittelbar als echte Dateien umgesetzt werden und nicht nur konzeptionell bleiben.
