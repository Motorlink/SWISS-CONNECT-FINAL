#!/usr/bin/env bash
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
echo 'Starting SWISS-CONNECT-FINAL services...'
(
  cd "$ROOT/services/backend"
  nohup python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 > "$ROOT/.backend.log" 2>&1 &
)
(
  cd "$ROOT/services/frontend"
  nohup npm run dev > "$ROOT/.frontend.log" 2>&1 &
)
(
  cd "$ROOT/services/demo/client"
  nohup npm run dev -- --host 0.0.0.0 --port 3001 > "$ROOT/.demo.log" 2>&1 &
)
(
  cd "$ROOT/services/landing"
  nohup npm run dev -- --host 0.0.0.0 --port 3002 > "$ROOT/.landing.log" 2>&1 &
)
echo 'Backend:  http://localhost:8000'
echo 'Frontend: http://localhost:3000'
echo 'Demo:     http://localhost:3001'
echo 'Landing:  http://localhost:3002'
