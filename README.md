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
.github/workflows/   # CI: build + FTP deploy to Hostinger
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
next.config.mjs        # static export, trailingSlash, dev webpack memory cache (see below)
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

- **Node.js** — **20.x** recommended (matches GitHub Actions). **18+** generally works with this Next.js line; use the same major version locally and in CI when possible.
- **npm** — Comes with Node; install dependencies with `npm ci` in CI and `npm install` locally.
- **Optional SWC binaries** — Next pulls `@next/swc-darwin-arm64` (etc.) as **optional** dependencies. If your npm config uses `omit=optional` / `--no-optional`, Turbopack will fail with `turbo.createProject is not supported by the wasm bindings`. Use **`npm run dev`** (webpack, default here) or reinstall with optional deps, e.g. `npm install --include=optional`.

---

## Scripts

| Command        | Purpose |
| -------------- | ------- |
| `npm run dev`  | Dev server (webpack; works even if optional `@next/swc-*` wasn’t installed) |
| `npm run dev:turbo` | Dev with Turbopack (needs native SWC — run `npm install` **with** optional deps, see below) |
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

### Dev: webpack cache / `ENOENT` on `.pack.gz`

`next.config.mjs` sets **`webpack(config, { dev })`** so that when **`dev`** is true, **`config.cache = { type: "memory" }`** — development does **not** use disk packs under **`.next/dev/cache/webpack/`**. That avoids **`ENOENT`** / **`unhandledRejection`** when pack files go missing (Fast Refresh, deleting **`.next`** while `next dev` runs, or sync tools touching the cache).

If the dev server ever acts odd, stop it, run **`rm -rf .next`**, then **`npm run dev`** again. Do not run two **`next dev`** processes on the same repo path at once.

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

### FTP `connect ETIMEDOUT` (before login)

Errors like **`connect ETIMEDOUT … port 21 (control socket)`** mean the runner **never opens a TCP connection** to the FTP host. That is **not** the same as the long FTP “control socket” timeout during upload—raising `timeout:` in the action **does not fix ETIMEDOUT**.

Typical causes:

- **Path from GitHub’s cloud runners to Hostinger is filtered** (host firewall, DDoS edge, or policy blocking datacenter IP ranges).  
- **Wrong host** in `FTP_SERVER` (typo or obsolete IP)—still points at something that doesn’t answer on 21.  
- **Local or regional blocking** of port 21 (rarer from Actions, but possible in combination with routing).

What to try:

1. **Use the FTP hostname from hPanel** (e.g. `ftp.yourdomain.com` or the server name Hostinger shows), not a stale IP, unless support told you otherwise.  
2. From your **Mac**, test reachability: `nc -vz YOUR_FTP_HOST 21` (or FileZilla). If **your home network** works but **Actions always ETIMEDOUT**, the block is likely **between GitHub and Hostinger**—ask Hostinger support whether FTP from **GitHub Actions** ([published IP ranges](https://api.github.com/meta)) can be allowed, or whether **SFTP/SSH deploy** is available on your plan.  
3. **Alternatives if FTP from CI stays blocked:** deploy with **[web-deploy](https://github.com/SamKirkland/web-deploy)** over **SSH** (if you have SSH to the account), run a **self-hosted** Actions runner on a network that can reach FTP, or build in CI and upload artifacts / use another host (e.g. object storage + CDN) that Actions can reach.

### 403 on `/projects`, `/about`, etc.

Static export outputs folders such as `out/projects/index.html`. Many shared hosts return **403** for `/projects` if they treat it as a directory, disable **Indexes**, and do not map the request to `index.html`. This repo sets **`trailingSlash: true`** and ships **`public/.htaccess`** into **`out/`** so rewrites and **`DirectoryIndex`** line up with that layout. Ensure **`out/.htaccess`** is actually on the server after FTP (some clients hide dotfiles—confirm in hPanel **File Manager**).

Detail pages are emitted as **`out/projects/<slug>/index.html`** (e.g. `fly-fix`, `speechinsight2`). There is **no** `/playground/` route anymore; old bookmarks to **`/playground/...`** need **redirect rules** on the host if you still want them to work.

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
