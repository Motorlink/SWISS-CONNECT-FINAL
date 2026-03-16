# Technisches Systemkonzept: SWISS-CONNECT

**Version:** 1.0  
**Stand:** 27.12.2025  
**Autor:** IT-Konzept / Systemarchitektur

---

## 1. Zielbild des Systems

SWISS-CONNECT ist als modulare, digitale B2B-Transportplattform für die Schweiz konzipiert. Aus den vorliegenden Repositories lässt sich ein klares Zielbild ableiten: Das System soll Transporte nicht nur verwalten, sondern operativ in Echtzeit steuern, dokumentieren, archivieren und abrechnen. Der fachliche Kern ist dabei kein klassisches Tabellen-TMS, sondern eine **kartenbasierte Dispositions- und Ausführungsplattform** mit einer durchgängigen digitalen Prozesskette von der Auftragserstellung bis zur Zustellbestätigung.

Technisch ergibt sich daraus ein System mit vier Hauptschichten.

| Ebene | Aufgabe | Technische Ausprägung |
|------|---------|-----------------------|
| **Präsentation** | Bedienoberflächen für Auftraggeber, Disponenten, Fahrer und Management | Next.js Portal, Demo-App, Landing Page |
| **Applikation** | Geschäftslogik, Authentifizierung, Workflows, API | FastAPI Backend |
| **Daten & Verarbeitung** | Persistenz, Events, Dokumente, asynchrone Verarbeitung | PostgreSQL, Redis, MinIO, Celery |
| **KI-Schicht** | Klassifikation, Preisempfehlung, Dokumentenlogik, Assistenz | AI-Worker, Modelle, Trainings- und Bewertungszyklen |

Das Zielsystem ist so aufgebaut, dass es zunächst mit deterministischen Fachregeln und strukturierten Workflows produktiv arbeiten kann, während KI-Funktionen schrittweise zugeschaltet und mit realen Betriebsdaten verfeinert werden.

---

## 2. Fachliche Gesamtstruktur

Aus den vorhandenen Artefakten ergeben sich die folgenden fachlichen Kernmodule:

| Modul | Fachliche Funktion | Systemische Verantwortung |
|------|--------------------|---------------------------|
| **Transport Core** | Erstellung, Annahme, Durchführung und Abschluss von Transporten | Transportstatus, Referenzen, Fahrerdaten, Preisbasis |
| **Tracking** | Positions- und Statusverfolgung in Echtzeit | GPS-Events, Kartenansicht, Zustandswechsel |
| **DMS** | Dokumentenzuordnung und Dokumentenhistorie | CMR, POD, Rechnungen, Uploads, E-Mail-Inbound |
| **Billing** | Rechnungen und Gutschriften | Faktura, Status, externe Buchhaltungsschnittstellen |
| **Time** | Zeiterfassung von Fahrern und Backoffice | Timer, Tätigkeiten, Transportbezug |
| **Support / Communication** | Kommunikation mit Kunden und Fahrern | Nachrichten, Transkripte, Textbausteine, Eskalationen |
| **AI Services** | Assistenz- und Analysefunktionen | Klassifikation, Vorschläge, Erkennung, Priorisierung |

Die modulare Trennung ist fachlich sinnvoll, weil dadurch der operative Kern stabil bleibt, während Hilfsfunktionen wie Preisoptimierung, Dokumentenklassifikation oder Kommunikationsautomatisierung separat entwickelt und skaliert werden können.

---

## 3. Frontend-Konzept

Das Frontend ist in der Zielarchitektur nicht als eine einzelne Oberfläche zu verstehen, sondern als **drei komplementäre Frontend-Typen**.

### 3.1 Operatives Portal

Das Portal ist die Hauptarbeitsoberfläche für Disponenten, Auftraggeber und Backoffice. Die vorhandene Next.js-Struktur zeigt bereits die richtigen Bereiche: Dashboard, neue Transporte, Auftragsliste, Tracking, Archiv, Billing, Dokumente, Zeiterfassung und Support. Fachlich sollte dieses Portal rollenbasiert aufgesetzt werden.

