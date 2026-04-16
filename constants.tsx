import { Product, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'clarity',
    step: '01',
    title: 'Business Clarity Coach',
    subtitle: 'AI-powered strategic diagnostic',
    description:
      'Stuck between 10 ideas and zero traction? Clarity Coach runs you through the same framework the world\'s sharpest founders use to validate offers, lock in one audience, and map the simplest path forward.',
    price: 'Free',
    priceBadge: 'FREE',
    ctaText: 'Get Clarity Now →',
    accent: 'lime',
    href: 'https://ultimate-clarity-coach.vercel.app/',
    isExternal: true,
    features: [
      'Offer validation framework',
      'Target audience identification',
      'One clear path forward',
    ],
  },
  {
    id: 'reflekt',
    step: '02',
    title: 'Call Reflekt Agent',
    subtitle: 'Sales call diagnosis engine',
    description:
      'Paste any sales call transcript. Get back: the buyer archetype, the exact moment you lost the frame, the missing belief that killed the close, and the one sentence that would have changed everything.',
    price: 'Free',
    priceBadge: 'FREE',
    ctaText: 'Analyze a Call →',
    accent: 'lime',
    href: 'https://call-reflekt-coach-production.up.railway.app/',
    isExternal: true,
    features: [
      'Buyer archetype diagnosis',
      'Frame-loss timestamp detection',
      'Missing belief identification',
    ],
  },
  {
    id: 'slap',
    step: '03',
    title: 'SLAP Method',
    subtitle: 'DM Sales Closer Copywriter',
    description:
      'The framework that turns ignored DMs into booked calls. Stop the script. Lead with proof. Arouse curiosity. Position as shortcut. Paste your conversation and the AI rewrites your close — free, or go Pro for weekly personalized rewrites.',
    price: 'Free · Pro from $37/mo',
    priceBadge: 'FREE + PRO',
    ctaText: 'Get SLAP Method →',
    accent: 'blue',
    href: 'https://slap-method-production.up.railway.app/',
    isExternal: true,
    features: [
      '4-principle SLAP framework',
      'AI DM rewriter',
      '9-step execution flow + bonus scripts',
    ],
  },
  {
    id: 'cards',
    step: '04',
    title: 'Objection Card App',
    subtitle: 'Real-time objection handling',
    description:
      '56 objections. 56 reframes. Drillable, pocketable, and built for the field. Flip through before a call, drill patterns on the go. Never be caught flat-footed on a live call again.',
    price: 'Free · $27/mo',
    priceBadge: '$27/MO',
    href: 'https://objection-cards-app-production.up.railway.app/',
    ctaText: 'Try It Free →',
    accent: 'blue',
    comingSoon: false,
    features: [
      '56 real-world objection reframes',
      'Mobile-first drill interface',
      'Pre-call prep mode',
    ],
  },
  {
    id: 'cold-email',
    step: '05',
    title: 'Cold Email Copywriter',
    subtitle: 'Write cold emails that get replies — not unsubscribes',
    description:
      'Most cold emails fail before they\'re read. Wrong opener, wrong frame, wrong ask. This tool uses Ian\'s Dyslexic Copywriter voice and the Poke The Bear Hybrid framework to write sequences that feel human, lead with a diagnosis, and ask for a reply — not a sale.',
    price: 'Free',
    priceBadge: 'FREE',
    ctaText: 'Try It Free →',
    accent: 'lime',
    href: 'https://cold-email-copywriter-production.up.railway.app',
    isExternal: true,
    features: [
      'Poke The Bear Hybrid framework',
      'Reply-focused CTAs — no "book a call" pressure',
      'Write Mode + Critique Mode',
    ],
  },
  {
    id: 'coaching',
    step: '06',
    title: '1:1 Coaching with Ian',
    subtitle: 'Done-with-you · Private · Limited Spots',
    description:
      'This is where we build it together. You bring the business — Ian brings the full system. Offer clarity, DM framework, call scripts, objection handling, AI automation. Everything dialed in around your specific situation. Not a course. Not a group. Just you and Ian until it works.',
    price: 'Apply to discuss',
    priceBadge: 'APPLY',
    ctaText: 'Apply Now →',
    accent: 'lime',
    href: '/contact',
    features: [
      'Full AI sales system built around your business',
      'Direct 1:1 access to Ian — not a course or group',
      'Offer clarity + DM system + call framework + objection handling',
      'Limited spots — application required to qualify',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Kim Berthilsson',
    title: 'Community Member',
    text: "I just had the best clarity call of all time with Ian Kirk! If you're looking to navigate the ins and outs of building your business effectively, you won't want to miss the chance to speak with him. Ian is not just knowledgeable — he genuinely cares about helping people succeed. This clarity call isn't just about information; it's about empowerment.",
    result: '24 likes · "Best clarity call of all time"',
    initials: 'KB',
  },
  {
    name: 'Jesse Murdock',
    title: 'Offer Builder',
    text: "I just wanted to write this to thank Ian Kirk for getting me started with my offer. I feel more confident in approaching my ideal client with my database reactivation offer. I can't wait to continue learning from this amazing community — to anyone on the fence about joining, I can't recommend it enough.",
    result: 'Confident with offer · 6 likes · 11 comments',
    initials: 'JM',
  },
  {
    name: 'Cole TheConnector',
    title: 'Cold Email Specialist',
    text: "Last night's Coffee & Clarity call with Ian Kirk was FIRE. Ian's copywriting and cold email insights were absolute gold. Biggest takeaway: email brevity and psychology. Those first few preview text words are prime real estate — and leading with pain points resonates more than commonalities. Brilliant.",
    result: '"The call was FIRE" · Immediate implementation',
    initials: 'CC',
  },
];

