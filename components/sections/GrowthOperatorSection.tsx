import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { WaitlistModal } from '../WaitlistModal';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const CASE_STUDY_URL = 'https://solutionsystempro.github.io/lgj-reports/Ian_Kirk_Value_Case_March2026.html';

export function GrowthOperatorSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section className="section-pad bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 xl:px-16 relative">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="label-tag">PROOF OF WORK</span>
          <div className="h-px w-12 bg-accent/40" />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-tight text-off-white mb-6"
        >
          See What's Possible
        </motion.h2>

        {/* Case study proof block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="bento-card p-8 md:p-12 mb-4 relative overflow-hidden"
        >
          {/* Accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent via-accent/60 to-transparent" />

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="label-tag text-accent border-accent/30 bg-accent/10">CLIENT CASE STUDY</span>
                <span className="label-tag">ANONYMOUS · REAL RESULTS</span>
              </div>
              <h3 className="text-[clamp(20px,2.5vw,32px)] font-black text-off-white leading-tight tracking-tight mb-4">
                How One Client Used the Growth Operator System to Double Their Revenue
              </h3>
              <p className="text-warm-gray text-base leading-relaxed max-w-xl">
                Ian came in as a Growth Operator — no fluff, no slides, no pitch. Just the full AI-powered system deployed inside their business. Offer clarity, DM framework, call scripts, objection handling. The whole stack. Here's exactly what happened.
              </p>
            </div>

            <div className="flex-shrink-0">
              <a
                href={CASE_STUDY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 btn-primary px-8 py-4 text-sm font-black tracking-widest whitespace-nowrap"
              >
                READ THE CASE STUDY
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* "You read it. Now choose your path." */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="text-center text-warm-gray text-sm font-mono tracking-widest uppercase mb-10"
        >
          You read what's possible. Now choose your path.
        </motion.p>

        {/* Two path cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Path 1 — Hire Ian */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="bento-card p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-transparent" />
            <div className="label-tag text-accent border-accent/30 bg-accent/10 mb-4 self-start">HIGH-TICKET · DONE-FOR-YOU</div>
            <h3 className="text-2xl font-black text-off-white tracking-tight mb-3">
              Bring Ian In
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed flex-1 mb-8">
              You have the audience. Ian brings the system. He comes in as your Growth Operator and deploys the full AI-powered sales architecture inside your business — offer clarity, DM framework, call scripts, objection handling. Done for you. Results-focused. Limited spots.
            </p>
            <ul className="space-y-2 mb-8">
              {['Full system deployed inside your business', 'Offer clarity + DM + calls + objection handling', 'Limited spots — application required'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-warm-gray">
                  <span className="text-accent mt-0.5 flex-shrink-0">◆</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="btn-primary w-full text-center text-sm font-black tracking-widest py-4"
            >
              APPLY TO WORK WITH IAN →
            </Link>
          </motion.div>

          {/* Path 2 — Learn the System */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="bento-card p-8 flex flex-col relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-white/30 to-transparent" />
            <div className="label-tag mb-4 self-start">9-WEEK INTENSIVE · COACHING</div>
            <h3 className="text-2xl font-black text-off-white tracking-tight mb-3">
              Learn the System
            </h3>
            <p className="text-warm-gray text-sm leading-relaxed flex-1 mb-8">
              Want to do what Ian does for clients? The Growth Operator Intensive teaches you to deploy the full system yourself — for your own business or for clients. 9 weeks. Ian's exact playbook. All the tools. You come out the other side as an operator.
            </p>
            <ul className="space-y-2 mb-8">
              {["Ian's exact Growth Operator playbook", 'All 4 AI tools included', '9-week intensive — not a course you forget'].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-warm-gray">
                  <span className="text-accent mt-0.5 flex-shrink-0">◆</span>
                  {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setWaitlistOpen(true)}
              className="w-full border border-white/15 hover:border-accent/50 text-off-white hover:text-accent text-sm font-black tracking-widest py-4 transition-all duration-300 bg-white/5 hover:bg-accent/5"
            >
              JOIN THE WAITLIST →
            </button>
          </motion.div>

        </div>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Growth Operator Intensive"
      />
    </section>
  );
}
