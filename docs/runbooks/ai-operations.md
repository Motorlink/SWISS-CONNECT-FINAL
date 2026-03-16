# AI Operations Runbook

## Zweck

Dieses Runbook beschreibt den operativen Zyklus der KI-Domänen in SWISS-CONNECT.

## Trainingszyklus

| Phase | Beschreibung |
|---|---|
| Inferenz | Laufende Vorhersagen werden in `inference_log` protokolliert |
| Feedback | Fachanwender bestätigen oder korrigieren Ergebnisse in `feedback_event` |
| Datenaufnahme | Bestätigte Korrekturen werden dem Trainingsdatensatz zugeordnet |
| Training | Neue Modellversion wird für die jeweilige Domäne erzeugt |
| Staging | Fachlicher Vergleich gegen Vorversion |
| Produktion | Freigegebene Version wird aktiv geschaltet |
| Review | Kennzahlen und Fehlermuster werden periodisch geprüft |

## Domänen

| Domäne | Zweck |
|---|---|
| capabilities | Prozess- und Vorgangsklassifikation |
| tracking | ETA, Verzögerungen, Risikoindikatoren |
| export_customs | Dokumentenvollständigkeit und Compliance |
| billing | Rechnungsempfehlung, Mahnstufe, Zahlungsrisiko |
| contact | Routing, Priorisierung und Kommunikationsentwürfe |

## Betriebsprinzip

Modelle treffen keine unkontrollierten Endentscheidungen. Kritische fachliche Freigaben bleiben bei Disposition, Backoffice, Dokumentation und Buchhaltung.