| Rolle | Primäre Sicht | Typische Aktionen |
|------|---------------|------------------|
| **Admin** | Systemweite Übersicht | Benutzer, Rollen, Konfiguration, Audit |
| **Dispatcher** | Karte + aktive Transporte | Aufträge erstellen, Fahrer zuweisen, Eskalationen steuern |
| **Customer** | Eigene Transporte und Dokumente | Auftrag erstellen, Status prüfen, Dokumente laden |
| **Driver** | Mobile Transportansicht | Auftrag annehmen, Status wechseln, POD hochladen |
| **Accounting** | Billing und Export | Rechnungen prüfen, Mahnungen, ERP-Schnittstellen |

Technisch sollte das Frontend folgende Struktur verwenden:

| Bereich | Verantwortlichkeit |
|--------|--------------------|
| `src/app` | Routing und Page-Komposition |
| `src/components` | Wiederverwendbare UI-Komponenten |
| `src/modules` | Fachmodule wie transport, billing, documents, tracking |
| `src/lib` | API-Client, Utilities, Formatter |
| `src/store` | Globaler Zustand, z. B. Session, Filter, Live-Daten |
| `src/types` | Gemeinsame Typen und DTO-Mappings |

Wesentlich ist, dass das Frontend nicht direkt gegen Datenbanklogik arbeitet, sondern ausschließlich gegen versionierte Backend-APIs. Für Realtime-Daten wie Standortupdates oder Statusänderungen sollte zusätzlich ein WebSocket-Kanal oder ein serverseitiger Event-Mechanismus vorgesehen werden.

### 3.2 Demo-Anwendung

Die Demo-App aus dem vorhandenen Repository ist fachlich sinnvoll, sollte aber als **eigenständige Showcase-Anwendung** verstanden werden. Sie dient Vertrieb, Präsentation und Investorengesprächen. Ihr Zweck ist nicht Datenkonsistenz, sondern Erklärbarkeit.

Diese Anwendung sollte in der finalen Struktur bewusst separat gehalten werden:

| Eigenschaft | Bewertung |
|------------|-----------|
| **Zweck** | Vertrieb, Präsentation, visuelle Produktdemonstration |
| **Datenbasis** | Mock-Daten / Szenario-Daten |
| **Risiko** | Darf keinen produktiven Datenzugriff benötigen |
| **Nutzen** | Schnelle Produktkommunikation ohne Produktivabhängigkeit |

### 3.3 Landing Page

Die Landing Page ist ein Marketing- und Vertriebswerkzeug. Die in der ZIP enthaltene Seite ist dafür eine gute Grundlage. Technisch sollte sie bewusst unabhängig von der Kernanwendung bleiben, damit Marketing-Inhalte, Kampagnen und Texte schnell angepasst werden können, ohne das operative Portal zu destabilisieren.

---

## 4. Backend-Konzept

Das Backend bildet die fachliche Steuerzentrale. Die FastAPI-Struktur aus dem Hauptrepository ist aktuell nur als Grundgerüst vorhanden, lässt sich aber eindeutig zu einer sauberen Zielarchitektur weiterentwickeln.

### 4.1 Verantwortlichkeiten des Backends

| Verantwortlichkeit | Beschreibung |
|-------------------|--------------|
| **Auth & Identity** | Login, Rollen, JWT, Session-Validierung |
| **Transport Management** | CRUD, Statuslogik, Zuweisung, Archivierung |
| **Tracking API** | Speicherung und Ausgabe von Standort- und Statusereignissen |
| **Document API** | Upload, Klassifikation, Zuordnung, Metadaten |
| **Billing API** | Rechnungen, Gutschriften, Exporte |
| **Time API** | Arbeitszeiten, Start/Stop, Zuordnung |
| **Support API** | Kommunikationsverläufe, Vorlagen, Eskalationen |
| **AI Orchestration** | Triggern, Versionieren, Speichern von KI-Ergebnissen |

### 4.2 Empfohlene Backend-Struktur

| Verzeichnis | Inhalt |
|------------|--------|
| `app/api/v1` | Versionierte Router pro Domäne |
| `app/models` | SQLAlchemy-Modelle |
| `app/schemas` | Pydantic Request-/Response-Schemas |
| `app/services` | Fachlogik und Serviceklassen |
| `app/core` | Konfiguration, Sicherheit, Datenbank, Logging |
| `app/tasks` | Asynchrone Task-Definitionen |
| `app/integrations` | Swiss21, Bexio, Superchat, Mail, OCR |

### 4.3 Fachregeln vor KI

