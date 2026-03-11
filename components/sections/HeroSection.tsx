import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex overflow-hidden bg-background"
    >
      {/* Dot grid */}
      <div
        className="absolute inset-0 bg-dot-pattern bg-dot pointer-events-none z-0"
        style={{ maskImage: 'radial-gradient(ellipse 90% 90% at 30% 50%, black 20%, transparent 100%)' }}
      />

      {/* Ambient orbs */}
      <div className="absolute top-[-100px] left-[-80px] w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(170,255,0,0.08) 0%, transparent 65%)' }} />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(0,82,255,0.07) 0%, transparent 65%)' }} />

      {/* ── MOBILE: Photo strip ── */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-[55vh] z-0">
        <img
          src="/ian-kirk.jpg"
          alt="Ian Ryan Kirk"
          className="w-full h-full object-cover object-top"
          style={{ filter: 'grayscale(15%) contrast(1.05)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/60 to-background pointer-events-none" />
      </div>

      {/* ── LEFT: Content ── */}
      <div className="relative z-10 flex flex-col justify-center w-full lg:w-[58%] px-6 md:px-12 xl:px-20 pt-[52vw] sm:pt-[45vw] lg:pt-32 pb-16">

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease }}
          className="mb-7"
        >
          <span className="pill-tag pill-tag-lime">
            <span className="live-dot" />
            Captain AI · Ian Ryan Kirk
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.9, ease }}
          className="font-display text-[clamp(52px,7.5vw,120px)] leading-[0.88] text-off-white mb-6"
        >
          Raised by
          <br />
          Two Teachers.
          <br />
          <span className="gradient-text">Still Don't</span>
          <br />
          <span className="gradient-text">Know Sh*t.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.7, ease }}
          className="text-base md:text-lg text-warm-gray font-light leading-relaxed max-w-xl mb-10"
        >
          28 years of doing it the hard way.{' '}
          <span className="text-off-white font-medium">Encoded all my lessons learned into AI</span>{' '}
          so you get an instant advantage.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6, ease }}
          className="flex flex-col sm:flex-row gap-3 mb-14"
        >
          <a
            href="https://slap-method-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center"
          >
            Get SLAP Method Free →
          </a>
          <Link to="/contact" className="btn-secondary text-center">
            Work With Me
          </Link>
        </motion.div>

        {/* KPI cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-3 gap-3 max-w-md"
        >
          {[
            { value: '$10K', label: 'One Video', top: 'border-t-accent' },
            { value: '1M+', label: 'Views', top: 'border-t-accent' },
            { value: '28 YRS', label: 'Hard Way', top: 'border-t-accent' },
          ].map((s) => (
            <div key={s.label} className={`glass-card border-t-2 ${s.top} p-4 text-center`}>
              <div className="font-display text-xl md:text-2xl text-off-white">{s.value}</div>
              <div className="label-tag mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Photo ── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[46%] z-0">
        {/* Left edge fade into background */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        {/* Top fade */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        <motion.img
          src="/ian-kirk.jpg"
          alt="Ian Ryan Kirk"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease }}
          className="w-full h-full object-cover object-top"
          style={{ filter: 'grayscale(15%) contrast(1.05)' }}
        />
      </div>

      {/* Scroll indicator — hidden on mobile to avoid overlap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:flex absolute bottom-8 left-12 xl:left-20 flex-col items-start gap-2 z-10"
      >
        <span className="label-tag">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-warm-gray/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
