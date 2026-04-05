# Ron Gurfinkel — Portfolio

Personal site and project hub: **Next.js** (App Router), **React**, **TypeScript**, and **Tailwind CSS**. Content is statically generated and shipped as plain HTML/CSS/JS—fast, cache-friendly, and easy to host anywhere.

## Features

- **Bilingual UI** — English and Hebrew, with RTL layout and copy where needed  
- **Light / dark themes** — System preference and manual toggle, tuned backgrounds for both  
- **Projects & playground** — Featured work, GitHub links, and detail pages for selected builds  
- **Career timeline** — Roles and highlights with an accessible modal flow  
- **Contact** — Landing section with a contact form; `/contact` redirects to `#contact` for legacy links  

## Tech stack

| Layer        | Choice                                      |
| ------------ | ------------------------------------------- |
| Framework    | Next.js 16 (App Router)                     |
| UI           | React 18, Tailwind CSS 3, Lucide icons      |
| Language     | TypeScript                                  |
| Distribution | **`output: "export"`** → static files in `out/` |

## Project layout

```text
src/
  app/           # Routes, layouts, global styles
  components/    # Header, footer, sections, modals, etc.
  contexts/      # Theme, locale
  data/          # Projects, playground, translations, landing copy
  hooks/         # Shared hooks (e.g. RTL helpers)
  lib/           # Utilities (hash navigation, etc.)
public/          # Static assets
deploy/          # Optional Docker/Caddy notes for other services
```

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Edit files under `src/`; the dev server hot-reloads.

## Production build

```bash
npm run build
```

Static output is written to **`out/`**. Deploy that folder to any static host (object storage + CDN, Netlify, Vercel, traditional FTP, etc.).

```bash
npm run lint    # ESLint
```

## Deployment (GitHub Actions)

On **push to `main`**, `.github/workflows/deploy.yml` installs dependencies, runs **`npm run build`**, and uploads the **`out/`** directory to your Hostinger site via **FTP** using repository secrets:

| Secret          | Purpose        |
| --------------- | -------------- |
| `FTP_SERVER`    | FTP hostname   |
| `FTP_USERNAME`  | FTP user       |
| `FTP_PASSWORD`  | FTP password   |

Remote path is configured as **`/public_html/`** in the workflow (adjust there if your host uses a different web root).

## Requirements

- **Node.js** 18+ recommended (matches Next.js expectations)

---

Built for clarity and maintainability—data-driven pages live under `src/data/` so copy and project metadata stay easy to update.