Ein wesentlicher Architekturgrundsatz besteht darin, dass **produktive Entscheidungen zuerst fachregelbasiert** abgebildet werden. Die KI ergänzt diese Regeln, ersetzt sie aber nicht. Beispielsweise darf eine Preisempfehlung KI-gestützt erzeugt werden; die faktische Preisfreigabe bleibt jedoch ein nachvollziehbarer Fachprozess. Ebenso darf eine Dokumentenklassifikation vorgeschlagen werden, die finale Validierung muss aber regel- oder benutzergesteuert protokollierbar bleiben.

---

## 5. Daten- und Event-Architektur

Das System benötigt zwei Datenarten: transaktionale Kerndaten und ereignisbasierte Verlaufsdaten.

| Datenart | Speicher | Beispiele |
|---------|----------|-----------|
| **Transaktionale Daten** | PostgreSQL | Benutzer, Transporte, Rechnungen, Zeitbuchungen |
| **Dokumente / Binärdaten** | MinIO | CMR, POD, PDFs, Bilder, Anhänge |
| **Kurzfristige Events / Queue** | Redis | Celery-Jobs, temporäre Statusereignisse, Notifications |
| **Langfristige Lern- und Bewertungsdaten** | PostgreSQL + Data-Lake-Struktur | Label-Historien, Modellbewertungen, Korrekturen |

Für die KI ist besonders wichtig, dass nicht nur der aktuelle Zustand gespeichert wird, sondern auch der **Verlauf der Entscheidungen**. Nur dadurch kann später nachvollzogen werden, warum das System eine Empfehlung gegeben hat und ob diese Empfehlung korrekt war.

---

## 6. KI-Zielbild für SWISS-CONNECT

Die KI ist im System fachlich kein autonomer Entscheider, sondern ein **operativer Assistenz- und Analyse-Layer**. Aus den Repositories ergeben sich vier sinnvolle KI-Arbeitsfelder.

| KI-Feld | Ziel | Ergebnis |
|--------|------|----------|
| **Dokumentenverständnis** | Dokumente erkennen, strukturieren und zuordnen | Dokumenttyp, Referenz, Vollständigkeit |
| **Kommunikationsassistenz** | Nachrichten klassifizieren und Antwortentwürfe erzeugen | Kategorie, Priorität, Vorschlag |
| **Preis- und Margenanalyse** | Preisempfehlungen für Transporte liefern | Empfehlung mit Confidence und Begründungsfaktoren |
| **Operative Intelligenz** | Muster im Tagesgeschäft erkennen | Risiken, Verzögerungen, fehlende Unterlagen, Eskalationen |

Die KI-Schicht sollte technisch aus mehreren spezialisierten Teilkomponenten bestehen, nicht aus einem einzigen "großen" Modell.

### 6.1 KI-Bausteine

| Baustein | Aufgabe | Typ |
|---------|--------|-----|
| **Classifier Service** | Klassifikation von Dokumenten und Nachrichten | Supervised Modell |
| **Extraction Service** | Extraktion strukturierter Felder aus Dokumenten | OCR + Information Extraction |
| **Recommendation Service** | Preisvorschläge, Priorisierung, Eskalationshinweise | Ranking / Regressionsmodell |
| **Knowledge Service** | Abruf von Prozesswissen und Regeln | Retrieval / Wissensbasis |
| **Feedback Service** | Speichern menschlicher Korrekturen | Lern- und Bewertungsdienst |

---

## 7. Trainingszyklen der KI

Der Benutzerwunsch nach Trainingszyklen lässt sich fachlich sauber als **mehrstufiger Lernprozess** formulieren. Entscheidend ist dabei, dass nicht jedes neue Datum sofort in produktive Modelle zurückgeschrieben wird. Stattdessen braucht es einen geregelten Zyklus.

### 7.1 Trainingszyklus auf hoher Ebene

| Zyklus | Frequenz | Zweck |
|-------|----------|-------|
| **Inferenz-Zyklus** | Echtzeit | Modell liefert Vorhersagen im Tagesgeschäft |
| **Feedback-Zyklus** | Laufend / stündlich | Menschliche Korrekturen und Bestätigungen sammeln |
| **Validierungs-Zyklus** | Täglich | Neue Daten prüfen, labeln, bereinigen |
| **Trainings-Zyklus** | Wöchentlich oder zweiwöchentlich | Modelle auf erweitertem Datensatz neu trainieren |
| **Release-Zyklus** | Nach Freigabe | Neues Modell produktiv schalten |
| **Review-Zyklus** | Monatlich | Leistungsanalyse, Drift, Fachfeedback, Governance |

