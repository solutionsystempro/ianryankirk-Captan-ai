import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PRODUCTS } from '../../constants';
import { WaitlistModal } from '../WaitlistModal';

const BADGE_COLORS: Record<string, string> = {
  FREE: 'bg-accent/10 text-accent border-accent/20',
  'FREE + PRO': 'bg-accent/10 text-accent border-accent/20',
  '$27/MO': 'bg-accent/10 text-accent border-accent/20',
  APPLY: 'bg-accent/10 text-accent border-accent/20',
};

// Advanced Magnetic Card Component
function MagneticCard({ product, onWaitlist }: { product: any; onWaitlist: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  // Convert mouse pos to a 3D rotation (-5deg to 5deg)
  const rotateX = isHovered ? (mousePos.y / (cardRef.current?.clientHeight || 100) - 0.5) * -10 : 0;
  const rotateY = isHovered ? (mousePos.x / (cardRef.current?.clientWidth || 100) - 0.5) * 10 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ 
        rotateX, 
        rotateY,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ perspective: 1000 }}
      className="bento-card group flex flex-col p-8 h-full"
    >
      {/* Dynamic Cursor Spotlight Effect */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-300 mix-blend-screen"
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(170,255,0,0.06), transparent 40%)`
        }}
      />

      {product.id === 'coaching' ? (
        /* Full-width horizontal layout for 1:1 coaching card */
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
          {/* Left: header + description */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <span className="font-display text-accent text-sm">{product.step}</span>
                </div>
              </div>
              <span className={`label-tag px-3 py-1 border rounded-full ${BADGE_COLORS[product.priceBadge] || 'bg-white/5 text-warm-gray border-white/10'}`}>
                {product.price}
              </span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
              {product.title}
            </h3>
            <p className="label-tag mb-5 opacity-70">{product.subtitle}</p>
            <p className="text-warm-gray font-light leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Right: features + CTA */}
          <div className="lg:w-80 xl:w-96 flex-shrink-0 flex flex-col gap-6">
            <ul className="flex flex-col gap-3">
              {product.features.map((f: string) => (
                <li key={f} className="flex items-start gap-2 text-sm text-off-white/80 font-light">
                  <span className="text-accent text-xs mt-1">◆</span> {f}
                </li>
              ))}
            </ul>
            <div className="pt-6 border-t border-white/10">
              <Link to="/contact" className="btn-primary w-full block text-center shadow-lg text-base py-5">
                {product.ctaText}
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Header Section */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                <span className="font-display text-accent text-sm">{product.step}</span>
              </div>
              {product.comingSoon && (
                <span className="label-tag text-warm-gray border border-white/15 px-2 py-0.5 rounded backdrop-blur-sm">
                  COMING SOON
                </span>
              )}
            </div>
            <span className={`label-tag px-3 py-1 border rounded-full ${BADGE_COLORS[product.priceBadge] || 'bg-white/5 text-warm-gray border-white/10'}`}>
              {product.price}
            </span>
          </div>

          {/* Content Section */}
          <h3 className="font-display text-3xl tracking-tight text-off-white mb-2 group-hover:text-accent transition-colors duration-300">
            {product.title}
          </h3>
          <p className="label-tag mb-4 opacity-70">{product.subtitle}</p>
          <p className="text-warm-gray font-light leading-relaxed mb-8 flex-1">
            {product.description}
          </p>

          {/* Footer Section */}
          <div className="mt-auto space-y-6">
            <ul className="flex flex-col gap-2">
              {product.features.map((f: string) => (
                <li key={f} className="flex items-center gap-2 text-sm text-off-white/80 font-light">
                  <span className="text-accent text-xs">◆</span> {f}
                </li>
              ))}
            </ul>

            <div className="pt-6 border-t border-white/10">
              {product.comingSoon ? (
                <button onClick={onWaitlist} className="btn-primary w-full shadow-lg">
                  {product.ctaText}
                </button>
              ) : (
                <a href={product.href} target="_blank" rel="noopener noreferrer" className="btn-primary w-full block text-center shadow-lg">
                  {product.ctaText}
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export function EcosystemSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="tools" className="section-pad bg-background relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-wide relative z-10">
        <div className="max-w-3xl mb-24 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="label-tag mb-4 shadow-sm"
          >
            The Full System
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
          >
            Start Where
            <br />
            <span className="text-warm-gray drop-shadow-md">You Are.</span>
          </motion.h2>
        </div>

        {/* Bento Grid */}
        <motion.div 
          style={{ y }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {PRODUCTS.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={product.id === 'coaching' ? 'col-span-1 md:col-span-2 lg:col-span-3' : ''}
            >
              <MagneticCard product={product} onWaitlist={() => setWaitlistOpen(true)} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Sales Objection Training Card App"
      />
    </section>
  );
}
