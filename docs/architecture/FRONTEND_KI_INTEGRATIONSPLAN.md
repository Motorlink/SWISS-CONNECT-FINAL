# Frontend- und KI-Integrationsplan: SWISS-CONNECT

**Status:** in Arbeit

---

## 1. Zweck

Dieses Dokument dient als Arbeitsgrundlage für die Zusammenführung der drei Quellstände in `SWISS-CONNECT-FINAL` und für die fachliche Übersetzung der Landing-Page-Themen in konkrete KI-Domänen, Backend-Logik und Trainingszyklen.

## 2. Quellstände

| Quelle | Rolle | Ziel in SWISS-CONNECT-FINAL |
|---|---|---|
| `swiss-connect-27.12` | Operatives Portal (Next.js) | Produktives Hauptfrontend |
| `swiss-connect-demo-27.12` | Interaktive Demo mit Karten- und Tracking-Simulation | Vertriebs- und Showcase-Demo |
| `Landing-Page-Quellstand` | Landing Page mit thematischen Produktsektionen | Marketing-Frontend |

## 3. Landing-Themen als KI-Fachdomänen

Die thematischen Landing-Sektionen werden in konkrete KI-Fähigkeiten übersetzt.

| Landing-Sektion | Fachliche Domäne | KI-Funktion | Trainingsdaten | Zielmetrik |
|---|---|---|---|---|
| **Capabilities** | Prozessklassifikation | Erkennung von Geschäftsprozess-Typen und Prioritäten | Tickets, E-Mails, Aufträge, Labels | Accuracy / F1 |
| **Tracking** | ETA- und Ereignisprognose | Erkennung von Verzögerungen, Abweichungen und Anomalien | GPS-Events, Statuswechsel, Zeitfenster | Recall / ETA-MAE |
| **Export & Customs** | Dokumentenlogik / Compliance | Erkennung fehlender Zoll- oder Exportdokumente | Dokumente, Transportarten, Korrekturen | Precision / Fehlerrate |
| **Billing** | Rechnungs- und Mahnlogik | Empfehlung von Rechnungstyp, Mahnstufe, Risiko | Rechnungen, Zahlungshistorie, Freigaben | F1 / Business Accuracy |
| **Reference** | Vertriebswissen / Case Knowledge | Abruf passender Referenzfälle im Sales-Kontext | Referenztexte, Cases, Tags | Trefferquote |
| **Contact** | Kommunikationsassistenz | Klassifikation von Leads, Support, Reklamationen | Formulardaten, Chatnachrichten, manuelle Zuordnung | F1 / SLA-Treffer |

## 4. Geplante Umsetzung im Zielsystem

| Schicht | Umsetzung |
|---|---|
| **Landing** | Marketing-Kommunikation der Fachdomänen |
| **Demo** | Simulative Sichtbarmachung von Tracking, Sendungen, POD, Social Proof |
| **Frontend Portal** | Operative Nutzung durch Disposition, Support, DMS, Billing, Archiv |
| **Backend** | Persistenz, Fachregeln, API, Auth, Integrationen |
| **AI Worker** | Inferenz, Klassifikation, Empfehlung, Feedback-Verarbeitung |

## 5. KI-Trainingslogik je Domäne

### 5.1 Capabilities / Prozessklassifikation
Der Worker lernt eingehende Vorgänge in Kategorien wie `transport`, `support`, `billing`, `document`, `customs` und `complaint` einzuordnen. Trainiert wird auf bestätigten Vorgängen und korrigierten Zuordnungen.

### 5.2 Tracking
Aus Positionsdaten, Statusmustern und historischen Zeiten werden ETA-Schätzungen, Verspätungswarnungen und Risikoereignisse gelernt. Feedback entsteht durch tatsächliche Ankunftszeiten und manuelle Eskalationen.

### 5.3 Export & Customs
Dokumente und Auftragsarten werden darauf geprüft, ob Pflichtunterlagen fehlen. Trainingsdaten entstehen aus Dokumenten-Uploads, späteren Nachreichungen und manuellen Korrekturen im DMS.

### 5.4 Billing
Die KI unterstützt bei Sammelrechnungen, Mahnstufen und offenen Posten. Sie lernt aus fakturierten Aufträgen, Zahlungsfristen, Mahnläufen und bestätigten Korrekturen der Buchhaltung.

### 5.5 Contact
Kontaktanfragen werden klassifiziert und priorisiert. Zusätzlich kann das System Antwortentwürfe oder Routing-Empfehlungen erzeugen. Lernbasis sind bestätigte Kategorien, SLA-Ergebnisse und manuell bearbeitete Entwürfe.

## 6. Nächste technische Schritte

| Priorität | Arbeitspaket |
|---|---|
| **1** | Next.js-Frontend im Zielrepo vervollständigen und fehlende Seiten wieder einspielen |
| **2** | Demo-Projekt buildfähig bereinigen und Dokumentation ergänzen |
| **3** | Landing Page auf SWISS CONNECT Branding final bereinigen |
| **4** | Backend-Modelle, Router und Services für KI-Domänen umsetzen |
| **5** | Trainings- und Feedbackmodelle (`model_version`, `feedback_event`, `inference_log`) implementieren |
| **6** | Git-Historie und öffentliches Repository finalisieren |

---
