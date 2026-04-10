import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'irk_unlocked_gmail_claude';

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function LeadGate({ children, title, subtitle }: Props) {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUnlocked(true);
    setChecked(true);
  }, []);

  const unlock = (n: string, e: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: n, email: e, ts: Date.now() }));
    setUnlocked(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Both fields are required.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setSubmitting(true);
    setError('');

    // TODO: replace with your Formspree/Kit/GHL endpoint when ready
    // await fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name, email, source: 'gmail-claude' }),
    // });

    unlock(name.trim(), email.trim());
    setSubmitting(false);
  };

  // Don't render until we've checked localStorage (avoids flash)
  if (!checked) return null;

  return (
    <>
      {/* Page content — always rendered but blurred when locked */}
      <div className={unlocked ? '' : 'pointer-events-none select-none blur-sm brightness-50'}>
        {children}
      </div>

      {/* Gate overlay */}
      <AnimatePresence>
        {!unlocked && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            style={{ background: 'rgba(8,8,11,0.85)', backdropFilter: 'blur(12px)' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md"
            >
              <div className="glass-card p-8 md:p-10">
                {/* Header */}
                <div className="mb-8">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                    <span className="text-accent text-lg">◆</span>
                  </div>
                  <h2 className="font-display text-3xl tracking-tighter text-off-white mb-2">
                    {title}
                  </h2>
                  <p className="text-warm-gray font-light text-sm leading-relaxed">
                    {subtitle}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label-tag text-warm-gray/60 mb-1.5 block">First Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder-warm-gray/40 text-sm outline-none focus:border-accent/40 focus:bg-white/8 transition-all"
                      autoComplete="given-name"
                    />
                  </div>
                  <div>
                    <label className="label-tag text-warm-gray/60 mb-1.5 block">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder-warm-gray/40 text-sm outline-none focus:border-accent/40 focus:bg-white/8 transition-all"
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs font-light">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Unlocking...' : 'Get Free Access →'}
                  </button>

                  {/* Google auth — placeholder until Client ID is configured */}
                  <div className="relative flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-white/10" />
                    <span className="label-tag text-warm-gray/40">or</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <button
                    type="button"
                    onClick={() => setError('Google sign-in coming soon — use email above for now.')}
                    className="w-full flex items-center justify-center gap-3 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-off-white/70 text-sm font-light hover:bg-white/8 hover:border-white/20 transition-all"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continue with Google
                  </button>
                </form>

                <p className="text-warm-gray/40 text-xs font-light text-center mt-5 leading-relaxed">
                  No spam. Unsubscribe anytime. Your info stays with Ian.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
