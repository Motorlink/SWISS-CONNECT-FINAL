# API-Konventionen

**Version:** 1.0
**Status:** Angenommen

---

## 1. Allgemein

- **Format:** Alle API-Endpunkte kommunizieren ausschließlich über **JSON**.
- **Sprache:** Alle Feldnamen, Endpunkte und Fehlermeldungen sind auf **Englisch**.
- **Authentifizierung:** Die Authentifizierung erfolgt über **JWT (JSON Web Tokens)**, die als `Bearer` Token im `Authorization`-Header gesendet werden.

## 2. Versionierung

Die API wird über den URL-Pfad versioniert. Die aktuelle Version ist **v1**.

**Beispiel:** `/api/v1/transports`

## 3. Endpunkte (Naming Convention)

- **Plural:** Ressourcennamen werden immer im Plural verwendet (z.B. `transports`, `users`).
- **Lowercase & Kebab-Case:** Endpunkte sind immer in Kleinbuchstaben und verwenden Kebab-Case für zusammengesetzte Wörter (z.B. `time-entries`).
- **Struktur:** Die URL-Struktur folgt dem REST-Prinzip und bildet die Hierarchie der Ressourcen ab.

| Methode | URL | Beschreibung |
|---|---|---|
| `GET` | `/transports` | Liste aller Transporte (mit Paginierung) |
| `POST` | `/transports` | Erstellt einen neuen Transport |
| `GET` | `/transports/{transport_id}` | Ruft einen spezifischen Transport ab |
| `PUT` | `/transports/{transport_id}` | Aktualisiert einen Transport vollständig |
| `PATCH` | `/transports/{transport_id}` | Aktualisiert einen Transport partiell |
| `DELETE` | `/transports/{transport_id}` | Löscht einen Transport |

**Verschachtelte Ressourcen:**
- `GET /transports/{transport_id}/tracking-points`
- `POST /transports/{transport_id}/documents`

## 4. Request & Response Body

- **Naming:** Feldnamen im JSON-Body verwenden **snake_case** (z.B. `first_name`, `created_at`). Dies ist konsistent mit der Python-Welt (Pydantic-Modelle).
- **Standard-Antwort-Struktur:** Erfolgreiche Antworten (`2xx`) sollten die angeforderten Daten direkt im Body enthalten. Für Listen wird eine einheitliche Struktur verwendet:

  ```json
  {
    "items": [
      { "id": 1, "..." },
      { "id": 2, "..." }
    ],
    "total": 100,
    "page": 1,
    "size": 25
  }
  ```

- **Datumsformate:** Alle Datums- und Zeitangaben werden im **ISO 8601**-Format mit Zeitzone (UTC) gesendet und empfangen (z.B. `2025-12-16T08:53:00Z`).

## 5. HTTP Status Codes

Die API verwendet die Standard-HTTP-Statuscodes, um den Erfolg oder Misserfolg einer Anfrage anzuzeigen.

- **2xx - Erfolg**
  - `200 OK`: Anfrage erfolgreich. Antwort enthält Daten.
  - `201 Created`: Ressource erfolgreich erstellt. Antwort enthält die neue Ressource.
  - `204 No Content`: Anfrage erfolgreich, aber keine Daten zurückzusenden (z.B. nach einem `DELETE`).

- **4xx - Client-Fehler**
  - `400 Bad Request`: Die Anfrage war fehlerhaft (z.B. ungültiges JSON, fehlende Felder).
  - `401 Unauthorized`: Authentifizierung fehlgeschlagen oder nicht vorhanden.
  - `403 Forbidden`: Authentifiziert, aber keine Berechtigung für die angeforderte Aktion.
  - `404 Not Found`: Die angeforderte Ressource existiert nicht.
  - `422 Unprocessable Entity`: Die Anfrage war syntaktisch korrekt, aber semantisch falsch (z.B. Validierungsfehler). Wird von FastAPI standardmäßig verwendet.

- **5xx - Server-Fehler**
  - `500 Internal Server Error`: Ein unerwarteter Fehler auf dem Server ist aufgetreten.

## 6. Fehler-Antworten

Fehler-Antworten (`4xx` und `5xx`) haben eine einheitliche Struktur, um die Fehlerbehandlung im Frontend zu vereinfachen.

```json
{
  "detail": "Fehlermeldung für den Entwickler oder Benutzer."
}
```

Bei Validierungsfehlern (`422`) liefert FastAPI eine detailliertere Antwort:

```json
{
  "detail": [
    {
      "loc": ["body", "email"],
      "msg": "value is not a valid email address",
      "type": "value_error.email"
    }
  ]
}
```

## 7. Paginierung & Filterung

- **Paginierung:** Listen-Endpunkte werden über die Query-Parameter `page` und `size` paginiert.
  - `GET /transports?page=1&size=50`
  - Default `page=1`, Default `size=25`, Max `size=100`.

- **Sortierung:** Die Sortierung erfolgt über den `sort` Parameter.
  - `GET /transports?sort=created_at:desc`

- **Filterung:** Einfache Filter werden als Query-Parameter übergeben.
  - `GET /transports?status=pending&customer_id=123`

---
