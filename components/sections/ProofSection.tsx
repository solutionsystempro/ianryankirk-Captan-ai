import React from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS, TICKER_WINS } from '../../constants';
import { useCountUp } from '../../hooks/useCountUp';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

function StatNumber({ end, prefix = '', suffix = '', label, accent }: {
  end: number; prefix?: string; suffix?: string; label: string; accent: string;
}) {
  const { count, ref } = useCountUp(end, 1800);
  return (
    <div ref={ref} className={`border-t-2 ${accent} pt-6`}>
      <div className="font-display text-[clamp(36px,4.5vw,68px)] leading-none text-off-white mb-3">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="label-tag">{label}</div>
    </div>
  );
}

function BillboardStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.7, ease }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-24 border border-border rounded-2xl p-8 md:p-12"
    >
      <StatNumber end={500}    prefix=""  suffix="K+" label="Year One Revenue"         accent="border-accent" />
      <StatNumber end={10}     prefix="$" suffix="K"  label="From One 90-Second Video" accent="border-starlink" />
      <StatNumber end={197}    prefix=""  suffix=""   label="Comments on One Post"      accent="border-accent" />
      <div className="border-t-2 border-t-starlink pt-6">
        <div className="font-display text-[clamp(36px,4.5vw,68px)] leading-none text-off-white mb-3">
          Fridays
        </div>
        <div className="label-tag">Live Group Clarity Call</div>
      </div>
    </motion.div>
  );
}

export function ProofSection() {
  return (
    <section id="proof" className="section-pad bg-background overflow-hidden">
      <div className="container-wide">
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

        {/* Testimonials */}
        {/* Ian's real case studies from community posts */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Case Study 1: $10K Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="glass-card-hover p-7 flex flex-col gap-4 border-l-2 border-accent/40"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="label-tag text-accent border border-accent/25 px-3 py-1">
                $10K · One Video
              </span>
              <span className="label-tag text-warm-gray">45 likes · 115 comments</span>
            </div>
            <h3 className="font-display text-2xl tracking-tight">
              The 90-Second Video I Almost Didn't Send
            </h3>
            <p className="text-warm-gray font-light leading-relaxed flex-1">
              Sent a simple white-label SaaS walkthrough to a referred business owner.
              They replied asking about a service I hadn't even led with.{' '}
              <span className="text-off-white">That one video turned into $10,000.</span>{' '}
              Not because the video was perfect — because it gave them a solution to a
              pain they were already feeling. The same framework: 1 million views on a
              video I almost didn't post.
            </p>
            <p className="label-tag text-accent border-t border-white/10 pt-4">
              "Let the marketplace tell you what they need — stop guessing."
            </p>
          </motion.div>

          {/* Case Study 2: $1K MRR Garbage Database */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ delay: 0.2, duration: 0.6, ease }}
            className="glass-card-hover p-7 flex flex-col gap-4 border-l-2 border-starlink/40"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="label-tag text-starlink border border-starlink/25 px-3 py-1">
                $1K MRR · Zero Sales Calls
              </span>
              <span className="label-tag text-warm-gray">19 likes · 46 comments</span>
            </div>
            <h3 className="font-display text-2xl tracking-tight">
              $1K MRR From a Database Jay Called Garbage
            </h3>
            <p className="text-warm-gray font-light leading-relaxed flex-1">
              Took a 2023 Instagram scrape Jay told him not to touch. Sorted 10M contacts
              down to 30K, verified for $50 — 15K deliverable. Applied the framework,
              wrote 3 emails in his Dyslexic Copywriter style, automated the follow-up.{' '}
              <span className="text-off-white">
                4,224 emails → 125 replies → 21 opportunities → 6 customers.
              </span>{' '}
              One new paying customer every other day. No calls. Just a free report and
              the reciprocity framework.
            </p>
            <p className="label-tag text-starlink border-t border-white/10 pt-4">
              "That's the difference between a system you work and a system that works for you."
            </p>
          </motion.div>
        </div>

        {/* Community testimonials */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              className="glass-card-hover p-7 flex flex-col gap-5"
            >
              <span className="label-tag text-accent border border-accent/25 px-3 py-1 self-start">
                {t.result}
              </span>
              <p className="text-off-white font-light leading-relaxed flex-1">
                "{t.text}"
              </p>
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <div className="w-10 h-10 bg-white/8 border border-white/12 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-display text-sm text-warm-gray">{t.initials}</span>
                </div>
                <div>
                  <p className="text-off-white text-sm font-medium">{t.name}</p>
                  <p className="label-tag">{t.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Scrolling ticker */}
      <div className="mt-20 border-y border-white/10 py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...TICKER_WINS, ...TICKER_WINS].map((win, i) => (
            <span key={i} className="label-tag text-warm-gray mx-8 flex-shrink-0">
              {win}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
