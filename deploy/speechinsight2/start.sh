#!/bin/sh
set -e
# Render sets PORT; default 8080 for local. Caddyfile uses :{$PORT}
export PORT="${PORT:-8080}"
export ASPNETCORE_URLS="http://localhost:5000"

# Start API in background. Replace Backend.dll with your API assembly name (e.g. SpeechInsight2.Api.dll).
cd /app/api && dotnet Backend.dll &
# Wait for API to be ready
sleep 2

exec caddy run --config /etc/Caddyfile --adapter caddyfile
