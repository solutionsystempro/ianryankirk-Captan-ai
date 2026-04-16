import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DownloadGate } from '../components/DownloadGate';

const vp = { once: true, margin: '-60px' } as const;
const ease = [0.22, 1, 0.36, 1] as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

const DOWNLOAD_URL = '/downloads/pushback-protocol/global-claude-md.txt'; // primary download on gate submit
const STORAGE_KEY = 'irk_downloaded_pushback_protocol';
const LEAD_SOURCE = 'push-back-protocol';

// ─── Data ──────────────────────────────────────────────────────────────────

const RULES = [
  {
    num: '01',
    name: 'Challenge-first rule',
    explanation: 'Before agreeing with any premise, identify at least 2 specific weaknesses or risks.',
    example: '"Two risks here. First, invoice tracking is commoditized. Second, freelancers are notoriously resistant to paying for tools they can build in a spreadsheet."',
  },
  {
    num: '02',
    name: 'Score my reasoning',
    explanation: 'Rate approaches 1-10 for feasibility and explain why it\'s not a 10.',
    example: '"I\'d rate this a 5/10. Here\'s why it\'s not higher..."',
  },
  {
    num: '03',
    name: 'Ask the hard question',
    explanation: 'For every major decision: "What would need to be true for this to fail?"',
    example: '"What would need to be true for this to fail? If freelancers already have a tool they\'re happy with. Have you validated that they don\'t?"',
  },
  {
    num: '04',
    name: 'No sycophancy',
    explanation: 'No opening praise unless backed by specific evidence. Default to neutral.',
    example: '(Silence where "great idea!" used to be. A direct assessment instead.)',
  },
  {
    num: '05',
    name: 'Devil\'s advocate by default',
    explanation: 'Present the strongest counterargument before supporting your position.',
    example: '"The counterargument: your users may not want this at all. Here\'s why. Now here\'s the case for building it anyway..."',
  },
  {
    num: '06',
    name: 'Flag pattern-matching',
    explanation: 'Call it out when you\'re reusing a past solution without evaluating fit.',
    example: '"You\'ve proposed this same architecture twice now. Is it right for this problem or are you defaulting to what you know?"',
  },
  {
    num: '07',
    name: 'Tone rules',
    explanation: 'Clear, direct, active voice. No filler. No banned AI words.',
    example: '(No "Leverage," "Deep dive," "Synergies," "Revolutionize." Short sentences. Periods, not em dashes.)',
  },
  {
    num: '08',
    name: 'Validate before answering',
    explanation: 'If uncertain, say so. Don\'t guess.',
    example: '"I\'m not confident about this. Here\'s what I know and what you\'d need to verify."',
  },
  {
    num: '09',
    name: 'Surface blind spots',
    explanation: 'After every analysis, state what\'s missing and what you haven\'t considered.',
    example: '"What you haven\'t considered: customer acquisition cost. How do you reach freelancers who don\'t know they need this?"',
  },
  {
    num: '10',
    name: 'Push for better',
    explanation: 'After delivering a solution, follow up with how it could be improved.',
    example: '"This works. But here\'s what would make it stronger: narrow the niche to freelance developers specifically..."',
  },
  {
    num: '11',
    name: 'Chase the 11/10',
    explanation: 'Once something is strong, ask what takes it beyond that. Keep stacking.',
    example: '"That\'s solid. What would make it exceptional? What\'s the version of this that people can\'t stop talking about?"',
  },
  {
    num: '12',
    name: 'Catch incomplete thinking',
    explanation: 'If you trail off mid-thought, Claude asks you to finish it.',
    example: '"You didn\'t finish that thought. What were you about to say about the pricing model?"',
  },
];

const QUIZ_QUESTIONS = [
  {
    q: 'Do you have a file at ~/.claude/CLAUDE.md?',
    penaltyOnNo: 2,
    penaltyOnYes: 0,
  },
  {
    q: 'Does it contain behavioral rules — not just plugin config?',
    penaltyOnNo: 2,
    penaltyOnYes: 0,
  },
  {
    q: 'Do you have project-level CLAUDE.md files in your active projects?',
    penaltyOnNo: 1,
    penaltyOnYes: 0,
  },
  {
    q: 'Are your behavioral rules duplicated across project files instead of global?',
    penaltyOnNo: 0,
    penaltyOnYes: 1,
  },
  {
    q: 'Have you tested whether Claude actually pushes back when you give it a weak idea?',
    penaltyOnNo: 2,
    penaltyOnYes: 0,
  },
];

