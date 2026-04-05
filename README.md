# rongurfinkel.com (Phase 1)

Static personal website and playground hub. Built with Next.js (App Router), React, Tailwind CSS, and TypeScript.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build (static export)

```bash
npm run build
```

Output is in `out/` — deploy to any static host (Vercel, Netlify, GitHub Pages).

## Structure

- **/** — Home (intro, links to Projects & Playground)
- **/projects** — Featured projects with descriptions and GitHub links
- **/playground** — Hub for real services; each item has a status badge (Live / Offline / Deployable · Live in Phase 2)
- **/playground/[slug]** — Project detail (e.g. SpeechInsight2: overview, architecture, stack, GitHub)
- **/about** — Short bio
- **/contact** — Contact (mailto; form in Phase 2)

Data lives in `src/data/` (types, projects, playground). Phase 2 will add live deployment and optional demo links/embeds.
