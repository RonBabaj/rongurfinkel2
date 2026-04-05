# SpeechInsight2 – Deploy to Render (Phase 2)

Copy the contents of this folder into your **SpeechInsight2** repo (root or a `deploy/` subfolder). Adjust paths in the Dockerfile and scripts to match your repo layout.

## Repo layout assumed

- **Backend API**: e.g. `Backend/` or `SpeechInsight2.Api/` (ASP.NET Core Web API).
- **UI**: e.g. `UI/` or `SpeechInsight2.UI/` (Blazor or static SPA; if Blazor Server it runs as a process; if Blazor WASM or static, we serve files).

If your names differ, edit the Dockerfile `COPY` paths and the start script.

## What’s included

| File | Purpose |
|------|--------|
| `Dockerfile` | Multi-stage: build API, build UI, run both behind Caddy. |
| `docker-compose.yml` | Local run (optional). |
| `Caddyfile` | Reverse proxy: `/` → UI, `/api` → API. |
| `start.sh` | Starts API, then Caddy (Caddy is the main process for Render). |
| `env.example` | Env vars to set in Render dashboard. |
| `.github/workflows/deploy.yml` | Copy to SpeechInsight2 repo: build + trigger Render deploy. |

## One-time setup on Render

1. Create a **Web Service**; connect the SpeechInsight2 GitHub repo.
2. **Build**: Docker; Dockerfile path = `./Dockerfile` (or `./deploy/speechinsight2/Dockerfile` if you put these files in a subfolder and set “Root Directory” accordingly).
3. **Instance**: Free tier; auto-sleep after inactivity.
4. **Environment**: Add variables from `env.example` (no secrets in repo).

## GitHub Actions (optional)

To run `docker build` on every push and trigger a Render deploy:

1. In the **SpeechInsight2** repo, add secrets: `RENDER_API_KEY`, `RENDER_SERVICE_ID`.
2. Copy `.github/workflows/deploy.yml` from this folder into the SpeechInsight2 repo as `.github/workflows/deploy.yml`.

Get the API key from Render Dashboard → Account → API Keys. Get the Service ID from the service URL or API.

## Safety and cost

- **File size**: Caddyfile limits uploads to 50 MB for `/api/*`. Also set in your API (e.g. in `Program.cs`: `builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = 50 * 1024 * 1024);`) so the API rejects oversized bodies.
- **Rate/request limits**: Add in API middleware or Caddy if needed.
- **Single job per user**: Implement in app logic (e.g. queue or reject when busy) if applicable.

## After first deploy

Set the live URL in the **website** repo:

- `src/data/projects.ts` → SpeechInsight2 `demoUrl`
- `src/data/playground.ts` → SpeechInsight2 `demoUrl`
- Set `status` to `"live"` for both.

Then the site will show “Live” and “Open live app” with the real URL.
