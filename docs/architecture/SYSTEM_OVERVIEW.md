# SYSTEM OVERVIEW: SWISS-CONNECT-FINAL

SWISS-CONNECT-FINAL ist als digitale B2B-Transportplattform für die Schweiz aufgebaut. Das System verbindet eine operative Dispositionsoberfläche, eine vertriebsorientierte Demo, eine Landing Page sowie ein API-Backend mit dokumentierter KI-Unterstützung. Ziel des Systems ist die strukturierte Abwicklung von Transportaufträgen, Dokumenten, Abrechnung, Tracking, Zeiterfassung und Kundenkommunikation.

## 1. Fachliches Zielbild

| Domäne | Fachlicher Zweck | Technische Abbildung |
|---|---|---|
| **Transporte** | Erfassung, Disposition und Nachverfolgung von Aufträgen | `transports`-Router, `Transport`-Modell, Portal- und Demo-Oberflächen |
| **Dokumente** | Verwaltung von CMR, Rechnungen und Belegen | `documents`-Router, `Document`-Modell, DMS-nahe Struktur |
| **Abrechnung** | Faktura, Sammelrechnungen und Mahnlogik | `invoices`-Router, `Invoice`-Modell, Billing-Fachdomäne |
| **Tracking** | Status- und Standortereignisse je Auftrag | `tracking`-Router, `TrackingEvent`-Modell, Demo-Tracking |
| **Zeiterfassung** | Nachweis operativer Tätigkeiten | `time-entries`-Router, `TimeEntry`-Modell |
| **Benutzerverwaltung** | Rollen und Zugriff auf das Portal | `users`-Router, `User`-Modell, Authentifizierungsbasis |
| **KI-Unterstützung** | Assistenz für Klassifikation, Risikoerkennung und Feedback-Zyklen | `ai`-Router, `ModelVersion`, `FeedbackEvent`, `InferenceLog` |

## 2. Frontend-Struktur

Die Frontend-Seite ist in drei Anwendungsfälle aufgeteilt.

| Oberfläche | Pfad | Zweck |
|---|---|---|
| **Operatives Portal** | `services/frontend` | Tagesgeschäft für Disposition, Dokumente, Abrechnung, Support und Zeiterfassung |
| **Demo** | `services/demo` | Vertriebsnahe Simulation von Sendungen, Tracking und Proof-of-Delivery |
| **Landing Page** | `services/landing` | Produktkommunikation, Leistungsübersicht und Akquise |

Das operative Portal bildet die fachlichen Module des Backends ab. Die Demo übersetzt diese Module in eine visuell nachvollziehbare Story für Präsentationen und Vertrieb. Die Landing Page beschreibt dieselben Funktionsbereiche in einer marketingnahen Form und dient zugleich als Ausgangspunkt für die KI-Domänenbeschreibung.

## 3. Backend-Struktur

Das Backend basiert auf FastAPI und ist in eine klassische Struktur aus **Router**, **Schemas**, **Services**, **Core** und **Models** gegliedert.

| Schicht | Inhalt | Rolle |
|---|---|---|
| **Core** | `config.py`, `database.py`, `security.py` | Konfiguration, DB-Zugriff, Authentifizierung |
| **Models** | Benutzer, Transporte, Dokumente, Rechnungen, Tracking, Zeit, KI-Logs | Persistente Fachobjekte |
| **Schemas** | Pydantic-Modelle für Requests und Responses | API-Verträge |
| **Services** | Fachlogik je Domäne | Kapselung von Geschäftsregeln |
| **API** | Router unter `app/api/v1` | Öffentliche Schnittstellen |
| **Main** | `app/main.py` | App-Start, Router-Registrierung, Tabelleninitialisierung |

## 4. Datenfluss

Der Systemfluss ist fachlich aufeinander abgestimmt.

| Schritt | Ablauf |
|---|---|
| **1. Auftrag entsteht** | Ein Benutzer oder eine Schnittstelle erfasst einen Transport |
| **2. Operative Verarbeitung** | Dokumente, Tracking-Events, Zeiten und Rechnungen werden dem Auftrag zugeordnet |
| **3. KI-Unterstützung** | Inhalte werden domänenspezifisch klassifiziert oder bewertet |
| **4. Feedback** | Fachanwender korrigieren oder bestätigen Ergebnisse |
| **5. Lernhistorie** | Feedback und Inferenz werden gespeichert und in Modellversionen nachvollziehbar gemacht |

## 5. KI-Domänen und Trainingszyklen

Die KI ist nicht als autonomer Entscheider modelliert, sondern als Assistenzschicht für wiederkehrende fachliche Muster.

| KI-Domäne | Aufgabe | Eingaben | Ergebnis |
|---|---|---|---|
| **Capabilities** | Vorgänge fachlich einordnen | Nachrichten, Formulare, Texte | Kategorie- und Routing-Vorschläge |
| **Tracking** | Verzögerungen und Risiken erkennen | Statusmeldungen, Freitexte, Ereignisse | Warnungen und Risikoindikatoren |
| **Export & Customs** | Dokumentenlücken erkennen | Export-/Zolltexte und Dokumentdaten | Hinweis auf fehlende Unterlagen |
| **Billing** | Mahn- und Zahlungsrisiken erkennen | Rechnungstexte, offene Posten, Hinweise | Priorisierte Billing-Hinweise |
| **Contact** | Kontakte priorisieren und klassifizieren | Support- oder Lead-Nachrichten | Beschwerde-, Support- oder Lead-Klassifikation |

Der Trainingszyklus ist als kontrollierter Prozess aufgebaut: **Inferenz → Feedback → Datenaufnahme → Modellversion → Freigabe**. Jede Vorhersage kann in `InferenceLog` dokumentiert werden. Fachliche Korrekturen werden in `FeedbackEvent` festgehalten. Über `ModelVersion` wird nachvollzogen, welche Domäne mit welcher Version produktiv ist.

## 6. Projektverständnis in technischer Form

Das Projekt lässt sich fachlich als Plattform mit fünf Kernbewegungen verstehen: **annehmen**, **durchführen**, **dokumentieren**, **abrechnen** und **verbessern**. Transportaufträge sind der betriebliche Mittelpunkt. Dokumente, Tracking, Abrechnung und Zeitdaten hängen daran als Prozessebenen. Die KI ergänzt diese Prozesse, indem sie Klassifikationen, Warnungen und Priorisierungsvorschläge liefert. Dadurch wird das Projekt sowohl als operatives Portal als auch als ausbaufähige datengetriebene Plattform verständlich.

## 7. Aktueller Reifegrad

| Bereich | Bewertung |
|---|---|
| **Fachliches Zielbild** | klar erkennbar |
| **Frontend-Aufteilung** | nachvollziehbar angelegt |
| **Backend-Grundlogik** | deutlich ausgebaut, aber noch nicht vollständig produktionsreif |
| **Persistenzmodell** | vorhanden |
| **KI-Betriebsmodell** | vorhanden |
| **DevOps / CI** | teilweise vorhanden |

## 8. Nächste sinnvolle Ausbaustufe

Die nächste technische Ausbaustufe sollte auf vier Punkte konzentriert werden: vollständige Migrationen, Seed-Daten und Testdaten, saubere Response-Modelle mit Fehlerbehandlung sowie Integration realer Schnittstellen für Tracking, Dokumentenablage und Abrechnung.
