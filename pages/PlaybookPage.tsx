import React from 'react';
import { motion } from 'framer-motion';
import { DownloadGate } from '../components/DownloadGate';

const STORAGE_KEY = 'irk_downloaded_facebook_playbook';
const DOWNLOAD_URL = '/downloads/facebook-playbook/facebook-playbook.html';
const LEAD_SOURCE = 'facebook-playbook';

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
    title: 'The 3-Post Bank',
    body: 'Posting daily sounds like a grind until you realize you can batch-create three posts in one sitting and have them ready to fire from a Google Doc.\n\nThe creators who show up every day aren\'t more inspired. They\'re more prepared.\n\nThree posts in your back pocket means you never miss a day because you don\'t know what to write.',
    quote: 'Consistency beats perfection on Facebook.',
  },
  {
    num: '02',
    title: 'The Comment Stack Format',
    body: 'Stop writing essays in the post body. Hook. Numbered promise. Period.\n\nThen drop each step as its own comment right after you post. More total reactions. More dwell time. More algorithmic reach. You create a thread people scroll through instead of scroll past.\n\nThe hook earns the click. The comments deliver the value. That\'s the whole game.',
    quote: 'The hook earns the click. The comments deliver the value.',
  },
  {
    num: '03',
    title: 'The 5,000 Friends Rule',
    body: 'Your Facebook friends list isn\'t a social network. It\'s a warm list you haven\'t activated yet.\n\nQuality matters more than size. Friends from your niche, from events, from communities you\'re already in are worth 10x a random add.\n\nYou don\'t need a massive audience to make real money on Facebook. You need the right 1,000 people paying attention.',
    quote: 'You don\'t need a massive audience. You need the right 1,000 people paying attention.',
  },
  {
    num: '04',
    title: 'The Algorithm Shift That Changed Everything',
    body: 'Facebook quietly rewired how it ranks content. It\'s not about likes anymore. It\'s not about reach.\n\nIt\'s about comment activity. What\'s happening inside the thread.\n\nStructure your content so the value lives in the comments. Every step you add, every follow-up you drop, the algorithm reads it as engagement and pushes your content to more people.',
    quote: 'Structure beats effort. Every time.',
  },
  {
    num: '05',
    title: "The Platform Nobody's Fighting Over",
    body: "Everyone in B2B got the memo that LinkedIn is \"the professional network.\" So they all piled in. Cost per eyeball went up. Noise went up. Results went down.\n\nFacebook users spend 2 hours a day on the platform. LinkedIn? 15 minutes. And the audience skews older, which usually means more money, more buying authority, and decisions that have already been made.",
    quote: "The best opportunity is always where everyone else stopped looking.",
  },
];

