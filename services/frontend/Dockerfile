# =============================================================================
# SWISS-CONNECT Frontend Dockerfile
# =============================================================================
# Next.js (React) mit TypeScript
# =============================================================================

FROM node:20-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# pnpm installieren
RUN npm install -g pnpm

# Package-Dateien kopieren
COPY package.json pnpm-lock.yaml* ./

# Abhängigkeiten installieren
RUN pnpm install --frozen-lockfile || pnpm install

# Anwendungscode kopieren
COPY . .

# Port freigeben
EXPOSE 3000

# Startbefehl (Development)
CMD ["pnpm", "dev"]
