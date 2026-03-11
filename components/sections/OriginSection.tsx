import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

const TIMELINE = [
  { year: '1999', title: 'The VHS Hustle', desc: "Built a 5-figure wakeboarding school from cold calls and bootleg editing software. No mentor. No playbook. Just a phone book and a pulse." },
  { year: '2008', title: 'The Crash', desc: "$10M in real estate and trade — gone overnight. I turned off my phone and disappeared. There was no one left to call." },
  { year: '2012', title: '4 Years of Silence', desc: "Taught snowboarding for $20/hr. Found architecture in the silence between turns. Vowed if I ever built again, it would be an engine — not a cage." },
  { year: '2018', title: 'The Rebuild', desc: "Three companies. 95% automated. I was no longer the bottleneck. The Call Reflex methodology was born from 500+ analyzed conversations." },
  { year: 'NOW', title: 'Captain AI', desc: "20 years of pattern recognition, encoded. The tools I wish I had in 2008. Free to start. Designed to scale with you." },
];

export function OriginSection() {
  return (
    <section id="origin" className="section-pad bg-background overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: copy */}
          <div className="lg:sticky lg:top-32">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              className="label-tag mb-4"
            >
              The story behind the system
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease }}
              className="font-display text-5xl md:text-7xl tracking-tighter leading-none mb-8"
            >
              I Built It.
              <br />
              Lost It.
              <br />
              <span className="text-warm-gray">Rebuilt Different.</span>
            </motion.h2>

            <motion.blockquote
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.15, ease }}
              className="border-l-2 border-accent pl-5 text-off-white text-lg font-light italic leading-relaxed mb-10"
            >
              "I shouldn't be here. But I am. And because I am, I have a responsibility to
              the people who are currently where I was in 2008."
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              transition={{ delay: 0.3 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-3 font-display text-xl tracking-widest text-off-white border-b-2 border-accent pb-1 hover:text-accent transition-colors"
              >
                Read My Full Story →
              </Link>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-accent/50 via-white/10 to-transparent" />

            <div className="space-y-10">
              {TIMELINE.map((event, i) => (
                <motion.div
                  key={event.year}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ delay: i * 0.1, duration: 0.6, ease }}
                  className="relative flex gap-8 pl-12"
                >
                  {/* Dot */}
                  <div
                    className={`absolute left-0 top-1 w-10 h-10 rounded-full border flex items-center justify-center ${
                      event.year === 'NOW'
                        ? 'bg-accent/15 border-accent'
                        : 'bg-background border-white/20'
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        event.year === 'NOW' ? 'bg-accent' : 'bg-white/30'
                      }`}
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-1.5 pb-2">
                    <span
                      className={`font-display text-xl tracking-widest ${
                        event.year === 'NOW' ? 'text-accent' : 'text-warm-gray'
                      }`}
                    >
                      {event.year}
                    </span>
                    <h4 className="font-display text-2xl tracking-tight text-off-white">
                      {event.title}
                    </h4>
                    <p className="text-warm-gray font-light leading-relaxed">{event.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
