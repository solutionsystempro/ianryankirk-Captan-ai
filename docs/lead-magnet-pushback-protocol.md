# Lead Magnet Page Spec: The Push-Back Protocol

**Route:** `/push-back-protocol`
**Type:** Public page with email-gated PDF download (same model as `/gmail-claude`)
**Created:** April 15, 2026
**Priority:** Build this week (paired with YouTube tutorial)

---

## What This Page Is

A bookmarkable resource page teaching Claude Code users how to stop AI from being a yes-man. The page itself is the value. The PDF download and CLAUDE.md starter kit are the email-gated bonus.

**Target audience:** Solo founders, agency owners, and power users transitioning from ChatGPT to Claude Code. Gen X demographic. Captain AI community.

---

## Page Structure

### Section 1: Hero
- **Tag:** `FREE RESOURCE`
- **Headline:** "Stop Claude From Agreeing With Everything You Say"
- **Subheadline:** "The 12-rule protocol that forces Claude Code to challenge your thinking, catch your blind spots, and push your work past good enough."
- **Primary CTA:** Scroll to content (anchor link, not a gate)
- **Secondary CTA:** "Download the Starter Kit" (email gate)

### Section 2: The Problem
- **Heading:** "AI Trained You to Accept Yes"
- **Content (3-4 short paragraphs covering):**
  - ChatGPT and Claude default to agreement. They validate weak ideas.
  - You've shipped features, written copy, made business decisions where AI nodded along when it should have pushed back.
  - The cost isn't obvious until you realize every "great idea!" response was a missed chance to catch a bad assumption.
  - This isn't a Claude problem. It's a configuration problem. Claude Code reads a file called CLAUDE.md at the start of every session. If that file doesn't tell it to challenge you, it won't.

### Section 3: Before & After
- **Heading:** "Same Prompt. Different Config."
- **Layout:** Two glass-card columns side by side (mobile: stacked)
- **Left card:** "Without Push-Back Protocol" — screenshot of Claude giving a generic agreeable response to a business idea
- **Right card:** "With Push-Back Protocol" — screenshot of Claude identifying 2 weaknesses, scoring feasibility 6/10, asking what would need to be true for the idea to fail
- **Caption below:** "The difference is 12 lines in one file."
- **Note for build:** Ian will need to capture these screenshots. Prompt suggestion: "I want to build a SaaS that helps freelancers track their invoices. What do you think?"

### Section 4: The 12 Rules (main content)
- **Heading:** "The Push-Back Protocol"
- **Layout:** Numbered list with glass-card styling per rule. Each rule gets:
  - Rule number + name (bold)
  - One-sentence explanation
  - Example of what Claude says when following this rule (italic or muted text)

**The 12 rules:**

1. **Challenge-first rule.** Before agreeing with any premise, identify at least 2 specific weaknesses or risks.
   _Example: "Two risks here. First, invoice tracking is commoditized. Second, freelancers are notoriously resistant to paying for tools they can build in a spreadsheet."_

2. **Score my reasoning.** Rate approaches 1-10 for feasibility and explain why it's not a 10.
   _Example: "I'd rate this a 5/10. Here's why it's not higher..."_

3. **Ask the hard question.** For every major decision: "What would need to be true for this to fail?"
   _Example: "What would need to be true for this to fail? If freelancers already have a tool they're happy with. Have you validated that they don't?"_

4. **No sycophancy.** No opening praise unless backed by specific evidence.

5. **Devil's advocate by default.** Present the strongest counterargument before supporting your position.

6. **Flag pattern-matching.** Call it out when you're reusing a past solution without evaluating fit.

7. **Tone rules.** Clear, direct, active voice. No filler. No banned AI words.

8. **Validate before answering.** If uncertain, say so. Don't guess.

9. **Surface blind spots.** After every analysis, state what's missing and what you haven't considered.

10. **Push for better.** After delivering a solution, follow up with how it could be improved.

11. **Chase the 11/10.** Once something is strong, ask what takes it beyond that. Keep stacking.

12. **Catch incomplete thinking.** If you trail off mid-thought, Claude asks you to finish it.

### Section 5: Where These Rules Live (the framework)
- **Heading:** "Global vs. Project-Level: Where Your Instructions Go"
- **Content:** Explain the mental model:
  - `~/.claude/CLAUDE.md` = global. Loads every session. Behavioral rules go here.
  - `your-project/CLAUDE.md` = project-level. Loads only in that project. Tech stack, architecture, deploy patterns go here.
  - Cowork user preferences = separate system. Doesn't read CLAUDE.md. Needs its own copy.
  - Claude.ai chat = no equivalent. You're on your own.
- **Visual:** Simple diagram showing the three systems and what flows where. Use Framer Motion fade-in.