### 7.2 Detailfluss eines Lernzyklus

1. Die KI liefert im produktiven Prozess ein Ergebnis, beispielsweise `Dokument = POD`, `Confidence = 0.82`.
2. Ein Benutzer bestätigt oder korrigiert das Ergebnis.
3. Diese Rückmeldung wird nicht überschrieben, sondern als **Feedback-Ereignis** gespeichert.
4. Ein Validierungsjob prüft, ob das Feedback konsistent, vollständig und freigabefähig ist.
5. Nur validierte Feedbacks werden in den Trainingsdatensatz aufgenommen.
6. Ein neuer Trainingslauf erzeugt eine neue Modellversion.
7. Die neue Modellversion wird gegen die letzte produktive Version getestet.
8. Erst bei besserer oder mindestens stabiler Qualität erfolgt die Freigabe.

### 7.3 Trainingspipeline

| Stufe | Inhalt | Ergebnis |
|------|--------|----------|
| **Raw Input** | Dokumente, Nachrichten, Tracking, Rechnungen, Korrekturen | Rohdaten |
| **Preprocessing** | Bereinigung, Anonymisierung, Normalisierung | Trainingsfähige Features |
| **Labeling** | Menschlich bestätigt oder regelbasiert verifiziert | Labels |
| **Split** | Train / Validation / Test | Vergleichbare Datensätze |
| **Training** | Modelltraining pro Teilaufgabe | Modellartefakt |
| **Evaluation** | Precision, Recall, F1, Business KPIs | Bewertungsbericht |
| **Staging** | Shadow Mode / Testbetrieb | Freigabeentscheidung |
| **Production** | Deployment produktiver Modellversion | Modell aktiv |

---

## 8. Was die KI gelernt hat

Die Formulierung „was sie gelernt hat“ sollte in einem professionellen System **nicht narrativ, sondern messbar und versionsbezogen** abgebildet werden. Dazu braucht SWISS-CONNECT ein eigenes Lernprotokoll.

### 8.1 Lernprotokoll je Modellversion

| Feld | Beschreibung |
|------|-------------|
| **Model Version** | Eindeutige Versionsnummer |
| **Trainingszeitraum** | Auf welchen Daten trainiert wurde |
| **Datensatzgröße** | Anzahl Beispiele pro Klasse |
| **Neue Fähigkeiten** | Welche neuen Klassen / Muster erkannt werden |
| **Verbesserte Kennzahlen** | z. B. F1 von 0.81 auf 0.88 |
| **Bekannte Schwächen** | Unsichere Klassen, Randfälle |
| **Freigabestatus** | Staging, Freigegeben, Rollback |

### 8.2 Fachliche Formulierung des Gelernten

Beispiele für professionell dokumentierte Lernfortschritte:

| Bereich | Formulierung |
|--------|--------------|
| **Dokumente** | Das Modell erkennt POD-, CMR- und Rechnungsdokumente zuverlässiger und trennt Mischfälle besser voneinander. |
| **Kommunikation** | Das Modell priorisiert Support-Nachrichten zuverlässiger nach Dringlichkeit und unterscheidet operative Rückfragen von Reklamationen. |
| **Preislogik** | Das Modell bewertet Strecken, Gewichte und Zeitfenster präziser und liefert stabilere Preisempfehlungen. |
| **Qualität** | Das Modell reduziert Fehlklassifikationen bei ähnlich aufgebauten Dokumenten und steigert die Trefferquote bei Referenzextraktion. |

Wichtig ist: Das System sollte niemals behaupten, es habe „verstanden“ oder „gedacht“, sondern sauber dokumentieren, welche **Erkennungsleistung**, **Trefferquote** oder **Fachklassifikation** verbessert wurde.

---

## 9. Governance und Sicherheit der KI

Ein produktiver KI-Betrieb im Transportumfeld braucht klare Grenzen.