export function PlaybookPage() {
  return (
      <div className="bg-background min-h-screen text-off-white">

        {/* HERO */}
        <section className="relative pt-40 pb-24 px-6 overflow-hidden">
          {/* Purple-magenta gradient orb */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
            style={{ background: 'radial-gradient(ellipse, #7B2FF7 0%, #F107A3 100%)' }}
          />
          <div className="container-wide relative z-10 max-w-4xl">
            <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
              Free Playbook · Facebook Platform Strategy
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-[clamp(52px,9vw,110px)] leading-[0.86] tracking-tighter mb-8"
            >
              The Facebook
              <br />
              <span className="text-warm-gray">Playbook</span>
            </motion.h1>
            <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-8">
              The exact 5-step system a multiple 7-figure operator walked me through in Cabo.
              He built a 24,000-member group and did $1.1M in a single day from it.
            </motion.p>

            <motion.div {...fade(0.35)} className="flex flex-wrap gap-4 mb-8">
              <a href="#the-playbook" className="btn-primary">Read the Playbook →</a>
              <DownloadGate
                storageKey={STORAGE_KEY}
                downloadUrl={DOWNLOAD_URL}
                source={LEAD_SOURCE}
                label="Download the PDF"
                className="btn-secondary"
              />
            </motion.div>

            {/* Social proof bar */}
            <motion.div {...fade(0.4)} className="glass-card p-5 max-w-xl flex items-start gap-4">
              <div
                className="w-10 h-10 rounded-full shrink-0 mt-0.5"
                style={{ background: 'linear-gradient(135deg, #7B2FF7, #F107A3)' }}
              />
              <div>
                <p className="text-off-white font-medium text-sm leading-snug">
                  Built a 24,000-member Facebook Group. $1.1M in a single day. Sold the whole thing in a multi-million dollar exit.
                </p>
                <p className="text-warm-gray/60 text-xs mt-1 font-light">Here's what he showed me.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 5 STEPS */}
        <section id="the-playbook" className="pb-32 px-6">
          <div className="container-wide max-w-4xl space-y-6">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                {...fade(i * 0.07)}
                className="glass-card p-8 md:p-10"
              >
                <div className="flex items-start gap-6 mb-6">
                  <span
                    className="font-display text-[clamp(56px,8vw,80px)] leading-none tracking-tighter shrink-0"
                    style={{ color: '#AAFF00', opacity: 0.9 }}
                  >
                    {step.num}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl tracking-tight leading-tight pt-3">
                    {step.title}
                  </h2>
                </div>

                <div className="space-y-4 mb-8">
                  {step.body.split('\n\n').map((para, j) => (
                    <p key={j} className="text-warm-gray font-light leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Power quote */}
                <div className="border-l-2 border-accent/40 pl-5">
                  <p
                    className="font-light italic leading-relaxed text-lg"
                    style={{ color: '#AAFF00' }}
                  >
                    "{step.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FREE TOOLS */}
        <section className="py-24 px-6 border-t border-white/10">
          <div className="container-wide max-w-4xl">
            <motion.p {...fade()} className="label-tag text-accent mb-4">More Free Tools</motion.p>
            <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
              While You're Here
            </motion.h2>
            <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
              These tools are free. Use them on your own or bring them into a call and we'll work through them together.
            </motion.p>
            <div className="grid md:grid-cols-3 gap-5">
              {[
                {
                  label: 'Business Clarity Coach',
                  desc: 'Stuck between ideas and zero traction? This locks in your one clear path forward in one session.',
                  href: 'https://ultimate-clarity-coach.vercel.app/',
                  cta: 'Get Clarity →',
                },
                {
                  label: 'Call Reflekt',
                  desc: 'Paste a sales call transcript. Get back exactly where you lost the frame.',
                  href: 'https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0',
                  cta: 'Analyze a Call →',
                },
                {
                  label: 'DM Copywriter',
                  sublabel: 'SLAP Method',
                  desc: 'Turn ignored DMs into booked calls. The exact framework Ian uses.',
                  href: 'https://slap-method-production.up.railway.app/',
                  cta: 'Try It Free →',
                },
                {
                  label: 'Cold Email Copywriter',
                  desc: 'Write cold emails that get replies. Poke The Bear framework, reply-focused CTAs, no AI fluff.',
                  href: 'https://cold-email-copywriter-production.up.railway.app',
                  cta: 'Write Cold Emails →',
                },
              ].map((tool, i) => (
                <motion.a
                  key={tool.label}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...fade(i * 0.1)}
                  className="glass-card-hover p-6 flex flex-col"
                >
                  <div className="mb-3">
                    <p className="label-tag text-accent">{tool.label}</p>
                    {'sublabel' in tool && tool.sublabel && (
                      <p className="label-tag text-warm-gray/50 mt-0.5">{tool.sublabel}</p>
                    )}
                  </div>
                  <p className="text-warm-gray font-light text-sm flex-1 mb-5">{tool.desc}</p>
                  <span className="text-off-white text-sm font-medium">{tool.cta}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER CTA */}
        <section className="py-24 px-6 border-t border-white/10">
          <div className="container-wide max-w-4xl text-center">
            <motion.p {...fade()} className="label-tag text-accent mb-4">
              Take It With You
            </motion.p>
            <motion.h2
              {...fade(0.1)}
              className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-5"
            >
              Download the
              <br />
              <span className="text-warm-gray">Full Playbook.</span>
            </motion.h2>
            <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-8 max-w-xl mx-auto">
              All 5 steps as a printable PDF. Open it in your browser and hit Ctrl+P to save.
            </motion.p>
            <motion.div {...fade(0.3)} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <DownloadGate
                storageKey={STORAGE_KEY}
                downloadUrl={DOWNLOAD_URL}
                source={LEAD_SOURCE}
                label="Download the Facebook Playbook →"
              />
              <a
                href="https://www.leadgenjay.com/book-ian"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-block"
              >
                Book a Clarity Call →
              </a>
            </motion.div>
          </div>
        </section>

      </div>
  );
}