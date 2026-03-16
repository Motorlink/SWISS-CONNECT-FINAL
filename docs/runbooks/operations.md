# Runbook: SWISS-CONNECT Betrieb

**Version:** 1.0
**Status:** In Entwicklung

---

## 1. Lokale Entwicklungsumgebung

### 1.1 Starten der Services

Alle Services werden über Docker Compose gestartet. Dies stellt sicher, dass die gesamte Umgebung mit einem einzigen Befehl hochgefahren wird.

```bash
# Im Hauptverzeichnis des Projekts

# Umgebungsvariablen setzen (nur beim ersten Mal nötig)
cp .env.example .env

# Alle Services im Hintergrund starten
docker compose up -d
```

### 1.2 Stoppen der Services

```bash
# Alle Services stoppen und Container entfernen
docker compose down

# Services stoppen, aber Volumes behalten
docker compose stop
```

### 1.3 Status prüfen

Um den Status der laufenden Container zu überprüfen:

```bash
docker compose ps
```

### 1.4 Logs anzeigen

Um die Logs eines bestimmten Services in Echtzeit zu verfolgen:

```bash
# Logs des Backends anzeigen
docker compose logs -f backend

# Logs des AI-Workers anzeigen
docker compose logs -f ai-worker
```

## 2. Datenbank-Management

Datenbank-Migrationen werden mit **Alembic** verwaltet und müssen innerhalb des `backend`-Containers ausgeführt werden.

### 2.1 Migration erstellen

Nachdem Änderungen an den SQLAlchemy-Modellen vorgenommen wurden, muss eine neue Migrationsdatei erstellt werden.

```bash
# Migrationsdatei automatisch erstellen
docker compose exec backend alembic revision --autogenerate -m "Beschreibender Name der Migration"
```

### 2.2 Migration ausführen

Um die ausstehenden Migrationen auf die Datenbank anzuwenden:

```bash
# Alle ausstehenden Migrationen anwenden
docker compose exec backend alembic upgrade head
```

### 2.3 Datenbank mit Seed-Daten füllen

Um die Datenbank mit initialen Demo-Daten zu füllen (z.B. für die Entwicklung oder für Tests).

```bash
# Seed-Skript ausführen (angenommen, es existiert ein `seed.py`)
docker compose exec backend python app/seed.py
```

## 3. Code-Qualität & Tests

### 3.1 Python (Backend & Worker)

Die folgenden Befehle werden innerhalb des jeweiligen Service-Containers ausgeführt.

```bash
# Linting mit Ruff
docker compose exec backend ruff check .

# Formatierung mit Black prüfen
docker compose exec backend black --check .

# Tests mit Pytest ausführen
docker compose exec backend pytest
```

### 3.2 TypeScript (Frontend)

```bash
# Linting mit ESLint
docker compose exec frontend pnpm lint

# Formatierung mit Prettier prüfen
docker compose exec frontend pnpm format:check
```

## 4. Troubleshooting

### 4.1 Service startet nicht

1.  **Logs prüfen:** `docker compose logs <service_name>`
2.  **Abhängigkeiten prüfen:** Stellen Sie sicher, dass abhängige Services (z.B. `postgres`, `redis`) laufen (`docker compose ps`).
3.  **Ports prüfen:** Stellen Sie sicher, dass die in `docker-compose.yml` definierten Ports auf Ihrem Host-System frei sind.

### 4.2 Datenbank-Verbindungsfehler

1.  **Postgres-Container läuft:** `docker compose ps | grep postgres`
2.  **Healthcheck bestanden:** Der Status sollte `healthy` sein.
3.  **Umgebungsvariablen:** Überprüfen Sie die `DATABASE_URL` in der `.env`-Datei und in der `docker-compose.yml`.

---
