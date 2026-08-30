import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBrief, type Block, type Tone } from '../data/referrals';
import { useBriefTracking } from '../hooks/useBriefTracking';

/* ── tone → colour, kept in one place so a row and a chip never drift ── */
const TONE_TEXT: Record<Tone, string> = {
  neutral: 'text-off-white',
  good: 'text-accent',
  warn: 'text-warning',
  bad: 'text-danger',
};

const RISK_STYLE: Record<string, string> = {
  High: 'bg-[rgba(255,59,48,0.08)] border-[rgba(255,59,48,0.3)] text-danger',
  Medium: 'bg-[rgba(255,140,0,0.08)] border-[rgba(255,140,0,0.3)] text-warning',
  Low: 'bg-white/[0.04] border-border text-warm-gray',
  'In your favour': 'bg-[rgba(170,255,0,0.06)] border-[rgba(170,255,0,0.25)] text-accent',
};

/* Section-level eyebrow: Big Shoulders, lime, uppercase. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-brand font-bold text-[1rem] uppercase tracking-[0.1em] text-accent mb-3">
      {children}
    </p>
  );
}

/* Card-level eyebrow: Inter 700, never Big Shoulders. */
function CardLabel({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`font-sans font-bold text-[13px] uppercase tracking-[0.08em] mb-2 ${className}`}>
      {children}
    </p>
  );
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display tracking-tighter leading-[0.95] text-[clamp(1.6rem,3.4vw,2.4rem)] text-off-white mb-5 max-w-[22ch] text-balance">
      {children}
    </h2>
  );
}

function Body({ text }: { text: string }) {
  return <p className="font-sans font-medium text-[1.0625rem] leading-[1.65] text-off-white/85 max-w-[68ch] mb-4">{text}</p>;
}

