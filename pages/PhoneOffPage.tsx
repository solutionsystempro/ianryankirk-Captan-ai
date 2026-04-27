import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadGate } from '../components/DownloadGate';

const STORAGE_KEY = 'irk_downloaded_phone_off';
const DOWNLOAD_URL = '/downloads/phone-off/phone-off-playbook.html';
const LEAD_SOURCE = 'phone-off';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

// ─── 7 SYSTEMS ──────────────────────────────────────────────────────────────
const SYSTEMS = [
  {
    num: '01',
    title: 'Check Your Messages Three Times A Day',
    body: [
      'Pick three windows in your day. 9am. 1pm. 5pm. Those are the only times you check messages. Email, DMs, Slack, texts — all of it. Outside those windows your phone stays in Do Not Disturb.',
      'Why three? Research from Gloria Mark at UC Irvine found it takes about 23 minutes on average to fully refocus after an interruption. Three task-switches a day means you keep most of your cognitive depth. Most operators are burning 50+ task-switches and wondering why nothing gets done.',
      'Set three calendar blocks labeled "Inbox." Treat them like meetings. Phone stays in the drawer between them. The first 48 hours feel uncomfortable. By day three, you\'ll never want to go back.',
    ],
    quote: 'Three windows a day. Not fifty.',
    source: { label: 'Mark, Gudith, Klocke. UC Irvine. CHI 2008.', url: 'https://www.ics.uci.edu/~gmark/Home_page/Research_files/CHI%202008%20Interrupted%20Work.pdf' },
  },
  {
    num: '02',
    title: 'Keep Your Phone In Another Room',
    body: [
      'When you\'re working, your phone is in another room. Not face-down on the desk. Not in your pocket on silent. Another room.',
      'A 2017 University of Texas study (Ward et al., "Brain Drain") found that the mere presence of your phone — even face-down, even powered off — measurably reduces your available cognitive capacity. Your brain spends background processing power resisting the urge to check it.',
      'Set up a charging station in your kitchen, hallway, or any room you don\'t work in. Walk to it three times a day during your check windows. The walk is the feature, not the bug. It creates a real transition between deep work and shallow work.',
    ],
    quote: 'Even a phone in your pocket costs you focus.',
    source: { label: 'Ward et al. JACR. 2017.', url: 'https://www.journals.uchicago.edu/doi/full/10.1086/691462' },
  },
  {
    num: '03',
    title: 'Turn Off Every Notification Except Five',
    body: [
      'Open your phone settings right now. Go to Notifications. Turn off everything. No badges. No banners. No sounds. The default state for every app is silent.',
      'Then re-enable only the people who deserve direct access. Calls and texts from a whitelist of 5 to 10 people max. Family, co-founder, top client. That\'s it. Everything else lives in the queue you check during your three windows.',
      'Why this works: notifications are designed to trigger compulsive checking. Cut the supply, kill the loop. Inside two weeks, the urge to check disappears.',
    ],
    quote: 'You go to your phone. It doesn\'t come to you.',
  },
  {
    num: '04',
    title: 'Train People To Expect Your Windows',
    body: [
      'Set an auto-reply on email and DMs that tells people exactly when you respond. "I check messages at 9, 1, and 5. I\'ll get back to you in one of those windows."',
      'Most founders feel guilty about being unavailable. Stop. The auto-reply isn\'t avoidance. It\'s a contract. You tell people what to expect and you keep your word. They respect the boundary because you set it.',
      'The first week, expect three or four people to push back. Send them the same auto-reply anyway. By week two, your team and your clients adjust. They batch their asks. They solve their own problems before reaching out. The result: fewer messages, better messages, more autonomy in everyone around you.',
    ],
    quote: 'The boundary isn\'t avoidance. It\'s a contract.',
  },
  {
    num: '05',
    title: 'Split Urgent From Everything Else',
    body: [
      'One channel for "right now." One channel for "later." Most operators treat every message like it\'s urgent. Almost none of them are.',
      'Right-now channel: phone calls and texts from your 5-person whitelist. Family, co-founder, top client. These come through always. Everything else hits the "later" channel and waits for your three check windows.',
      'Use iPhone Focus Modes or Android Modes to enforce this at the operating system level. Don\'t rely on willpower. The default state of your phone should match the default state of your attention. Closed off, except to the people and tasks that earn the open door.',
    ],
    quote: '95% of messages aren\'t urgent. Stop pretending.',
  },
  {
    num: '06',
    title: 'Make Distraction Apps Hard To Reach',
    body: [
      'Social media, email, Slack, news apps. These are designed to be one tap away. Make them three taps away on purpose.',
      'Move them to a hidden folder on your second screen, behind a swipe and a tap. Better: delete the apps entirely and only access them through the browser. The browser version still works. It just takes more effort to load.',
      'Every extra step you add between you and a distraction app is a step you won\'t take half the time. The phone is engineered to be friction-free. Engineer it back. Let your important tools live on the home screen. Bury everything else.',
    ],
    quote: 'If it\'s hard to open, you\'ll open it less.',
  },
  {
    num: '07',
    title: 'First Hour and Last Hour. No Phone.',
    body: [
      'First hour of the morning. Last hour of the night. No phone. Period.',
      'The first thing your brain consumes shapes every decision you make for the next 12 hours. The last thing you consume shapes the quality of your sleep and the tone of tomorrow morning. Neither should be a notification, an email, or a feed.',
      'Charge your phone in another room overnight. Buy a $15 alarm clock if you used your phone for that. Replace the morning scroll with reading, training, journaling, or silence. Replace the night scroll with the same. Two hours of phone-free space at the edges of the day. That\'s how you reclaim the rest of it.',
    ],
    quote: 'What you consume first decides what you build next.',
  },
];

