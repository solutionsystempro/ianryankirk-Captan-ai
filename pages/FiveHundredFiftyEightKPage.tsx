import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const vp = { once: true, margin: '-60px' } as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

const MONTHS = [
  { label: "Feb '25", value: 18000 },
  { label: "Mar", value: 24000 },
  { label: "Apr", value: 30000 },
  { label: "May", value: 34000 },
  { label: "Jun", value: 36000 },
  { label: "Jul", value: 38000 },
  { label: "Aug", value: 39000 },
  { label: "Sep", value: 41000 },
  { label: "Oct", value: 42800 },
  { label: "Nov", value: 54400 },
  { label: "Dec", value: 57900 },
  { label: "Jan '26", value: 62300 },
  { label: "Feb '26", value: 81400, peak: true },
];

const PRICING = [
  {
    num: '01',
    title: 'Removed the 40% Discount',
    body: 'The core offer was being sold at a 40% discount on the website. Ian made the case to the founder to sell at full price. The discount came down. Every sale after that point was worth more — for every closer on the team.',
  },
  {
    num: '02',
    title: 'Interest on Payment Plans',
    body: 'Payment plans were being offered at face value, leaving revenue on the table. Ian introduced interest charges on installments company-wide. A structural change that improved every future transaction.',
  },
  {
    num: '03',
    title: 'First Custom Build at $10K',
    body: 'No one had sold a custom build at this price point before. Ian did it. Then kept going — proving that the ceiling others assumed was actually just a floor.',
  },
  {
    num: '04',
    title: 'Only Closer to Reach $15K and $25K',
    body: 'The only closer in company history to sell at $15K and $25K. Not before Ian. Not after. These weren\'t lucky flukes — they were the result of understanding value at a level most closers never reach.',
    highlight: true,
  },
];

const TOOLS = [
  {
    label: 'Business Clarity Coach',
    desc: 'AI strategic diagnostic. Validates offers and maps the simplest path forward.',
    href: 'https://ultimate-clarity-coach.vercel.app/',
    cta: 'Try it free →',
  },
  {
    label: 'Call Reflekt Agent',
    desc: 'Paste a sales call transcript. Get back the exact moment you lost the frame.',
    href: 'https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0',
    cta: 'Analyze a call →',
  },
  {
    label: 'SLAP Method',
    desc: 'The framework that turns ignored DMs into booked calls.',
    href: 'https://slap-method-production.up.railway.app/',
    cta: 'Get the method →',
  },
  {
    label: 'Objection Card App',
    desc: '56 real-world objection reframes. Drillable, pocketable, built for the field.',
    href: 'https://objection-card-app.vercel.app/',
    cta: 'Try it free →',
  },
  {
    label: 'Cold Email Copywriter',
    desc: 'Write cold emails that get replies. Poke The Bear framework, reply-focused CTAs, no AI fluff.',
    href: 'https://cold-email-copywriter-production.up.railway.app',
    cta: 'Write Cold Emails →',
  },
];

const TESTIMONIALS = [
  {
    initials: 'KB',
    name: 'Kim Berthilsson',
    role: 'Community Member',
    quote: 'I just had the best clarity call of all time with Ian Kirk. If you\'re looking to navigate the ins and outs of building your business effectively, you won\'t want to miss the chance to speak with him. Ian is not just knowledgeable — he genuinely cares about helping people succeed.',
    badge: 'Best clarity call of all time',
  },
  {
    initials: 'JM',
    name: 'Jesse Murdock',
    role: 'Offer Builder',
    quote: 'I just wanted to write this to thank Ian Kirk for getting me started with my offer. I feel more confident in approaching my ideal client with my database reactivation offer. I can\'t wait to continue learning from this amazing community.',
    badge: 'Offer confidence unlocked',
  },
  {
    initials: 'CC',
    name: 'Cole TheConnector',
    role: 'Cold Email Specialist',
    quote: 'Last night\'s Coffee and Clarity call with Ian Kirk was FIRE. Ian\'s copywriting and cold email insights were absolute gold. Biggest takeaway: email brevity and psychology. Those first few preview text words are prime real estate.',
    badge: 'The call was FIRE',
  },
];

