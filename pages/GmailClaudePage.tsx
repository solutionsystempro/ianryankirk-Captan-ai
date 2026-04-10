import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

const STEPS = [
  {
    num: '01',
    title: 'Install gws CLI',
    body: 'Open your terminal and run:',
    code: 'npm install -g @googleworkspace/cli',
    note: 'Confirm it installed by running: gws --version — you should see a version number.',
  },
  {
    num: '02',
    title: 'Create a Google Cloud Project',
    body: null,
    steps: [
      'Go to console.cloud.google.com',
      'Sign in with your personal Gmail — not a work account',
      'Click the project dropdown at the top → New Project',
      'Name it something like Claude Gmail Setup',
      'Click Create and wait for it to finish',
    ],
  },
  {
    num: '03',
    title: 'Enable the Gmail API',
    body: null,
    steps: [
      'In your new project, go to APIs & Services → Library',
      'Search for Gmail API',
      'Click it → click Enable',
    ],
  },
  {
    num: '04',
    title: 'Configure the OAuth Consent Screen',
    body: null,
    steps: [
      'Go to APIs & Services → OAuth consent screen',
      'Select External → click Create',
      'Fill in: App name, User support email (your Gmail), Developer contact email (your Gmail)',
      'Click Save and Continue through Scopes (don\'t change anything)',
      'On Test Users — click Add Users and add the Gmail address you want to connect',
      'Click Save and Continue → Back to Dashboard',
    ],
    warning: 'If you skip the Test Users step, you\'ll get an "access denied" error when you authenticate.',
  },
  {
    num: '05',
    title: 'Create OAuth Credentials',
    body: null,
    steps: [
      'Go to APIs & Services → Credentials',
      'Click + Create Credentials → OAuth client ID',
      'Application type: Desktop app',
      'Name: Claude GWS CLI',
      'Click Create → Click Download JSON',
      'Save the file somewhere easy to find (Downloads folder works)',
    ],
  },
  {
    num: '06',
    title: 'Create a Config Folder',
    body: 'Create a dedicated folder where gws will store your credentials.',
    code: 'Mac / Linux: mkdir ~/.config/gws-gmail\nWindows PowerShell: mkdir C:/Users/YourName/.config/gws-gmail',
    note: 'Move the JSON file you downloaded into that folder and rename it exactly: client_secret.json — gws looks for that specific filename.',
  },
  {
    num: '07',
    title: 'Authenticate',
    body: 'Run this command to open the browser and link your account:',
    code: 'Mac / Linux:\nGOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws auth login\n\nWindows PowerShell:\n$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws auth login',
    note: 'Your browser will open. Sign in with the Gmail account you want Claude to manage and authorize the app.',
  },
  {
    num: '08',
    title: 'Verify It Worked',
    body: 'Run the status check:',
    code: 'Mac / Linux:\nGOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws auth status\n\nWindows PowerShell:\n$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws auth status',
    note: 'You should see your email address in the output. That confirms gws is connected to the right account.',
  },
  {
    num: '09',
    title: 'Test It',
    body: 'Pull the last 5 emails from your inbox to confirm everything is working:',
    code: 'Mac / Linux:\nGOOGLE_WORKSPACE_CLI_CONFIG_DIR=~/.config/gws-gmail gws gmail users messages list --params \'{"userId": "me", "labelIds": ["INBOX"], "maxResults": 5}\'\n\nWindows PowerShell:\n$env:GOOGLE_WORKSPACE_CLI_CONFIG_DIR="C:/Users/YourName/.config/gws-gmail"; gws gmail users messages list --params \'{"userId": "me", "labelIds": ["INBOX"], "maxResults": 5}\'',
    note: 'If you see emails — you\'re done.',
  },
  {
    num: '10',
    title: 'Create a Claude Code Project',
    body: null,
    steps: [
      'Create a new folder on your computer for this inbox, e.g. Email Wizard — Gmail',
      'Open that folder as a project in Claude Code',
      'Create a file called CLAUDE.md in the project root',
    ],
    code: '## Gmail Account\nThis project manages: your@gmail.com\n\n## Connection Setup (gws CLI)\n- Config dir: ~/.config/gws-gmail\n  (Windows: C:/Users/YourName/.config/gws-gmail)\n- Always prefix gws commands with the config dir\n\n## Important\nDo NOT use Gmail MCP tools in this project. Always use gws CLI only.',
    note: 'Claude will read this every time you open the project and know exactly which account to use.',
  },
];

const ERRORS = [
  {
    error: 'access_denied when signing in',
    fix: 'Go back to GCP → OAuth consent screen → Test Users and add your email',
  },
  {
    error: 'GOOGLE_WORKSPACE_CLI_CONFIG_DIR=value gws not working on Windows',
    fix: 'Use PowerShell syntax: $env:VAR="value"; gws',
  },
  {
    error: 'node: command not found',
    fix: 'Install Node.js from nodejs.org',
  },
  {
    error: 'gws: command not found',
    fix: 'Run npm install -g @googleworkspace/cli again',
  },
  {
    error: 'Connected to the wrong account',
    fix: 'Make sure you sign into the right Google account when the browser opens during gws auth login',
  },
];

