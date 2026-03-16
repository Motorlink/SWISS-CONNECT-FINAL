#!/usr/bin/env bash
set -e
cd "$(dirname "$0")/../services/backend"
python3 scripts/seed_data.py
