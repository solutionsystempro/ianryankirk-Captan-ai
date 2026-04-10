import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'irk_unlocked_gmail_claude';
const GOOGLE_CLIENT_ID = '124000673205-opil7sf4v1ddg0qhcsabe3gn10khu9rt.apps.googleusercontent.com';

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (element: HTMLElement, config: object) => void;
          prompt: () => void;
        };
      };
    };
  }
}

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
  const googleBtnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUnlocked(true);
    setChecked(true);
  }, []);

  // Initialize Google Identity Services once the gate is visible
  useEffect(() => {
    if (unlocked || !checked) return;

    const init = () => {
      if (!window.google) return;
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        auto_select: false,
      });
      if (googleBtnRef.current) {
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_black',
          size: 'large',
          width: googleBtnRef.current.offsetWidth || 400,
          text: 'continue_with',
          shape: 'rectangular',
        });
      }
    };

    // GSI script may still be loading — poll briefly
    if (window.google) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.google) { clearInterval(interval); init(); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [unlocked, checked]);

  const handleGoogleCredential = (response: { credential: string }) => {
    try {
      // Decode JWT payload (no sensitive verification needed client-side)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const googleName = payload.given_name || payload.name || '';
      const googleEmail = payload.email || '';
      unlock(googleName, googleEmail);
    } catch {
      setError('Google sign-in failed. Please try email instead.');
    }
  };

  const unlock = (n: string, e: string) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ name: n, email: e, ts: Date.now() }));
    setUnlocked(true);

    // TODO: forward to your email platform when ready
    // fetch('https://formspree.io/f/YOUR_ID', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ name: n, email: e, source: 'gmail-claude' }),
    // });
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
    unlock(name.trim(), email.trim());
    setSubmitting(false);
  };

  if (!checked) return null;

  return (
    <>
      <div className={unlocked ? '' : 'pointer-events-none select-none blur-sm brightness-50'}>
        {children}
      </div>

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

                {/* Google button — rendered by GSI into this div */}
                <div ref={googleBtnRef} className="w-full mb-4 flex justify-center" />

                <div className="relative flex items-center gap-3 py-1 mb-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="label-tag text-warm-gray/40">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="label-tag text-warm-gray/60 mb-1.5 block">First Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your first name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder-warm-gray/40 text-sm outline-none focus:border-accent/40 transition-all"
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
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-off-white placeholder-warm-gray/40 text-sm outline-none focus:border-accent/40 transition-all"
                      autoComplete="email"
                    />
                  </div>

                  {error && (
                    <p className="text-red-400/80 text-xs font-light">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Unlocking...' : 'Get Free Access →'}
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
