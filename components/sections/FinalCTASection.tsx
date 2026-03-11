import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function FinalCTASection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <section id="cta" className="section-pad bg-background-alt border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-accent/3 blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          className="label-tag mb-6"
        >
          The Captain's Log
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, ease }}
          className="font-display text-5xl md:text-8xl lg:text-[clamp(60px,9vw,130px)] tracking-tighter leading-none mb-6"
        >
          The System Is Built.
          <br />
          <span className="text-accent">Are You Ready?</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="text-lg md:text-xl text-warm-gray font-light max-w-xl mx-auto mb-12"
        >
          The 5-minute email that could save you 50 years. Sales insights, system updates,
          and frameworks from the field — direct from Ian.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          className="max-w-lg mx-auto mb-10"
        >
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your best email address"
                className="flex-1 bg-white/5 border border-white/12 px-5 py-4 text-sm text-off-white placeholder-warm-gray focus:outline-none focus:border-accent transition-colors"
              />
              <button type="submit" className="btn-primary flex-shrink-0">
                Subscribe
              </button>
            </form>
          ) : (
            <div className="glass-card p-6 text-center">
              <p className="text-accent font-display text-2xl tracking-wide mb-1">
                You're In
              </p>
              <p className="label-tag">First issue incoming. Check your inbox.</p>
            </div>
          )}
          <p className="label-tag text-center mt-3">No spam. Unsubscribe anytime.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://slap-method-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-block text-center"
          >
            Try SLAP Method Free →
          </a>
          <Link to="/contact" className="btn-primary inline-block text-center">
            Work With Me
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