// ─── CROSS-PROMO TOOLS ──────────────────────────────────────────────────────
const TOOLS = [
  {
    label: 'Business Clarity Coach',
    role: 'The target',
    desc: 'Reclaimed attention without a target is just rest. Clarity Coach takes the focus you just bought back and points it at the one move that actually grows the business.',
    href: 'https://ultimate-clarity-coach.vercel.app/',
    cta: 'Get Clarity →',
  },
  {
    label: 'Push-Back Protocol',
    role: 'The thinking partner',
    desc: 'Now that you\'ve got hours back to actually think, get the AI you\'re thinking with to push back on you. Makes Claude your equal — not something that just tells you you\'re great.',
    href: 'https://ianryankirk.com/push-back-protocol',
    cta: 'Get the Protocol →',
    internal: true,
  },
  {
    label: 'AI Foundation Field Guide',
    role: 'The system',
    desc: 'You\'ve protected your focus. Now build the document that makes every AI tool you touch produce real work — not generic noise. 90 minutes. Done live with you.',
    href: 'https://ianryankirk.com/ai-foundation',
    cta: 'See the Session →',
    internal: true,
    badge: '$97',
  },
];

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function ClockVisual() {
  const radius = 88;
  const center = 100;
  const ticks = Array.from({ length: 12 }, (_, i) => i + 1);
  const highlighted = [9, 1, 5];

  return (
    <div className="relative w-[200px] h-[200px] mx-auto">
      {/* Soft outer halo */}
      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(56,189,248,0.18) 0%, transparent 70%)',
        filter: 'blur(8px)',
      }} />

      <svg viewBox="0 0 200 200" className="relative w-full h-full">
        {/* Outer ring */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <circle cx={center} cy={center} r={radius - 14} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

        {/* Tick marks */}
        {ticks.map((hour) => {
          const angle = ((hour - 3) * 30) * (Math.PI / 180);
          const isOn = highlighted.includes(hour);
          const x1 = center + Math.cos(angle) * (radius - 6);
          const y1 = center + Math.sin(angle) * (radius - 6);
          const x2 = center + Math.cos(angle) * (radius - (isOn ? 18 : 12));
          const y2 = center + Math.sin(angle) * (radius - (isOn ? 18 : 12));
          return (
            <line
              key={hour}
              x1={x1} y1={y1} x2={x2} y2={y2}
              stroke={isOn ? '#AAFF00' : 'rgba(255,255,255,0.2)'}
              strokeWidth={isOn ? '2.5' : '1'}
              strokeLinecap="round"
            />
          );
        })}

        {/* Highlighted hour labels */}
        {highlighted.map((hour) => {
          const angle = ((hour - 3) * 30) * (Math.PI / 180);
          const tx = center + Math.cos(angle) * (radius - 32);
          const ty = center + Math.sin(angle) * (radius - 32);
          const label = hour === 9 ? '9' : hour === 1 ? '1' : '5';
          return (
            <text
              key={hour}
              x={tx} y={ty}
              fill="#AAFF00"
              fontSize="13"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label}
            </text>
          );
        })}

        {/* Center dot */}
        <circle cx={center} cy={center} r="3" fill="#AAFF00" />
      </svg>

      {/* Below clock label */}
      <p className="absolute -bottom-9 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-warm-gray/60 whitespace-nowrap">
        9 · 1 · 5 · the only windows
      </p>
    </div>
  );
}

