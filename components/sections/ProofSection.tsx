import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TESTIMONIALS, TICKER_WINS } from '../../constants';
import { useCountUp } from '../../hooks/useCountUp';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

function StatNumber({ end, prefix = '', suffix = '', label, accent, delay = 0 }: {
  end: number; prefix?: string; suffix?: string; label: string; accent: string; delay?: number;
}) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <motion.div 
      ref={ref} 
      className={`border-t-2 ${accent} pt-6 relative overflow-hidden group`}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease }}
    >
      <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="font-display text-[clamp(36px,4.5vw,68px)] leading-none text-off-white mb-3 tracking-tighter drop-shadow-lg group-hover:text-white transition-colors">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="label-tag opacity-80">{label}</div>
    </motion.div>
  );
}

function BillboardStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 border border-white/5 rounded-3xl p-8 md:p-12 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/50 pointer-events-none" />
      <StatNumber delay={0.0} end={500}    prefix=""  suffix="K+" label="Year One Revenue"         accent="border-accent" />
      <StatNumber delay={0.1} end={10}     prefix="$" suffix="K"  label="From One 90-Second Video" accent="border-starlink" />
      <StatNumber delay={0.2} end={197}    prefix=""  suffix=""   label="Comments on One Post"      accent="border-accent" />
      
      <motion.div 
        className="border-t-2 border-t-starlink pt-6 relative group overflow-hidden"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      >
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        <div className="font-display text-[clamp(36px,4.5vw,68px)] leading-none text-off-white mb-3 tracking-tighter drop-shadow-lg group-hover:text-white transition-colors">
          Wednesdays
        </div>
        <div className="label-tag opacity-80 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-starlink animate-pulse" />
          Live Group Clarity Call
        </div>
      </motion.div>
    </div>
  );
}

export function ProofSection() {
  return (
    <section id="proof" className="section-pad bg-background overflow-hidden relative">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,82,255,0.03),transparent_40%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(170,255,0,0.03),transparent_40%)] pointer-events-none" />

      <div className="container-wide relative z-10">
        {/* Label + Heading */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            className="label-tag mb-4"
          >
            From the community
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
            className="font-display text-5xl md:text-7xl tracking-tighter leading-none"
          >
            Real People.
            <br />
            <span className="text-warm-gray">Real Results.</span>
          </motion.h2>
        </div>

        {/* Billboard stats */}
        <BillboardStats />

        {/* Case Studies */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {/* Case Study 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="bento-card p-8 md:p-10 flex flex-col gap-5 border-l-2 border-accent/40 hover:border-accent group"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <span className="label-tag text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded">
                $10K · One Video
              </span>
              <span className="label-tag text-warm-gray">45 likes · 115 comments</span>
            </div>
            <h3 className="font-display text-3xl tracking-tight group-hover:text-accent transition-colors">
              The 90-Second Video I Almost Didn't Send
            </h3>
            <p className="text-warm-gray font-light leading-relaxed flex-1 text-lg">
              Sent a simple white-label SaaS walkthrough to a referred business owner.
              They replied asking about a service I hadn't even led with.{' '}
              <span className="text-off-white font-medium">That one video turned into $10,000.</span>{' '}
              Not because the video was perfect — because it gave them a solution to a
              pain they were already feeling.
            </p>
            <p className="label-tag text-accent border-t border-white/10 pt-5 pr-4 italic">
              "Let the marketplace tell you what they need — stop guessing."
            </p>
          </motion.div>

          {/* Case Study 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ delay: 0.2, duration: 0.8, ease }}
            className="bento-card p-8 md:p-10 flex flex-col gap-5 border-l-2 border-starlink/40 hover:border-starlink group"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <span className="label-tag text-starlink bg-starlink/10 border border-starlink/20 px-3 py-1 rounded">
                $1K MRR · Zero Sales Calls
              </span>
              <span className="label-tag text-warm-gray">19 likes · 46 comments</span>
            </div>
            <h3 className="font-display text-3xl tracking-tight group-hover:text-starlink transition-colors">
              $1K MRR From a Database Jay Called Garbage
            </h3>
            <p className="text-warm-gray font-light leading-relaxed flex-1 text-lg">
              Took a 2023 Instagram scrape Jay told him not to touch. Sorted 10M contacts
              down to 30K, verified for $50 — 15K deliverable. Applied the framework,
              wrote 3 emails in his Dyslexic Copywriter style, automated the follow-up.{' '}
              <span className="text-off-white font-medium">
                4,224 emails → 125 replies → 21 opportunities → 6 paying customers.
              </span>
            </p>
            <p className="label-tag text-starlink border-t border-white/10 pt-5 pr-4 italic">
              "That's the difference between a system you work and a system that works for you."
            </p>
          </motion.div>
        </div>

        {/* Community Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.15, duration: 0.7, type: "spring", bounce: 0.2 }}
              className="glass-card-hover p-8 flex flex-col gap-6"
            >
              <div className="flex justify-between items-start">
                <span className="label-tag text-accent bg-accent/5 border border-accent/20 px-3 py-1 rounded">
                  {t.result}
                </span>
                <span className="text-3xl text-white/10 font-serif leading-none opacity-50 block mt-[-10px]">"</span>
              </div>
              <p className="text-off-white font-light leading-relaxed flex-1 text-lg">
                {t.text}
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden group-hover:bg-white/10 transition-colors">
                  <span className="font-display text-base text-warm-gray">{t.initials}</span>
                </div>
                <div>
                  <p className="text-off-white text-base font-medium">{t.name}</p>
                  <p className="label-tag opacity-70 mt-0.5">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Modern Scrolling Ticket */}
      <div className="mt-20 border-y border-white/5 bg-white/[0.02] py-6 overflow-hidden relative">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex whitespace-nowrap animate-ticker group-hover:pause-animate">
          {[...TICKER_WINS, ...TICKER_WINS, ...TICKER_WINS].map((win, i) => (
            <div key={i} className="flex items-center mx-8">
              <span className="label-tag text-off-white text-sm opacity-60 flex-shrink-0">
                {win}
              </span>
              <span className="ml-16 text-accent text-lg opacity-40">◆</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
