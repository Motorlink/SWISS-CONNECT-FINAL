# Server-Setup: SWISS-CONNECT

**Version:** 1.0

---

## 1. Serveranforderungen

| Komponente | Minimum | Empfohlen |
|-----------|---------|-----------|
| CPU | 4 Cores | 8 Cores |
| RAM | 8 GB | 16 GB |
| Storage | 50 GB SSD | 100 GB SSD |
| OS | Ubuntu 22.04 LTS | Ubuntu 24.04 LTS |
| Netzwerk | 100 Mbit/s | 1 Gbit/s |

## 2. Basis-Setup

### 2.1 System aktualisieren

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git wget unzip htop
```

### 2.2 Docker installieren

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
newgrp docker
```

### 2.3 Docker Compose installieren

```bash
sudo apt install -y docker-compose-plugin
docker compose version
```

## 3. Firewall konfigurieren

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

## 4. Anwendung deployen

```bash
# Repository klonen
git clone git@github.com:Motorlink/SWISS-CONNECT-FINAL.git
cd SWISS-CONNECT-FINAL

# Environment konfigurieren
cp .env.example .env
# .env mit Produktivwerten befüllen

# Services starten
docker compose -f infra/docker-compose.yml up -d

# Datenbank initialisieren
docker compose -f infra/docker-compose.yml exec backend alembic upgrade head
```

## 5. SSL mit Let's Encrypt

```bash
sudo apt install -y certbot
sudo certbot certonly --standalone -d swiss-connect.ch -d www.swiss-connect.ch
```

## 6. Monitoring

```bash
# Logs prüfen
docker compose -f infra/docker-compose.yml logs -f

# Service-Status
docker compose -f infra/docker-compose.yml ps

# Ressourcenverbrauch
docker stats
```

## 7. Backup

```bash
# Datenbank-Backup
docker compose -f infra/docker-compose.yml exec postgres pg_dump -U swissconnect swissconnect > backup_$(date +%Y%m%d).sql

# MinIO-Backup
docker compose -f infra/docker-compose.yml exec minio mc mirror /data /backup
```

---