| Bereich | Grundsatz |
|--------|-----------|
| **Entscheidungen** | KI gibt Empfehlungen, keine unkontrollierten Freigaben |
| **Nachvollziehbarkeit** | Jede KI-Ausgabe ist versioniert und einem Modell zugeordnet |
| **Feedback** | Benutzerkorrekturen sind protokolliert |
| **Datenschutz** | Trainingsdaten werden bereinigt, sensible Inhalte minimiert |
| **Rollback** | Jedes Modell kann auf die Vorgängerversion zurückgesetzt werden |
| **Audit** | Freigaben und Modellwechsel werden protokolliert |

Gerade im Billing-, Dokumenten- und Supportkontext darf keine „Black Box“-Automatisierung ohne Rückverfolgbarkeit eingesetzt werden. Deshalb ist ein **Model Registry + Evaluation Report + Release Approval**-Prozess Pflicht.

---

## 10. Operative Einführung der KI in Stufen

Für SWISS-CONNECT empfiehlt sich eine stufenweise Einführung.

### Stufe 1: Assistenzbetrieb
Die KI klassifiziert Nachrichten und Dokumente, erzeugt Entwürfe und Preisvorschläge, aber kein Prozess wird vollautomatisch verändert.

### Stufe 2: Teilautomatisierung
Bei hoher Confidence und klarer Regelbasis können definierte Aktionen vorbereitet werden, zum Beispiel automatische Zuordnung von Dokumenten zu Transporten oder Priorisierung von Support-Tickets.

### Stufe 3: Kontrollierte Automatisierung
Einige Prozesse können nach Freigaberegeln automatisiert werden, z. B. automatische Archivierung vollständiger abgeschlossener Transporte oder standardisierte Mahnläufe auf Basis klarer Schwellenwerte.

---

## 11. Empfohlene technische Struktur für KI-Komponenten

| Komponente | Platzierung | Aufgabe |
|-----------|-------------|---------|
| `services/ai-worker` | Separater Worker-Service | Asynchrone KI-Tasks |
| `services/backend/app/services/ai_service.py` | Backend-Orchestrierung | Trigger, Speicherung, API-Ausgabe |
| `services/backend/app/models/model_version.py` | Datenbankmodell | Versionierung von Modellen |
| `services/backend/app/models/feedback_event.py` | Datenbankmodell | Korrekturen und Bewertungen |
| `services/backend/app/models/inference_log.py` | Datenbankmodell | Protokoll jeder KI-Ausgabe |
| `services/backend/app/api/v1/ai.py` | API | Abruf von Ergebnissen, Feedback, Reports |
| `docs/runbooks/ai-operations.md` | Betrieb | Monitoring, Training, Freigabe |

---

## 12. Empfohlene Roadmap

| Phase | Inhalt | Ergebnis |
|------|--------|----------|
| **Phase A** | Transport-Core, Auth, Dokumente, Tracking stabilisieren | Produktives Basissystem |
| **Phase B** | KI-Klassifikation für Dokumente und Nachrichten einführen | Erste Assistenzfunktionen |
| **Phase C** | Feedback-Loop und Modellversionierung einführen | Messbarer Lernprozess |
| **Phase D** | Preisempfehlung und Risikoerkennung ausbauen | Operative Intelligenz |
| **Phase E** | Controlled Automation mit Freigabelogik | Teilautomatisierte Prozesse |

---

## 13. Fachliches Fazit

Aus den vorhandenen Repositories ergibt sich ein klares und belastbares Zielbild: SWISS-CONNECT ist technisch als **modulare Transportplattform mit starkem operativem Frontend und regelgeführter Backend-Logik** angelegt. Die KI ist dabei kein Marketingzusatz, sondern ein klar abgrenzbarer Assistenzlayer für Dokumente, Kommunikation, Preislogik und Prozessqualität.

Als IT-fachliche Zielarchitektur sollte das System daher so aufgebaut werden, dass zunächst belastbare Kernprozesse ohne KI produktiv funktionieren. Darauf aufbauend wird die KI über strukturierte Feedback-, Validierungs- und Trainingszyklen verbessert. Entscheidend für den professionellen Betrieb ist, dass das System nicht nur Vorhersagen erzeugt, sondern den Lernfortschritt pro Modellversion, pro Datensatz und pro Qualitätsmetrik nachvollziehbar dokumentiert.

Damit entsteht ein System, das operativ stabil ist, fachlich kontrollierbar bleibt und gleichzeitig mit wachsendem Datenbestand messbar intelligenter wird.
