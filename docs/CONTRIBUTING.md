# Contributing Guide: SWISS-CONNECT

---

## 1. Grundregeln

1. **Kontext bei jedem Start laden:** Vor der Arbeit immer die aktuelle Dokumentation lesen – insbesondere `docs/architecture/overview.md`, `docs/runbooks/progress.md` und relevante ADRs.
2. **Status immer aktuell halten:** In `docs/runbooks/progress.md` festhalten, welche Phase aktiv ist, welche Tasks erledigt sind und was der nächste Schritt ist.
3. **Keine Secrets im Code:** Keine API-Keys oder Passwörter im Code oder Git. Nur ENV-Variablen verwenden.
4. **Architektur respektieren:** Services sind getrennt. Kein Direktzugriff auf fremde Tabellen. Kommunikation zwischen Services über APIs.
5. **Performance:** Rechenintensive Aufgaben immer asynchron (Celery Worker), nicht in der HTTP-Request-Response-Kette. Caching mit Redis nutzen.

---

## 2. Nicht verhandelbare Prinzipien

1. Container-first (alles via Docker Compose)
2. GitHub Source of Truth (`/docs` zuerst, dann Code)
3. Modularität (Services getrennt, klare Interfaces)
4. Kleine Commits, rollbackfähig, Migrations sauber
5. Security Basics (JWT, Roles, Audit-Log, Secrets als ENV)

---

## 3. Programmiersprachen und Standards

### Backend
- **Python 3.12** mit FastAPI
- **SQLAlchemy + Alembic** (ORM/Migrations)
- **Celery** (Background Jobs)
- **WebSocket** via FastAPI (Realtime)

### Frontend
- **TypeScript** mit Next.js (React)
- Component-based, Clean Design

### Code-Qualität
- Python: `ruff` + `black` + `mypy`
- TypeScript: `eslint` + `prettier`
- Tests: `pytest` (Backend), optional Playwright (Frontend)
- API-Doku: OpenAPI (FastAPI automatisch) + `/docs/api`

---

## 4. Arbeitsweise je Task

1. **Kontext laden:** Architektur und Fortschritt lesen.
2. **Betroffene Services identifizieren:** Welche Services und Abhängigkeiten?
3. **Änderungen planen:** Datenmodelle, Schnittstellen, Events.
4. **Implementieren:** Code, Tests, Plausibilitäts-Check.
5. **Status aktualisieren:** `docs/runbooks/progress.md` pflegen.
6. **Commit und Push:** Kleine, rollbackfähige Commits mit aussagekräftigen Messages.

---
