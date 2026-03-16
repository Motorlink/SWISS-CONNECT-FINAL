# Datenmodell: SWISS-CONNECT

**Version:** 1.0

---

## Übersicht

Das Datenmodell bildet die Kernentitäten der Transportplattform ab. Alle Tabellen verwenden UUIDs als Primärschlüssel und beinhalten Audit-Felder (`created_at`, `updated_at`).

## Entity-Relationship-Diagramm

```mermaid
erDiagram
    User ||--o{ Transport : "erstellt"
    User ||--o{ Transport : "fährt"
    User ||--o{ TimeEntry : "erfasst"
    User {
        uuid id PK
        string email
        string hashed_password
        string first_name
        string last_name
        string phone
        string company
        enum role
        boolean is_active
        datetime created_at
        datetime updated_at
    }

    Transport ||--o{ Document : "hat"
    Transport ||--o{ TrackingEvent : "hat"
    Transport ||--o| Invoice : "erzeugt"
    Transport {
        uuid id PK
        string reference
        uuid customer_id FK
        uuid driver_id FK
        enum status
        json origin
        json destination
        float weight_kg
        int pallets
        string goods_type
        string goods_description
        float price_chf
        float price_recommended
        datetime planned_pickup
        datetime planned_delivery
        datetime actual_pickup
        datetime actual_delivery
        string vehicle
        datetime created_at
        datetime updated_at
    }

    TrackingEvent {
        uuid id PK
        uuid transport_id FK
        float latitude
        float longitude
        enum event_type
        string description
        datetime timestamp
    }

    Document {
        uuid id PK
        uuid transport_id FK
        uuid uploaded_by FK
        string filename
        string mime_type
        string storage_path
        enum document_type
        json metadata
        datetime created_at
    }

    Invoice {
        uuid id PK
        uuid transport_id FK
        uuid customer_id FK
        string invoice_number
        float amount_chf
        float vat_amount
        enum status
        datetime due_date
        datetime paid_at
        string external_ref
        datetime created_at
        datetime updated_at
    }

    TimeEntry {
        uuid id PK
        uuid user_id FK
        uuid transport_id FK
        datetime start_time
        datetime end_time
        int duration_minutes
        string description
        datetime created_at
    }
```

## Enumerationen

### UserRole
| Wert | Beschreibung |
|------|-------------|
| `admin` | Systemadministrator |
| `dispatcher` | Disponent / Auftraggeber |
| `driver` | Fahrer |
| `viewer` | Nur-Lese-Zugriff |

### TransportStatus
| Wert | Beschreibung |
|------|-------------|
| `pending` | Auftrag erstellt, wartet auf Annahme |
| `accepted` | Fahrer hat angenommen |
| `picked_up` | Ware abgeholt |
| `in_transit` | Unterwegs |
| `delivered` | Zugestellt |
| `cancelled` | Storniert |
| `archived` | Archiviert |

### TrackingEventType
| Wert | Beschreibung |
|------|-------------|
| `location_update` | GPS-Positionsupdate |
| `status_change` | Statusänderung |
| `geofence_enter` | Geofence betreten |
| `geofence_exit` | Geofence verlassen |

### DocumentType
| Wert | Beschreibung |
|------|-------------|
| `cmr` | CMR-Frachtbrief |
| `invoice` | Rechnung |
| `pod` | Proof of Delivery |
| `customs` | Zolldokument |
| `other` | Sonstiges |

### InvoiceStatus
| Wert | Beschreibung |
|------|-------------|
| `draft` | Entwurf |
| `sent` | Versendet |
| `paid` | Bezahlt |
| `overdue` | Überfällig |
| `cancelled` | Storniert |

---
