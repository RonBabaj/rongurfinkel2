# Ron Gurfinkel — Portfolio

Personal site and project hub built with **Next.js** (App Router), **React 18**, **TypeScript**, and **Tailwind CSS**. The app is configured for **static export** (`output: "export"`), so `npm run build` produces plain HTML, CSS, and JavaScript in **`out/`**—fast to serve, easy to cache, and hostable on any static file host or classic shared hosting (FTP).

---

## Features

- **Bilingual UI** — English and Hebrew via `LocaleContext`; RTL layout and Hebrew typography (`Noto Sans Hebrew`) when the locale is Hebrew.
- **Themes** — Light and dark modes with system preference and a manual toggle (`ThemeContext` + `ThemeScript` for flash-free first paint).
- **Landing** — Bento-style home with featured project, quick links, and animated “profile code” hero (`ProfileCodeWindow`).
- **Projects** — `/projects` with featured and grid cards; data from `src/data/projects.ts`.
- **Playground** — `/playground` plus dynamic routes for individual demos (`/playground/[slug]`); catalog in `src/data/playground.ts`. Includes embedded experiences where applicable (e.g. Flight Captain under `/playground/flight-captain`).
- **About** — `/about` for background, skills, and longer-form copy (translations in `src/data/translations.ts`).
- **Career** — Timeline and role detail live on the **home page** at **`/#career`** (`HomeContent.tsx`; types in `src/types/career.ts`). **`/career`** is a small client redirect to that hash for legacy bookmarks and external links.
- **Contact** — Contact block on the home page at **`/#contact`**. **`/contact`** redirects to the same hash for legacy URLs.
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
.github/workflows/   # CI: build + FTP deploy to Hostinger
src/
  app/                 # Routes, layouts, globals.css, sitemap, robots, icon
  components/          # Header, Footer, cards, modals, cursor, etc.
  contexts/            # Theme, locale
  data/                # projects, playground, translations, profile code segments
  hooks/               # Hash scroll, RTL helpers
  lib/                 # seo.ts, site URL helpers, misc utilities
  types/               # Shared TS types (e.g. career)
public/                # Static files (og-thumbnail.png, featured SVGs, …)
deploy/                # Optional Docker / env examples for other services
next.config.mjs        # output: "export"
tailwind.config.ts
```

**Where to edit content**

- **Site-wide copy / nav labels / subtitles** — `src/data/translations.ts`
- **Projects list** — `src/data/projects.ts`
- **Playground items** — `src/data/playground.ts`
- **Hero “profile.js” strings** — `src/data/profileCodeSegments.ts` (keep `PROFILE_CODE_PLAIN` in sync for screen readers)
- **Canonical URL, OG defaults** — `src/lib/site.ts`, `src/lib/seo.ts`

---

## Requirements

- **Node.js** — **20.x** recommended (matches GitHub Actions). **18+** generally works with this Next.js line; use the same major version locally and in CI when possible.
- **npm** — Comes with Node; install dependencies with `npm ci` in CI and `npm install` locally.

---

## Scripts

| Command        | Purpose |
| -------------- | ------- |
| `npm run dev`  | Next.js dev server at [http://localhost:3000](http://localhost:3000) |
| `npm run build`| Production build; static files emitted to **`out/`** |
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

## Deployment (GitHub Actions → Hostinger FTP)

On **push to `main`**, [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Checks out the repo  
2. Sets up **Node 20**  
3. Runs **`npm ci`** and **`npm run build`**  
4. Uploads the build output folder (**`out/`** for this project) with [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action) v4.3.5  

### Repository secrets

Configure these under **GitHub → Settings → Secrets and variables → Actions**:

| Secret | Purpose |
| ------ | ------- |
| `FTP_SERVER` | FTP hostname (e.g. from Hostinger hPanel) |
| `FTP_USERNAME` | FTP username |
| `FTP_PASSWORD` | FTP password |

### Remote directory

The workflow uploads to:

```text
/domains/rongurfinkel.com/public_html/
```

If your Hostinger account uses a different domain folder, change **`server-dir`** in the workflow to match hPanel’s **public_html** path.

### FTP timeouts

The action sets **`timeout: 600000`** (10 minutes) because the default 30s limit often causes **“Timeout (control socket)”** when using **`dangerous-clean-slate: true`** (full remote wipe + re-upload). The job also sets **`timeout-minutes: 30`** so GitHub does not kill the run early.

If uploads still fail:

- Confirm in **hPanel → Files → FTP Accounts** whether you need **`protocol: ftps`** and a specific **port** (add the corresponding `with:` keys to the action per the [action README](https://github.com/SamKirkland/FTP-Deploy-Action)).  
- Temporarily set **`log-level: verbose`** on the deploy step to see where it stalls.

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
