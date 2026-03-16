# SWISS-CONNECT MANIFEST

## 1. Vision

**SWISS-CONNECT ist das Uber der Transporte.**

Eine digitale, kartenbasierte Transport-Plattform für die Schweiz, die Transporte so einfach, schnell und intuitiv macht wie eine Uber-Fahrt – ergänzt um Archiv, Abrechnung, Dokumente und KI.

Kein klassisches TMS. Keine Transportbörse. Sondern **Bewegung in Echtzeit**.

---

## 2. Grundprinzipien

1. **Map first** – Karte ist die Hauptoberfläche
2. **Realtime statt Tabellen**
3. **Intuitiv vor komplex**
4. **Mobile-first** (App + Web)
5. **Alles gehört zusammen**: Transport, Tracking, Abrechnung, Archiv
6. **KI als Verwaltungsarbeiter, nicht als Entscheider**
7. **Erweiterbar, modular, sauber**

---

## 3. Produktdefinition

### 3.1 Uber-Logik für Transporte

**Ablauf:**
- Auftrag erstellen
- Fahrer nimmt Auftrag an
- Status: angenommen, geladen, unterwegs, zugestellt
- Live-Tracking in Echtzeit

Ein Transport ist immer sichtbar, nachvollziehbar, abgeschlossen oder aktiv.

### 3.2 Fahrer-App (Kernstück)

**Startscreen:**
- Grosse Karte (80 %)
- Eigener Standort als Fahrzeug-Icon
- Sendungen als Pins

**Status-Modi:** Offline, Verfügbar, Heimweg-Modus

**Heimweg-Modus:**
- Fahrer gibt Zieladresse an
- System zeigt nur Sendungen auf der Route mit minimalem Umweg
- Visuelle Darstellung: grüne Heimroute, Sendungen entlang der Strecke

**Angebots-Flow (wie Uber):**
- Pop-up mit Route, Zeit, Vergütung
- Countdown
- Annehmen / Ablehnen

### 3.3 Auftraggeber-Portal (Web)

- Karte als Startseite
- Neue Sendung erstellen
- Letzte und aktive Transporte sichtbar

**Sendung erstellen in 5 Schritten:**
1. Abholung
2. Ziel
3. Masse / Gewicht
4. Zeitfenster
5. Preis (oder Preisvorschlag)

---

## 4. Archiv

- Jeder abgeschlossene Transport wird automatisch archiviert
- Archiv ist immer Bestandteil, kein Zusatz

**Archiv enthält:** Route und Tracking-Verlauf, Dokumente, Rechnung / Gutschrift, Fahrer / Fahrzeug

**Funktionen:** Filter und Suche, Export, Transport erneut buchen

---

## 5. Abrechnung

- Rechnungen für Auftraggeber
- Gutschriften für Fahrer / Spediteure
- Sammelabrechnungen möglich

**Schnittstellen:** Swiss21, Bexio

SWISS-CONNECT bleibt Single Source of Truth.

---

## 6. Zeiterfassung

- Start / Stop
- Fahrer- und Bürozeiten
- Zuordnung zu Transporten
- Übergabe an Swiss21 und Bexio

---

## 7. Dokumentenmanagement (DMS)

- PDFs, Bilder, CMR, Rechnungen
- Upload per App und Portal
- Versionierung
- Metadaten und Transport-Zuordnung

**E-Mail-Anbindung:** Anhänge an docs@swiss-connect.ch werden automatisch abgelegt.

---

## 8. Kommunikation und Support

**Superchat ist der zentrale Kommunikationskanal.**
- Support-Anfragen
- Fahrer-Kommunikation
- Kunden-Kommunikation

**Voice-Anfragen:** werden über Superchat transkribiert und an die KI weitergegeben.

---

## 9. KI-System

### 9.1 KI-Verwaltungsworker

Die KI ist Backoffice-Worker, kein Entscheider.

**Aufgaben:**
- E-Mails und Superchat-Nachrichten verarbeiten
- Dokumente klassifizieren und zuordnen
- Fehlende Unterlagen erkennen
- To-Dos erzeugen
- Antwortentwürfe vorbereiten

### 9.2 KI-Analyse und Preisempfehlungen

- Auswertung gefahrener Touren
- Preisempfehlungen
- Routen- und Margenanalysen

Die KI gibt Empfehlungen – keine automatischen Preisentscheidungen.

---

## 10. Technik-Manifest

### Programmiersprachen
- Backend und KI: **Python 3.12 (FastAPI)**
- Frontend: **TypeScript (Next.js / React)**
- Infrastruktur: **Docker / Docker Compose**

### Kerntechnologien
- PostgreSQL, Redis, MinIO (S3)
- WebSockets, REST / JSON API

---

## 11. Architektur-Prinzipien

- Container-first
- Modular und erweiterbar
- GitHub = Source of Truth
- Docs zuerst, dann Code
- Rollback-fähig

---

## 12. App und Plattform

- Web-Portal
- Mobile App (iOS / Android)
- PWA installierbar
- Einheitliche UX

---

## 13. Zusammenfassung

> **SWISS-CONNECT ist das Uber der Transporte – kartenbasiert, intuitiv, mit Archiv, Abrechnung, KI und kompletter Prozessabdeckung in einer Plattform.**

---

**Ende des Manifests**
