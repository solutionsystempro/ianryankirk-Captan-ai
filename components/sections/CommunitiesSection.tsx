import React from 'react';
import { motion } from 'framer-motion';
import { COMMUNITIES } from '../../constants';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function CommunitiesSection() {
  return (
    <section id="communities" className="py-20 bg-background border-t border-white/10">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              className="label-tag mb-3"
            >
              Where Ian shows up live
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, ease }}
              className="font-display text-4xl md:text-5xl tracking-tighter leading-none"
            >
              The Communities
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.2 }}
            className="text-warm-gray font-light max-w-sm text-sm leading-relaxed"
          >
            Free to join. Ian is active inside all three — coaching, posting, and running
            live sessions every week.
          </motion.p>
        </div>

        {/* Hump Day Clarity Calls callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease }}
          className="glass-card p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-l-4 border-accent/60"
        >
          <div>
            <p className="label-tag text-accent mb-2">Every Wednesday · Free · Live</p>
            <h3 className="font-display text-2xl tracking-tight mb-1">Hump Day Clarity Calls</h3>
            <p className="text-warm-gray text-sm font-light leading-relaxed max-w-xl">
              Open Q&A, real offer feedback, live sales diagnosis — no slides, no pitch. Ian works through your actual situation with the group inside Lead Gen Secrets and Remote Sales Secrets.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <a href="https://www.skool.com/lead-gen" target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-xs px-5 py-3 whitespace-nowrap">
              Lead Gen Secrets ↗
            </a>
            <a href="https://www.skool.com/remote-sales-secrets/about?ref=64378607e4d44ad99d39a6c9c49f3bff"
              target="_blank" rel="noopener noreferrer"
              className="btn-secondary text-xs px-5 py-3 whitespace-nowrap">
              Remote Sales Secrets ↗
            </a>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {COMMUNITIES.map((c, i) => (
            <motion.a
              key={c.name}
              href={c.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ delay: i * 0.1, duration: 0.6, ease }}
              whileHover={{ y: -4 }}
              className={`glass-card-hover p-6 flex flex-col gap-4 border-l-2 group ${c.accentClass}`}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-2xl tracking-tight leading-tight">
                  {c.name}
                </h3>
                <span className={`label-tag px-2 py-0.5 border flex-shrink-0 ${c.accentClass}`}>
                  {c.badge}
                </span>
              </div>
              <p className="text-warm-gray text-sm font-light leading-relaxed flex-1">
                {c.desc}
              </p>
              <span className={`label-tag group-hover:gap-2 transition-all flex items-center gap-1 ${c.accentClass}`}>
                Join Free ↗
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