function SystemCard({ system, index }: { system: typeof SYSTEMS[0]; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div {...fade(index * 0.05)} className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-start gap-6 p-7 md:p-9 group"
      >
        <span className="font-display text-[clamp(56px,7vw,80px)] leading-none tracking-tighter shrink-0 text-accent/90 mt-1">
          {system.num}
        </span>
        <div className="flex-1 min-w-0 pt-3">
          <h3 className="font-display text-xl md:text-2xl tracking-tight text-off-white leading-snug">
            {system.title}
          </h3>
          {!open && (
            <p className="text-warm-gray/60 font-light text-xs mt-2 font-mono uppercase tracking-widest">
              + Read the system
            </p>
          )}
        </div>
        <div className="shrink-0 w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-warm-gray group-hover:border-accent/40 group-hover:text-accent transition-all mt-3">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease }}
            className="text-lg leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="overflow-hidden"
          >
            <div className="px-7 md:px-9 pb-9 pt-2 border-t border-white/5">
              <div className="md:pl-[calc(80px+1.5rem)] space-y-4">
                {system.body.map((para, i) => (
                  <p key={i} className="text-warm-gray font-light leading-relaxed">
                    {para}
                  </p>
                ))}

                {/* Source citation if present */}
                {system.source && (
                  <p className="text-warm-gray/40 text-xs font-mono pt-1">
                    Source:{' '}
                    <a
                      href={system.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline decoration-warm-gray/20 hover:text-accent hover:decoration-accent/40 transition-colors"
                    >
                      {system.source.label}
                    </a>
                  </p>
                )}

                {/* Pull quote */}
                <div className="border-l-2 border-accent/50 pl-5 mt-7">
                  <p className="pull-quote text-xl md:text-[22px]">
                    &ldquo;{system.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── MAIN PAGE ──────────────────────────────────────────────────────────────

export function PhoneOffPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        {/* Custom gradient orb — calm slate-blue / teal for "focus" feel */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[560px] rounded-full blur-[150px] pointer-events-none opacity-30"
          style={{ background: 'radial-gradient(ellipse, #1E3A8A 0%, #0F766E 70%, transparent 100%)' }}
        />
        {/* Subtle dot grid behind hero */}
        <div className="absolute inset-0 bg-dot-pattern bg-dot opacity-30 pointer-events-none" />

        <div className="container-wide relative z-10 max-w-5xl">
          <div className="grid md:grid-cols-[1fr_auto] gap-10 md:gap-16 items-start">
            {/* Left: copy */}
            <div>
              <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
                Free Playbook · Operator Focus Systems
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-[clamp(48px,8.5vw,108px)] leading-[0.86] tracking-tighter mb-8"
              >
                The Phone-Off
                <br />
                <span className="text-warm-gray">Playbook</span>
              </motion.h1>
              <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-10">
                For founders who refuse to live on a leash. The 7 systems I use to stay off my phone and still run a business.
              </motion.p>

              <motion.div {...fade(0.35)} className="flex flex-wrap gap-4 mb-10">
                <a href="#the-systems" className="btn-primary">Read the Playbook →</a>
                <DownloadGate
                  storageKey={STORAGE_KEY}
                  downloadUrl={DOWNLOAD_URL}
                  source={LEAD_SOURCE}
                  label="Download the One-Pager"
                  className="btn-secondary"
                />
              </motion.div>
            </div>

            {/* Right: clock visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.4, ease }}
              className="hidden md:block pt-8 pr-2"
            >
              <ClockVisual />
            </motion.div>
          </div>

          {/* Origin / proof bar */}
          <motion.div {...fade(0.5)} className="glass-card p-6 md:p-7 mt-4 max-w-2xl">
            <div className="flex items-start gap-4">
              <div
                className="w-11 h-11 rounded-full shrink-0 mt-0.5 flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #0F766E 100%)' }}
              >
                <span className="text-off-white font-display text-sm">IK</span>
              </div>
              <div>
                <p className="text-off-white font-light text-[15px] leading-relaxed">
                  In 2012 I shut my phone off and disappeared into the mountains for 14 years. The first 4 of those, I went fully phone-free.
                </p>
                <p className="text-warm-gray/60 text-xs mt-2 font-light">
                  Here's what those four years taught me about focus that most operators will never figure out on their own.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY THIS EXISTS */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-3xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Why This Exists</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            Most Founders
            <br />
            <span className="text-warm-gray">Treat Their Phone Like A Leash.</span>
          </motion.h2>

          <div className="space-y-6">
            {[
              'Always available. Always responsive. Always-on. Then they wonder why their team can\'t make a decision without them. Why deep work never happens. Why every "quick check" turns into 40 minutes.',
              'When I came back to run a business, I refused to rebuild the addiction most operators carry. My team gets frustrated sometimes because they can\'t reach me on demand. That\'s the point.',
              'The systems below are why my business runs without me on a leash, and why yours can too. This isn\'t a wellness PDF. This is the operating manual.',
            ].map((para, i) => (
              <motion.p key={i} {...fade(i * 0.08)} className="text-warm-gray font-light leading-relaxed text-lg">
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* THE 7 SYSTEMS */}
      <section id="the-systems" className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Framework</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            7 Systems.
            <br />
            <span className="text-warm-gray">One Outcome.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Each one is a single rule with a clear implementation. Tap any system to read the full teaching.
          </motion.p>

          <div className="space-y-4">
            {SYSTEMS.map((s, i) => (
              <SystemCard key={s.num} system={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* THE BIGGER SYSTEM — the bridge */}
      <section className="py-28 bg-surface border-y border-white/10 px-6 relative overflow-hidden">
        {/* Soft accent glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, #AAFF00 0%, transparent 70%)' }}
        />
        <div className="container-wide max-w-3xl relative z-10">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Bigger System</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-[0.95] mb-10">
            These 7 Stop People
            <br />
            <span className="text-warm-gray">From Chasing You.</span>
          </motion.h2>

          <motion.div {...fade(0.2)} className="space-y-6 text-warm-gray font-light leading-relaxed text-lg">
            <p>
              Notice what they all have in common: they all stop people from chasing you. But your business still needs leads, replies, outreach, and answers happening.
            </p>
            <p>
              I don't sit on my phone chasing them anymore. I built systems that handle it while I'm in deep work or off the grid entirely. While I'm not on my phone, the work that needs to happen on my phone — happens.
            </p>
          </motion.div>

          <motion.div {...fade(0.3)} className="border-l-2 border-accent/60 pl-6 mt-10">
            <p className="pull-quote text-2xl md:text-[28px] leading-snug text-off-white">
              &ldquo;People chase. Systems show up.&rdquo;
            </p>
          </motion.div>

          <motion.p {...fade(0.4)} className="text-warm-gray font-light leading-relaxed text-lg mt-10">
            The systems above protect your focus. The tools below are what you point that focus at.
          </motion.p>
        </div>
      </section>

      {/* CROSS-PROMO — 3 tools */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-5xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">What To Do With The Time Back</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Reclaimed Attention
            <br />
            <span className="text-warm-gray">Without A Target Is Just Rest.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Three tools — each one a different role in the same system. Free, free, then a paid session that ties them together.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {TOOLS.map((tool, i) => {
              const cardContent = (
                <>
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <p className="label-tag text-accent">{tool.role}</p>
                    {tool.badge && (
                      <span className="font-mono text-[10px] uppercase tracking-widest text-accent/80 border border-accent/30 rounded px-2 py-0.5">
                        {tool.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-2xl tracking-tight text-off-white mb-3 leading-tight">{tool.label}</h3>
                  <p className="text-warm-gray font-light text-sm flex-1 mb-6 leading-relaxed">{tool.desc}</p>
                  <span className="text-off-white text-sm font-medium">{tool.cta}</span>
                </>
              );

              const sharedProps = {
                ...fade(i * 0.1),
                className: 'glass-card-hover p-7 flex flex-col h-full',
              } as const;

              return tool.internal ? (
                <motion.div key={tool.label} {...sharedProps}>
                  <Link to={tool.href.replace('https://ianryankirk.com', '')} className="flex flex-col h-full">
                    {cardContent}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  key={tool.label}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...sharedProps}
                >
                  {cardContent}
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA — AI Foundation */}
      <section className="py-28 px-6 border-t border-white/10 relative overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-25"
          style={{ background: 'radial-gradient(ellipse, #AAFF00 0%, transparent 70%)' }}
        />
        <div className="container-wide max-w-3xl text-center relative z-10">
          <motion.p {...fade()} className="label-tag text-accent mb-6">Your Next 90 Minutes</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-7xl tracking-tighter leading-[0.9] mb-8">
            Now Build The
            <br />
            <span className="text-warm-gray">System That Runs</span>
            <br />
            While You're Off.
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            The AI Foundation Session is the 90-minute build where we lock down the one document that makes every AI tool you touch produce real work. Done live with you.
          </motion.p>
          <motion.div {...fade(0.3)} className="flex flex-col items-center gap-4">
            <Link to="/ai-foundation" className="btn-primary inline-block">
              See the AI Foundation Session — $97 →
            </Link>
            <p className="text-warm-gray/60 text-xs font-mono uppercase tracking-widest">
              30-day money-back guarantee · 10 spots at $97
            </p>
          </motion.div>
        </div>
      </section>

      {/* DOWNLOAD CTA */}
      <section className="py-20 bg-surface border-t border-white/10 px-6">
        <div className="container-wide max-w-3xl text-center">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Take It With You</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-4xl md:text-5xl tracking-tighter leading-none mb-5">
            The Whole Playbook.
            <br />
            <span className="text-warm-gray">One Page.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light mb-8 max-w-xl mx-auto">
            All 7 systems on a single printable page. Tape it to your monitor. Pin it next to your charging station.
          </motion.p>
          <motion.div {...fade(0.3)}>
            <DownloadGate
              storageKey={STORAGE_KEY}
              downloadUrl={DOWNLOAD_URL}
              source={LEAD_SOURCE}
              label="Download the One-Pager →"
            />
          </motion.div>
        </div>
      </section>

      {/* Footer back link */}
      <div className="py-12 px-6 border-t border-white/5 text-center">
        <Link to="/" className="text-warm-gray hover:text-accent transition-colors text-sm font-light">
          ← Back to Ian Kirk
        </Link>
      </div>
    </div>
  );
}
