import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { SOCIAL_LINKS } from '../constants';

const ease = [0.22, 1, 0.36, 1] as const;

const inputClass =
  'w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-off-white text-sm placeholder-muted focus:outline-none focus:border-accent transition-colors';

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
      <section className="pt-36 pb-24 px-6">
        <div className="container-wide">
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
                <div className="glass-card p-5 border-l-2 border-accent/50 space-y-2">
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

                <div className="glass-card p-5 border-l-2 border-white/20 space-y-2">
                  <p className="label-tag text-muted">Private · Application Required</p>
                  <h3 className="font-display text-xl">1:1 Coaching</h3>
                  <p className="text-warm-gray text-sm font-light leading-relaxed">
                    Full AI sales system deployment. Your offer, your DM framework, your call
                    architecture — built together. Limited spots. Fill out the form to apply.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="pt-6 border-t border-border">
                <p className="label-tag mb-4">Follow the build</p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((s) => (
                    <a key={s.handle} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="w-10 h-10 border border-border flex items-center justify-center label-tag hover:border-starlink hover:text-starlink transition-all rounded-lg"
                      title={`${s.name} ${s.handle}`}>
                      {s.icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease }}
              className="glass-card p-8 md:p-10 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/8 blur-3xl rounded-full pointer-events-none" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
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
                    <select required className="w-full bg-white/5 border border-border rounded-lg px-4 py-3 text-off-white text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                      value={form.business_owner} onChange={(e) => set('business_owner', e.target.value)}>
                      <option value="" className="bg-background">— Select —</option>
                      <option value="Yes, I own a business" className="bg-background">Yes, I own a business</option>
                      <option value="Building toward it" className="bg-background">I'm building toward it</option>
                      <option value="Not yet" className="bg-background">Not yet</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="label-tag">What's your biggest bottleneck right now?</label>
                    <textarea rows={3} placeholder="DMs not converting, calls not closing, unclear offer..."
                      className={`${inputClass} resize-none`}
                      value={form.bottleneck} onChange={(e) => set('bottleneck', e.target.value)} />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <input required type="checkbox" className="mt-1 accent-accent"
                      checked={form.consent} onChange={(e) => set('consent', e.target.checked)} />
                    <p className="label-tag leading-relaxed">
                      I consent to receive communications from Captain AI / Ian Ryan Kirk.
                    </p>
                  </div>

                  {error && <p className="label-tag text-red-400">{error}</p>}

                  <button type="submit" disabled={sending} className="btn-primary w-full py-4 text-center">
                    {sending ? 'Sending...' : "Let's Connect →"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-16 space-y-5 relative z-10">
                  <div className="w-16 h-16 bg-accent/15 border border-accent/30 rounded-full flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-3xl text-off-white">Coordinates Received</h3>
                  <p className="text-warm-gray font-light">
                    The Captain has your message. I'll be in touch within 24 hours.
                  </p>
                  <a href="https://slap-method-production.up.railway.app/" target="_blank" rel="noopener noreferrer"
                    className="btn-primary inline-block mt-4">
                    While you wait — Try SLAP Method Free →
                  </a>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE STRIP */}
      <section className="bg-background-alt border-t border-border py-20 px-6">
        <div className="container-wide max-w-3xl text-center space-y-6">
          <h2 className="font-display text-4xl md:text-5xl">The Captain's Log</h2>
          <p className="label-tag text-accent">The 5-minute email that could save you 50 years.</p>
          {!subSubmitted ? (
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <input type="email" required placeholder="Your email" value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
                className="flex-1 bg-white/5 border border-border rounded-lg px-4 py-3 text-off-white text-sm placeholder-muted focus:outline-none focus:border-accent transition-colors" />
              <button type="submit" disabled={subSending} className="btn-primary flex-shrink-0">
                {subSending ? '...' : 'Subscribe'}
              </button>
            </form>
          ) : (
            <p className="text-accent font-display text-2xl">You're on the list. ✓</p>
          )}
        </div>
      </section>
    </div>
  );
}
