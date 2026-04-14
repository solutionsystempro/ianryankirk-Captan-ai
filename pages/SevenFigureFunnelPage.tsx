import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LeadGate } from '../components/LeadGate';

const ease = [0.22, 1, 0.36, 1] as const;
const vp = { once: true, margin: '-60px' } as const;
const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: vp,
  transition: { duration: 0.7, delay, ease },
});

// ─── Stage colours ────────────────────────────────────────────────────────────
const STAGE_COLORS: Record<string, { accent: string; bg: string; border: string; tab: string }> = {
  traffic:    { accent: 'text-indigo-400',   bg: 'bg-indigo-500/10',  border: 'border-indigo-500/30',  tab: 'bg-indigo-500 border-indigo-500' },
  lead:       { accent: 'text-yellow-400',   bg: 'bg-yellow-500/10',  border: 'border-yellow-500/30',  tab: 'bg-yellow-400 border-yellow-400 !text-black' },
  nurture:    { accent: 'text-teal-400',     bg: 'bg-teal-500/10',    border: 'border-teal-500/30',    tab: 'bg-teal-500 border-teal-500' },
  conversion: { accent: 'text-orange-400',   bg: 'bg-orange-500/10',  border: 'border-orange-500/30',  tab: 'bg-orange-500 border-orange-500' },
  client:     { accent: 'text-green-400',    bg: 'bg-green-500/10',   border: 'border-green-500/30',   tab: 'bg-green-500 border-green-500' },
};

const STAGES = [
  { id: 'traffic',    num: '1', label: 'Traffic' },
  { id: 'lead',       num: '2', label: 'Lead' },
  { id: 'nurture',    num: '3', label: 'Nurture' },
  { id: 'conversion', num: '4', label: 'Conversion' },
  { id: 'client',     num: '5', label: 'Client' },
];

// ─── Data ─────────────────────────────────────────────────────────────────────
const TRAFFIC_AUTO = [
  { icon: '📢', title: 'Paid Ads', desc: 'Facebook/Meta ads driving directly to your Skool funnel page. Video-first creative, retargeting engaged viewers, lookalike audiences.', tool: 'Meta Ads', details: ['Run video-first ads targeting entrepreneurs and agency owners', 'Retarget engaged viewers with direct Skool link ad', 'Build lookalike audiences from existing Skool members', 'Track CPL and CPC weekly, kill underperformers fast'] },
  { icon: '🔍', title: 'Skool Discovery', desc: "Organic visibility within Skool's built-in search and discovery. Active communities rank higher.", tool: 'Skool', details: ['Optimize community name with searchable keywords', 'Pin a high-value welcome post with a clear CTA', 'Maintain high member activity (Skool rewards engagement)', 'Encourage members to leave reviews'] },
  { icon: '📧', title: 'After Ad Emails', desc: "Email sequences for people who clicked an ad but didn't join. A 5-email drip that brings them back.", tool: 'GoHighLevel', details: ["Triggered when someone clicks ad but doesn't join Skool", '5-email sequence: value, case study, pain point, urgency, final CTA', 'Every email links back to Skool Funnel Page', 'Add clickers to retargeting pixel list'] },
];
const TRAFFIC_DAILY = [
  { icon: '💬', title: 'Facebook 2-Step Post', desc: 'Curiosity-driven posts that end with "Comment [KEYWORD] and I\'ll send you [resource]." Every comment becomes a DM conversation.', tool: 'Facebook', details: ['Use Eli Wilde 2-Step framework for the post structure', 'End with a keyword CTA that triggers a DM with Skool link', 'Post 3-5x per week minimum', 'Repurpose top performers weekly'] },
  { icon: '📱', title: 'IG Story / Post', desc: 'Instagram content with a keyword trigger. ManyChat auto-replies with a value message and your Skool link.', tool: 'Instagram + ManyChat', details: ['Post story with keyword trigger ("DM me LEADS")', 'ManyChat auto-replies with value + Skool link', 'Follow up manually if no click within 24hrs', 'Track open rates and click-throughs in ManyChat'] },
  { icon: '🎥', title: 'YouTube Description', desc: 'Every video description includes your Skool link in the first 3 lines. Verbal CTA in the video, pinned comment with the link.', tool: 'YouTube', details: ['Skool link in first 3 lines of every description', 'Verbal CTA: "Link in description to join the free community"', 'Pin a comment with the link', 'Repurpose clips as Reels/Shorts with same CTA'] },
  { icon: '✉️', title: 'Manual DMs', desc: 'Direct outbound messages to warm prospects. 10-20 per day. Use the ARC framework: Acknowledge, Reframe, Close.', tool: 'All Platforms', details: ['Target warm prospects (engaged, commented, liked your content)', 'ARC framework: Acknowledge, Reframe, Close', 'Send 10-20 per day minimum', 'Never open with "Hey [Name]." Lead with an observation.'] },
];
const TRAFFIC_HIGH = [
  { icon: '🏘️', title: 'Posts In Other Skool Groups', desc: 'Cross-post valuable content in 5+ Skool communities weekly. Never pitch directly. Let your profile and value do the selling.', tool: 'Skool', details: ['Find 5+ relevant groups (free AND paid)', 'Post 2-3x per week per group', 'Optimize your Skool profile with a clear CTA and link', "Engage in comments on other people's posts too"] },
  { icon: '🤝', title: 'JV Workshops', desc: 'Joint venture workshops with complementary community owners. Teach for 30-45 min, weave your CTA throughout.', tool: 'Zoom + Skool', details: ['Pitch 2-3 JV partners per month', 'Teach a 30-45 min workshop for their members', 'Embed value + CTA at multiple points in the presentation', 'Follow up with attendees via DM within 24 hours'] },
  { icon: '🎙️', title: 'Podcasts', desc: 'Guest appearances on niche podcasts. Share signature stories, CTA to join your free community.', tool: 'Podcast Platforms', details: ['Pitch 3-5 podcasts per month in your niche', 'Prepare 2-3 signature stories from your Story Bank', 'CTA: "Join my free community at [Skool link]"', 'Repurpose clips as short-form content'] },
];

