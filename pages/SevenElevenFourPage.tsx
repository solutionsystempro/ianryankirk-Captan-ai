import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadGate } from '../components/DownloadGate';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

const NUMBERS = [
  {
    num: '7',
    label: 'Hours',
    headline: '7 Hours of Engagement',
    body: 'A prospect needs roughly seven hours of total time spent consuming your content, conversations, or presence before they trust you enough to buy. Not seven hours in one sitting — cumulative. A YouTube video here, a long post there, a DM conversation, a live call.',
    examples: [
      'A 20-minute YouTube video watched 3× = 1 hour',
      'A 45-minute Facebook Live = 45 minutes',
      'Reading 10 posts at 2 minutes each = 20 minutes',
      'A 30-minute discovery call = 30 minutes',
    ],
    insight: 'Most coaches post and wonder why nobody buys. They\'ve given people 6 minutes of content, not 6 hours. The math doesn\'t work.',
  },
  {
    num: '11',
    label: 'Touchpoints',
    headline: '11 Separate Touchpoints',
    body: 'Eleven distinct moments where a prospect encounters you or your brand. Each touchpoint is a separate event — not 11 views of the same post. A comment reply, a story view, a new video, a DM, a live session, an email — each one counts as one.',
    examples: [
      'Seeing a Facebook post',
      'Watching a YouTube video',
      'Receiving an email in their inbox',
      'Watching a Facebook Live',
      'Clicking a link to your website',
      'Reading a comment thread you\'re in',
      'Getting a DM reply from you personally',
    ],
    insight: 'This is why consistency beats virality. One post that 10,000 people see once is less valuable than 11 posts the right 100 people see regularly.',
  },
  {
    num: '4',
    label: 'Locations',
    headline: '4 Separate Channels',
    body: 'The 11 touchpoints need to happen across at least four different platforms or contexts. Seeing you in only one place creates a one-dimensional impression. Encountering you across multiple channels signals that you\'re everywhere — which signals credibility and staying power.',
    examples: [
      'YouTube (long-form video)',
      'Facebook (posts, Lives, Groups)',
      'Email list (nurture sequence)',
      'Your website (framework pages, tools)',
    ],
    insight: 'Four channels doesn\'t mean you need to be active on every platform. It means your best leads should be able to find you in more than one place without hunting.',
  },
];

const SYSTEM = [
  {
    phase: 'Attract',
    channel: 'YouTube',
    action: 'Weekly videos that teach a framework or walk through a real example. Designed for search — people find Ian when they\'re already looking for what he solves.',
    hours: 'High (20–60 min per video)',
  },
  {
    phase: 'Engage',
    channel: 'Facebook',
    action: 'Short posts, Lives, and community replies. Quick touchpoints that keep Ian visible to people already in his orbit.',
    hours: 'Medium (2–5 min per post)',
  },
  {
    phase: 'Capture',
    channel: 'This Website',
    action: 'Framework pages like this one. People come for the free tool — they see the full ecosystem and the coaching offer.',
    hours: 'Medium (5–20 min per page)',
  },
  {
    phase: 'Nurture',
    channel: 'Email',
    action: 'The list gets built from every lead magnet. Future emails close the loop — deliver value, then present the offer.',
    hours: 'Medium (3–8 min per email)',
  },
];

const TOOLS = [
  {
    label: 'SLAP Method',
    desc: 'A system for turning ignored DMs into booked calls — built for coaches who hate chasing.',
    href: 'https://slap-method-production.up.railway.app/',
    cta: 'Try SLAP Method →',
  },
  {
    label: 'Call Reflekt',
    desc: 'Paste a sales call transcript. Get back exactly where you lost the frame — and how to fix it.',
    href: 'https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0',
    cta: 'Analyze a Call →',
  },
  {
    label: 'Business Clarity Coach',
    desc: 'Stuck between ideas? Answer a few questions and get one clear path forward.',
    href: 'https://ultimate-clarity-coach.vercel.app/',
    cta: 'Get Clarity →',
  },
  {
    label: 'Cold Email Copywriter',
    desc: 'Write cold emails that get replies. Poke The Bear framework, Ian\'s voice, reply-focused CTAs.',
    href: 'https://cold-email-copywriter-production.up.railway.app',
    cta: 'Write Cold Emails →',
  },
];

