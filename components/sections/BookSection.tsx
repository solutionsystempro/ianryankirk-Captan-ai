import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookAudioPlayer } from '../BookAudioPlayer';
import { WaitlistModal } from '../WaitlistModal';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;

export function BookSection() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);

  return (
    <section id="book" className="section-pad bg-background-alt border-y border-white/10 overflow-hidden">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Book mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease }}
            className="flex items-center justify-center"
          >
            {/* CSS 3D book */}
            <div className="relative" style={{ perspective: '1000px' }}>
              {/* Shadow */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-6 bg-black/60 blur-xl rounded-full" />

              <div
                className="relative w-52 h-80 md:w-64 md:h-96 animate-float"
                style={{ transform: 'rotateY(-15deg) rotateX(2deg)', transformStyle: 'preserve-3d' }}
              >
                {/* Front cover */}
                <div className="absolute inset-0 bg-background border border-white/15 p-6 md:p-8 flex flex-col justify-between overflow-hidden">
                  {/* Decorative lime stripe top */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />

                  <div className="space-y-2">
                    <p className="label-tag text-accent">Ian Ryan Kirk</p>
                    <div className="w-8 h-px bg-accent/50 my-3" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-3xl md:text-4xl leading-tight tracking-tight text-off-white">
                      Raised<br />by Two<br />Teachers
                    </h3>
                    <div className="w-full h-px bg-white/10" />
                    <p className="label-tag text-warm-gray leading-relaxed">
                      Building a business that doesn't require you to be the engine
                    </p>
                  </div>

                  {/* Bottom decoration */}
                  <div className="flex items-end justify-between">
                    <span className="label-tag text-accent/60">CAPTAIN AI</span>
                    <div className="w-6 h-6 bg-accent/10 border border-accent/30 flex items-center justify-center">
                      <span className="font-display text-accent text-sm">C</span>
                    </div>
                  </div>
                </div>

                {/* Spine */}
                <div
                  className="absolute top-0 bottom-0 right-0 w-6 bg-accent flex items-center justify-center"
                  style={{ transform: 'rotateY(90deg) translateZ(24px)', transformOrigin: 'right center' }}
                >
                  <span
                    className="font-display text-background text-xs tracking-widest whitespace-nowrap"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                  >
                    Ian Ryan Kirk
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.8, ease }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 flex-wrap">
              <span className="label-tag text-accent">The Book</span>
              <span className="label-tag border border-starlink/40 text-starlink px-2 py-0.5">
                Coming Soon
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl tracking-tighter leading-none">
              Raised by
              <br />
              <span className="text-warm-gray">Two Teachers</span>
            </h2>

            <blockquote className="border-l-2 border-accent pl-5 text-off-white text-lg md:text-xl font-light italic leading-relaxed">
              "Before the AI. Before the funnels. Before the decade of freedom.
              This is the story of how it all started — and why I almost never made it back."
            </blockquote>

            <p className="text-warm-gray leading-relaxed font-light">
              The book behind the system. A raw account of building, losing, disappearing,
              and rebuilding — and the two people who made all of it make sense.
            </p>

            {/* Audio player */}
            <div className="py-2">
              <p className="label-tag mb-3">Listen to Chapter 1</p>
              <BookAudioPlayer />
            </div>

            <button
              onClick={() => setWaitlistOpen(true)}
              className="btn-primary inline-block"
            >
              Join the Book Waitlist →
            </button>
          </motion.div>
        </div>
      </div>

      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        title="Raised by Two Teachers — The Book"
      />
    </section>
  );
}
