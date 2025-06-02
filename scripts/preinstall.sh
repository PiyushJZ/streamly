#!/bin/bash

# Get the absolute path of the directory containing this script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Go one level up to assume monorepo root (adjust if needed)
MONOREPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

# Path to .env file
ENV_FILE="$MONOREPO_ROOT/.env"

# Check if .env already exists
if [ -f "$ENV_FILE" ]; then
  echo ".env file already exists at $ENV_FILE. Skipping generation."
else
  echo "MONOREPO_ROOT=$MONOREPO_ROOT" > "$ENV_FILE"
  echo ".env file created at $ENV_FILE with MONOREPO_ROOT=$MONOREPO_ROOT"
fi
