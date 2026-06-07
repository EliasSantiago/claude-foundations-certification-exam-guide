# Claude Certified Architect — Foundations Study Guide

An intuitive, responsive study companion for the **Claude Certified Architect –
Foundations** certification, built with Next.js and Tailwind CSS. It turns the
exam guide into something you can navigate, skim, and practice against — and now
a full study **system**: create an account, log in, and track which topics
you've completed across every domain, scenario, and exercise.

> Unofficial study companion. Content is summarized from the Foundations exam
> guide (v0.1) for study purposes.

## What's inside

- **Home** — the Claude mark on warm near-black, with a single entry point.
- **Overview** — intro, target candidate, scoring, and domain weighting bars.
- **Scenarios** — the 6 production scenarios the exam draws from.
- **Domains** — all 5 scored domains with expandable task statements
  (knowledge + skills).
- **Practice Questions** — 12 interactive sample questions with answer checking,
  explanations, and a live running score against the 72% passing line.
- **Exercises** — 4 hands-on labs mapped to the domains they reinforce.
- **Appendix** — technologies, in/out-of-scope topics, and prep recommendations.
- **Accounts & progress** — sign up (name, WhatsApp optional, email, password +
  confirmation), log in, and check off completed study items. Progress is saved
  per user and shown as live completion bars on the Overview dashboard, the
  sidebar, and each section.

## Tech

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com) components, themed to the Claude palette
- [Auth.js (NextAuth v5)](https://authjs.dev) — credentials + JWT sessions
- [Drizzle ORM](https://orm.drizzle.team) on [Neon](https://neon.tech) Postgres
- TypeScript

## Database & auth setup

The app reads its database connection and auth secret from environment
variables. Copy the example file and fill it in:

```bash
cp .env.example .env.local
```

| Variable       | What it is                                                        |
| -------------- | ----------------------------------------------------------------- |
| `DATABASE_URL` | Neon (Postgres) connection string — use the **pooled** URL.       |
| `AUTH_SECRET`  | Secret for signing session JWTs. Generate with `npx auth secret`. |

**Create the Neon database:**

1. Either add the Neon integration on Vercel (**Project → Storage → Create
   Database → Neon**), which injects `DATABASE_URL` automatically, or create a
   project directly at [neon.tech](https://neon.tech) and copy its connection
   string.
2. Apply the schema:

   ```bash
   npm run db:migrate     # runs the generated SQL migration against DATABASE_URL
   # or, for a quick prototype:
   npm run db:push        # pushes the schema directly without a migration file
   ```

   Drizzle scripts: `db:generate` (create a migration from the schema),
   `db:migrate`, `db:push`, and `db:studio`.

The schema lives in `lib/db/schema.ts` (a `users` table and a `progress` table).

## Design

A warm, almost-black palette paired with Claude's signature coral
(`#d97757`) on a soft cream paper tone. Fully responsive with a collapsible
mobile drawer.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL and AUTH_SECRET
npm run db:migrate           # apply the schema to Neon
npm run dev                  # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Project structure

```
app/
  page.tsx              # Home (logo + sign-in entry points)
  (auth)/               # Centered auth layout
    login/  register/   # Sign-in & sign-up pages (shadcn forms)
  (guide)/              # Sidebar layout + content pages
    overview/  scenarios/  domains/
    questions/  exercises/  appendix/
  api/
    auth/[...nextauth]/ # Auth.js route handlers
    register/           # Sign-up endpoint (hashes password, creates user)
    progress/           # GET/POST a user's completed study items
auth.ts                 # Auth.js (NextAuth v5) configuration
components/
  Sidebar.tsx           # Responsive navigation + user menu + progress meter
  UserMenu.tsx          # Avatar dropdown / login + register buttons
  DomainSection.tsx     # Expandable task statements with completion checkboxes
  progress-ui.tsx       # Dashboard, section bars, study checkboxes
  progress-provider.tsx # Client store: loads & toggles per-user progress
  providers.tsx         # SessionProvider + ProgressProvider
  Quiz.tsx              # Interactive practice questions
  PageShell.tsx         # Page header + prev/next nav
  ui/                   # shadcn/ui components (button, card, input, …)
lib/
  content.ts            # All guide content as structured data
  progress.ts           # Study-item keys + completion math
  validations.ts        # Zod schemas (register, login, progress)
  db/                   # Drizzle client (Neon) + schema
drizzle/                # Generated SQL migrations
```
