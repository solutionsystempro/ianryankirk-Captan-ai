import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const YES_LIST = [
  "You're already selling — you just want to close more",
  "You'd rather have a system than a hustle",
  "You're coachable and willing to look at your blind spots",
  "You want tools that work before you get on the call",
  "You're building something real, not chasing a trend",
];

const NO_LIST = [
  "You're looking for a magic button with no effort",
  "You want someone else to do your selling for you",
  "You're not willing to analyze what's not working",
  "You still think volume beats skill",
  "You're expecting overnight results from one tool",
];

export function FilterSection() {
  return (
    <section id="filter" className="section-pad bg-background-alt border-t border-white/10">
      <div className="container-wide">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            className="label-tag mb-4"
          >
            Honest filter
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
            className="font-display text-5xl md:text-7xl tracking-tighter leading-none"
          >
            Is This
            <br />
            <span className="text-warm-gray">For You?</span>
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 max-w-4xl mx-auto mb-16">
          {/* YES column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
            className="space-y-4"
          >
            <p className="font-display text-2xl tracking-widest text-accent mb-6">
              ✓ This is for you if...
            </p>
            {YES_LIST.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                className="flex items-start gap-4 p-4 glass-card border-l-2 border-accent/40"
              >
                <span className="text-accent mt-0.5 flex-shrink-0">→</span>
                <p className="text-off-white font-light leading-relaxed">{item}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* NO column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
            className="space-y-4"
          >
            <p className="font-display text-2xl tracking-widest text-warm-gray mb-6">
              ✗ This is not for you if...
            </p>
            {NO_LIST.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.07, duration: 0.5, ease }}
                className="flex items-start gap-4 p-4 glass-card opacity-60"
              >
                <span className="text-warm-gray mt-0.5 flex-shrink-0">×</span>
                <p className="text-warm-gray font-light leading-relaxed line-through decoration-warm-gray/40">
                  {item}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* CTA for qualified visitors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease }}
          className="text-center"
        >
          <p className="text-warm-gray font-light mb-2">
            Still here? You're the right person.
          </p>
          <p className="font-serif italic text-accent text-lg md:text-xl leading-relaxed mb-6">
            "We can make excuses or we can make money — but you can NEVER make both." — Ian
          </p>
          <Link to="/contact" className="btn-primary inline-block">
            Work With Me →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