const STATS = [
  { value: '$558K', label: 'Closed in 12 Months' },
  { value: '300+', label: 'Clients Transformed' },
  { value: '30%+', label: 'Close Rate (1000+ Calls)' },
  { value: '$81.4K', label: 'Peak Month (Feb 2026)' },
];

function RevenueChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const max = Math.max(...MONTHS.map((m) => m.value));

  return (
    <div ref={ref} className="space-y-2">
      {MONTHS.map((month, i) => (
        <div key={month.label} className="flex items-center gap-3">
          <span className="text-warm-gray text-xs font-mono w-14 shrink-0 text-right">{month.label}</span>
          <div className="flex-1 h-7 bg-white/5 rounded-md overflow-hidden relative">
            <motion.div
              initial={{ width: 0 }}
              animate={inView ? { width: `${(month.value / max) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.7, delay: i * 0.06, ease }}
              className={`h-full rounded-md ${month.peak ? 'bg-accent' : 'bg-accent/40'}`}
            />
          </div>
          <span className={`text-xs font-mono w-16 shrink-0 ${month.peak ? 'text-accent font-semibold' : 'text-warm-gray'}`}>
            ${(month.value / 1000).toFixed(month.value % 1000 !== 0 ? 1 : 0)}K
            {month.peak && <span className="ml-1 text-accent">★</span>}
          </span>
        </div>
      ))}
    </div>
  );
}

export function FiveHundredFiftyEightKPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="label-tag text-accent">Proof of Work · Growth Operator</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(48px,8vw,100px)] leading-[0.88] tracking-tighter mb-8"
          >
            I Build Revenue
            <br />
            <span className="text-warm-gray">Then I Build</span>
            <br />
            the Systems.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
            className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-12"
          >
            25+ years of building, losing, and coming back stronger.
            Now applying every lesson.
          </motion.p>

          {/* STAT GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.08, ease }}
                className="glass-card p-5"
              >
                <p className="font-display text-3xl md:text-4xl text-accent tracking-tighter mb-1">{stat.value}</p>
                <p className="text-warm-gray text-xs font-light leading-tight">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease }}
          >
            <Link to="/contact" className="btn-primary inline-block">
              Book a Call →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* REVENUE CHART */}
      <section className="pb-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Sales Execution</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            $558K
            <br />
            <span className="text-warm-gray">in 12 Months</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
            Feb 2025 to Feb 2026. 1,000+ live calls. 300+ clients. 30%+ close rate.
            Month-over-month growth with a peak of $81.4K in the final month.
          </motion.p>

          <motion.div {...fade(0.25)} className="glass-card p-8">
            <p className="label-tag text-accent/60 mb-6">Revenue Trajectory — Feb 2025 → Feb 2026</p>
            <RevenueChart />
            <p className="text-warm-gray/40 text-xs font-light mt-6">
              Oct 2025–Feb 2026 confirmed from Airtable. Feb–Sep 2025 based on confirmed Q1 total of $72K (Feb start: $18K). Total: $558,000.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4 mt-6">
            {[
              { label: 'Q1 Total', value: '$72K' },
              { label: 'Highest Single Deal', value: '$25K' },
              { label: 'Peak Month', value: '$81.4K' },
            ].map((s, i) => (
              <motion.div key={s.label} {...fade(i * 0.08)} className="glass-card p-5 text-center">
                <p className="font-display text-3xl text-accent mb-1">{s.value}</p>
                <p className="text-warm-gray text-xs font-light">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING LEADERSHIP */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Pricing Leadership</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
            A Closer Who Only
            <br />
            <span className="text-warm-gray">Closes Is Replaceable.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Ian influenced the pricing model, expanded what was sellable, and raised the revenue ceiling
            for every deal that came after him. That's what a Growth Operator does.
          </motion.p>

          <div className="space-y-4">
            {PRICING.map((item, i) => (
              <motion.div
                key={item.num}
                {...fade(i * 0.08)}
                className={`glass-card p-8 ${item.highlight ? 'border border-accent/20 bg-accent/5' : ''}`}
              >
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="font-display text-accent text-sm">{item.num}</span>
                  </div>
                  <div>
                    {item.highlight && (
                      <span className="label-tag text-accent mb-2 inline-block">Only Ever</span>
                    )}
                    <h3 className="font-display text-2xl tracking-tight mb-3">{item.title}</h3>
                    <p className="text-warm-gray font-light leading-relaxed">{item.body}</p>
                    {item.highlight && (
                      <div className="flex gap-3 mt-4">
                        {['$15,000', '$25,000'].map((price) => (
                          <span key={price} className="px-4 py-2 bg-accent/10 border border-accent/20 rounded-lg font-display text-accent text-lg">
                            {price}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SYSTEMS BUILDING */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Systems Building</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
            AI Tools Built
            <br />
            <span className="text-warm-gray">From Scratch.</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Ian didn't just learn to close. He built the tools that made him better at it.
            Every tool below is live, free to use, and directly responsible for outcomes in his sales record.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-5">
            {TOOLS.map((tool, i) => (
              <motion.a
                key={tool.label}
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer"
                {...fade(i * 0.08)}
                className="glass-card-hover p-6 flex flex-col"
              >
                <p className="label-tag text-accent mb-3">{tool.label}</p>
                <p className="text-warm-gray font-light text-sm flex-1 mb-5">{tool.desc}</p>
                <span className="text-off-white text-sm font-medium">{tool.cta}</span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">What People Say</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter mb-12">
            Real People.
            <br />
            <span className="text-warm-gray">Real Results.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fade(i * 0.1)} className="glass-card p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <span className="font-display text-accent text-sm">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-off-white text-sm font-medium">{t.name}</p>
                    <p className="text-warm-gray text-xs font-light">{t.role}</p>
                  </div>
                </div>
                <p className="text-warm-gray font-light text-sm leading-relaxed flex-1 mb-5">"{t.quote}"</p>
                <span className="label-tag text-accent/60">{t.badge}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ORIGIN STORY */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Background</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-10">
            Built. Lost. Built
            <br />
            <span className="text-warm-gray">Again.</span>
          </motion.h2>

          <motion.div {...fade(0.15)} className="glass-card p-8 md:p-10">
            <div className="space-y-4 text-warm-gray font-light leading-relaxed">
              <p>Built a business from cold calls and VHS tapes.</p>
              <p>Watched $10M vanish overnight.</p>
              <p>Built a 2,500-rep empire — and lost it the same way.</p>
              <p>Spent 14 years in the mountains.</p>
              <p className="text-off-white font-medium">Now back, applying every lesson.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="container-wide max-w-4xl text-center">
          <motion.div {...fade()}>
            <p className="label-tag text-accent mb-6">Ready to Add a Growth Operator?</p>
            <h2 className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-6">
              Sales Execution.
              <br />
              <span className="text-warm-gray">AI Systems.</span>
              <br />
              25+ Years of Pattern Recognition.
            </h2>
            <p className="text-warm-gray font-light text-lg mb-10 max-w-xl mx-auto">
              One call to see if there's a fit.
            </p>
            <Link to="/contact" className="btn-primary inline-block">
              Book a Call →
            </Link>
          </motion.div>
        </div>
      </section>

      <div className="py-12 px-6 border-t border-white/5 text-center">
        <Link to="/" className="text-warm-gray hover:text-accent transition-colors text-sm font-light">
          ← Back to Ian Kirk
        </Link>
      </div>

    </div>
  );
}