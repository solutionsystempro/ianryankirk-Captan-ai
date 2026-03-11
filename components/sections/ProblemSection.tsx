import React from 'react';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-80px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function ProblemSection() {
  return (
    <section id="problem" className="section-pad bg-background-alt border-y border-white/10 overflow-hidden">
      <div className="container-wide max-w-4xl">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="label-tag text-center mb-16"
        >
          Sound familiar?
        </motion.p>

        {/* Problem statements */}
        <div className="space-y-6 text-center mb-20">
          {[
            "You've done the courses.",
            "Downloaded the templates.",
            "Watched every YouTube breakdown.",
          ].map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.12, duration: 0.6, ease }}
              className="font-display text-3xl md:text-5xl tracking-tight text-warm-gray italic"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center font-display text-2xl md:text-4xl text-off-white mb-10 tracking-tight"
        >
          And you're still:
        </motion.p>

        {/* Pain points */}
        <div className="grid md:grid-cols-3 gap-6 mb-24">
          {[
            { icon: '↘', point: 'Losing deals you should have closed' },
            { icon: '⟳', point: 'Chasing leads instead of choosing them' },
            { icon: '⏱', point: 'Trading hours for income with no ceiling' },
          ].map((item, i) => (
            <motion.div
              key={item.point}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease }}
              className="glass-card p-6 text-center"
            >
              <span className="font-display text-4xl text-warm-gray/30 block mb-3">{item.icon}</span>
              <p className="text-warm-gray font-light leading-relaxed">{item.point}</p>
            </motion.div>
          ))}
        </div>

        {/* Bridge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.7, ease }}
          className="text-center"
        >
          <p className="font-display text-4xl md:text-6xl lg:text-7xl text-accent tracking-tight leading-tight">
            The gurus sold you tactics.
            <br />
            <span className="text-off-white">You needed architecture.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
