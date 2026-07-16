# Ron Gurfinkel — Portfolio

Personal site and project hub built with **Next.js** (App Router), **React 18**, **TypeScript**, and **Tailwind CSS**. The app is configured for **static export** (`output: "export"`), so `npm run build` produces plain HTML, CSS, and JavaScript in **`out/`**—fast to serve, easy to cache, and hostable on any static file host or classic shared hosting (FTP).

---

## Features

- **Bilingual UI** — English and Hebrew via `LocaleContext`; RTL layout and Hebrew typography (`Noto Sans Hebrew`) when the locale is Hebrew.
- **Themes** — Light and dark modes with system preference and a manual toggle (`ThemeContext` + `ThemeScript` for flash-free first paint). Light mode uses the **same grid/bloom structure** as dark, with a **soft off-white canvas**, **high-contrast body text**, **deep teal labels** (instead of neon teal on gray), and a **light `profile.js` panel** so the switch feels natural, not a different site.
- **Landing** — Bento-style home with featured project, quick links, and animated “profile code” hero (`ProfileCodeWindow`).
- **Projects** — `/projects/` lists the catalog; **`/projects/[slug]/`** holds long-form write-ups (overview, architecture, stack). Featured cards on the home page link to the detail URL when `detailSlug` is set. Data: `src/data/projects.ts` + `src/data/projectDetails.ts`.
- **About** — `/about/` for background, skills, and longer-form copy (translations in `src/data/translations.ts`).
- **Career** — Timeline and role detail live on the **home page** at **`/#career`** (`HomeContent.tsx`; types in `src/types/career.ts`). **`/career/`** is a small client redirect to that hash for legacy bookmarks and external links.
- **Contact** — Contact block on the home page at **`/#contact`**. **`/contact/`** redirects to the same hash for legacy URLs.
- **Shared hosting** — `trailingSlash: true` in `next.config.mjs` plus **`public/.htaccess`** (copied into `out/`) so Apache/LiteSpeed serves `*/index.html` for paths like `/projects` without returning **403 Forbidden** when directory listings are disabled.
- **SEO** — Central metadata in `src/lib/seo.ts`: titles, Open Graph, Twitter card, JSON-LD (`Person` / `WebSite`). **`public/og-thumbnail.png`** is the 1200×630 social preview. **`src/app/sitemap.ts`** and **`src/app/robots.ts`** generate **`/sitemap.xml`** and **`/robots.txt`** at build time. Favicon via **`src/app/icon.svg`**.

---

## Tech stack

| Layer        | Choice |
| ------------ | ------ |
| Framework    | Next.js 16 (App Router), static export |
| UI           | React 18, Tailwind CSS 3, Lucide React |
| Language     | TypeScript |
| Fonts        | Inter, JetBrains Mono, Noto Sans Hebrew (Google Fonts) |
| Output       | **`out/`** after `next build` |

---

## Repository layout

```text
.github/workflows/   # CI/CD: SSH deploy to Ubuntu VPS (Docker Compose)
src/
  app/                 # App Router: page.tsx per route, layouts, globals.css, sitemap, robots, icon
    projects/
      page.tsx         # Project catalog
      [slug]/          # Long-form project detail pages (static params from projectDetails)
  components/          # Header, Footer, cards, modals, cursor, ProfileCodeWindow, …
  contexts/            # Theme, locale
  data/                # projects, projectDetails, translations, landing, careerJobs, profile segments, …
  hooks/               # Hash scroll, RTL, typewriter, …
  lib/                 # seo.ts, site URL helpers, …
  types/               # Shared TS types (career, projects, …)
public/                # .htaccess (Apache/LiteSpeed), og-thumbnail.png, featured SVGs, …
deploy/                # Optional Docker / env examples for other services
next.config.mjs        # static export, trailingSlash
tailwind.config.ts
```

### Main URLs

| Path | What it is |
| ---- | ---------- |
| `/` | Landing (hero, featured work, stack, career, contact) |
| `/projects/` | Full project grid (same cards as featured, with previews) |
| `/projects/[slug]/` | Detail page: overview, architecture, stack, links (slugs in `projectDetails.ts`) |
| `/about/` | Skills & hobbies |
| `/career/`, `/contact/` | Client redirect to `/#career` and `/#contact` for legacy links |

Featured cards on the home page use **`hrefForLandingProject()`** in `src/data/landing.ts`: if a project has **`detailSlug`**, the card links to **`/projects/{detailSlug}/`** first; otherwise **`demoUrl`**, then **GitHub**, then **`/projects/`**.

**Where to edit content**

- **Site-wide copy / nav labels / subtitles** — `src/data/translations.ts` (including **`projectDetail.*`** for detail-page headings)
- **Project cards (title, blurb, tech, links, `detailSlug`)** — `src/data/projects.ts`
- **Long-form project pages** — `src/data/projectDetails.ts` (must stay in sync with **`detailSlug`** / slugs)
- **Featured order & card chrome** — `src/data/landing.ts`
- **Hero “profile.js” strings** — `src/data/profileCodeSegments.ts` (keep **`PROFILE_CODE_PLAIN`** in sync for screen readers)
- **Canonical URL, OG defaults** — `src/lib/site.ts`, `src/lib/seo.ts`

---

## Requirements