const LEAD_CARDS = [
  { icon: '🎯', title: 'Clear Promise', desc: "Headline that speaks to exactly who it's for and what they'll get. No vague 'join my community' language." },
  { icon: '⭐', title: 'Social Proof', desc: 'Member count, testimonials, client results. Real numbers, real names, real wins.' },
  { icon: '📋', title: 'Qualifying Opt-In', desc: '3 questions that qualify the lead AND feed data into your automations via Zapier.' },
  { icon: '🎬', title: 'Welcome Video', desc: 'Auto-plays after joining. Orients new members, builds connection, sets expectations.' },
];

const CONVERSION_CARDS = [
  { icon: '📞', title: 'Weekly Community Call', desc: 'Live weekly group call. 15 min teaching + 30 min hot seat. Follow up with attendees via DM within 2 hours.', details: ['Same day/time every week (consistency builds trust)', 'End every call with a clear next-step offer', 'Follow up with attendees via DM within 2 hours', 'Record and post replay (becomes conversion content)'] },
  { icon: '💰', title: 'Low Ticket Offer', desc: '$47-$297 product that solves ONE problem completely. Buyers get fast-tracked to a sales call.', details: ['Price point: $47-$297', 'Solves ONE specific problem completely', 'Positions the high-ticket offer as the logical next step', 'Buyers are tagged and fast-tracked to sales call'] },
  { icon: '📝', title: 'Conversion Content', desc: '2-3 posts per week inside the community. Case studies, behind-the-scenes, client spotlights. Each with ONE clear CTA.', details: ['Case studies and client win spotlights', 'Behind-the-scenes results and process', 'Each post has ONE CTA (DM me, grab offer, book call)', 'Drives: purchases, DMs, call bookings, and webinar signups'] },
  { icon: '🎓', title: 'Webinar', desc: 'Monthly or bi-weekly. 45 min teaching, 15 min pitch. Follow-up sequence for attendees AND no-shows.', details: ['Registration via GHL landing page', 'Follow-up sequence for both attendees and no-shows', 'Replay posted in community (loops back to conversion content)'] },
  { icon: '📚', title: 'Course Upsell Path', desc: 'Free course content in Skool classroom. Low ticket upsell embedded in Module 3-4. Buyers get invited to sales call.', details: ['Free content builds trust and demonstrates expertise', 'Upsell embedded naturally in the course flow', 'After purchase: automated DM checking on progress', 'Day 3-5: invite to a "strategy session"'] },
  { icon: '🗣️', title: 'DM Conversations', desc: 'Every conversion mechanism feeds into DM conversations that qualify and book sales calls. ARC framework. Founder-to-founder energy.', details: [] },
];