function NumberCard({ item, index }: { item: typeof NUMBERS[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fade(index * 0.1)} className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-8 text-left flex items-start gap-6 group"
      >
        <div className="shrink-0 w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <span className="font-display text-accent text-3xl leading-none">{item.num}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="label-tag text-accent mb-1">{item.label}</p>
          <h3 className="font-display text-2xl md:text-3xl tracking-tight text-off-white">
            {item.headline}
          </h3>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-warm-gray group-hover:border-accent/30 group-hover:text-accent transition-all">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
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
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-8 pb-8 border-t border-white/5 pt-6 space-y-6">
              <p className="text-warm-gray font-light leading-relaxed">{item.body}</p>

              <div>
                <p className="label-tag text-accent/60 mb-3">Examples</p>
                <ul className="space-y-2">
                  {item.examples.map((ex) => (
                    <li key={ex} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                      <span className="text-accent mt-1 text-xs shrink-0">◆</span>
                      <span>{ex}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-accent/20 bg-accent/5 rounded-lg px-5 py-4">
                <p className="text-off-white/90 text-sm font-light leading-relaxed">
                  <span className="text-accent font-medium">The insight: </span>
                  {item.insight}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function SevenElevenFourPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

        {/* HERO */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-wide relative z-10 max-w-4xl">
            <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
              Free Framework · Google Research
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-[clamp(48px,8vw,100px)] leading-[0.88] tracking-tighter mb-8"
            >
              The 7-11-4
              <br />
              <span className="text-warm-gray">Rule</span>
            </motion.h1>
            <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-10">
              Before anyone buys from you, they need 7 hours of engagement across
              11 touchpoints in 4 separate locations. This is Google's research on how
              purchase decisions actually happen — and most coaches are failing at all three numbers.
            </motion.p>

            <motion.div {...fade(0.35)} className="flex flex-wrap gap-4 mb-10">
              <a href="#the-framework" className="btn-primary">Read the Framework →</a>
              <DownloadGate
                storageKey="irk_downloaded_7_11_4"
                source="7-11-4-rule"
                downloadUrl="/downloads/7-11-4/7-11-4-framework.pdf"
                label="Download the Framework PDF"
                className="btn-secondary"
              />
            </motion.div>

            <motion.div {...fade(0.4)} className="glass-card p-6 max-w-xl">
              <p className="label-tag text-accent mb-4">Where This Comes From</p>
              <p className="text-warm-gray font-light text-sm leading-relaxed">
                Google's Zero Moment of Truth (ZMOT) research tracked how consumers make purchase
                decisions online. The 7-11-4 framework distills the core finding: trust is built
                through cumulative exposure, not a single compelling pitch. It's been adopted widely
                in personal brand and coaching sales strategy — and it maps directly to how Ian
                structures the Captain AI content system.
              </p>
            </motion.div>
          </div>
        </section>

        {/* THE THREE NUMBERS */}
        <section id="the-framework" className="pb-24 px-6">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">The Framework</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
              Three Numbers.
              <br />
              <span className="text-warm-gray">One Decision.</span>
            </motion.h2>

            <div className="space-y-4">
              {NUMBERS.map((item, i) => (
                <NumberCard key={item.num} item={item} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* WHY MOST PEOPLE FAIL */}
        <section className="py-24 bg-surface border-y border-white/10 px-6">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">The Mistake</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter mb-10">
              Why the DMs Don't
              <br />
              <span className="text-warm-gray">Convert</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  label: 'What most coaches do',
                  color: 'border-red-500/20 bg-red-500/5',
                  labelColor: 'text-red-400',
                  points: [
                    'Post once, expect leads',
                    'DM cold with an offer immediately',
                    'Live on one platform only',
                    'No email list, no follow-up',
                    'Wonder why "nobody buys"',
                  ],
                },
                {
                  label: 'What 7-11-4 requires',
                  color: 'border-accent/20 bg-accent/5',
                  labelColor: 'text-accent',
                  points: [
                    'Consistent long-form content (hours)',
                    'Multiple touchpoints before the ask',
                    'Presence across 4 channels',
                    'Email list to close the loop',
                    'A system — not a one-off post',
                  ],
                },
              ].map((col, i) => (
                <motion.div key={col.label} {...fade(i * 0.1)} className={`glass-card p-6 border ${col.color}`}>
                  <p className={`label-tag mb-4 ${col.labelColor}`}>{col.label}</p>
                  <ul className="space-y-3">
                    {col.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                        <span className={`mt-1 text-xs shrink-0 ${col.labelColor}`}>◆</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IAN'S SYSTEM MAPPED TO 7-11-4 */}
        <section className="py-24 px-6">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">The Captain AI System</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
              How Ian Runs
              <br />
              <span className="text-warm-gray">His 4 Channels</span>
            </motion.h2>
            <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
              This isn't theory — it's the live system behind every lead magnet, video, and
              coaching call Ian closes. Each channel plays a specific role in building the 7 hours.
            </motion.p>

            <div className="space-y-4">
              {SYSTEM.map((row, i) => (
                <motion.div key={row.phase} {...fade(i * 0.08)} className="glass-card p-6 grid md:grid-cols-[120px_1fr_auto] gap-4 items-start">
                  <div>
                    <p className="label-tag text-accent mb-1">Phase</p>
                    <p className="font-display text-xl tracking-tight">{row.phase}</p>
                  </div>
                  <div>
                    <p className="label-tag text-warm-gray/60 mb-1">Channel</p>
                    <p className="text-off-white font-medium mb-2">{row.channel}</p>
                    <p className="text-warm-gray font-light text-sm leading-relaxed">{row.action}</p>
                  </div>
                  <div className="md:text-right">
                    <p className="label-tag text-warm-gray/60 mb-1">Time / piece</p>
                    <p className="text-accent text-sm font-light">{row.hours}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHAT TO DO NOW */}
        <section className="py-24 bg-surface border-y border-white/10 px-6">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">Your Next Move</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-10">
              Audit Your
              <br />
              <span className="text-warm-gray">Own Numbers</span>
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-5 mb-12">
              {[
                {
                  q: 'Hours?',
                  prompt: 'Add up the total runtime of your last 30 days of content. Videos, posts, Lives. Is it close to 7 hours for an engaged follower?',
                },
                {
                  q: 'Touchpoints?',
                  prompt: 'How many separate times did your ideal buyer encounter you last month? Count every post, every reply, every DM, every email.',
                },
                {
                  q: 'Channels?',
                  prompt: 'Could someone who\'s never heard of you find you in 4 different places? Or are you a one-platform person hoping for a one-post miracle?',
                },
              ].map((item, i) => (
                <motion.div key={item.q} {...fade(i * 0.1)} className="glass-card p-6">
                  <p className="font-display text-accent text-2xl mb-3">{item.q}</p>
                  <p className="text-warm-gray font-light text-sm leading-relaxed">{item.prompt}</p>
                </motion.div>
              ))}
            </div>

            <motion.div {...fade(0.3)} className="glass-card p-8 border border-accent/20 bg-accent/5">
              <p className="text-off-white font-light leading-relaxed text-lg">
                If any number is low, the fix isn't to post more of the same thing.
                It's to identify which channel is missing, which format would add the most hours,
                and where you're losing people between touchpoints.
                <span className="text-accent font-medium"> That's the session Ian runs with clients — and it takes 90 minutes.</span>
              </p>
            </motion.div>
          </div>
        </section>

        {/* TOOL CTAs */}
        <section className="section-pad px-6">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">The Full Toolkit</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
              Build the System
              <br />
              <span className="text-warm-gray">Around the Rule</span>
            </motion.h2>
            <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
              These are the tools Ian uses inside his own 7-11-4 system — free to try.
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

            <motion.div {...fade(0.3)} className="border-t border-white/10 pt-12 space-y-10">
              <div className="text-center">
                <p className="label-tag text-accent mb-3">Take It With You</p>
                <p className="text-warm-gray font-light mb-6">
                  Download the 7-11-4 Framework as a PDF — print it, reference it, share it.
                </p>
                <DownloadGate
                  storageKey="irk_downloaded_7_11_4"
                  source="7-11-4-rule"
                  downloadUrl="/downloads/7-11-4/7-11-4-framework.pdf"
                  label="Download the 7-11-4 Framework PDF →"
                />
              </div>
              <div className="text-center border-t border-white/5 pt-10">
                <p className="text-warm-gray font-light mb-6">
                  Want Ian to map your 7-11-4 system personally — and show you exactly which number to fix first?
                </p>
                <Link to="/contact" className="btn-primary inline-block">
                  Apply for 1:1 Coaching →
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
  );
}