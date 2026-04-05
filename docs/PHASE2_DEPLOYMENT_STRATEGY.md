# Phase 2: SpeechInsight2 Deployment Strategy

## Goal

Deploy SpeechInsight2 (Backend API + UI as one application) to a PaaS so it is live, user-accessible, and cost-efficient. No VPS; prefer scale-to-zero / auto-sleep.

---

## 1. PaaS choice: **Render**

**Why Render**

- **Free tier with spin-down**: 750 hours/month on free tier; service spins down after ~15 minutes of no traffic. No always-on cost.
- **Single Docker service**: One “Web Service” runs your Docker image. API and UI run together inside that container (via reverse proxy), so one deployment unit, one URL, version-locked.
- **No VPS**: Fully managed; no servers to patch or maintain.
- **GitHub integration**: Can auto-deploy on push; we use GitHub Actions to verify build and trigger deploy for explicit CI/CD.
- **Environment variables**: Set in Render dashboard; no secrets in repo.

**Alternatives considered**

- **Fly.io**: Strong option (machines sleep, global). Slightly more configuration (`fly.toml`, regions). Good if you want more control later.
- **Railway**: Simple but free tier is limited; pay-as-you-go can add up. Better when you have a small budget and want minimal config.

For Phase 2, Render gives the simplest “one Dockerfile, one service, free tier, spin-down” story.

---

## 2. Architecture (one container)

- **Single Docker image**:
  - Builds both Backend API and UI (multi-stage Dockerfile).
  - Final stage runs API and UI in the same container.
  - A small **reverse proxy (Caddy or nginx)** listens on `PORT` (set by Render), forwards `/api` (or your API prefix) to the API and `/` to the UI.
- **One process visible to Render**: The container’s main process is the reverse proxy; it starts the API and UI as child processes (or via a tiny start script).
- **Environment variables**: Injected by Render (e.g. API keys, Whisper config). No hardcoded secrets.

Result: one URL (e.g. `https://speechinsight2.onrender.com`), one deploy, API + UI always in sync.

---

## 3. Safety and cost controls

- **File size limits**: Enforced in the API (e.g. ASP.NET Core request size limits) and optionally in the reverse proxy (e.g. `client_max_body_size` in nginx). Example: 25–50 MB max upload.
- **Request/rate limits**: Simple per-IP or per-session limits in the API (e.g. middleware) or in the proxy. No custom “scanner” services.
- **Single job per user (if applicable)**: If the app processes one transcription at a time per user, enforce in app logic (e.g. queue or reject when busy).

These stay minimal and explicit; no over-engineering.

---

## 4. CI/CD flow (GitHub Actions)

1. **On push to `main`** (in the SpeechInsight2 repo):
   - Checkout repo.
   - Build the Docker image (to verify Dockerfile and project build).
   - Trigger a deploy on Render via Render API (or rely on Render’s “Auto-Deploy” from GitHub; the workflow can still run `docker build` for CI).
2. **Secrets**: `RENDER_API_KEY`, `RENDER_SERVICE_ID` in GitHub (or connect repo in Render and use native auto-deploy).
3. **No polling**: Deploy is triggered by push or by API call from the workflow.

Details and example YAML live in `deploy/speechinsight2/` (for copy into the SpeechInsight2 repo).

---

## 5. Website integration

- **Projects & Playground**: SpeechInsight2 status set to **Live**; add **demoUrl** pointing to the Render URL.
- **Copy**: “This is the real running service — not a demo.” and a clear “Open live app” link.
- **No embedding**: The site stays a hub; we link out to the app, we do not reimplement or wrap the UI in React.

---

## 6. What you need to do

1. **In the SpeechInsight2 repo**: Copy the contents of `deploy/speechinsight2/` (Dockerfile, docker-compose, Caddy/nginx config, start script, env example). Adjust paths if your repo layout differs (e.g. `Api` vs `Backend`, `UI` vs `Client`).
2. **Render**: Create a Web Service from “Docker”; connect the SpeechInsight2 GitHub repo; set root directory and env vars; note the service URL and Service ID for GitHub Actions if you use API-triggered deploy.
3. **GitHub**: Add `RENDER_API_KEY` and `RENDER_SERVICE_ID` to the SpeechInsight2 repo secrets if using the provided workflow.
4. **Website**: Set `demoUrl` in `src/data/projects.ts` and `src/data/playground.ts` to your live Render URL (e.g. `https://speechinsight2.onrender.com`).

After that, push to `main` → build runs → deploy runs → app is live; the website already shows “Live” and links to it.

---

## 7. Deployment flow (summary)

1. **Code**: Push to `main` in the SpeechInsight2 repo.
2. **GitHub Actions** (if configured): Runs `docker build` to verify the image builds, then calls Render API to create a new deploy.
3. **Render**: Pulls the repo (or receives the trigger), builds the Docker image from the Dockerfile, runs the container. The container starts the API and Caddy; Caddy listens on `PORT` and proxies `/api` to the API and `/` to the UI.
4. **Result**: One URL (e.g. `https://speechinsight2.onrender.com`) serves the full app. First request after idle may be slow (spin-up); then it stays warm until the auto-sleep timeout.
