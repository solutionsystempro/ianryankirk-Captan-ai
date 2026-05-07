[//]: # (URL: https://ianryankirk.com/gmail-claude)

# Page Metadata

**Page Type:** Lead Magnet (DownloadGate — email capture unlocks downloadable guide)
**Page Title:** Connect Gmail to Claude Code
**Meta Description:** (not explicitly set — inferred) Give Claude full access to your inbox in about 15 minutes. One-time setup. No code required beyond copy-paste.

---

# Hero

**Label Tag:** Free Framework · Gmail + Claude Code

## Connect Gmail
### to Claude Code

Give Claude full access to your inbox in about 15 minutes. One-time setup. No code required beyond copy-paste.

**CTA Buttons:**
- [Read the Guide →](#the-guide) — anchors to step-by-step guide section
- [Download the Guide](#) — triggers DownloadGate email capture modal

### Before You Start

- A personal Gmail account (NOT a work/company account)
- Node.js installed — check by running node -v in your terminal
- Claude Code installed

---

# The Guide — Step by Step

## 01 Install gws CLI

Open your terminal and run:

```
npm install -g @googleworkspace/cli
```

Confirm it installed by running: gws --version — you should see a version number.

---

## 02 Create a Google Cloud Project

1. Go to console.cloud.google.com
2. Sign in with your personal Gmail — not a work account
3. Click the project dropdown at the top → New Project
4. Name it something like Claude Gmail Setup
5. Click Create and wait for it to finish

---

## 03 Enable the Gmail API

1. In your new project, go to APIs & Services → Library
2. Search for Gmail API
3. Click it → click Enable

---

## 04 Configure the OAuth Consent Screen

1. Go to APIs & Services → OAuth consent screen
2. Select External → click Create
3. Fill in: App name, User support email (your Gmail), Developer contact email (your Gmail)
4. Click Save and Continue through Scopes (don't change anything)
5. On Test Users — click Add Users and add the Gmail address you want to connect
6. Click Save and Continue → Back to Dashboard

**⚠ Note:** If you skip the Test Users step, you'll get an "access denied" error when you authenticate.

---

## 05 Create OAuth Credentials

1. Go to APIs & Services → Credentials
2. Click + Create Credentials → OAuth client ID
3. Application type: Desktop app
4. Name: Claude GWS CLI
5. Click Create → Click Download JSON
6. Save the file somewhere easy to find (Downloads folder works)

---

## 06 Create a Config Folder

Create a dedicated folder where gws will store your credentials.

```
Mac / Linux: mkdir ~/.config/gws-gmail
Windows PowerShell: mkdir C:/Users/YourName/.config/gws-gmail
```

Move the JSON file you downloaded into that folder and rename it exactly: client_secret.json — gws looks for that specific filename.

---

## 07 Authenticate

Run this command to open the browser and link your account:

```
Mac / Linux:
GOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws auth login

Windows PowerShell:
$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws auth login
```

Your browser will open. Sign in with the Gmail account you want Claude to manage and authorize the app.

---

## 08 Verify It Worked

Run the status check:

```
Mac / Linux:
GOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws auth status

Windows PowerShell:
$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws auth status
```

You should see your email address in the output. That confirms gws is connected to the right account.

---

## 09 Test It

Pull the last 5 emails from your inbox to confirm everything is working:

```
Mac / Linux:
GOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws gmail users messages list --params '{"userId": "me", "labelIds": ["INBOX"], "maxResults": 5}'

Windows PowerShell:
$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws gmail users messages list --params '{"userId": "me", "labelIds": ["INBOX"], "maxResults": 5}'
```

If you see emails — you're done.

---

## 10 Create a Claude Code Project

1. Create a new folder on your computer for this inbox, e.g. Email Wizard — Gmail
2. Open that folder as a project in Claude Code
3. Create a file called CLAUDE.md in the project root

```
## Gmail Account
This project manages: your@gmail.com

## Connection Setup (gws CLI)
- Config dir: ~/.config/gws-gmail
  (Windows: C:/Users/YourName/.config/gws-gmail)
- Always prefix gws commands with the config dir

## Important
Do NOT use Gmail MCP tools in this project. Always use gws CLI only.
```

Claude will read this every time you open the project and know exactly which account to use.

---

# Troubleshooting

## Common Errors & Fixes

| Error | Fix |
|-------|-----|
| access_denied when signing in | Go back to GCP → OAuth consent screen → Test Users and add your email |
| GOOGLE_WORKSPACE_CLI_CONFIG_DIR=value gws not working on Windows | Use PowerShell syntax: $env:VAR="value"; gws |
| node: command not found | Install Node.js from nodejs.org |
| gws: command not found | Run npm install -g @googleworkspace/cli again |
| Connected to the wrong account | Make sure you sign into the right Google account when the browser opens during gws auth login |

---

# What's Next

## You've Got Claude
### In Your Inbox.

Now put the full system to work. These tools are what Ian uses to close deals, diagnose calls, and sharpen his DM game — all free to try.

### SLAP Method
Turn ignored DMs into booked calls.
**CTA:** [Try SLAP Method →](https://slap-method-production.up.railway.app/) — external link

### Call Reflekt
Paste a sales call transcript. Get back exactly where you lost the frame.
**CTA:** [Analyze a Call →](https://call-reflekt-coach-production.up.railway.app/) — external link

### Business Clarity Coach
Stuck between ideas? Lock in your one clear path forward.
**CTA:** [Get Clarity →](https://ultimate-clarity-coach.vercel.app/) — external link

### Cold Email Copywriter
Write cold emails that get replies. Poke The Bear framework, reply-focused CTAs, no AI fluff.
**CTA:** [Write Cold Emails →](https://cold-email-copywriter-production.up.railway.app) — external link

---

Want Ian to build this kind of system around your specific business?

**CTA:** [Apply for 1:1 Coaching →](https://ianryankirk.com/contact) — internal link to /contact
**CTA:** [Download the Guide](#) — triggers DownloadGate email capture modal

---

## Internal Links Found On This Page

| Anchor Text | Destination URL |
|-------------|-----------------|
| Apply for 1:1 Coaching → | https://ianryankirk.com/contact |
