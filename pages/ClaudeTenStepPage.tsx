import React from 'react';
import { motion } from 'framer-motion';
import { DownloadGate } from '../components/DownloadGate';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

const DOWNLOAD_URL = '/downloads/claude-10-step/claude-10-step-setup-guide.html';
const STORAGE_KEY = 'irk_downloaded_claude_10_step';
const LEAD_SOURCE = 'claude-10-step';
const YOUTUBE_VIDEO_ID = 'IHXEN8_KsMQ';

// ─── Data ──────────────────────────────────────────────────────────────────

const STEPS = [
  { num: '01', title: 'Sign up at claude.ai', detail: 'Free account to get started.' },
  { num: '02', title: 'Upgrade to Pro', detail: 'Start here. Move to Max once you\'re hitting limits during the workday.' },
  { num: '03', title: 'Install the desktop app', detail: 'Mac or Windows. Required for Cowork, Code Execution, pinned workflows, and local file access.' },
  { num: '04', title: 'Install the mobile app', detail: 'iOS or Android. Voice notes, prompts between meetings, drafting on a walk.' },
  { num: '05', title: 'Turn on Memory', detail: 'Settings → Capabilities. So Claude actually remembers you.' },
  { num: '06', title: 'Connect your top 3 tools', detail: 'Calendar, Gmail, Notion is a solid start.' },
  { num: '07', title: 'Enable Code Execution', detail: 'Unlocks Skills.' },
  { num: '08', title: 'Set up 3 to 5 Projects', detail: 'For your most-used workflows. Read the next section before you do this. There\'s a trap most people fall into.' },
  { num: '09', title: 'Tell Claude 5 things to remember about you', detail: 'Your business, niche, brand voice, clients, daily routine.' },
  { num: '10', title: 'Run your first daily planning session', detail: 'Open the planning Project. Start a new chat. Tell Claude what\'s on your plate.' },
];

const PLANS = [
  { name: 'Free', price: '$0', period: 'limited usage', desc: 'Good for kicking the tires. Don\'t run a business on it.', recommended: false },
  { name: 'Pro · Start Here', price: '$20', period: '$17/mo annual', desc: 'Claude Code, Cowork, Projects, connectors, Skills. Same models as Max. Just less usage.', recommended: true },
  { name: 'Max 5x', price: '$100', period: '5x Pro usage', desc: 'Sweet spot for most operators in this community.', recommended: false },
  { name: 'Max 20x', price: '$200', period: '20x Pro usage', desc: 'For when Claude is your daily operating layer. Pays for itself the first week.', recommended: false },
];

const DAILY_FORMULA = [
  {
    time: 'Morning · 5-10 mins',
    title: 'Plan the Day',
    items: [
      'Open your daily planning Project. Start a new chat.',
      'Tell Claude what\'s on your plate today',
      'Have it pull your calendar, surface priorities, time-block your day',
    ],
  },
  {
    time: 'Midday · As needed',
    title: 'Compound the Wins',
    items: [
      'Draft anything you\'d normally write yourself (emails, posts, scripts)',
      'Research before any sales call or strategy session',
      'Summarize anything that takes more than 10 minutes to read',
    ],
  },
  {
    time: 'End of Day · 5 mins',
    title: 'Close the Loop',
    items: [
      'Open your EOD Project. Start a new chat.',
      'Tell Claude what got done, what didn\'t, what you\'re stuck on',
      'Have it surface tomorrow\'s top 3 priorities',
    ],
  },
];

const COMMON_MISTAKES = [
  { title: 'Pinning chats.', detail: 'The biggest Claude mistake. Use Projects with a new chat each time.' },
  { title: 'Using only Free.', detail: 'It\'s a tease. Get Pro or Max.' },
  { title: 'Using only the web app.', detail: 'Install desktop and mobile.' },
  { title: 'Re-explaining context in every chat.', detail: 'Set up Memory. Use Projects.' },
  { title: 'Defaulting to Opus.', detail: 'Sonnet handles 80% of work and saves your usage.' },
  { title: 'Treating Claude like a chatbot.', detail: 'It\'s an operating layer. Build systems with it.' },
  { title: 'Trying to learn everything at once.', detail: 'Compound weekly. You\'re not late.' },
];