const MAX_SCORE = 10;

function getScoreLabel(score: number): { label: string; color: string; cta: boolean } {
  if (score >= 8) return { label: 'Your setup is solid.', color: 'text-accent', cta: false };
  if (score >= 5) return { label: 'You have gaps.', color: 'text-yellow-400', cta: true };
  return { label: 'Claude is a yes-man. Download the starter kit.', color: 'text-red-400', cta: true };
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function RuleCard({ rule, index }: { rule: typeof RULES[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div {...fade(index * 0.05)} className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-6 md:p-7 text-left flex items-start gap-5 group"
      >
        <div className="shrink-0 w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
          <span className="font-display text-accent text-sm leading-none">{rule.num}</span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-xl md:text-2xl tracking-tight text-off-white">
            {rule.name}
          </h3>
          <p className="text-warm-gray font-light text-sm mt-1 leading-relaxed">
            {rule.explanation}
          </p>
        </div>
        <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-warm-gray group-hover:border-accent/30 group-hover:text-accent transition-all mt-1">
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-lg leading-none"
          >
            +
          </motion.span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-7 pb-7 border-t border-white/5 pt-5">
              <p className="label-tag text-accent/50 mb-2">Example</p>
              <p className="text-warm-gray/80 font-light text-sm leading-relaxed italic">
                {rule.example}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function QuizSection() {
  const [answers, setAnswers] = useState<Record<number, boolean | null>>(
    Object.fromEntries(QUIZ_QUESTIONS.map((_, i) => [i, null]))
  );
  const [revealed, setRevealed] = useState(false);

  const allAnswered = Object.values(answers).every((v) => v !== null);

  const score = allAnswered
    ? QUIZ_QUESTIONS.reduce((acc, q, i) => {
        const ans = answers[i];
        if (ans === false) return acc - q.penaltyOnNo;
        if (ans === true) return acc - q.penaltyOnYes;
        return acc;
      }, MAX_SCORE)
    : null;

  const scoreInfo = score !== null ? getScoreLabel(score) : null;

  const handleAnswer = (index: number, value: boolean) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
    if (!revealed && Object.values({ ...answers, [index]: value }).every((v) => v !== null)) {
      setRevealed(true);
    }
  };

  return (
    <section className="py-24 bg-surface border-y border-white/10 px-6" id="quiz">
      <div className="container-wide max-w-4xl">
        <motion.p {...fade()} className="label-tag text-accent mb-4">Self-Audit</motion.p>
        <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
          How Broken Is Your
          <br />
          <span className="text-warm-gray">Claude Code Config?</span>
        </motion.h2>
        <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
          Five questions. Honest answers only.
        </motion.p>

        <div className="space-y-4 mb-10">
          {QUIZ_QUESTIONS.map((q, i) => (
            <motion.div key={i} {...fade(i * 0.08)} className="glass-card p-6">
              <p className="text-off-white font-light leading-relaxed mb-5">{q.q}</p>
              <div className="flex gap-3">
                {[true, false].map((val) => {
                  const isSelected = answers[i] === val;
                  return (
                    <button
                      key={String(val)}
                      onClick={() => handleAnswer(i, val)}
                      className={`px-6 py-2.5 rounded-lg border text-sm font-medium transition-all ${
                        isSelected
                          ? val
                            ? 'bg-accent/15 border-accent/40 text-accent'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                          : 'bg-white/5 border-white/10 text-warm-gray hover:border-white/20'
                      }`}
                    >
                      {val ? 'Yes' : 'No'}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
          {revealed && score !== null && scoreInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="glass-card p-8 border border-white/10"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="shrink-0 w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <span className="font-display text-accent text-2xl leading-none">{score}</span>
                </div>
                <div>
                  <p className="label-tag text-warm-gray/60 mb-1">Your score</p>
                  <p className={`font-display text-2xl tracking-tight ${scoreInfo.color}`}>
                    {scoreInfo.label}
                  </p>
                </div>
              </div>

              {scoreInfo.cta && (
                <div className="border-t border-white/10 pt-6">
                  <p className="text-warm-gray font-light text-sm mb-4">
                    The starter kit includes a ready-to-paste CLAUDE.md with all 12 rules and a project-level template.
                  </p>
                  <DownloadGate
                    storageKey={STORAGE_KEY}
                    downloadUrl={DOWNLOAD_URL}
                    source={LEAD_SOURCE}
                    label="Download the Push-Back Protocol Starter Kit →"
                  />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export function PushBackProtocolPage() {
  return (
    <div className="bg-background min-h-screen text-off-white">

      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20"
          style={{ background: 'radial-gradient(ellipse, #AAFF00 0%, #00CC44 100%)' }}
        />
        <div className="container-wide relative z-10 max-w-4xl">
          <motion.p {...fade(0.05)} className="label-tag text-accent mb-6">
            FREE RESOURCE
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease }}
            className="font-display text-[clamp(44px,7vw,96px)] leading-[0.88] tracking-tighter mb-8"
          >
            Stop Claude From
            <br />
            <span className="text-warm-gray">Agreeing With</span>
            <br />
            Everything You Say
          </motion.h1>
          <motion.p {...fade(0.3)} className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mb-10">
            The 12-rule protocol that forces Claude Code to challenge your thinking, catch your blind spots, and push your work past good enough.
          </motion.p>

          <motion.div {...fade(0.4)} className="flex flex-wrap gap-4">
            <a href="#the-protocol" className="btn-primary">
              Read the Protocol →
            </a>
            <DownloadGate
              storageKey={STORAGE_KEY}
              downloadUrl={DOWNLOAD_URL}
              source={LEAD_SOURCE}
              label="Download the Starter Kit"
              className="btn-secondary"
            />
          </motion.div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section id="the-problem" className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Problem</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            AI Trained You
            <br />
            <span className="text-warm-gray">to Accept Yes</span>
          </motion.h2>

          <div className="space-y-6 max-w-3xl">
            {[
              'ChatGPT and Claude default to agreement. They validate weak ideas. That\'s not a bug — it\'s the design. Models trained on human feedback learn that people rate "enthusiastic and helpful" higher than "accurate and challenging."',
              'You\'ve shipped features, written copy, made business decisions where AI nodded along when it should have pushed back. Every "great idea!" response was a missed chance to catch a bad assumption before you spent time on it.',
              'The cost isn\'t obvious until you look back. You built something nobody wanted, wrote a headline that didn\'t convert, committed to a technical decision that cost you three weeks — and Claude was right there, agreeing the whole time.',
              'This isn\'t a Claude problem. It\'s a configuration problem. Claude Code reads a file called CLAUDE.md at the start of every session. If that file doesn\'t tell it to challenge you, it won\'t. The 12 rules below fix that.',
            ].map((para, i) => (
              <motion.p key={i} {...fade(i * 0.08)} className="text-warm-gray font-light leading-relaxed text-lg">
                {para}
              </motion.p>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE & AFTER */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-5xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Same Prompt. Different Config.</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Before &amp; After
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            Same question. Same Claude. The only thing that changed is what's in CLAUDE.md.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <motion.div {...fade(0)} className="glass-card overflow-hidden flex flex-col">
              <div className="px-6 pt-6 pb-3 border-b border-white/5">
                <span className="label-tag text-red-400/80">Without Push-Back Protocol</span>
              </div>
              <div className="flex-1 overflow-hidden rounded-b-xl">
                <iframe
                  src="/assets/pushback-before.html"
                  title="Claude response without push-back protocol"
                  className="w-full border-0 pointer-events-none"
                  style={{ height: '420px' }}
                  scrolling="no"
                  tabIndex={-1}
                />
              </div>
            </motion.div>

            {/* After */}
            <motion.div {...fade(0.1)} className="glass-card overflow-hidden flex flex-col">
              <div className="px-6 pt-6 pb-3 border-b border-white/5">
                <span className="label-tag text-accent">With Push-Back Protocol</span>
              </div>
              <div className="flex-1 overflow-hidden rounded-b-xl">
                <iframe
                  src="/assets/pushback-after.html"
                  title="Claude response with push-back protocol"
                  className="w-full border-0 pointer-events-none"
                  style={{ height: '420px' }}
                  scrolling="no"
                  tabIndex={-1}
                />
              </div>
            </motion.div>
          </div>

          <motion.p {...fade(0.2)} className="text-center text-warm-gray font-light text-sm">
            The difference is 12 lines in one file.
          </motion.p>
        </div>
      </section>

      {/* THE 12 RULES */}
      <section id="the-protocol" className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Framework</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            The Push-Back
            <br />
            <span className="text-warm-gray">Protocol</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-12 max-w-2xl">
            12 rules. Each one goes in your global CLAUDE.md. All 12 load at the start of every session. Tap any rule to see an example of what Claude says when it follows it.
          </motion.p>

          <div className="space-y-3">
            {RULES.map((rule, i) => (
              <RuleCard key={rule.num} rule={rule} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* WHERE THESE RULES LIVE */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Mental Model</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Global vs. Project-Level
            <br />
            <span className="text-warm-gray">Where Your Instructions Go</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-14 max-w-2xl">
            Claude Code reads two types of instruction files. Most people only know about one.
          </motion.p>

          {/* Diagram */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {[
              {
                file: '~/.claude/CLAUDE.md',
                label: 'Global',
                desc: 'Loads every session, every project. This is where your behavioral rules go — the 12 rules, your tone preferences, your critical thinking protocol.',
                badge: 'Always active',
                badgeColor: 'text-accent border-accent/20 bg-accent/5',
                delay: 0,
              },
              {
                file: 'project/CLAUDE.md',
                label: 'Project-Level',
                desc: 'Loads only inside that project folder. Tech stack, architecture decisions, deployment patterns, anything project-specific.',
                badge: 'This project only',
                badgeColor: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
                delay: 0.1,
              },
              {
                file: 'Cowork / Claude.ai',
                label: 'Other Systems',
                desc: 'Cowork user preferences are a separate system — they don\'t read CLAUDE.md. Claude.ai chat has no equivalent. Each system needs its own copy of the rules.',
                badge: 'Separate copy needed',
                badgeColor: 'text-warm-gray border-white/10 bg-white/3',
                delay: 0.2,
              },
            ].map((item) => (
              <motion.div key={item.label} {...fade(item.delay)} className="glass-card p-6">
                <p className={`label-tag border rounded px-2 py-1 inline-block mb-4 text-xs ${item.badgeColor}`}>
                  {item.badge}
                </p>
                <p className="font-mono text-xs text-accent/70 mb-2 break-all">{item.file}</p>
                <p className="font-display text-xl tracking-tight text-off-white mb-3">{item.label}</p>
                <p className="text-warm-gray font-light text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Flow arrows */}
          <motion.div {...fade(0.3)} className="glass-card p-6 border border-accent/10">
            <p className="label-tag text-accent/60 mb-3">The rule of thumb</p>
            <p className="text-off-white font-light leading-relaxed">
              Behavioral rules — how Claude thinks and responds — belong in the global file. Everything about a specific project belongs in that project's file. If you find yourself copying the same rule into multiple project files, it should be global.
            </p>
          </motion.div>
        </div>
      </section>

      {/* QUIZ */}
      <QuizSection />

      {/* DOWNLOAD CTA */}
      <section className="py-24 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">The Starter Kit</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-4">
            Get the Starter Kit
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
            Drop your email. The download starts immediately.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            <motion.div {...fade(0.1)}>
              <p className="label-tag text-warm-gray/60 mb-4">What's in the kit</p>
              <ul className="space-y-3">
                {[
                  'Ready-to-paste CLAUDE.md with all 12 rules',
                  'Template for Push-Back Protocol Preferences — customize each rule to fit your style',
                  'Push-Back Protocol Preferences for Cowork — paste into Cowork user preferences',
                  '5-question self-audit checklist (printable)',
                  'Full protocol as a printable PDF',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-warm-gray font-light text-sm">
                    <span className="text-accent mt-0.5 text-xs shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fade(0.2)} className="glass-card p-8 border border-accent/20 bg-accent/3">
              <DownloadGate
                storageKey={STORAGE_KEY}
                downloadUrl={DOWNLOAD_URL}
                source={LEAD_SOURCE}
              >
                {(handleClick, downloaded) =>
                  downloaded ? (
                    <div className="space-y-3">
                      <p className="label-tag text-accent/70 mb-4">Kit unlocked — download each file below</p>
                      {[
                        { label: 'global-claude-md.txt', desc: 'Rename to CLAUDE.md and drop at ~/.claude/CLAUDE.md — done', url: '/downloads/pushback-protocol/global-claude-md.txt' },
                        { label: 'pushback-protocol-customize-template.txt', desc: 'Template for Push-Back Protocol Preferences — customize each rule to your style', url: '/downloads/pushback-protocol/pushback-protocol-customize-template.txt' },
                        { label: 'pushback-protocol-cowork-preferences.txt', desc: 'Paste into Cowork user preferences — same rules, different system', url: '/downloads/pushback-protocol/pushback-protocol-cowork-preferences.txt' },
                        { label: 'setup-audit-checklist.html', desc: 'Open in browser → Ctrl+P → Save as PDF', url: '/downloads/pushback-protocol/setup-audit-checklist.html' },
                        { label: 'pushback-protocol.html', desc: 'Full protocol printable — open in browser → Ctrl+P → Save as PDF', url: '/downloads/pushback-protocol/pushback-protocol.html' },
                      ].map((file) => (
                        <a
                          key={file.url}
                          href={file.url}
                          download
                          className="flex items-start gap-3 p-4 rounded-lg border border-white/8 bg-white/3 hover:border-accent/20 transition-all group"
                        >
                          <span className="text-accent text-xs mt-1 shrink-0">↓</span>
                          <div>
                            <p className="text-off-white text-sm font-medium font-mono group-hover:text-accent transition-colors">{file.label}</p>
                            <p className="text-warm-gray text-xs font-light mt-0.5">{file.desc}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-off-white font-light leading-relaxed mb-6">
                        All page content is free — no gate on any of it. The download is the bonus: ready-to-use files you can drop straight into your config.
                      </p>
                      <button onClick={handleClick} className="btn-primary w-full">
                        Download the Push-Back Protocol Starter Kit →
                      </button>
                      <p className="text-warm-gray/40 text-xs font-light mt-4 text-center">
                        No spam. Unsubscribe anytime.
                      </p>
                    </>
                  )
                }
              </DownloadGate>
            </motion.div>
          </div>
        </div>
      </section>

      {/* HOW TO INSTALL */}
      <section className="py-24 bg-surface border-y border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Installation</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-12">
            3 Steps.
            <br />
            <span className="text-warm-gray">Two Minutes.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                action: 'Download',
                detail: 'Click "Download the Starter Kit" above. The file global-claude-md.txt downloads immediately.',
              },
              {
                step: '02',
                action: 'Rename',
                detail: 'Rename the file from global-claude-md.txt to CLAUDE.md.',
              },
              {
                step: '03',
                action: 'Drop it here',
                detail: 'Move it to ~/.claude/CLAUDE.md\n\nMac/Linux: /Users/yourname/.claude/CLAUDE.md\nWindows: C:\\Users\\yourname\\.claude\\CLAUDE.md',
              },
            ].map((s, i) => (
              <motion.div key={s.step} {...fade(i * 0.1)} className="glass-card p-7">
                <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <span className="font-display text-accent text-sm">{s.step}</span>
                </div>
                <p className="font-display text-2xl tracking-tight text-off-white mb-3">{s.action}</p>
                <p className="text-warm-gray font-light text-sm leading-relaxed whitespace-pre-line">{s.detail}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade(0.3)} className="mt-8 glass-card p-6 border border-accent/15">
            <p className="text-off-white font-light text-sm leading-relaxed">
              <span className="text-accent font-medium">To verify it's working: </span>
              Start a new Claude Code session and type: "I want to build a SaaS that helps freelancers track their invoices. What do you think?" — Claude should identify weaknesses and score the idea. If it says "great idea!" you have a config problem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* YOUTUBE PLACEHOLDER */}
      <section className="py-24 bg-background border-t border-white/10 px-6">
        <div className="container-wide max-w-4xl">
          <motion.p {...fade()} className="label-tag text-accent mb-4">Tutorial</motion.p>
          <motion.h2 {...fade(0.1)} className="font-display text-5xl tracking-tighter leading-none mb-4">
            Watch the Full
            <br />
            <span className="text-warm-gray">Tutorial</span>
          </motion.h2>
          <motion.p {...fade(0.2)} className="text-warm-gray font-light text-lg mb-10 max-w-2xl">
            Screen-share walkthrough: setting up your CLAUDE.md from scratch, testing it, and seeing the push-back protocol in action.
          </motion.p>

          <motion.div
            {...fade(0.2)}
            className="glass-card border border-white/10 rounded-2xl overflow-hidden"
            style={{ aspectRatio: '16/9' }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center gap-4 bg-white/2">
              <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center">
                <svg className="w-7 h-7 text-warm-gray ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-warm-gray font-light text-sm">Video coming soon. Subscribe to the channel to get notified.</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
