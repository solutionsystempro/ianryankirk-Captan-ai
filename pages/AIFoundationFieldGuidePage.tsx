import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});

const phases = [
  {
    number: '00',
    name: 'Intake',
    time: '0–5 min',
    goal: 'Surface where you are before building anything.',
    questions: [
      'Do you have an existing business or are we building from scratch?',
      'What do you currently use AI for? What\'s working, what\'s not?',
      'Do you have any content I can analyze for your voice?',
      'What\'s the one result you most want to be known for?',
    ],
    output: 'Clear starting point. No wasted time.',
  },
  {
    number: '01',
    name: 'Offer Excavation',
    time: '5–30 min',
    goal: 'Document the core variables of your offer with precision.',
    questions: [
      'What do you sell? Not the category — the actual deliverable.',
      'Who buys it? Paint a picture of the specific person, not a demographic bucket.',
      'What problem do they have right now that\'s bothering them TODAY?',
      'What\'s the #1 result you get for clients? Name, number, timeline.',
      'Why does your approach work when others don\'t?',
    ],
    output: 'Product name · Market · Main outcome · Main pain · Clear advantage',
  },
  {
    number: '02',
    name: 'Buyer Excavation',
    time: '30–45 min',
    goal: 'Build a psychographic profile deep enough to write copy that makes people say "this is literally me."',
    questions: [
      'What is your buyer afraid of? Not "losing money" — what specifically?',
      'What have they already tried? What failed and why?',
      'What would they Google at 2am when this problem is at its worst?',
      'What do they secretly want that they wouldn\'t admit professionally?',
      'What sentence, if they read it in a post, would make them say "this person is inside my head"?',
    ],
    output: 'Buyer profile · Top 5 pains · Top 3 fears · Desired future · Their exact language · Primary objection',
  },
  {
    number: '03',
    name: 'Unique Mechanism',
    time: '45–60 min',
    goal: 'Name the branded approach that makes your method feel inevitable.',
    questions: [
      'Walk me through exactly what you do with a new client. Step by step.',
      'What\'s the first thing you look at when you start with someone new?',
      'What do you see that other people in your space miss entirely?',
      'If you had to name the core insight behind your method — what would you call it?',
    ],
    output: 'Mechanism name · One-line definition · Why it works (3–5 step chain) · What it replaces',
  },
  {
    number: '04',
    name: 'Power Offer Statement',
    time: '60–70 min',
    goal: 'Compress everything into one sentence.',
    questions: [
      'Does this sound like something you\'d actually say — or like a LinkedIn bio?',
      'Is the WHO specific enough? (Not "coaches" — "service providers selling high-ticket offers")',
      'Is the OUTCOME specific enough? (Not "more clients" — "3–5 qualified calls per week")',
      'Is the mechanism named? (Not "my process" — "the [Mechanism Name]")',
    ],
    output: 'One Power Offer Statement, ready to open any AI prompt',
  },
  {
    number: '05',
    name: 'Brand Voice Foundation',
    time: '70–85 min',
    goal: 'Capture enough voice data to make AI output sound like you.',
    questions: [
      'What would you say to someone thinking about using AI but unsure where to start?',
      'What do you believe about your industry that most people in it get wrong?',
      'Tell me about a time a client got a result that surprised even you.',
    ],
    output: 'Voice profile · Signature phrases · DO list · DON\'T list · Syntax pattern',
  },
];

const mechanismRules = [
  { rule: 'Sound scientific or technical', example: '"The Belief Gap" — not "The Mind Reset"' },
  { rule: 'Feel almost familiar', example: 'Like they should already know what it is' },
  { rule: 'Be 1–3 words', example: '"The Context Stack" — not "The Revolutionary AI Content System"' },
  { rule: 'Describe the process, not the result', example: '"The Conviction Architecture" — not "The Client Flood Method"' },
  { rule: 'Avoid anything that sounds hyped-up', example: 'If it sounds like a Tony Robbins product, name it again' },
];

const foundationDocSections = [
  { label: 'OFFER', fields: ['Product Name', 'Market', 'Main Outcome', 'Main Pain', 'Clear Advantage'] },
  { label: 'BUYER', fields: ['Profile', 'Top 5 Pains', 'Top 3 Fears', 'Desired Future', 'Their Language', 'Primary Objection'] },
  { label: 'MECHANISM', fields: ['Name', 'One-Line Definition', 'Why It Works (chain)', 'What It Replaces'] },
  { label: 'POWER OFFER STATEMENT', fields: ['Full sentence'] },
  { label: 'BRAND VOICE', fields: ['Signature Phrases', 'DO List', 'DON\'T List', 'Syntax Pattern'] },
];

