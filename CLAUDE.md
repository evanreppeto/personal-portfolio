# CLAUDE.md

Instructions for Claude Code when working in this repository.

## Project Overview

Evan Reppeto's personal portfolio website, targeting technical job recruiters. AI-first focus — highlights autonomous agents, LLM development, and the MEng AI application.

Stack: Next.js 14, TypeScript, Tailwind CSS 3, Framer Motion, lucide-react. Deployed on Vercel.

## Project Structure

```
app/
  layout.tsx              — metadata, font setup
  page.tsx                — composes all sections
  globals.css             — custom utilities (gradient-text, dot-pattern, card-shine)
  api/contact/route.ts    — contact form API (stub — needs email service wired up)
components/
  Navbar.tsx              — sticky glassmorphism navbar
  Hero.tsx                — animated particle canvas + typewriter role cycling + CTAs
  About.tsx               — stats row + 4 highlight cards
  Skills.tsx              — 3 category skill grid (AI & ML focused)
  Projects.tsx            — 3 project cards
  Contact.tsx             — form + social links sidebar
```

## Design System

- **Background:** dark slate `#0a0f1e`
- **Accents:** indigo → violet → cyan (consistent per section)
- **Theme:** dark only; do not add light mode
- **Animations:** slide-up + fade-in defined in `tailwind.config.ts`; card-shine in `globals.css`

## Commands

```bash
npm run dev     # start dev server
npm run build   # production build
npm run lint    # lint
```

## Important Notes

- Use `next.config.mjs` — Next.js 14 does not support `next.config.ts`

---

## Manual Setup — Things YOU Must Fill In

These are placeholders in the code that require your real information:

### 1. Resume PDF
**Where:** `public/resume.pdf`
**Action:** Place your resume PDF at this path. The "Download Resume" button and navbar Resume link both point to `/resume.pdf`.

### 2. Your Real Email Address
Currently set to `evan.reppeto@email.com` — update in **two places**:

| File | Line | What to change |
|------|------|----------------|
| `components/Contact.tsx` | Line 18 | `handle` field in the socials array → your real email |
| `components/Contact.tsx` | Line 18 | `href: "mailto:..."` → `mailto:your@email.com` |
| `components/Hero.tsx` | Line 163 | `href="mailto:evan.reppeto@email.com"` |
| `app/api/contact/route.ts` | Line 29 | The `to:` field in the Resend example |

### 3. GitHub Username
**Where:** `components/Hero.tsx:152` and `components/Contact.tsx:13`
Current value: `evanreppeto` — verify this matches your actual GitHub handle.

### 4. LinkedIn Username
**Where:** `components/Hero.tsx:162` and `components/Contact.tsx:17`
Current value: `evanreppeto` — verify this matches your actual LinkedIn handle.

### 5. Contact Form Email (Backend)
**Where:** `app/api/contact/route.ts`
Right now the form accepts submissions but never sends them anywhere. To make it actually email you:

**Option A — Resend (recommended, free tier available):**
```bash
npm install resend
```
Then in `app/api/contact/route.ts`, uncomment the Resend block and set:
- `RESEND_API_KEY` in your `.env.local` / Vercel environment variables
- Your real email in the `to:` field

**Option B — Formspree (no backend code needed):**
Change the form action in `components/Contact.tsx` to point directly at your Formspree endpoint and remove the `/api/contact` fetch call.

### 6. Autonomous AI Scientist — GitHub Link
**Where:** `components/Projects.tsx` line ~16
If your capstone repo is public, replace `link: null` with `link: "https://github.com/evanreppeto/your-repo"`.