export const TICKER_WINS = [
  '✦ $10K from a 90-second video I almost didn\'t send',
  '✦ 1M+ views from a video I almost didn\'t post',
  '✦ $10K from a 90-second video he almost didn\'t send',
  '✦ $1K MRR from a "garbage" database — zero sales calls · $50 list verification',
  '✦ 4,224 emails → 125 replies → 21 opps → 6 customers',
  '✦ 197 comments on one post — "Stop Sending DMs That Reek of Desperation"',
  '✦ Kim B: "Best clarity call of all time" · 24 likes',
  '✦ "You\'re either pattern-interrupting or being forgotten"',
  '✦ "A system you work vs a system that works for you"',
  '✦ "We can make excuses or money — never both"',
  '✦ Allan Heath: "Blown away — went in expecting a pitch, left with real value"',
  '✦ Cole: "Ian\'s cold email insights were absolute gold"',
];

export const COMMUNITIES = [
  {
    name: 'AI Automation Secrets',
    desc: "Lead Gen Secrets taught Ian WHAT works. AI Automation Secrets taught him HOW to automate it. That combination turned a $50 list verification into $1K MRR — zero sales calls. 2,500+ members, 4.9/5 Trustpilot, 50+ done-for-you templates, weekly live calls, and a library of ready-to-deploy n8n workflows. AI agents, lead gen, sales automation, content creation, Claude Code — no coding required.",
    href: 'https://www.skool.com/ai-automation-insiders/about?ref=64378607e4d44ad99d39a6c9c49f3bff',
    badge: 'Ian Recommends',
    accentClass: 'border-accent/40 text-accent',
  },
  {
    name: 'Lead Gen Secrets',
    desc: "Jay Feldman's lead generation community — where Ian runs live Hump Day Clarity Calls every Wednesday. Bring your offer, your outreach, or your sales process and get real feedback in front of the group. Posts from these sessions regularly pull hundreds of comments.",
    href: 'https://www.skool.com/lead-gen',
    badge: 'Wednesday Calls',
    accentClass: 'border-starlink/40 text-starlink',
  },
  {
    name: 'Remote Sales Secrets',
    desc: "Mason Church's community built for remote sales reps who want to close more, earn more, and perform at the top of any sales floor. Ian coaches inside on sales psychology, cold outreach, and the frameworks behind the SLAP Method and Call Reflekt.",
    href: 'https://www.skool.com/remote-sales-secrets/about?ref=64378607e4d44ad99d39a6c9c49f3bff',
    badge: 'Guest Coach',
    accentClass: 'border-accent/30 text-accent/80',
  },
];

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', handle: 'Ian Ryan Kirk', href: 'https://www.linkedin.com/in/ianryankirk/', icon: 'IN' },
  { name: 'YouTube', handle: '@IanRyanKirk', href: 'https://www.youtube.com/@IanRyanKirk', icon: 'YT' },
  { name: 'Instagram', handle: '@ianryankirk', href: 'https://www.instagram.com/ianryankirk', icon: 'IG' },
  { name: 'X', handle: '@IanRyanKirk', href: 'https://x.com/IanRyanKirk', icon: 'X' },
];