const CLIENT_CARDS = [
  { icon: '🚀', title: 'Onboarding', desc: 'GHL automation triggers welcome sequence. Personal DM from you. Orientation call within 48 hours.' },
  { icon: '⭐', title: 'Testimonial (Day 30)', desc: 'Ask for a testimonial at the 30-day mark. This feeds directly back into your Conversion Content.' },
  { icon: '🔄', title: 'Referral (Day 60)', desc: 'Ask for a referral at 60 days. Warm referrals feed back into your Highest Quality Traffic tier.' },
];

const TOOLS = ['Skool', 'GoHighLevel', 'Zapier', 'ManyChat', 'Meta Ads', 'YouTube'];

// ─── Sub-components ───────────────────────────────────────────────────────────
function ExpandableCard({ card, stage }: { card: any; stage: string }) {
  const [open, setOpen] = useState(false);
  const c = STAGE_COLORS[stage];
  const hasDetails = card.details && card.details.length > 0;

  return (
    <div
      className={`glass-card overflow-hidden ${hasDetails ? 'cursor-pointer' : ''}`}
      onClick={() => hasDetails && setOpen(!open)}
    >
      <div className={`h-[3px] ${c.bg.replace('/10', '/60')}`} style={{ background: `var(--color-${stage}, currentColor)` }} />
      <div className="p-6">
        <div className="text-2xl mb-3">{card.icon}</div>
        <h4 className="font-display text-xl tracking-tight mb-2">{card.title}</h4>
        <p className="text-warm-gray font-light text-sm leading-relaxed">{card.desc}</p>
        {card.tool && (
          <span className="inline-block mt-3 text-xs font-mono text-warm-gray/50 bg-white/5 px-2 py-1 rounded">
            {card.tool}
          </span>
        )}
        {hasDetails && (
          <p className="text-warm-gray/40 text-xs mt-3 font-light">
            {open ? 'Click to collapse' : 'Click to expand'}
          </p>
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && hasDetails && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-white/5 pt-4">
              <ul className="space-y-2">
                {card.details.map((d: string, i: number) => (
                  <li key={i} className={`flex items-start gap-2 text-sm font-light ${c.accent}`}>
                    <span className="mt-1 text-xs shrink-0">◆</span>
                    <span className="text-warm-gray">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FlowNode({ label, highlight }: { label: string; highlight?: boolean }) {
  return (
    <span className={`px-3 py-2 rounded-lg text-xs font-semibold border ${highlight ? 'border-accent/40 bg-accent/10 text-accent' : 'border-white/10 bg-white/5 text-warm-gray'}`}>
      {label}
    </span>
  );
}

function FlowRow({ nodes }: { nodes: Array<{ label: string; highlight?: boolean }> }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {nodes.map((n, i) => (
        <React.Fragment key={i}>
          <FlowNode label={n.label} highlight={n.highlight} />
          {i < nodes.length - 1 && <span className="text-warm-gray/40 text-sm">→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── Stage Content ────────────────────────────────────────────────────────────
function TrafficStage() {
  return (
    <div className="space-y-12">
      <div>
        <p className="label-tag text-indigo-400 mb-4">Automatic Traffic — Set It and Forget It</p>
        <div className="grid md:grid-cols-3 gap-4">
          {TRAFFIC_AUTO.map((c) => <ExpandableCard key={c.title} card={c} stage="traffic" />)}
        </div>
      </div>
      <div>
        <p className="label-tag text-indigo-300/70 mb-4">Immediate Traffic — Daily Hustle</p>
        <div className="grid md:grid-cols-2 gap-4">
          {TRAFFIC_DAILY.map((c) => <ExpandableCard key={c.title} card={c} stage="traffic" />)}
        </div>
      </div>
      <div>
        <p className="label-tag text-indigo-200/50 mb-4">Highest Quality Traffic — Relationship-Driven</p>
        <div className="grid md:grid-cols-3 gap-4">
          {TRAFFIC_HIGH.map((c) => <ExpandableCard key={c.title} card={c} stage="traffic" />)}
        </div>
      </div>
    </div>
  );
}

function LeadStage() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-10 text-center border border-yellow-500/20 bg-yellow-500/5">
        <div className="text-5xl mb-4">🏠</div>
        <h3 className="font-display text-3xl tracking-tight mb-3">Skool Funnel Page</h3>
        <p className="text-warm-gray font-light max-w-lg mx-auto">
          Your Skool community landing page. Clear promise, social proof, and an opt-in that qualifies AND triggers automations.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {LEAD_CARDS.map((c) => <ExpandableCard key={c.title} card={c} stage="lead" />)}
      </div>
    </div>
  );
}

function NurtureStage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6 md:p-8">
        <h3 className="font-display text-xl tracking-tight mb-1">Path A: Phone + Email (GoHighLevel)</h3>
        <p className="text-warm-gray text-sm font-light mb-5">Automated texts and a 7-day email sequence build trust and surface buyers.</p>
        <FlowRow nodes={[
          { label: 'Opt-In Questions' }, { label: 'Zap (Zapier)', highlight: true },
          { label: 'Phone + Email GHL' }, { label: 'Automated Texts' },
          { label: 'Low Ticket Offer', highlight: true }, { label: 'Sales Call' }
        ]} />
      </div>
      <div className="glass-card p-6 md:p-8">
        <h3 className="font-display text-xl tracking-tight mb-1">Path A (parallel): 7-Day Email Sequence</h3>
        <p className="text-warm-gray text-sm font-light mb-5">Drip value, build trust, and pitch the low-ticket offer over 7 days.</p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: 'Day 1–2', desc: 'Welcome + your origin story. Then the #1 mistake most entrepreneurs make with lead gen.' },
            { title: 'Day 3–4', desc: 'Client case study with real results. Then the system explained at a high level.' },
            { title: 'Day 5–7', desc: 'Soft pitch the low ticket offer. Crush objections. Hard CTA to book a call or buy.' },
          ].map((e) => (
            <div key={e.title} className="glass-card p-5 border border-teal-500/20">
              <h4 className="font-display text-lg text-teal-400 mb-2">{e.title}</h4>
              <p className="text-warm-gray font-light text-sm">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-card p-6 md:p-8">
        <h3 className="font-display text-xl tracking-tight mb-1">Path B: Skool Automated DM</h3>
        <p className="text-warm-gray text-sm font-light mb-5">Welcome DM inside Skool that transitions into a real conversation.</p>
        <FlowRow nodes={[
          { label: 'Opt-In Questions' }, { label: 'Zap (Zapier)', highlight: true },
          { label: 'Skool Auto DM' }, { label: 'DM Conversation' },
          { label: 'Weekly Call / Low Ticket', highlight: true }
        ]} />
      </div>
    </div>
  );
}

function ConversionStage() {
  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-2 gap-4">
        {CONVERSION_CARDS.map((c) => <ExpandableCard key={c.title} card={c} stage="conversion" />)}
      </div>
      <div className="text-center py-6 border border-white/5 rounded-2xl">
        <p className="text-warm-gray text-sm font-light mb-2">All paths lead to one place</p>
        <p className="text-4xl mb-2">↓</p>
        <p className="font-display text-2xl text-off-white">Sales Call</p>
      </div>
    </div>
  );
}

function ClientStage() {
  return (
    <div className="space-y-8">
      <div className="glass-card p-10 text-center border border-green-500/20 bg-green-500/5">
        <div className="text-5xl mb-4">⭐</div>
        <h3 className="font-display text-3xl tracking-tight mb-3">New High-Ticket Client</h3>
        <p className="text-warm-gray font-light max-w-lg mx-auto mb-6">
          Closed through a sales call. Onboarded into the paid community. Generating results, testimonials, and referrals.
        </p>
        <span className="inline-block bg-green-500 text-black font-display text-2xl px-6 py-2 rounded-lg">
          $5,000 – $10,000
        </span>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {CLIENT_CARDS.map((c) => <ExpandableCard key={c.title} card={c} stage="client" />)}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function SevenFigureFunnelPage() {
  const [activeStage, setActiveStage] = useState<string>('traffic');
  const c = STAGE_COLORS[activeStage];

  return (
    <LeadGate
      title="Get the Free Framework"
      subtitle="Enter your name and email to unlock the complete 7-Figure Community Funnel system — free."
      storageKey="irk_unlocked_7_figure_funnel"
    >
      <div className="bg-background min-h-screen text-off-white">

        {/* HERO */}
        <section className="relative pt-40 pb-20 px-6 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="container-wide relative z-10 max-w-4xl mx-auto">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="label-tag text-accent mb-6 inline-block"
            >
              The Complete System · Free Framework
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="font-display text-[clamp(48px,8vw,96px)] leading-[0.88] tracking-tighter mb-8"
            >
              The 7-Figure
              <br />
              <span className="text-warm-gray">Community Funnel</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="text-xl md:text-2xl text-warm-gray font-light leading-relaxed max-w-2xl mx-auto"
            >
              The exact system that turns strangers into $5K–$10K clients through a Skool community.
              Every step. Every tool. Every path to the close.
            </motion.p>
          </div>
        </section>

        {/* FLOW OVERVIEW */}
        <section className="pb-12 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div {...fade()} className="flex flex-wrap justify-center items-center gap-0">
              {STAGES.map((s, i) => {
                const sc = STAGE_COLORS[s.id];
                const isActive = activeStage === s.id;
                return (
                  <React.Fragment key={s.id}>
                    <button
                      onClick={() => setActiveStage(s.id)}
                      className="flex flex-col items-center p-4 group"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-display text-lg mb-2 transition-all duration-300 border-2 ${isActive ? `${sc.bg} ${sc.border} ${sc.accent}` : 'border-white/10 bg-white/5 text-warm-gray'}`}>
                        {s.num}
                      </div>
                      <span className={`text-xs font-semibold uppercase tracking-wider transition-colors ${isActive ? sc.accent : 'text-warm-gray/50'}`}>
                        {s.label}
                      </span>
                    </button>
                    {i < STAGES.length - 1 && (
                      <span className="text-warm-gray/20 text-xl pb-5">→</span>
                    )}
                  </React.Fragment>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* STAGE TABS */}
        <section className="pb-6 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {STAGES.map((s) => {
                const sc = STAGE_COLORS[s.id];
                const isActive = activeStage === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveStage(s.id)}
                    className={`px-5 py-2.5 rounded-lg text-sm font-semibold border transition-all duration-300 ${isActive ? `${sc.tab} text-white` : 'border-white/10 bg-white/5 text-warm-gray hover:text-off-white'}`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* STAGE CONTENT */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="mb-8">
                  <h2 className={`font-display text-4xl md:text-5xl tracking-tighter mb-2 ${c.accent}`}>
                    Stage {STAGES.find(s => s.id === activeStage)?.num}: {STAGES.find(s => s.id === activeStage)?.label}
                  </h2>
                  {activeStage === 'traffic'    && <p className="text-warm-gray font-light">Three tiers of traffic sources, organized by effort level and lead quality. All roads lead to your Skool funnel page.</p>}
                  {activeStage === 'lead'       && <p className="text-warm-gray font-light">Every traffic channel funnels into one place. This is the hub of the entire system.</p>}
                  {activeStage === 'nurture'    && <p className="text-warm-gray font-light">Two parallel paths fire automatically after opt-in. One through GHL (texts + emails), one through Skool DMs.</p>}
                  {activeStage === 'conversion' && <p className="text-warm-gray font-light">Multiple paths running simultaneously. Every one leads to a sales call.</p>}
                  {activeStage === 'client'     && <p className="text-warm-gray font-light">Every sales call is designed to close a high-ticket deal. This is the outcome the entire system is built for.</p>}
                </div>

                {activeStage === 'traffic'    && <TrafficStage />}
                {activeStage === 'lead'       && <LeadStage />}
                {activeStage === 'nurture'    && <NurtureStage />}
                {activeStage === 'conversion' && <ConversionStage />}
                {activeStage === 'client'     && <ClientStage />}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* TOOLS BAR */}
        <section className="py-10 border-t border-white/5 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="label-tag text-warm-gray/40 mb-4 text-center">Tools in this system</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {TOOLS.map((t) => (
                <span key={t} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-warm-gray text-sm font-light">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-white/10">
          <div className="container-wide max-w-4xl mx-auto text-center">
            <motion.div {...fade()}>
              <p className="label-tag text-accent mb-6">Ready to Build Your 7-Figure Funnel?</p>
              <h2 className="font-display text-5xl md:text-6xl tracking-tighter leading-none mb-6">
                The System Is Here.
                <br />
                <span className="text-warm-gray">Now Build It.</span>
              </h2>
              <p className="text-warm-gray font-light text-lg mb-10 max-w-xl mx-auto">
                Want Ian to deploy this inside your business — done for you?
              </p>
              <Link to="/contact" className="btn-primary inline-block">
                Apply to Work with Ian →
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="py-12 px-6 border-t border-white/5 text-center">
          <Link to="/" className="text-warm-gray hover:text-accent transition-colors text-sm font-light">
            ← Back to Ian Kirk
          </Link>
        </div>

      </div>
    </LeadGate>
  );
}
