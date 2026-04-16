import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { useAttribution } from '../hooks/useAttribution';

const GOOGLE_CLIENT_ID = '124000673205-328d6k7j6c8vcj935gu0mmlu99jlor4v.apps.googleusercontent.com';

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
  /** localStorage key — set to mark this download as completed */
  storageKey: string;
  /** Path to the file to auto-download after email capture */
  downloadUrl: string;
  /** lead_magnet_source value for Supabase insert */
  source: string;
  /** Button label shown to user */
  label?: string;
  /** Optional extra className on the trigger button */
  className?: string;
  /** If provided, renders a custom trigger instead of the default button */
  children?: (handleClick: () => void, downloaded: boolean) => React.ReactNode;
}

export function DownloadGate({
  storageKey,
  downloadUrl,
  source,
  label = 'Download the Starter Kit →',
  className = 'btn-primary',
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [checked, setChecked] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const attribution = useAttribution();

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setDownloaded(true);
    setChecked(true);
  }, [storageKey]);

  useEffect(() => {
    if (!open || downloaded) return;

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

    if (window.google) {
      init();
    } else {
      const interval = setInterval(() => {
        if (window.google) { clearInterval(interval); init(); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, [open, downloaded]);

  const handleGoogleCredential = (response: { credential: string }) => {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      const googleName = payload.given_name || payload.name || '';
      const googleEmail = payload.email || '';
      complete(googleName, googleEmail);
    } catch {
      setError('Google sign-in failed. Please try email instead.');
    }
  };

  const triggerDownload = () => {
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = downloadUrl.split('/').pop() ?? 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const complete = async (n: string, e: string) => {
    localStorage.setItem(storageKey, JSON.stringify({ name: n, email: e, ts: Date.now() }));
    setDownloaded(true);
    setOpen(false);

    await supabase.from('waitlist').insert({
      name: n || null,
      email: e,
      app_website_source: 'captainai-website',
      lead_magnet_source: source,
      promo_code_source: attribution.promo_code_source,
    });

    triggerDownload();
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
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
    await complete(name.trim(), email.trim());
    setSubmitting(false);
  };

  const handleClick = () => {
    if (downloaded) {
      triggerDownload();
    } else {
      setOpen(true);
    }
  };

  if (!checked) return null;

  return (
    <>
      {children ? (
        children(handleClick, downloaded)
      ) : (
        <button onClick={handleClick} className={className}>
          {downloaded ? 'Download Again →' : label}
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center px-4"
            style={{ background: 'rgba(8,8,11,0.88)', backdropFilter: 'blur(14px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="glass-card p-8 md:p-10">
                <div className="mb-8">
                  <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                    <span className="text-accent text-lg">◆</span>
                  </div>
                  <h2 className="font-display text-3xl tracking-tighter text-off-white mb-2">
                    Get the Starter Kit
                  </h2>
                  <p className="text-warm-gray font-light text-sm leading-relaxed">
                    Drop your email. The download starts immediately. No spam — just the kit.
                  </p>
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
                    {submitting ? 'Sending...' : 'Download Now →'}
                  </button>
                </form>

                <div className="relative flex items-center gap-3 py-4 mt-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="label-tag text-warm-gray/40">or continue with Google</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <div ref={googleBtnRef} className="w-full flex justify-center" />

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