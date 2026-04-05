# SpeechInsight2: Backend API + UI in one image.
# Copy this file into the SpeechInsight2 repo and adjust paths (Backend/, UI/) to match your project names.
# Build from repo root: docker build -f deploy/speechinsight2/Dockerfile .

# ---- Build Backend API ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS api-build
WORKDIR /src
# Adjust: Backend/ might be SpeechInsight2.Api/ or Api/
COPY ["Backend/Backend.csproj", "Backend/"]
RUN dotnet restore "Backend/Backend.csproj"
COPY Backend/ Backend/
RUN dotnet publish "Backend/Backend.csproj" -c Release -o /app/api --no-restore

# ---- Build UI (Blazor WASM; adjust path and .csproj name) ----
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS ui-build
WORKDIR /src
COPY ["UI/UI.csproj", "UI/"]
RUN dotnet restore "UI/UI.csproj"
COPY UI/ UI/
RUN dotnet publish "UI/UI.csproj" -c Release -o /app/ui --no-restore

# ---- Runtime: API + Caddy ----
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates wget \
  && wget -q -O /usr/local/bin/caddy "https://github.com/caddyserver/caddy/releases/download/v2.7.6/caddy_2.7.6_linux_amd64" \
  && chmod +x /usr/local/bin/caddy \
  && apt-get remove -y wget && apt-get autoremove -y && rm -rf /var/lib/apt/lists/*

COPY --from=api-build /app/api /app/api
COPY --from=ui-build /app/ui /app/ui

# Deploy assets: copy from deploy/speechinsight2/ when build context is repo root
COPY deploy/speechinsight2/Caddyfile /etc/Caddyfile
COPY deploy/speechinsight2/start.sh /app/start.sh
RUN chmod +x /app/start.sh

ENV PORT=8080
EXPOSE 8080
ENTRYPOINT ["/app/start.sh"]
