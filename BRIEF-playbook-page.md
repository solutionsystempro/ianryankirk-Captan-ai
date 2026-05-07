# Page Brief — `/playbook`
## IRK Website | Lead Magnet Page
## Created: April 13, 2026

---

## Context

Ian posted a Facebook post (Post #1 — "The Platform Play", March 28, 2026) using the Kroeze comment-stack format. The CTA trigger word was **PLAYBOOK**. When someone comments "PLAYBOOK," Ian DMs them the link to this page.

There are already people waiting for this — the post generated real PLAYBOOK comments and Ian has been DMing the link manually. This page needs to go live as soon as possible.

---

## Route

`/playbook`

Full URL: `ianryankirk.com/playbook`

---

## Page Type

**LeadGate** — email capture gate (same pattern as `/gmail-claude`).

Blur/hide the playbook content behind a modal. User submits name + email to unlock.

**Important:** Use a unique `STORAGE_KEY` — do NOT reuse `irk_unlocked_gmail_claude`. Use `irk_unlocked_playbook` as the localStorage key. (See known issue in CLAUDE.md — the key must be passed as a prop.)

Save leads to Supabase `waitlist` table with a `source` field value of `facebook-playbook`.

---

## What the Page Delivers

This is the 5-step Facebook platform playbook that a multiple 7-figure operator walked Ian through in Cabo. The same operator built a 24,000-member Facebook Group, did $1.1M in a single day from it, and sold the whole thing in a multi-million dollar exit.

**Headline:** The Facebook Playbook

**Subheadline:** The exact 5-step system a multiple 7-figure operator walked me through in Cabo. He built a 24,000-member group and did $1.1M in a single day from it.

---

## The 5-Step Playbook Content
*(Revealed after email capture)*

---

### Step 1 — The 3-Post Bank

Posting daily sounds like a grind until you realize you can batch-create three posts in one sitting and have them ready to fire from a Google Doc.

The creators who show up every day aren't more inspired. They're more prepared.

Three posts in your back pocket means you never miss a day because you don't know what to write.

**Power quote:** Consistency beats perfection on Facebook.

---

### Step 2 — The Comment Stack Format

Stop writing essays in the post body. Hook. Numbered promise. Period.

Then drop each step as its own comment right after you post. More total reactions. More dwell time. More algorithmic reach. You create a thread people scroll through instead of scroll past.

The hook earns the click. The comments deliver the value. That's the whole game.

**Power quote:** The hook earns the click. The comments deliver the value.

---

### Step 3 — The 5,000 Friends Rule

Your Facebook friends list isn't a social network. It's a warm list you haven't activated yet.

Quality matters more than size. Friends from your niche, from events, from communities you're already in are worth 10x a random add.

You don't need a massive audience to make real money on Facebook. You need the right 1,000 people paying attention.

**Power quote:** You don't need a massive audience. You need the right 1,000 people paying attention.

---

### Step 4 — The Algorithm Shift That Changed Everything

Facebook quietly rewired how it ranks content. It's not about likes anymore. It's not about reach.

It's about comment activity. What's happening inside the thread.

Structure your content so the value lives in the comments. Every step you add, every follow-up you drop, the algorithm reads it as engagement and pushes your content to more people.

**Power quote:** Structure beats effort. Every time.

---

### Step 5 — The Platform Nobody's Fighting Over

Everyone in B2B got the memo that LinkedIn is "the professional network." So they all piled in. Cost per eyeball went up. Noise went up. Results went down.

Facebook users spend 2 hours a day on the platform. LinkedIn? 15 minutes. And the audience skews older, which usually means more money, more buying authority, and decisions that have already been made.

**Power quote:** The best opportunity is always where everyone else stopped looking.

---

## Page Structure

1. **Hero** — Headline + subheadline + social proof line ("Built a 24,000-member group. $1.1M in a single day. Here's what he showed me.")
2. **LeadGate modal** — Name + email to unlock. Google sign-in optional.
3. **Unlocked content** — The 5 steps, each as a glass card with step number, title, body copy, and power quote styled distinctly (accent color `#AAFF00`, italicized)
4. **Footer CTA** — "Want help building this for your business? [Book a clarity call]" — link to Ian's calendar

---

## Design Notes

- Follow existing design tokens: background `#08080B`, accent `#AAFF00`, surface `#16161E`
- Use `glass-card` pattern for each step
- Step numbers large and accent-colored
- Power quotes visually distinct — italic, accent color, slightly larger font
- Keep the same Framer Motion scroll animation pattern as `/ai-foundation`
- Background color suggestion for hook graphic if needed: purple-to-magenta gradient `#7B2FF7` → `#F107A3` (matches the Post #1 hook graphic)

---

## Source Post

**Post #1 — The Platform Play**
File: `C:\Users\ensan\Dev\CONTENT - Creator FB\FB-Post-1-Platform-Play.md`
Posted: March 28, 2026
Trigger word: PLAYBOOK
Platform: Facebook
