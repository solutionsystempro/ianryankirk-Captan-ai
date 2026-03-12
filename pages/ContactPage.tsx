import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { SOCIAL_LINKS } from '../constants';

const ease = [0.22, 1, 0.36, 1] as const;

// Premium input class — deep glass effect with glowing focus
const inputClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-off-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(170,255,0,0.08),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 backdrop-blur-md';

const selectClass =
  'w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-off-white text-sm focus:outline-none focus:border-accent/70 focus:bg-white/[0.07] focus:shadow-[0_0_0_3px_rgba(170,255,0,0.08)] transition-all duration-300 appearance-none backdrop-blur-md';

export function ContactPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    phone: '', business_owner: '', bottleneck: '', consent: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const [subEmail, setSubEmail] = useState('');
  const [subSubmitted, setSubSubmitted] = useState(false);
  const [subSending, setSubSending] = useState(false);

  const set = (field: string, value: string | boolean) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError('');
    const { error: err } = await supabase.from('contacts').insert({
      first_name:     form.first_name,
      last_name:      form.last_name,
      email:          form.email,
      phone:          form.phone || null,
      business_owner: form.business_owner,
      bottleneck:     form.bottleneck || null,
    });
    if (err) {
      setError('Something went wrong. Please try again or email ian@captainai.io');
    } else {
      setSubmitted(true);
    }
    setSending(false);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubSending(true);
    await supabase.from('waitlist').insert({ email: subEmail, source: "Captain's Log" });
    setSubSubmitted(true);
    setSubSending(false);
  };

  return (
    <div className="bg-background min-h-screen text-off-white">
      <section className="pt-36 pb-24 px-6 relative overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left */}
            <div className="space-y-8">
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
                className="label-tag text-accent">
                Work With Me
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease }}
                className="font-display text-[clamp(50px,9vw,110px)] leading-none">
                Ready to
                <br />
                <span className="gradient-text">Scale?</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-4 max-w-md">
                <div className="bento-card p-6 border-l-2 border-accent/50 space-y-2">
                  <p className="label-tag text-accent">Free · Group</p>
                  <h3 className="font-display text-xl">Friday Clarity Calls</h3>
                  <p className="text-warm-gray text-sm font-light leading-relaxed">
                    Live every Friday inside Lead Gen Secrets and Remote Sales Secrets.
                    Bring your offer, your DMs, your call struggles — Ian works through it live with the group.
                  </p>
                  <div className="flex gap-3 pt-1 flex-wrap">
                    <a href="https://www.skool.com/lead-gen" target="_blank" rel="noopener noreferrer"
                      className="label-tag text-accent hover:text-off-white transition-colors">
                      Join Lead Gen Secrets ↗
                    </a>
                    <span className="label-tag text-muted">·</span>
                    <a href="https://www.skool.com/remote-sales-secrets/about?ref=64378607e4d44ad99d39a6c9c49f3bff"
                      target="_blank" rel="noopener noreferrer"
                      className="label-tag text-accent hover:text-off-white transition-colors">
                      Remote Sales Secrets ↗
                    </a>
                  </div>
                </div>

                <div className="bento-card p-6 border-l-2 border-white/15 space-y-2">
                  <p className="label-tag text-muted">Private · Application Required</p>
                  <h3 className="font-display text-xl">1:1 Coaching</h3>
                  <p className="text-warm-gray text-sm font-light leading-relaxed">
                    Full AI sales system deployment. Your offer, your DM framework, your call
                    architecture — built together. Limited spots. Fill out the form to apply.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="pt-6 border-t border-white/10">
                <p className="label-tag mb-4">Follow the build</p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.handle} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 border border-white/10 flex items-center justify-center label-tag hover:border-accent hover:text-accent transition-all rounded-lg backdrop-blur-sm bg-white/[0.02]"
                      title={`${s.name} ${s.handle}`}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Premium Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease }}
              className="bento-card p-8 md:p-10 relative overflow-hidden">
              {/* Form glow */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-accent/[0.06] blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    onSubmit={handleSubmit}
                    className="space-y-5 relative z-10"
                  >
                    <h3 className="font-display text-2xl tracking-tight mb-6">Apply to Work Together</h3>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <div className="space-y-2">
                        <label className="label-tag">First Name *</label>
                        <input required type="text" placeholder="First" className={inputClass}
                          value={form.first_name} onChange={(e) => set('first_name', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <label className="label-tag">Last Name *</label>
                        <input required type="text" placeholder="Last" className={inputClass}
                          value={form.last_name} onChange={(e) => set('last_name', e.target.value)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="label-tag">Email *</label>
                      <input required type="email" placeholder="your@email.com" className={inputClass}
                        value={form.email} onChange={(e) => set('email', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <label className="label-tag">Phone</label>
                      <input type="tel" placeholder="(555) 000-0000" className={inputClass}
                        value={form.phone} onChange={(e) => set('phone', e.target.value)} />
                    </div>

                    <div className="space-y-2">
                      <label className="label-tag">Are you a business owner? *</label>
                      <div className="relative">
                        <select required className={selectClass}
                          value={form.business_owner} onChange={(e) => set('business_owner', e.target.value)}>
                          <option value="" className="bg-[#0d0d12]">— Select —</option>
                          <option value="Yes, I own a business" className="bg-[#0d0d12]">Yes, I own a business</option>
                          <option value="Building toward it" className="bg-[#0d0d12]">I'm building toward it</option>
                          <option value="Not yet" className="bg-[#0d0d12]">Not yet</option>
                        </select>
                        {/* Custom arrow */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-warm-gray text-xs">▼</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="label-tag">What's your biggest bottleneck right now?</label>
                      <textarea rows={3} placeholder="DMs not converting, calls not closing, unclear offer..."
                        className={`${inputClass} resize-none`}
                        value={form.bottleneck} onChange={(e) => set('bottleneck', e.target.value)} />
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input required type="checkbox" className="mt-1 accent-accent w-4 h-4"
                        checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                      <p className="label-tag leading-relaxed">
                        I consent to receive communications from Captain AI / Ian Ryan Kirk.
                      </p>
                    </div>

                    {error && <p className="label-tag text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">{error}</p>}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full py-5 text-center relative overflow-hidden group mt-2"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_ease_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      <span className="relative z-10">{sending ? 'Sending...' : "Let's Connect →"}</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="text-center py-16 space-y-5 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      className="w-20 h-20 bg-accent/15 border border-accent/40 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(170,255,0,0.2)]"
                    >
                      <svg className="w-9 h-9 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                    <h3 className="font-display text-4xl text-off-white drop-shadow-lg">Coordinates Received</h3>
                    <p className="text-warm-gray font-light text-lg">
                      The Captain has your message. I'll be in touch within 24 hours.
                    </p>
                    <a href="https://slap-method-production.up.railway.app/" target="_blank" rel="noopener noreferrer"
                      className="btn-primary inline-block mt-4">
                      While you wait — Try SLAP Method Free →
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE STRIP */}
      <section className="border-t border-white/10 py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.015] pointer-events-none" />
        <div className="container-wide max-w-3xl text-center space-y-6 relative z-10">
          <h2 className="font-display text-4xl md:text-5xl">The Captain's Log</h2>
          <p className="label-tag text-accent">The 5-minute email that could save you 50 years.</p>
          {!subSubmitted ? (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="Your email" value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-off-white text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/70 focus:shadow-[0_0_0_3px_rgba(170,255,0,0.08)] transition-all duration-300" />
              <button type="submit" disabled={subSending} className="btn-primary flex-shrink-0">
                {subSending ? '...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-accent font-display text-2xl"
            >
              You're on the list. ✓
            </motion.p>
          )}
        </div>
      </section>
    </div>
  );
}