// ─── Sub-components ─────────────────────────────────────────────────────────

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  return (
    <motion.div {...fade(index * 0.04)} className="glass-card p-6 md:p-7 flex items-start gap-5">
      <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
        <span className="font-display text-accent text-sm leading-none">{step.num}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-display text-xl md:text-2xl tracking-tight text-off-white">
          {step.title}
        </h3>
        <p className="text-warm-gray font-light text-sm mt-1 leading-relaxed">
          {step.detail}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function ClaudeTenStepPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, #AAFF00 0%, #00CC44 100%)' }}
        />
        <div className="container-wide relative z-10 max-w-4xl">
          <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
            FREE SETUP GUIDE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(44px,7vw,96px)] leading-[0.88] tracking-tighter mb-8"
          >
            Most People
            <br />
            <span className="text-warm-gray">Use Claude Wrong.</span>
            <br />
            Here's the Fix.
          </motion.h1>
          <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-off-white font-light leading-relaxed max-w-2xl mb-4">
            I touch Claude 30+ times a day. Most people barely use it.
          </motion.p>
          <motion.p {...fade(0.4)} className="text-base md:text-lg text-warm-gray font-light leading-relaxed max-w-2xl mb-10">
            10-step fast-path setup. 60 minutes. Plus the mistake that breaks every workflow.
          </motion.p>

          <motion.div {...fade(0.5)} className="flex flex-wrap gap-4">
            <a href="#checklist" className="btn-primary">
              See the 10 Steps →
            </a>
            <DownloadGate
              storageKey={STORAGE_KEY}
              downloadUrl={DOWNLOAD_URL}
              source={LEAD_SOURCE}
              label="Download the Setup Guide"
              className="btn-secondary"
            />
          </motion.div>
        </div>
      </section>

      {/* WHY DAILY */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Why</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            Why You Should Be
            <br />
            <span className="text-warm-gray">Using Claude Daily</span>
          </motion.h2>

          <div className="space-y-6 max-w-3xl mb-12">
            {[
              'Claude isn\'t a chatbot. It\'s not a search engine. It\'s not "another tool to add to your stack."',
              'Claude is the operating layer between you and every workflow in your business. The moment you treat it that way, everything changes.',
              'I touch Claude 30+ times a day. Not because I have to. Because every interaction is faster and sharper than doing it alone.',
              'The operators winning right now aren\'t the ones using Claude occasionally. They\'re using it as their second brain. Your job is to get there fast.',
            ].map((para, i) => (
              <motion.p key={i} {...fade(i * 0.08)} className="text-warm-gray font-light leading-relaxed text-lg">
                {para}
              </motion.p>
            ))}
          </div>

          <motion.div {...fade(0.3)} className="glass-card p-7">
            <p className="label-tag text-accent/60 mb-4">What daily use looks like</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                'Morning planning and journaling',
                'Drafting content (Skool posts, emails, social, sales pages)',
                'Pulling reports from Stripe, Airtable, GHL',
                'Coaching call prep',
                'Client follow-ups via iMessage and WhatsApp',
                'Weekly and monthly reviews',
                'Building offers and sales scripts',
                'Researching prospects',
                'End-of-day recap',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                  <span className="text-accent mt-1 text-xs shrink-0">◆</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* THE 10 STEPS */}
      <section id="checklist" className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Framework</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            The Fast-Path
            <br />
            <span className="text-warm-gray">Setup Checklist</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Do these in order. Each step takes 5 to 10 minutes. Done in under an hour.
          </motion.p>

          <div className="space-y-3">
            {STEPS.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>

          <motion.div {...fade(0.4)} className="mt-10 glass-card p-6 border border-accent/20 bg-accent/5 text-center">
            <p className="font-display text-xl tracking-tight text-accent">
              Done. You're now ahead of 95% of users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STOP PINNING CHATS */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-red-400 mb-4">The Biggest Mistake</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Stop Pinning Chats.
            <br />
            <span className="text-warm-gray">Do This Instead.</span>
          </motion.h2>

          <div className="space-y-6 max-w-3xl mb-10">
            <motion.p {...fade(0.2)} className="text-off-white font-light leading-relaxed text-xl">
              This is the biggest mistake people make with Claude.
            </motion.p>
            <motion.p {...fade(0.25)} className="text-warm-gray font-light leading-relaxed text-lg">
              They have a great strategy session. They pin the chat to the top of their sidebar. They keep coming back to it day after day, week after week, talking back into the same long-running thread.
            </motion.p>
            <motion.p {...fade(0.3)} className="text-warm-gray font-light leading-relaxed text-lg">
              Here's what actually happens when you do that:
            </motion.p>
          </div>

          <motion.div {...fade(0.35)} className="glass-card p-7 border border-red-400/15 mb-10" style={{ background: 'rgba(239,68,68,0.03)' }}>
            <ul className="space-y-3">
              {[
                'The context window fills up',
                'Claude starts losing track of what was said earlier',
                'Responses get slower',
                'Then the hallucinations start',
                'You ask Claude about something you covered three weeks ago and it makes up an answer that sounds confident and is completely wrong',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-warm-gray font-light text-base">
                  <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p {...fade(0.4)} className="text-warm-gray font-light leading-relaxed text-lg mb-10 max-w-3xl">
            The chat gets dumber the longer it lives. Pin it and you'll trust it. Trust it and you'll get burned.
          </motion.p>

          <motion.div {...fade(0.45)} className="flex items-center justify-center gap-3 md:gap-6 mb-12 flex-wrap">
            <span className="font-display text-2xl md:text-3xl text-red-400/80 line-through tracking-tight">Pin chats</span>
            <span className="text-warm-gray text-2xl">→</span>
            <span className="font-display text-2xl md:text-3xl text-accent tracking-tight">Set up Projects</span>
          </motion.div>

          <motion.p {...fade(0.5)} className="text-warm-gray font-light leading-relaxed text-lg max-w-3xl mb-10">
            A Project in Claude is a workspace with persistent context. You drop in files, set custom instructions once, and every chat inside that Project inherits all of it. The instructions and files stay. The chats are disposable.
          </motion.p>

          <motion.div {...fade(0.55)} className="glass-card p-7 mb-10">
            <p className="label-tag text-accent/60 mb-4">The pattern that wins</p>
            <div className="flex items-center gap-2 md:gap-3 flex-wrap mb-4">
              {['Open Project', 'New chat', 'Do the work', 'Close chat'].map((step, i, arr) => (
                <React.Fragment key={step}>
                  <span className="px-4 py-2 rounded-lg bg-accent/10 border border-accent/20 text-accent text-sm font-medium">{step}</span>
                  {i < arr.length - 1 && <span className="text-warm-gray/50">→</span>}
                </React.Fragment>
              ))}
            </div>
            <p className="text-warm-gray font-light text-sm leading-relaxed">
              Tomorrow: open the same Project. Start a new chat. Pick up fresh.
            </p>
          </motion.div>

          <motion.p {...fade(0.6)} className="text-off-white font-light leading-relaxed text-lg max-w-3xl mb-6">
            <strong className="text-accent">Projects are persistent. Chats are disposable.</strong> Lock that pattern in.
          </motion.p>

          <motion.div {...fade(0.65)} className="glass-card p-7 mb-10">
            <p className="label-tag text-warm-gray/60 mb-4">Set up these Projects to start</p>
            <ul className="space-y-2">
              {[
                'Weekly planning',
                'Content creation (Skool posts, emails, social)',
                'Client X strategy',
                'Offer build',
                'Daily journaling',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-warm-gray font-light text-base">
                  <span className="text-accent mt-1.5 text-xs shrink-0">●</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.p {...fade(0.7)} className="text-warm-gray font-light leading-relaxed text-lg max-w-3xl">
            Don't overthink the setup. Name the Project. Drop in any reference files (your offer, your brand voice, your client list). Add a 3 to 5 line custom instruction. Done. You can refine it as you go.
          </motion.p>
          <motion.p {...fade(0.75)} className="text-warm-gray font-light leading-relaxed text-lg max-w-3xl mt-4">
            I run 8 Projects. They're the backbone of my week.
          </motion.p>
        </div>
      </section>

      {/* THE RIGHT PLAN */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Plan</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Pro vs. Max
            <br />
            <span className="text-warm-gray">Which One You Need</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Free is good for testing. Don't run a business on it.
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fade(i * 0.08)}
                className={`glass-card p-6 ${plan.recommended ? 'border border-accent/30' : ''}`}
                style={plan.recommended ? { background: 'rgba(170,255,0,0.04)' } : undefined}
              >
                <p className={`label-tag mb-3 ${plan.recommended ? 'text-accent' : 'text-warm-gray/60'}`}>
                  {plan.name}
                </p>
                <p className="font-display text-3xl tracking-tight text-off-white mb-1">{plan.price}</p>
                <p className="text-warm-gray text-xs font-light mb-4">{plan.period}</p>
                <p className="text-warm-gray text-sm font-light leading-relaxed">{plan.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.4)} className="glass-card p-7 border border-white/10">
            <p className="text-off-white font-light leading-relaxed mb-3">
              <span className="text-accent font-medium">My take. </span>
              Start with Pro. Use Claude hard for 2 to 3 weeks. The moment you start hitting usage limits during your workday, upgrade. Don't wait until it's frustrating you.
            </p>
            <p className="text-warm-gray font-light leading-relaxed text-sm">
              Stop counting messages. Stop rationing prompts. Just work.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BOTH APPS */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Don't Skip This</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            Get Both Apps.
            <br />
            <span className="text-warm-gray">Desktop and Mobile.</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-5">
            <motion.div {...fade(0)} className="glass-card p-7">
              <p className="label-tag text-accent mb-4">Mac or Windows</p>
              <p className="font-display text-2xl tracking-tight text-off-white mb-3">Desktop App</p>
              <p className="text-warm-gray font-light text-sm leading-relaxed">
                Your main Claude environment. Required for Cowork, Code Execution, pinned workflows, and local file access. The web version works. The desktop app is dramatically better for daily use.
              </p>
            </motion.div>
            <motion.div {...fade(0.1)} className="glass-card p-7">
              <p className="label-tag text-accent mb-4">iOS or Android</p>
              <p className="font-display text-2xl tracking-tight text-off-white mb-3">Mobile App</p>
              <p className="text-warm-gray font-light text-sm leading-relaxed">
                What makes Claude actually feel like a second brain. Voice notes while driving. Quick prompts between meetings. Reviewing drafts on a walk. Sending tasks to Claude from your phone that finish on your desktop.
              </p>
            </motion.div>
          </div>

          <motion.p {...fade(0.3)} className="text-warm-gray font-light text-lg mt-8 text-center">
            Install both. Sign in. Now Claude follows you everywhere.
          </motion.p>
        </div>
      </section>

      {/* DAILY WINNING FORMULA */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Daily Habit</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Your Daily
            <br />
            <span className="text-warm-gray">Winning Formula</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            If you don't know where to start, run this for 7 days. By day 8, you won't be able to imagine working without Claude.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {DAILY_FORMULA.map((block, i) => (
              <motion.div key={block.time} {...fade(i * 0.1)} className="glass-card p-7">
                <p className="label-tag text-accent mb-2">{block.time}</p>
                <p className="font-display text-xl tracking-tight text-off-white mb-4">{block.title}</p>
                <ul className="space-y-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                      <span className="text-accent mt-1.5 text-xs shrink-0">●</span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMON MISTAKES */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">What Most People Get Wrong</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            Common Mistakes
            <br />
            <span className="text-warm-gray">to Avoid</span>
          </motion.h2>

          <div className="space-y-3">
            {COMMON_MISTAKES.map((item, i) => (
              <motion.div key={item.title} {...fade(i * 0.05)} className="glass-card p-5 flex items-start gap-4">
                <span className="text-red-400 text-lg shrink-0 mt-0.5">✗</span>
                <div>
                  <p className="text-off-white font-medium">{item.title}</p>
                  <p className="text-warm-gray font-light text-sm leading-relaxed mt-0.5">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Setup Guide</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Get the Full
            <br />
            <span className="text-warm-gray">Setup Guide</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
            Drop your email. Print it, bookmark it, walk through it with your team.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div {...fade(0.1)}>
              <p className="label-tag text-warm-gray/60 mb-4">What you get</p>
              <ul className="space-y-3">
                {[
                  'The full 10-step setup guide as a printable HTML',
                  'The "Stop Pinning Chats" breakdown',
                  'The Daily Winning Formula card',
                  'The 5-question setup audit',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                    <span className="text-accent mt-0.5 text-xs shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade(0.2)} className="glass-card p-8 border border-accent/20" style={{ background: 'rgba(170,255,0,0.03)' }}>
              <p className="text-off-white font-light leading-relaxed mb-6">
                All page content is free. No gate on any of it. The download is the printable version you can keep.
              </p>
              <DownloadGate
                storageKey={STORAGE_KEY}
                downloadUrl={DOWNLOAD_URL}
                source={LEAD_SOURCE}
                label="Download the Setup Guide →"
                className="btn-primary w-full"
              />
              <p className="text-warm-gray/40 text-xs font-light mt-4 text-center">
                No spam. Unsubscribe anytime.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* YOUTUBE SHORT */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Tutorial</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
            Watch the
            <br />
            <span className="text-warm-gray">Quick Walkthrough</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
            60-second YouTube Short breaking down the 10-step setup.
          </motion.p>

          <motion.div
            {...fade(0.2)}
            className="glass-card border border-white/10 rounded-2xl overflow-hidden mx-auto"
            style={{ aspectRatio: '9/16', maxWidth: '380px' }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?rel=0`}
              title="The 10-Step Claude Setup"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        </div>
      </section>

    </div>
  );
}