- **Node.js** — **22.x** recommended. **18+** often still works locally; align major versions when debugging build issues.
- **npm** — Comes with Node; install dependencies with `npm ci` in CI and `npm install` locally.
- **Optional SWC binaries** — Next pulls `@next/swc-darwin-arm64` (etc.) as **optional** dependencies. If your npm config uses `omit=optional` / `--no-optional`, Turbopack will fail with `turbo.createProject is not supported by the wasm bindings`. Use **`npm run dev`** (webpack, default here) or reinstall with optional deps, e.g. `npm install --include=optional`.

---

## Scripts

| Command        | Purpose |
| -------------- | ------- |
| `npm run dev`  | Dev server (webpack; works even if optional `@next/swc-*` wasn’t installed) |
| `npm run dev:turbo` | Dev with Turbopack (needs native SWC — run `npm install` **with** optional deps, see below) |
| `npm run build`| Production build (Next 16 default bundler). Output: **`out/`** |
| `npm run start`| Serves the **non-export** server build (optional; static hosting uses **`out/`** only) |
| `npm run lint` | `next lint` (ESLint) |

---

## Local development

```bash
npm install
npm run dev
```

Edit files under `src/`; the dev server hot-reloads. For a production-like check:

```bash
npm run build
```

Open **`out/index.html`** via a static server if you want to verify the export (e.g. `npx serve out`).

### Dev: `ChunkLoadError` / `ENOENT` on `.next`

If you see **`ChunkLoadError`** (e.g. **`app/layout.js`** timed out) or webpack **`ENOENT`** on **`.pack.gz`** files:

1. Stop **`npm run dev`**.  
2. Run **`rm -rf .next`**.  
3. Start again with **`npm run dev`** (or **`npm run dev:turbo`** if you have native SWC installed).  
4. Hard-refresh the browser (or use a private window) so old chunk URLs are not cached.

Avoid running two dev servers on the same project folder, and avoid deleting **`.next`** while the server is still running.

---

## Environment variables

| Variable | Where | Purpose |
| -------- | ----- | ------- |
| `NEXT_PUBLIC_SITE_URL` | `.env.local`, or CI env | Canonical origin (no trailing slash). Defaults to `https://rongurfinkel.com`. Used for absolute links in **sitemap**, **Open Graph**, and **JSON-LD**. Set this for staging or preview hosts so metadata points at the correct URL. |

Example `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://rongurfinkel.com
```

---

## Deployment (GitHub Actions → Ubuntu VPS)

Production runs on an **Ubuntu VPS** with **Docker Compose**, fronted by **Nginx Proxy Manager**. The app checkout lives at **`/opt/apps/rongurfinkel2`** (Compose service/container: `rongurfinkel-frontend` on port **3000**).

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on:

- **Push to `main`**
- **Manual run** (`workflow_dispatch` in the Actions tab)

### What the workflow does

1. SSHs into the VPS  
2. In `/opt/apps/rongurfinkel2`: `git fetch origin` → `git reset --hard origin/main`  
3. Rebuilds then rolls containers: `docker compose build --pull` → `up -d` (no `down` first, so a failed build does not take the site offline)  
4. Prunes dangling images: `docker image prune -f`  
5. Verifies **`https://rongurfinkel.com/`** returns **HTTP 200** (retries briefly so the stack can settle)  

Any remote command failure or a failed health check **fails the workflow**. Concurrent runs are serialized with a concurrency group so two deploys cannot race; an in-flight deploy is not cancelled.

The deploy steps are **idempotent**—safe to re-run via **Re-run jobs** or **Run workflow**.

### Repository secrets

Configure these under **GitHub → Settings → Secrets and variables → Actions**. Do **not** commit secrets to the repository.

| Secret | Purpose |
| ------ | ------- |
| `VPS_HOST` | VPS hostname or IP |
| `VPS_USER` | SSH username (`deploy`) |
| `VPS_SSH_KEY` | Private SSH key for that user (full PEM contents) |

### Server prerequisites

- Git clone of this repo at `/opt/apps/rongurfinkel2`, writable by the `deploy` user (e.g. `chown -R deploy:deploy /opt/apps/rongurfinkel2`)  
- Docker and Docker Compose plugin installed; `deploy` in the `docker` group  
- A `docker-compose.yml` (and related image build context) in that directory  
- Nginx Proxy Manager proxying `rongurfinkel.com` to the Compose service (internal port **3000**)  

### Manual deploy

In GitHub: **Actions → Deploy to VPS → Run workflow**.

Or on the server as `deploy`:

```bash
cd /opt/apps/rongurfinkel2
git fetch origin
git reset --hard origin/main
docker compose down
docker compose build --pull
docker compose up -d
docker image prune -f
```

---

## SEO checklist after deploy

- Add the site in [Google Search Console](https://search.google.com/search-console) and submit **`/sitemap.xml`**.  
- Use **URL Inspection → Request indexing** on the homepage if snippets look stale.  
- **Sitelinks** under the main result are chosen by Google; clear navigation, internal links, and a sitemap help but do not guarantee specific links.

---

## License

No license file is included in this repository; all rights reserved unless you add one.

---

Built for clarity and maintainability: pages stay thin, and **data-driven** content lives under **`src/data/`** so updates stay localized and reviewable.
