import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';

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
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within the timeline container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Smooth the scroll progress for the drawn line effect
  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="origin" className="section-pad bg-background overflow-hidden">
      <div className="container-wide" ref={containerRef}>
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left: copy */}
          <div className="lg:sticky lg:top-32 lg:pb-32">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={vp}
              className="label-tag mb-4 shadow-sm"
            >
              The story behind the system
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease }}
              className="font-display text-5xl md:text-7xl tracking-tighter leading-none mb-8 drop-shadow-lg"
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
              className="relative pl-6 text-off-white text-lg font-light italic leading-relaxed mb-12 py-2"
            >
              {/* Dynamic Quote Border */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10" />
              <motion.div 
                className="absolute left-0 top-0 bottom-0 w-1 bg-accent shadow-[0_0_15px_rgba(170,255,0,0.5)] origin-top"
                style={{ scaleY: springProgress }}
              />
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
                className="inline-flex items-center gap-3 font-display text-xl tracking-widest text-off-white border-b-2 border-accent pb-1 hover:text-accent transition-colors group relative"
              >
                Read My Full Story 
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Right: timeline */}
          <div className="relative pt-8 lg:pt-0">
            {/* Base timeline background */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-white/10" />
            
            {/* Scroll-linked active timeline line */}
            <motion.div 
              className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-accent shadow-[0_0_10px_rgba(170,255,0,0.8)] origin-top"
              style={{ scaleY: springProgress }}
            />

            <div className="space-y-16">
              {TIMELINE.map((event, i) => {
                // Determine if this specific item is scrolled past based on math
                // Each item represents roughly a fraction of 1 / TIMELINE.length
                const sectionProgress = i / (TIMELINE.length - 1);

                return (
                  <motion.div
                    key={event.year}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ ...vp, margin: "-100px" }}
                    transition={{ duration: 0.8, ease }}
                    className="relative flex gap-8 pl-12 group"
                  >
                    {/* Interactive Dot */}
                    <motion.div
                      className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-background`}
                      whileInView={{
                        borderColor: event.year === 'NOW' ? '#AAFF00' : 'rgba(255,255,255,0.2)'
                      }}
                      viewport={{ margin: "-200px" }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full transition-colors duration-500 ${
                          event.year === 'NOW' ? 'bg-accent shadow-[0_0_10px_#AAFF00]' : 'bg-white/30'
                        }`}
                        whileInView={{
                           backgroundColor: '#AAFF00',
                           boxShadow: '0 0 10px #AAFF00'
                        }}
                        viewport={{ margin: "-200px" }}
                      />
                    </motion.div>

                    {/* Content */}
                    <div className="space-y-2 pb-2">
                      <span className="font-display text-2xl tracking-widest text-accent bg-accent/10 px-3 py-1 rounded inline-block">
                        {event.year}
                      </span>
                      <h4 className="font-display text-2xl md:text-3xl tracking-tight text-off-white group-hover:text-white transition-colors">
                        {event.title}
                      </h4>
                      <p className="text-warm-gray font-light leading-relaxed text-lg">
                        {event.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
