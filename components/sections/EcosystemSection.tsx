import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PRODUCTS } from '../../constants';
import { WaitlistModal } from '../WaitlistModal';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const BADGE_COLORS: Record<string, string> = {
  FREE: 'bg-accent/10 text-accent border-accent/30',
  'FREE + PRO': 'bg-accent/10 text-accent border-accent/30',
  '$27/MO': 'bg-accent/10 text-accent border-accent/30',
  APPLY: 'bg-accent/10 text-accent border-accent/30',
};

export function EcosystemSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section id="ecosystem" className="section-pad bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            className="label-tag mb-4"
          >
            The Full System
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease }}
            className="font-display text-5xl md:text-7xl lg:text-8xl tracking-tighter leading-none"
          >
            Start Where
            <br />
            <span className="text-warm-gray">You Are.</span>
          </motion.h2>
        </div>

        {/* Product ladder */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[19px] md:left-[27px] top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {PRODUCTS.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={vp}
                transition={{ delay: i * 0.08, duration: 0.6, ease }}
                className="relative flex gap-6 md:gap-10 group"
              >
                {/* Step dot */}
                <div className="relative flex-shrink-0 hidden sm:flex">
                  <div
                    className="w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center z-10 transition-all duration-300 bg-background border-white/15 text-warm-gray group-hover:border-accent/50 group-hover:text-accent"
                  >
                    <span className="font-display text-sm md:text-base tracking-widest">
                      {product.step}
                    </span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className="flex-1 glass-card-hover p-6 md:p-8 rounded-none transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <h3 className="font-display text-2xl md:text-3xl tracking-tight">
                          {product.title}
                        </h3>

                        {product.comingSoon && (
                          <span className="label-tag text-warm-gray border border-white/15 px-2 py-0.5">
                            COMING SOON
                          </span>
                        )}
                      </div>
                      <p className="label-tag">{product.subtitle}</p>
                    </div>
                    <span
                      className={`label-tag px-3 py-1 border flex-shrink-0 ${
                        BADGE_COLORS[product.priceBadge] ?? 'bg-white/5 text-warm-gray border-white/10'
                      }`}
                    >
                      {product.price}
                    </span>
                  </div>

                  <p className="text-warm-gray font-light leading-relaxed mb-5 max-w-2xl">
                    {product.description}
                  </p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Features */}
                    <ul className="flex flex-wrap gap-x-6 gap-y-1">
                      {product.features.map((f) => (
                        <li key={f} className="label-tag flex items-center gap-2">
                          <span className="text-accent">✓</span> {f}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {product.comingSoon ? (
                      <button
                        onClick={() => setWaitlistOpen(true)}
                        className="btn-primary flex-shrink-0 whitespace-nowrap"
                      >
                        {product.ctaText}
                      </button>
                    ) : product.id === 'coaching' ? (
                      <Link to="/contact" className="btn-primary flex-shrink-0 whitespace-nowrap">
                        {product.ctaText}
                      </Link>
                    ) : (
                      <a
                        href={product.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-shrink-0 whitespace-nowrap ${
                          'btn-primary'
                        }`}
                      >
                        {product.ctaText}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Sales Objection Training Card App"
      />
    </section>
  );
}
