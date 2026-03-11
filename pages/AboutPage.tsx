import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

export function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[140px] pointer-events-none" />
        <div className="container-wide relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.p {...fade(0.1)} className="label-tag text-accent mb-6">
                Founder · Architect · Captain
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease }}
                className="font-display text-[clamp(60px,10vw,130px)] leading-[0.85] tracking-tighter"
              >
                Ian Ryan
                <br />
                <span className="text-warm-gray">Kirk</span>
              </motion.h1>
              <motion.p {...fade(0.4)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mt-8">
                I build AI systems that automate income so founders can reclaim their time,
                sovereignty, and sanity.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease }}
              className="relative"
            >
              <img
                src="/ian-kirk.jpg"
                alt="Ian Ryan Kirk — Captain AI"
                className="w-full max-w-md mx-auto object-cover grayscale hover:grayscale-0 transition-all duration-700"
                style={{ filter: 'grayscale(20%) contrast(1.05)' }}
              />
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-accent/8 blur-3xl rounded-full -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CORE QUOTE */}
      <section className="py-24 bg-background-alt border-y border-white/10">
        <div className="container-wide max-w-5xl text-center">
          <motion.blockquote {...fade()}>
            <p className="pull-quote text-3xl md:text-5xl lg:text-[clamp(2rem,4vw,3.5rem)]">
              "I spent 20 years learning how to build a business.
              I spent the last 5 learning how to{' '}
              <span className="text-accent not-italic">build a life</span>{' '}
              that doesn't require me to be the engine."
            </p>
          </motion.blockquote>
        </div>
      </section>

      {/* THE VHS ERA */}
      <section className="section-pad px-6">
        <div className="container-wide grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fade()} className="space-y-6">
            <span className="label-tag text-accent">Phase 01 · 1999</span>
            <h2 className="font-display text-5xl md:text-6xl tracking-tighter leading-none">
              The VHS Era &<br />
              <span className="text-accent">The High Stakes Crash</span>
            </h2>
            <div className="space-y-4 text-warm-gray font-light leading-relaxed text-lg">
              <p>
                1999. A VHS camera, a wakeboard, and a phone book. I built my first 5-figure
                monthly business from cold calls — guerrilla-marketing at boat shows, editing
                on bootleg software. It felt like I'd hacked the world.
              </p>
              <p>
                Then success convinced me I was unstoppable. Real estate empires, $10M
                developments. I crushed it. Until 2008 — when the bottom fell out overnight.
              </p>
              <p className="text-off-white font-medium">
                I was $10M down. No moves left. I reached for my phone — and there was no one
                left to call.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={vp}
            transition={{ duration: 0.8, ease }}
            className="relative rotate-1 hover:rotate-0 transition-transform duration-700"
          >
            <img
              src="/ian-adventure.jpg"
              alt="Ian Kirk — In the field"
              className="w-full object-cover"
              style={{ filter: 'saturate(0.85) contrast(1.05)' }}
            />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-accent/10 blur-3xl rounded-full -z-10" />
          </motion.div>
        </div>
      </section>

      {/* 4 YEARS OF SILENCE */}
      <section className="section-pad bg-background-alt border-y border-white/10">
        <div className="container-wide max-w-4xl text-center space-y-10">
          <motion.span {...fade()} className="label-tag text-accent">
            The Transformation
          </motion.span>
          <motion.h2
            {...fade(0.1)}
            className="font-display text-7xl md:text-[clamp(80px,14vw,160px)] tracking-tighter leading-none"
          >
            4 Years of<br />Silence
          </motion.h2>
          <motion.div {...fade(0.2)} className="space-y-6 text-lg text-warm-gray font-light leading-relaxed">
            <p>I turned off my phone. Disappeared to the mountains. Taught snowboarding for $20/hr.</p>
            <p className="text-off-white font-medium italic">
              "Those 4 years taught me everything about architecture over hustle."
            </p>
            <p>
              Most entrepreneurs aren't building businesses — they're building high-stress jobs for
              themselves. I vowed that if I ever built again, it would be an engine, not a cage.
            </p>
          </motion.div>
        </div>
      </section>

      {/* THE ARCHITECTURE OF SCALE */}
      <section className="section-pad px-6">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.h3 {...fade()} className="font-display text-5xl tracking-tighter lg:sticky lg:top-32 leading-none">
                The<br />Architecture<br />of Scale
              </motion.h3>
            </div>
            <div className="lg:col-span-2 space-y-12">
              {[
                {
                  phase: 'Phase 01 · 2012',
                  title: 'The Systemization of Sales',
                  accent: 'border-accent',
                  body: 'I rebuilt from scratch — but this time, not on charisma. The Call Reflex methodology emerged from analyzing 500+ real conversations. A system for diagnosing human belief gaps and closing high-ticket deals through logic, not luck.',
                },
                {
                  phase: 'Phase 02 · 2018',
                  title: 'The Multi-Company Automation',
                  accent: 'border-white/15',
                  body: 'Three separate companies, running simultaneously. By 2018, they were 95% automated. I was no longer the bottleneck. I was the architect — the way it was always supposed to be.',
                },
                {
                  phase: 'Phase 03 · Now',
                  title: 'The Victoria Intelligence Layer',
                  accent: 'border-white/15',
                  body: 'With the rise of AI, I found the ultimate leverage point. 20 years of pattern recognition, encoded. The SLAP Method, Call Reflekt, Clarity Coach — this is Captain AI. The fusion of human grit and artificial precision.',
                },
              ].map((phase, i) => (
                <motion.div
                  key={phase.title}
                  {...fade(i * 0.1)}
                  className={`border-l-2 pl-8 space-y-3 ${phase.accent}`}
                >
                  <span className="label-tag text-accent">{phase.phase}</span>
                  <h4 className="font-display text-3xl tracking-tight">{phase.title}</h4>
                  <p className="text-warm-gray font-light leading-relaxed">{phase.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONNECT */}
      <section className="section-pad bg-background-alt border-t border-white/10">
        <div className="container-wide max-w-4xl text-center space-y-10">
          <motion.h2
            {...fade()}
            className="font-display text-6xl md:text-8xl tracking-tighter leading-none"
          >
            Follow the Build
          </motion.h2>
          <motion.p {...fade(0.15)} className="text-warm-gray text-lg font-light max-w-xl mx-auto">
            Sales systems, founder lessons, and frameworks from 20 years in the field — shared
            across every platform.
          </motion.p>
          <motion.div {...fade(0.25)} className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ianryankirk/' },
              { label: 'YouTube', href: 'https://www.youtube.com/@IanRyanKirk' },
              { label: 'Instagram', href: 'https://www.instagram.com/ianryankirk' },
              { label: 'X / Twitter', href: 'https://x.com/IanRyanKirk' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary text-xs py-3 px-6"
              >
                {s.label} ↗
              </a>
            ))}
          </motion.div>

          <motion.div {...fade(0.35)} className="pt-6">
            <Link to="/contact" className="btn-primary inline-block">
              Apply to Work Together →
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
