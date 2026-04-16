import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;

// Helper for staggered word animation
const StaggeredText = ({ text }: { text: string }) => {
  const words = text.split(' ');
  return (
    <span className="inline-block">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em] pb-1">
          <motion.span
            inline-block
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.8,
              ease,
              delay: 0.2 + i * 0.08,
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const yImage = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacityGrid = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse coordinates to -1 to 1 for subtle parallax
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex overflow-hidden bg-background"
    >
      {/* Scroll-fading Grid */}
      <motion.div
        style={{ opacity: opacityGrid }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute inset-0 bg-grid-pattern bg-grid opacity-20"
          style={{ maskImage: 'radial-gradient(ellipse 90% 90% at 30% 50%, black 20%, transparent 100%)' }}
        />
      </motion.div>

      {/* Mouse-reactive Ambient Orbs */}
      <motion.div 
        animate={{ 
          x: mousePosition.x * -30, 
          y: mousePosition.y * -30 
        }}
        transition={{ type: 'spring', stiffness: 40, damping: 30 }}
        className="absolute top-[-100px] left-[-80px] w-[800px] h-[800px] rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(170,255,0,0.06) 0%, transparent 60%)' }} 
      />
      <motion.div 
        animate={{ 
          x: mousePosition.x * 20, 
          y: mousePosition.y * 20 
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 40 }}
        className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full pointer-events-none z-0 mix-blend-screen"
        style={{ background: 'radial-gradient(circle, rgba(123,47,247,0.12) 0%, rgba(241,7,163,0.06) 60%, transparent 80%)' }}
      />

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
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
          className="mb-8"
        >
          <span className="pill-tag pill-tag-lime shadow-[0_0_20px_rgba(170,255,0,0.15)]">
            <span className="live-dot" />
            Captain AI · Ian Ryan Kirk
          </span>
        </motion.div>

        {/* Headline with Staggered Word Reveal */}
        <h1 className="font-display text-[clamp(52px,7.5vw,120px)] leading-[0.85] text-off-white mb-6">
          <StaggeredText text="Raised by" /><br />
          <StaggeredText text="Two Teachers." /><br />
          <span className="gradient-text"><StaggeredText text="Still Don't" /></span><br />
          <span className="gradient-text"><StaggeredText text="Know Sh*t." /></span>
        </h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8, ease }}
          className="text-base md:text-xl text-warm-gray font-light leading-relaxed max-w-2xl mb-12"
        >
          Generated $10,000 from one white-label video I almost didn't send. 1M+ views on TikTok from a video I almost didn't publish. I've spent 28 years learning these lessons the hard way.{' '}
          <span className="text-off-white font-medium drop-shadow-md">If you're part of my tribe, you don't have to.</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href="https://slap-method-production.up.railway.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-center group relative overflow-hidden"
          >
            {/* Button Shine effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
            <span className="relative z-10">Get SLAP Method Free →</span>
          </a>
          <a href="/#proof" className="btn-secondary text-center">
            See What's Possible
          </a>
        </motion.div>

        {/* KPI cards - Floating animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 1.0 }
            }
          }}
          className="grid grid-cols-3 gap-4 max-w-lg"
        >
          {[
            { value: '$10K', label: 'One Video', top: 'border-t-accent', delay: 0 },
            { value: '1M+', label: 'Views', top: 'border-t-accent', delay: 0.2 },
            { value: '28 YRS', label: 'Hard Way', top: 'border-t-accent', delay: 0.4 },
          ].map((s) => (
            <motion.div 
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease } }
              }}
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 4 + s.delay * 2, ease: "easeInOut", delay: s.delay }}
              className={`glass-card-hover border-t-2 ${s.top} p-5 text-center bg-white/[0.02] backdrop-blur-md`}
            >
              <div className="font-display text-2xl md:text-3xl text-off-white mb-1 drop-shadow-lg">{s.value}</div>
              <div className="label-tag mt-1 opacity-80">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT: Parallax Photo ── */}
      <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[46%] z-0 overflow-hidden">
        {/* Gradients to blend edges */}
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

        <motion.img
          src="/ian-kirk.jpg"
          alt="Ian Ryan Kirk"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          transition={{ delay: 0.3, duration: 1.5, ease }}
          className="w-full h-[120%] object-cover object-top -mt-[10%]"
          style={{ y: yImage, filter: 'grayscale(20%) contrast(1.1)' }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="hidden 2xl:flex absolute bottom-8 left-12 xl:left-20 flex-col items-start gap-3 z-10"
      >
        <span className="label-tag tracking-[0.3em]">Scroll</span>
        <div className="w-px h-12 bg-white/10 relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'circInOut' }}
            className="absolute top-0 left-0 w-full h-1/2 bg-accent shadow-[0_0_10px_#AAFF00]"
          />
        </div>
      </motion.div>
    </section>
  );
}
