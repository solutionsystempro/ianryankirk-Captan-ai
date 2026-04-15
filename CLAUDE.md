# SITE — IRK Website

Ian's personal brand + tool showcase site. Built with React + Vite + Tailwind + Framer Motion. Deployed on Vercel.

---

## Stack

- **Framework:** React + TypeScript + Vite
- **Styling:** Tailwind CSS (custom design tokens — see `tailwind.config.js`)
- **Animation:** Framer Motion
- **Database:** Supabase (`lib/supabase.ts`) — used for lead capture
- **Routing:** React Router v6
- **Deploy:** Vercel (`vercel.json`)

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| `background` | `#08080B` | Page background |
| `accent` | `#AAFF00` | Neon green — primary brand color |
| `off-white` | `#EFEFEF` | Body text |
| `warm-gray` | `#7A7A8C` | Secondary text |
| `surface` | `#16161E` | Card backgrounds |

Key CSS classes: `glass-card`, `glass-card-hover`, `btn-primary`, `btn-secondary`, `label-tag`, `font-display`

---

## Pages & Routes

| Route | Component | Type | Notes |
|-------|-----------|------|-------|
| `/` | `HomePage` | Public | Main landing |
| `/about` | `AboutPage` | Public | |
| `/contact` | `ContactPage` | Public | |
| `/gmail-claude` | `GmailClaudePage` | **LeadGate** | Email capture → free guide |
| `/clarity-coach` | `ClarityCoachPage` | Public | Links to external app |
| `/call-reflekt` | `CallReflektPage` | Public | Links to external app |
| `/slap-method` | `SlapMethodPage` | Public | Links to external app |
| `/objection-cards` | `ObjectionCardsPage` | Public | Links to external app |
| `/ai-foundation` | `AIFoundationFieldGuidePage` | **Public** | Lead magnet → Stripe → Calendly |

---

## Page Patterns

### `ToolLandingPage` (simple wrapper)
Used by: Clarity Coach, Call Reflekt, SLAP Method, Objection Cards
Props: `tag`, `headline`, `subheadline`, `description`, `features[]`, `ctaText`, `ctaHref`, `price`

### `LeadGate` (email capture gate)
Used by: `/gmail-claude`
Blurs content behind a modal until user submits name + email (or Google sign-in).
Saves to Supabase `waitlist` table. Stores unlock state in localStorage.
**Known issue:** `STORAGE_KEY` is hardcoded as `irk_unlocked_gmail_claude` in the component — all LeadGate pages share the same key. If adding a new gated page, this needs a prop to accept a custom key.

### Custom full pages
Used by: `/gmail-claude`, `/ai-foundation`
Built from scratch with Framer Motion scroll animations, glass cards, section structure.

---

## AI Foundation Field Guide Page — `/ai-foundation`

**Created:** April 10, 2026
**Purpose:** Lead magnet web page for Ian's $97 AI Foundation Session (Workshop 2)

### What it is
A fully public (no email gate) content-rich page that shows the complete AI Foundation session framework — phases, key questions, Power Offer Statement formula, mechanism naming rules, and the Foundation Doc template. The content itself demonstrates the value of the session.

### Why no LeadGate
This page converts to a **paid** offer ($97). The Field Guide content is the sales tool, not the product. Gating it creates friction before the purchase decision. Free guides get gated; sales pages don't.

### CTA Flow
Page CTA → **Stripe payment link** (`book.stripe.com/6oUeVe2kI63g8jVfLXew80a`) → Stripe redirect → **GoHighLevel calendar**

Stripe `success_url` is set in the Stripe dashboard and redirects to Ian's GHL booking calendar after payment.

### Launch checklist — all complete
- [x] Stripe payment link live in hero + CTA section
- [x] Stripe `success_url` set to GHL calendar
- [x] Secondary "Not ready yet? Get on the waitlist" inline form added below main CTA — saves to Supabase `waitlist` table with `lead_magnet_source: 'ai-foundation-waitlist'`

### Page structure
1. Hero — headline + session CTA
2. The Core Problem — why fragments fail
3. Power Offer Statement formula — with weak → strong comparison cards
4. 6-Phase accordion — expandable phases with key questions + output per phase
5. Mechanism Naming Rules — 5 rules with examples
6. Foundation Doc Template — monospace mockup of the completed document
7. CTA close — "Built Live. With You. In 90 Minutes."

### Connected ecosystem
The AI Foundation Session is Workshop 2 in the CoWork ecosystem. Full context lives in:
- `C:\Users\ensan\Dev\01 - Claude CoWork\` — session system prompt, launch posts, conversation arcs, DOCX offer doc generator
- `C:\Users\ensan\.claude\projects\c--Users-ensan-Dev-AntiGravity-Overview-Tasks\memory\project_cowork_ecosystem.md` — full brainstorm memory

---

## Dev Commands

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # preview production build
```
