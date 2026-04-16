import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAttribution } from '../hooks/useAttribution';

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

interface Feature { text: string }

interface Props {
  tag: string;
  headline: string;
  subheadline: string;
  description: string;
  features: Feature[];
  ctaText: string;
  ctaHref: string;
  price: string;
  /** When provided, renders an inline email capture form with this as lead_magnet_source */
  waitlistSource?: string;
}

export function ToolLandingPage({
  tag, headline, subheadline, description, features, ctaText, ctaHref, price, waitlistSource,
}: Props) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const attribution = useAttribution();

  const handleWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await supabase.from('waitlist').insert({
      email,
      app_website_source: 'captainai-website',
      lead_magnet_source: waitlistSource,
      promo_code_source: attribution.promo_code_source,
    });
    setSubmitted(true);
    setSending(false);
  };

  return (
    <div className="bg-background min-h-screen text-off-white">
      {/* ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <section className="relative pt-40 pb-32 px-6">
        <div className="container-wide max-w-3xl relative z-10">
          <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
            {tag}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(52px,9vw,110px)] leading-[0.88] tracking-tighter mb-4"
          >
            {headline}
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed mb-10">
            {subheadline}
          </motion.p>

          <motion.div {...fade(0.3)} className="glass-card p-8 mb-10">
            <p className="text-warm-gray font-light leading-relaxed text-lg mb-6">{description}</p>
            <ul className="space-y-3">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-3 text-off-white/80 font-light">
                  <span className="text-accent text-xs mt-1 shrink-0">◆</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div {...fade(0.4)} className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center"
            >
              {ctaText}
            </a>
            <div className="flex items-center gap-2 pt-2 sm:pt-3">
              <span className="label-tag text-accent">{price}</span>
            </div>
          </motion.div>

          {waitlistSource && (
            <motion.div {...fade(0.45)} className="mt-10">
              {!submitted ? (
                <form onSubmit={handleWaitlist} className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="Drop your email to stay in the loop"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 text-off-white text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(170,255,0,0.08)] transition-all duration-300"
                  />
                  <button type="submit" disabled={sending} className="btn-secondary flex-shrink-0">
                    {sending ? '...' : 'Notify Me'}
                  </button>
                </form>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-accent label-tag"
                >
                  You're in. I'll keep you posted. ✓
                </motion.p>
              )}
            </motion.div>
          )}

          <motion.div {...fade(0.5)} className="mt-20 pt-12 border-t border-white/10 text-center">
            <p className="text-warm-gray font-light text-sm mb-4">Want the full system built around your business?</p>
            <Link to="/contact" className="btn-secondary inline-block">
              Apply for 1:1 Coaching →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
