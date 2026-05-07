# Ecosystem Map — ianryankirk.com

Generated from source code analysis of all 12 landing pages.

---

## Page Overview Table

| Page Name | Route | Page Type | Primary CTA Destination | Lead Capture |
|-----------|-------|-----------|------------------------|--------------|
| Gmail + Claude Code | /gmail-claude | Lead Magnet (DownloadGate) | /downloads/gmail-claude/gmail-claude-guide.html | DownloadGate (email → download) |
| Business Clarity Coach | /clarity-coach | Tool Landing | https://ultimate-clarity-coach.vercel.app/ | None |
| Call Reflekt Agent | /call-reflekt | Tool Landing | https://call-reflekt-coach-production.up.railway.app/ | None |
| SLAP Method | /slap-method | Tool Landing | https://slap-method-production.up.railway.app/ | None |
| Objection Card App | /objection-cards | Tool Landing | https://objection-cards-app-production.up.railway.app/ | None |
| AI Foundation Field Guide | /ai-foundation | Sales Page | https://book.stripe.com/6oUeVe2kI63g8jVfLXew80a ($97) | Waitlist form (not a gate) |
| The 7-11-4 Rule | /7-11-4 | Lead Magnet (DownloadGate) | /downloads/7-11-4/7-11-4-framework.pdf | DownloadGate (email → PDF) |
| $558K Proof of Work | /558k | Social Proof | /contact (Book a Call) | None |
| 7-Figure Community Funnel | /7-figure-funnel | Lead Magnet (DownloadGate) | /downloads/7-figure-funnel/7-figure-funnel.html | DownloadGate (email → download) |
| The Facebook Playbook | /playbook | Lead Magnet (DownloadGate) | /downloads/facebook-playbook/facebook-playbook.html | DownloadGate (email → download) |
| Cold Email Copywriter | /cold-email-copywriter | Tool Landing | https://cold-email-copywriter-production.up.railway.app | Waitlist form (optional) |
| Push-Back Protocol | /push-back-protocol | Lead Magnet (DownloadGate) | /downloads/pushback-protocol/global-claude-md.txt | DownloadGate (email → files) |

---

## Internal Link Map (Cross-References Between Pages)

Pages that link to other ianryankirk.com pages (not counting navbar):

| Source Page | Links To | Anchor Text |
|-------------|----------|-------------|
| /gmail-claude | /contact | Apply for 1:1 Coaching → |
| /clarity-coach | /contact | Apply for 1:1 Coaching → |
| /call-reflekt | /contact | Apply for 1:1 Coaching → |
| /slap-method | /contact | Apply for 1:1 Coaching → |
| /objection-cards | /contact | Apply for 1:1 Coaching → |
| /ai-foundation | / (homepage) | ← Back to Ian Kirk |
| /7-11-4 | /contact | Apply for 1:1 Coaching → |
| /558k | /contact | Book a Call → (×2) |
| /558k | / (homepage) | ← Back to Ian Kirk |
| /7-figure-funnel | /contact | Apply to Work with Ian → |
| /7-figure-funnel | / (homepage) | ← Back to Ian Kirk |
| /playbook | *(none — external CTAs only)* | — |
| /cold-email-copywriter | /contact | Apply for 1:1 Coaching → |
| /push-back-protocol | *(none — external CTAs or DownloadGate only)* | — |

---

## Traffic Flow Diagram

```
External Traffic (YouTube, Facebook, Google, Ads)
         |
         ▼
  Landing Pages (Lead Magnets / Tool Pages)
         |
    [Email Capture]
    (DownloadGate or Waitlist form)
         |
         ├── → /downloads/* (immediate download)
         │
         └── → Supabase `waitlist` table
                  (lead_magnet_source tracks origin)
         |
         ▼
  Internal CTA → /contact  (Apply for 1:1 Coaching / Book a Call)
         |
         ▼
  External: book.stripe.com ($97 AI Foundation Session)
  or
  External: https://www.leadgenjay.com/book-ian (/playbook)
```

---

## Tool Cross-Reference Matrix

Which tools appear as cross-promotion on other pages?

| Tool | Promoted On |
|------|-------------|
| SLAP Method | /gmail-claude, /7-11-4 |
| Call Reflekt | /gmail-claude, /7-11-4, /playbook, /558k |
| Business Clarity Coach | /gmail-claude, /7-11-4, /playbook, /558k |
| Cold Email Copywriter | /gmail-claude, /7-11-4, /playbook |
| Objection Card App | /558k |

---

## 7-11-4 Ecosystem Connections

The `/7-11-4` page explicitly describes Ian's own 4-channel system and maps each content channel:

| Channel | Role | Content Type |
|---------|------|-------------|
| YouTube | Attract (hours-heavy) | Long-form framework videos |
| Facebook | Engage (touchpoints) | Short posts, Lives, community replies |
| This Website | Capture (multi-channel) | Framework pages, lead magnets, tools |
| Email | Nurture (close the loop) | Sequences built from every lead magnet |

This confirms the site itself is **the "Capture" channel** in Ian's 7-11-4 system — each lead magnet page serves as a touchpoint that collects email for the nurture sequence.

---

## DownloadGate Storage Keys (for deduplication)

Each DownloadGate uses a unique localStorage key to track whether a visitor has already unlocked:

| Page | Storage Key |
|------|-------------|
| /gmail-claude | `irk_downloaded_gmail_claude` |
| /7-11-4 | `irk_downloaded_7_11_4` |
| /7-figure-funnel | `irk_downloaded_7_figure_funnel` |
| /playbook | `irk_downloaded_facebook_playbook` |
| /push-back-protocol | `irk_downloaded_pushback_protocol` |
