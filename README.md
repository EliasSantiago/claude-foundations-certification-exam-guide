# Claude Certified Architect — Foundations Study Guide

An intuitive, responsive study companion for the **Claude Certified Architect –
Foundations** certification, built with Next.js and Tailwind CSS. It turns the
exam guide into something you can navigate, skim, and practice against.

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

## Tech

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- Zero external UI dependencies — the Claude starburst is a hand-built SVG.

## Design

A warm, almost-black palette paired with Claude's signature coral
(`#d97757`) on a soft cream paper tone. Fully responsive with a collapsible
mobile drawer.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production
```

## Project structure

```
app/
  page.tsx              # Home (logo)
  (guide)/              # Sidebar layout + content pages
    overview/  scenarios/  domains/
    questions/  exercises/  appendix/
components/
  ClaudeLogo.tsx        # SVG starburst mark
  Sidebar.tsx           # Responsive navigation
  DomainSection.tsx     # Expandable task statements
  Quiz.tsx              # Interactive practice questions
  PageShell.tsx         # Page header + prev/next nav
lib/
  content.ts            # All guide content as structured data
```