export function AIFoundationFieldGuidePage() {
  const [openPhase, setOpenPhase] = useState<number | null>(0);

  return (
    <div className="bg-background min-h-screen text-off-white">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      {/* ── HERO ── */}
      <section className="relative pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
            Free Field Guide · AI Foundation Session
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(48px,8vw,96px)] leading-[0.88] tracking-tighter mb-6"
          >
            The AI Foundation Field Guide
          </motion.h1>
          <motion.p {...fade(0.2)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed mb-8">
            The exact session structure, key questions, formulas, and output template used in every AI Foundation Session.
          </motion.p>
          <motion.p {...fade(0.3)} className="text-off-white/70 font-light leading-relaxed mb-10 max-w-2xl">
            AI is only as good as what you give it. This guide shows you the complete framework for building the one document that makes every AI tool you use produce output that actually converts — offer, buyer, mechanism, and voice, all in one place.
          </motion.p>
          <motion.div {...fade(0.4)} className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://cal.com/iankirk/ai-foundation"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block text-center"
            >
              Book the Session — $97 →
            </a>
            <span className="flex items-center text-warm-gray text-sm pt-1 sm:pt-3 font-light">
              90 minutes · Done live with you · Foundation built
            </span>
          </motion.div>
        </div>
      </section>

      {/* ── WHY THE FOUNDATION ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="glass-card p-8 md:p-10"
          >
            <p className="text-accent text-xs font-mono tracking-widest uppercase mb-4">The Core Problem</p>
            <p className="text-xl md:text-2xl text-off-white font-light leading-relaxed mb-6">
              Every AI tool you've ever used has failed you because you gave it fragments.
            </p>
            <p className="text-warm-gray font-light leading-relaxed mb-4">
              You gave it a rough description of your offer. You gave it a vague audience. You gave it no voice, no mechanism, no buyer psychology. Then you wondered why the output sounded like everyone else's.
            </p>
            <p className="text-warm-gray font-light leading-relaxed">
              The Foundation Doc is the single source of truth for your business. When any AI tool — Claude, ChatGPT, whatever — references this document, generic output becomes structurally impossible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── POWER OFFER FORMULA ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-mono tracking-widest uppercase mb-4"
          >
            The Formula
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl tracking-tighter mb-10"
          >
            Power Offer Statement
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="glass-card p-8 md:p-10 mb-8"
          >
            <p className="font-mono text-accent text-lg md:text-xl leading-relaxed">
              "I help <span className="text-off-white">[SPECIFIC WHO]</span> achieve <span className="text-off-white">[SPECIFIC OUTCOME]</span> using <span className="text-off-white">[MECHANISM NAME]</span> without <span className="text-off-white">[DREADED ALTERNATIVE]</span>."
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'SPECIFIC WHO', weak: '"Coaches and consultants"', strong: '"Service providers selling high-ticket offers"' },
              { label: 'SPECIFIC OUTCOME', weak: '"More clients"', strong: '"3–5 qualified discovery calls per week"' },
              { label: 'MECHANISM NAME', weak: '"My process"', strong: '"The Context Stack"' },
              { label: 'DREADED ALTERNATIVE', weak: '"Without the hard work"', strong: '"Without rewriting everything from scratch"' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="glass-card p-5"
              >
                <p className="text-accent text-xs font-mono tracking-widest uppercase mb-3">{item.label}</p>
                <p className="text-warm-gray text-sm font-light line-through mb-1">{item.weak}</p>
                <p className="text-off-white text-sm font-light">{item.strong}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SESSION PHASES ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-mono tracking-widest uppercase mb-4"
          >
            The Session Structure
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl tracking-tighter mb-4"
          >
            6 Phases. 90 Minutes.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-warm-gray font-light mb-10"
          >
            Each phase has a specific goal, a set of questions to surface the real answers, and a concrete output. Click any phase to see the questions.
          </motion.p>
          <div className="space-y-3">
            {phases.map((phase, i) => (
              <motion.div
                key={phase.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.06, ease }}
              >
                <button
                  onClick={() => setOpenPhase(openPhase === i ? null : i)}
                  className="w-full text-left glass-card-hover p-6 group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <span className="font-mono text-accent text-sm shrink-0 mt-0.5">{phase.number}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-1">
                          <span className="text-off-white font-semibold">{phase.name}</span>
                          <span className="text-warm-gray text-xs font-mono">{phase.time}</span>
                        </div>
                        <p className="text-warm-gray font-light text-sm">{phase.goal}</p>
                      </div>
                    </div>
                    <span className={`text-accent text-lg shrink-0 transition-transform duration-300 ${openPhase === i ? 'rotate-45' : ''}`}>
                      +
                    </span>
                  </div>
                  {openPhase === i && (
                    <div className="mt-6 pt-6 border-t border-white/5">
                      <p className="text-accent text-xs font-mono tracking-widest uppercase mb-4">Key Questions</p>
                      <ul className="space-y-3 mb-6">
                        {phase.questions.map((q) => (
                          <li key={q} className="flex items-start gap-3 text-off-white/80 font-light text-sm">
                            <span className="text-accent shrink-0 mt-0.5">◆</span>
                            <span>"{q}"</span>
                          </li>
                        ))}
                      </ul>
                      <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
                        <p className="text-accent text-xs font-mono tracking-widest uppercase mb-1">Output</p>
                        <p className="text-off-white/80 font-light text-sm">{phase.output}</p>
                      </div>
                    </div>
                  )}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MECHANISM NAMING RULES ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-mono tracking-widest uppercase mb-4"
          >
            Mechanism Naming
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl tracking-tighter mb-4"
          >
            5 Rules for Naming Your Mechanism
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-warm-gray font-light mb-10"
          >
            The mechanism is the named thing that makes your approach feel categorically different — not just better. It has to sound right before it can convert.
          </motion.p>
          <div className="space-y-3">
            {mechanismRules.map((item, i) => (
              <motion.div
                key={item.rule}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease }}
                className="glass-card p-5 flex items-start gap-4"
              >
                <span className="text-accent font-mono text-sm shrink-0 mt-0.5">0{i + 1}</span>
                <div>
                  <p className="text-off-white font-medium mb-1">{item.rule}</p>
                  <p className="text-warm-gray font-light text-sm">{item.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="mt-8 glass-card p-6"
          >
            <p className="text-accent text-xs font-mono tracking-widest uppercase mb-3">Examples of the right feel</p>
            <div className="flex flex-wrap gap-3">
              {['The Belief Gap', 'The Conviction Architecture', 'The Foundation Protocol', 'The Context Stack', 'The Handoff Brief'].map((name) => (
                <span key={name} className="px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-lg text-off-white text-sm font-light">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FOUNDATION DOC TEMPLATE ── */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-accent text-xs font-mono tracking-widest uppercase mb-4"
          >
            The Output
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="font-display text-4xl md:text-5xl tracking-tighter mb-4"
          >
            What You Leave With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-warm-gray font-light mb-10"
          >
            By the end of the session, every section below is filled in — specific to your business, your buyer, your voice. This document becomes the reference file for every AI tool you use.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="glass-card p-8 font-mono text-sm space-y-6"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-accent tracking-widest text-xs uppercase">[YOUR NAME] — AI Foundation Doc</span>
              <span className="text-warm-gray text-xs">Date: [SESSION DATE]</span>
            </div>
            {foundationDocSections.map((section, i) => (
              <div key={section.label}>
                <p className="text-accent text-xs tracking-widest uppercase mb-2">{section.label}</p>
                <div className="pl-4 space-y-1 border-l border-white/10">
                  {section.fields.map((field) => (
                    <p key={field} className="text-warm-gray text-xs">
                      <span className="text-off-white/60">- {field}:</span>{' '}
                      <span className="text-warm-gray/40 italic">filled in during session</span>
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-accent text-xs font-mono tracking-widest uppercase mb-6">Want It Built For You?</p>
            <h2 className="font-display text-4xl md:text-6xl tracking-tighter mb-6">
              Your AI Foundation.<br />Built Live. With You.<br />In 90 Minutes.
            </h2>
            <p className="text-warm-gray font-light text-lg leading-relaxed max-w-2xl mx-auto mb-10">
              You've seen the structure. Now get it done. We go through every phase together — I ask the questions, you answer, I build the doc in real time. You leave with the complete Foundation Doc in your hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <a
                href="https://cal.com/iankirk/ai-foundation"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-block text-center"
              >
                Book the Session — $97 →
              </a>
            </div>
            <p className="text-warm-gray text-sm font-light">
              30-day money-back guarantee · 10 spots at $97 · Price goes to $297 after
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER LINK ── */}
      <div className="py-12 px-6 border-t border-white/5 text-center">
        <Link to="/" className="text-warm-gray hover:text-accent transition-colors text-sm font-light">
          ← Back to Ian Kirk
        </Link>
      </div>
    </div>
  );
}
