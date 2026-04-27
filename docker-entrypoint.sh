#!/bin/sh
set -e

DATA_DIR=${DATA_DIR:-/data}

mkdir -p "$DATA_DIR/uploads"

# Copy products.json to data dir only on first run (don't overwrite existing data)
if [ ! -f "$DATA_DIR/products.json" ]; then
  echo "Initializing products.json in $DATA_DIR..."
  cp /app/public/products.json "$DATA_DIR/products.json"
fi

exec node server.js