### Section 6: Test Your Setup (interactive)
- **Heading:** "How Broken Is Your Claude Code Config?"
- **Layout:** 5 yes/no questions in glass cards. User clicks yes or no. Score tallies live.
- **Questions:**
  1. Do you have a file at `~/.claude/CLAUDE.md`? (If no: -2)
  2. Does it contain behavioral rules (not just plugin config)? (If no: -2)
  3. Do you have project-level CLAUDE.md files in your active projects? (If no: -1)
  4. Are your behavioral rules duplicated across project files instead of global? (If yes: -1)
  5. Have you tested whether Claude actually pushes back when you give it a weak idea? (If no: -2)
- **Scoring:** 8-10 = "Your setup is solid." / 5-7 = "You have gaps." / 0-4 = "Claude is a yes-man. Download the starter kit."
- **CTA after score:** "Download the Push-Back Protocol Starter Kit" (email gate triggers here)

### Section 7: Download CTA (email gate on download only)
- **Heading:** "Get the Starter Kit"
- **What's in the kit:**
  - PDF of this entire page (printable, bookmarkable)
  - Ready-to-paste CLAUDE.md with all 12 rules
  - Cowork preferences block (copy-paste ready)
  - 5-question self-audit checklist
  - Project-level CLAUDE.md template (blank, with comments explaining what goes where)
- **Gate pattern:** NOT the current LeadGate wrapper. All page content is fully visible and bookmarkable. The email gate ONLY triggers when the user clicks "Download the Starter Kit."
- **New component needed: `DownloadGate`** — A modal that appears on download button click. Same form fields as LeadGate (name + email + Google sign-in). On submit: saves to Supabase `waitlist` table, then auto-triggers the file download immediately. User expects "I'm giving my email to get the file emailed to me" but the download just starts in-browser. Email goes to Supabase for list building.
- **Supabase insert fields:** `email`, `app_website_source: 'captainai-website'`, `lead_magnet_source: 'push-back-protocol'`
- **localStorage key:** `irk_downloaded_pushback_protocol` — after first download, hide the form and show a direct download button on return visits.
- **This is the new standard pattern.** The old LeadGate (blur-everything) should be retired across the site. See the 7-11-4 migration note below.

### Section 8: YouTube Embed (add after video publishes)
- **Heading:** "Watch the Full Tutorial"
- **Embed:** YouTube video placeholder. Add the embed URL after publish.

---

## Design Notes

- Follow existing design tokens from `tailwind.config.js` (background #08080B, accent #AAFF00, etc.)
- Use `glass-card` and `glass-card-hover` classes for rule cards and quiz cards
- Framer Motion scroll animations matching other pages
- Mobile-first. Before/after screenshots stack vertically on mobile.
- Quiz section: no backend needed. Pure React state. Score calculates client-side.

---

## Assets Needed From Ian

- [ ] Before screenshot: Claude response WITHOUT push-back rules
- [ ] After screenshot: Claude response WITH push-back rules
- [ ] Same prompt used for both (suggested: "I want to build a SaaS that helps freelancers track their invoices")
- [ ] Approve final copy before build
- [ ] Confirm Supabase table/column for this lead magnet's email captures

---

## Files to Include in Downloadable Starter Kit

Create these as static files served from `/public/downloads/pushback-protocol/`:

1. `pushback-protocol.pdf` — PDF render of page content
2. `global-claude-md.txt` — The 12 rules formatted for CLAUDE.md (rename to CLAUDE.md after download)
3. `cowork-preferences.txt` — The Cowork user preferences block
4. `project-claude-md-template.txt` — Blank project-level template with comments
5. `setup-audit-checklist.pdf` — The 5-question self-audit as a one-page PDF

---

---

## Migration: Change 7-11-4 Page to New Gate Pattern

The `/seven-eleven-four` page currently uses `<LeadGate>` wrapping all content (full blur, nothing visible until email). Change it to match the new pattern:

1. Remove the `<LeadGate>` wrapper from `SevenElevenFourPage.tsx`
2. Make all content freely visible and bookmarkable
3. Add a "Download the 7-11-4 Framework PDF" button in the CTA section
4. That button triggers the new `<DownloadGate>` modal (email capture on download only)
5. Same Supabase insert, different `lead_magnet_source: '7-11-4-rule'`
6. localStorage key: `irk_downloaded_7_11_4`

Apply this same pattern to ALL future lead magnet pages. The blur-gate model is retired.

---

## Connected Content

- **YouTube tutorial:** Being produced in `CONTENT - Creator YT` project. Embed after publish.
- **Companion YouTube video:** Screen-share tutorial walking through the same setup process.
- **Captain AI community:** Post announcement on publish day.