function Panel({ block }: { block: Extract<Block, { kind: 'panel' }> }) {
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-3 px-5 py-3.5 border-b border-white/[0.06] bg-white/[0.02]">
        <span className="font-sans font-bold text-[12px] uppercase tracking-[0.1em] text-off-white/70">
          {block.caption}
        </span>
        <span className="font-sans font-medium text-[12px] uppercase tracking-[0.1em] text-warm-gray">
          {block.meta}
        </span>
      </div>
      <div className="flex flex-col">
        {block.rows.map((r, i) => (
          <div
            key={i}
            className="grid gap-1 md:gap-5 md:grid-cols-[minmax(140px,0.8fr)_minmax(96px,auto)_minmax(200px,1.9fr)] items-baseline px-5 py-3.5 border-b border-white/[0.04] last:border-b-0"
          >
            <span className="font-sans font-semibold text-[12px] uppercase tracking-[0.08em] text-warm-gray">
              {r.label}
            </span>
            <span
              className={`font-mono text-[14px] font-medium tabular-nums ${TONE_TEXT[r.tone ?? 'neutral']}`}
            >
              {r.value}
            </span>
            <span className="font-sans font-medium text-[0.9375rem] leading-[1.5] text-off-white/70">
              {r.note}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case 'callout':
      return (
        <div className="border-l-2 border-accent bg-[rgba(170,255,0,0.05)] rounded-r-2xl px-6 py-6 md:px-8 md:py-7">
          <p className="font-display tracking-tighter leading-[1.1] text-[clamp(1.25rem,2.6vw,1.9rem)] text-off-white max-w-[46ch]">
            {block.text}
          </p>
        </div>
      );

    case 'prose':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.body.map((p, i) => (
            <Body key={i} text={p} />
          ))}
        </div>
      );

    case 'stat':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          <div className="flex items-baseline gap-6 flex-wrap mb-3">
            <span className="font-brand font-black text-[clamp(5rem,12vw,8.5rem)] leading-[0.85] tracking-tighter gradient-text shrink-0">
              {block.num}
            </span>
            <h2 className="font-display tracking-tighter leading-[0.95] text-[clamp(1.4rem,2.6vw,2.4rem)] text-off-white flex-1 min-w-[280px] text-balance">
              {block.headline}
            </h2>
          </div>
          {block.sub && <Body text={block.sub} />}
        </div>
      );

    case 'panel':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <Panel block={block} />
          {block.outro?.map((p, i) => (
            <div key={i} className="mt-6">
              <Body text={p} />
            </div>
          ))}
        </div>
      );

    case 'bullets':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro?.map((p, i) => (
            <Body key={i} text={p} />
          ))}
          <ul className="list-none p-0 my-5 flex flex-col gap-3 max-w-[68ch]">
            {block.items.map((b, i) => (
              <li key={i} className="flex gap-3.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[0.6em] shadow-[0_0_6px_rgba(170,255,0,0.5)]" />
                <span className="font-sans font-medium text-[1.0625rem] leading-[1.55] text-off-white/85">
                  {b.lead && <strong className="font-bold text-off-white">{b.lead} </strong>}
                  {b.text}
                </span>
              </li>
            ))}
          </ul>
          {block.outro?.map((p, i) => (
            <Body key={i} text={p} />
          ))}
        </div>
      );

    case 'quotes':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro?.map((p, i) => (
            <Body key={i} text={p} />
          ))}
          <div className="flex flex-col gap-6 my-6">
            {block.items.map((q, i) => (
              <blockquote
                key={i}
                className={`pl-5 border-l-2 max-w-[64ch] ${q.key ? 'border-accent' : 'border-border'}`}
              >
                <p
                  className={`font-sans text-[1.0625rem] leading-[1.55] mb-2 ${
                    q.key ? 'font-semibold italic text-off-white' : 'font-medium text-off-white/85'
                  }`}
                >
                  &ldquo;{q.text}&rdquo;
                </p>
                <cite className="not-italic font-sans font-semibold text-[11px] uppercase tracking-[0.1em] text-warm-gray">
                  {q.cite}
                </cite>
              </blockquote>
            ))}
          </div>
          {block.outro?.map((p, i) => (
            <Body key={i} text={p} />
          ))}
        </div>
      );

    case 'steps':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          {block.intro?.map((p, i) => (
            <Body key={i} text={p} />
          ))}
          <div className="flex flex-col mt-2">
            {block.items.map((s, i) => (
              <div
                key={i}
                className="grid grid-cols-[38px_1fr] gap-x-5 py-6 border-t border-white/[0.06] first:border-t-0 first:pt-2"
              >
                <span className="font-mono text-[13px] font-medium text-accent pt-1 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-sans font-bold text-[1.1rem] tracking-[-0.01em] text-off-white mb-2">
                    {s.title}
                  </h3>
                  {s.body.map((p, j) => (
                    <p
                      key={j}
                      className="font-sans font-medium text-[1.0625rem] leading-[1.6] text-off-white/80 max-w-[64ch] mb-3"
                    >
                      {p}
                    </p>
                  ))}
                  {s.script && (
                    <p className="font-sans font-medium italic text-[1rem] leading-[1.5] text-off-white bg-white/[0.03] border border-white/[0.06] rounded-xl px-4 py-3.5 max-w-[58ch]">
                      &ldquo;{s.script}&rdquo;
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'objections':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="flex flex-col gap-7 mt-2">
            {block.items.map((o, i) => (
              <div key={i} className="max-w-[68ch]">
                <CardLabel className="text-warm-gray">{o.tag}</CardLabel>
                <p className="font-sans font-medium italic text-[1.0625rem] leading-[1.5] text-off-white border-l-2 border-danger pl-4 mb-3">
                  &ldquo;{o.said}&rdquo;
                </p>
                <p className="font-sans font-medium text-[1.0625rem] leading-[1.6] text-off-white/80 border-l-2 border-accent pl-4">
                  {o.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'risks':
      return (
        <div>
          {block.eyebrow && <Eyebrow>{block.eyebrow}</Eyebrow>}
          {block.heading && <Heading>{block.heading}</Heading>}
          <div className="flex flex-col gap-4 mt-2">
            {block.items.map((r, i) => (
              <div key={i} className="glass-card p-5 md:p-6 max-w-[70ch]">
                <span
                  className={`inline-flex items-center rounded-full border px-3 py-1 font-sans font-semibold text-[11px] uppercase tracking-[0.1em] mb-3 ${
                    RISK_STYLE[r.level] ?? RISK_STYLE.Low
                  }`}
                >
                  {r.level}
                </span>
                <h3 className="font-sans font-bold text-[1.1rem] tracking-[-0.01em] text-off-white mb-2">
                  {r.title}
                </h3>
                <p className="font-sans font-medium text-[1.0625rem] leading-[1.6] text-off-white/75">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export function ReferralBriefPage() {
  const { slug } = useParams<{ slug: string }>();
  const brief = getBrief(slug);

  // Private document. Keep it out of every index, whatever the crawler.
  useEffect(() => {
    const tag = document.createElement('meta');
    tag.name = 'robots';
    tag.content = 'noindex, nofollow, noarchive, nosnippet';
    document.head.appendChild(tag);
    const prevTitle = document.title;
    document.title = brief ? `${brief.prospect} · Referral brief` : 'Referral brief';
    return () => {
      document.head.removeChild(tag);
      document.title = prevTitle;
    };
  }, [brief]);

  useBriefTracking(slug ?? 'unknown', brief?.recipient ?? 'unknown');

  if (!brief) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <p className="font-brand font-bold text-[1rem] uppercase tracking-[0.1em] text-accent mb-4">
            Not found
          </p>
          <h1 className="font-display tracking-tighter leading-[0.9] text-[clamp(2rem,6vw,3.5rem)] text-off-white mb-5">
            This brief doesn&rsquo;t exist.
          </h1>
          <p className="font-sans font-medium text-warm-gray mb-8">
            Check the link, or ask Ian for a fresh one.
          </p>
          <Link to="/" className="btn-secondary inline-block">
            Go to the site
          </Link>
        </div>
      </div>
    );
  }

  const [before, accented, after] = (() => {
    const m = brief.headline.match(/^(.*?)\{(.+?)\}(.*)$/);
    return m ? [m[1], m[2], m[3]] : [brief.headline, '', ''];
  })();

  return (
    <div className="min-h-screen bg-background">
      {/* Compact brand bar. Deliberately not the site nav: this is a document, not a
          marketing page, and the partner should not be routed off into lead magnets. */}
      <header className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-4">
          <Link to="/" className="font-brand font-black text-[1.35rem] uppercase tracking-[0.04em] text-off-white">
            CAPTAIN <span className="gradient-text">AI</span>
          </Link>
          <span className="pill-tag pill-tag-lime">
            <span className="live-dot" />
            Private brief
          </span>
        </div>
      </header>

      <main className="max-w-[900px] mx-auto px-6 md:px-10">
        {/* Masthead */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="pt-14 md:pt-20 pb-10 border-b border-border"
        >
          <p className="font-brand font-bold text-[1rem] uppercase tracking-[0.1em] text-accent mb-5">
            Prepared for {brief.recipient}
            {brief.recipientNote && (
              <span className="text-warm-gray font-sans font-semibold text-[12px] tracking-[0.08em] ml-3">
                {brief.recipientNote}
              </span>
            )}
          </p>
          <h1 className="font-display tracking-tighter leading-[0.88] text-[clamp(42px,7.5vw,88px)] text-off-white mb-6 text-balance">
            {before}
            {accented && <span className="gradient-text">{accented}</span>}
            {after}
          </h1>
          <p className="font-sans font-medium text-[1.15rem] leading-[1.55] text-off-white/75 max-w-[60ch] mb-6">
            {brief.standfirst}
          </p>
          <div className="flex flex-wrap gap-2.5">
            <span className="pill-tag">{brief.prospect}</span>
            <span className="pill-tag">{brief.prospectLine}</span>
            <span className="pill-tag">{brief.preparedOn}</span>
          </div>
        </motion.div>

        {/* Body.
            No scroll-triggered entrance animation here on purpose. whileInView with
            once:true leaves a section stuck at opacity 0 when it is scrolled past
            before the observer fires, which is what happens on Ctrl+F, an anchor jump,
            or any fast scroll. A brief someone reads minutes before a sales call has to
            be readable the instant it loads. The masthead fade above runs on mount, so
            it always completes. */}
        <div className="flex flex-col">
          {brief.blocks.map((block, i) => (
            <section key={i} className="py-10 md:py-12 border-b border-white/[0.05] last:border-b-0">
              <BlockView block={block} />
            </section>
          ))}
        </div>

        {/* Sourcing */}
        <footer className="pb-24 pt-8">
          <div className="glass-card p-5 md:p-6 max-w-[70ch]">
            <CardLabel className="text-accent">Sourcing</CardLabel>
            <p className="font-sans font-medium text-[0.9375rem] leading-[1.6] text-warm-gray">
              {brief.sourcing}
            </p>
          </div>
          <p className="font-sans font-medium text-[13px] text-warm-gray/70 mt-6">
            Private working document. Please don&rsquo;t forward the link.
          </p>
        </footer>
      </main>
    </div>
  );
}