const TOOLS = [
  {
    label: 'SLAP Method',
    desc: 'Turn ignored DMs into booked calls.',
    href: 'https://slap-method-production.up.railway.app/',
    cta: 'Try SLAP Method →',
  },
  {
    label: 'Call Reflekt',
    desc: 'Paste a sales call transcript. Get back exactly where you lost the frame.',
    href: 'https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0',
    cta: 'Analyze a Call →',
  },
  {
    label: 'Business Clarity Coach',
    desc: 'Stuck between ideas? Lock in your one clear path forward.',
    href: 'https://ultimate-clarity-coach.vercel.app/',
    cta: 'Get Clarity →',
  },
];

export function GmailClaudePage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="container-wide relative z-10 max-w-4xl">
          <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
            Free Framework · Gmail + Claude Code
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(48px,8vw,100px)] leading-[0.88] tracking-tighter mb-8"
          >
            Connect Gmail
            <br />
            <span className="text-warm-gray">to Claude Code</span>
          </motion.h1>
          <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-10">
            Give Claude full access to your inbox in about 15 minutes. One-time setup.
            No code required beyond copy-paste.
          </motion.p>

          {/* prereqs */}
          <motion.div {...fade(0.4)} className="glass-card p-6 max-w-xl">
            <p className="label-tag text-accent mb-4">Before You Start</p>
            <ul className="space-y-2">
              {[
                'A personal Gmail account (NOT a work/company account)',
                'Node.js installed — check by running node -v in your terminal',
                'Claude Code installed',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-warm-gray font-light">
                  <span className="text-accent mt-1 text-xs shrink-0">◆</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* STEPS */}
      <section className="pb-24 px-6">
        <div className="container-wide max-w-4xl space-y-8">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              {...fade(i * 0.05)}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                  <span className="font-display text-accent text-sm">{step.num}</span>
                </div>
                <h2 className="font-display text-2xl tracking-tight">{step.title}</h2>
              </div>

              {step.body && (
                <p className="text-warm-gray font-light mb-4">{step.body}</p>
              )}

              {'steps' in step && step.steps && (
                <ol className="space-y-2 mb-4">
                  {step.steps.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-warm-gray font-light">
                      <span className="text-accent/60 text-xs mt-1 shrink-0 font-display">{idx + 1}.</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              )}

              {'warning' in step && step.warning && (
                <div className="border border-yellow-500/20 bg-yellow-500/5 rounded-lg px-4 py-3 mb-4">
                  <p className="text-yellow-400/80 text-sm font-light">
                    <span className="font-medium">⚠ Note: </span>{step.warning}
                  </p>
                </div>
              )}

              {'code' in step && step.code && (
                <pre className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-off-white/80 font-mono overflow-x-auto mb-4 whitespace-pre-wrap">
                  {step.code}
                </pre>
              )}

              {step.note && (
                <p className="text-warm-gray/70 text-sm font-light italic">{step.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ERRORS TABLE */}
      <section className="py-24 bg-background-alt border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Troubleshooting</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter mb-10">
            Common Errors & Fixes
          </motion.h2>
          <motion.div {...fade(0.2)} className="space-y-3">
            {ERRORS.map((row) => (
              <div key={row.error} className="glass-card p-5 grid md:grid-cols-2 gap-4">
                <div>
                  <p className="label-tag text-warm-gray/60 mb-1">Error</p>
                  <code className="text-sm text-off-white/80 font-mono">{row.error}</code>
                </div>
                <div>
                  <p className="label-tag text-accent mb-1">Fix</p>
                  <p className="text-warm-gray font-light text-sm">{row.fix}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* WHAT'S NEXT — tool CTAs */}
      <section className="section-pad px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">What's Next</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            You've Got Claude
            <br />
            <span className="text-warm-gray">In Your Inbox.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Now put the full system to work. These tools are what Ian uses to close deals,
            diagnose calls, and sharpen his DM game — all free to try.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {TOOLS.map((tool, i) => (
              <motion.a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fade(i * 0.1)}
                className="glass-card-hover p-6 flex flex-col"
              >
                <p className="label-tag text-accent mb-3">{tool.label}</p>
                <p className="text-warm-gray font-light text-sm flex-1 mb-5">{tool.desc}</p>
                <span className="text-off-white text-sm font-medium">{tool.cta}</span>
              </motion.a>
            ))}
          </div>

          <motion.div {...fade(0.3)} className="text-center border-t border-white/10 pt-12">
            <p className="text-warm-gray font-light mb-6">
              Want Ian to build this kind of system around your specific business?
            </p>
            <Link to="/contact" className="btn-primary inline-block">
              Apply for 1:1 Coaching →
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
