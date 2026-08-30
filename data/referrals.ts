/**
 * Referral briefs.
 *
 * One entry per person Ian hands a prospect to. The key is the URL slug and it is
 * deliberately unguessable: the page is not linked from anywhere on the site and
 * carries noindex, so the slug is the only door.
 *
 * ⚠️ Content in this file ships inside the public JS bundle. Anyone who fetches
 * /assets/index-*.js can read every brief here without knowing a slug. That is fine
 * for a brief the prospect could read over the partner's shoulder without damage.
 * For anything that must stay private, move the body to a runtime fetch so it never
 * enters the bundle.
 */

export type Tone = 'neutral' | 'good' | 'warn' | 'bad';

export interface PanelRow {
  label: string;
  value: string;
  note: string;
  tone?: Tone;
}

export interface Quote {
  text: string;
  cite: string;
  /** Marks the lines that carry the close. Rendered with the lime rail. */
  key?: boolean;
}

export interface Bullet {
  /** Bolded lead-in, e.g. "Self-serve is a hard no." */
  lead?: string;
  text: string;
}

export interface Step {
  title: string;
  body: string[];
  /** Words to actually say. Rendered as a quoted script card. */
  script?: string;
}

export interface Objection {
  tag: string;
  said: string;
  answer: string;
}

export interface Risk {
  level: 'High' | 'Medium' | 'Low' | 'In your favour';
  title: string;
  body: string;
}

export type Block =
  | { kind: 'prose'; eyebrow?: string; heading?: string; body: string[] }
  | { kind: 'callout'; text: string }
  | { kind: 'bullets'; eyebrow?: string; heading?: string; intro?: string[]; items: Bullet[]; outro?: string[] }
  | { kind: 'stat'; eyebrow?: string; num: string; headline: string; sub?: string }
  | { kind: 'panel'; eyebrow?: string; heading?: string; caption: string; meta: string; rows: PanelRow[]; outro?: string[] }
  | { kind: 'quotes'; eyebrow?: string; heading?: string; intro?: string[]; items: Quote[]; outro?: string[] }
  | { kind: 'steps'; eyebrow?: string; heading?: string; intro?: string[]; items: Step[] }
  | { kind: 'objections'; eyebrow?: string; heading?: string; items: Objection[] }
  | { kind: 'risks'; eyebrow?: string; heading?: string; items: Risk[] };

export interface ReferralBrief {
  slug: string;
  /** Who the brief is for. Drives the beacon's recipient field. */
  recipient: string;
  recipientNote?: string;
  prospect: string;
  /** One line under the masthead kicker. */
  prospectLine: string;
  preparedOn: string;
  /** Hero headline. The phrase in {braces} renders in the lime gradient. */
  headline: string;
  standfirst: string;
  blocks: Block[];
  /** Rendered small and grey at the very bottom. */
  sourcing: string;
}

export const REFERRAL_BRIEFS: Record<string, ReferralBrief> = {
  'gc-morgan-82ee0f1eb5bc': {
    slug: 'gc-morgan-82ee0f1eb5bc',
    recipient: 'Morgan Gillis',
    recipientNote: '@iammorgangillis',
    prospect: 'Gary Crosby',
    prospectLine: 'Online fitness coach, UK. Formula Coaching.',
    preparedOn: '28 Aug 2026',
    headline: 'Closing {Gary Crosby}',
    standfirst:
      'Stuck at £10–15k/mo for two years. Sat on a call with Ian on 27 Aug, turned down a $1,497 course, and said out loud he would rather spend £10k on the right mentor. He is already mid-conversation with a competitor. This is what he said, what he will not buy, and how to take the call.',
    blocks: [
      {
        kind: 'callout',
        text: 'Gary sells exactly what he wants to buy. Sell him his own sales page.',
      },
      {
        kind: 'prose',
        eyebrow: 'The read',
        body: [
          'His own offer is application-only, 1:1, daily WhatsApp access, bloodwork analysed line by line, weekly personalised video feedback. His site says, in his own words, "This isn\'t just coaching. It\'s mentorship." He is the personal trainer who now wants a personal trainer, and he knows it. He said so on the call in almost those words.',
          'Everything below follows from that one fact. He does not need convincing that high-touch coaching is worth real money. He sells it for a living and has the transformations to prove it works. He needs convincing that you are the one, and that he will not waste another year.',
        ],
      },
      {
        kind: 'stat',
        eyebrow: 'The bottleneck',
        num: '0',
        headline: 'clients out of 3,500 people who raised their hand.',
        sub: 'His word, volunteered on the call. The lead magnet is a PDF. Everything else about the business works.',
      },
      {
        kind: 'panel',
        heading: 'The business, in his own numbers',
        caption: 'Formula Coaching · formulacoaching.co.uk',
        meta: 'Self-reported, 27 Aug call',
        rows: [
          { label: 'Monthly revenue', value: '£10–15k', note: 'Flat for two years. He wants to double it.' },
          { label: 'Offer', value: '£799 / 3mo', note: 'Then £275/mo from month four. Plus a £225 one-off bloodwork call.' },
          { label: 'Instagram', value: '~27k', note: 'Went 18k to 27k in a couple of months, purely on peptide content.' },
          { label: 'ManyChat list', value: '3,500', note: 'Built off one comment-to-DM hook.' },
          { label: 'Email list', value: '800–900', note: 'Sitting unused.' },
          { label: 'Clients from that list', value: 'Zero', note: 'The conversion step does not exist.', tone: 'bad' },
          { label: 'New clients / month', value: '~1', note: 'And it arrives by local word of mouth, not from the 27k followers.' },
          { label: 'IG enquiries / week', value: '~1', note: '"One at the most."' },
          {
            label: 'Credibility',
            value: 'RSM',
            note: 'Presented on hormone health at the Royal Society of Medicine. 15 years training, 3 full-time, age 40 and visibly it. Almost entirely unmonetised.',
            tone: 'good',
          },
        ],
        outro: [
          'The arithmetic that landed on the call and the one he will remember: 1% of 3,500 is 35 clients. At £275/mo that is roughly £9.6k a month. His doubling target is already sitting inside a list he owns. He does not need more traffic. He needs the middle of his funnel to exist at all.',
        ],
      },
      {
        kind: 'quotes',
        eyebrow: 'Verbatim',
        heading: 'What he actually asked for',
        intro: ['His words from the 27 Aug call, not a summary. The whole close is in here.'],
        items: [
          {
            text: "I'd rather spend 10 grand on a great mentor who's going to coach me how to scale my business on a day-to-day basis than pay 1,500 for a course that I'll not fully invest myself in, because I've got ADHD.",
            cite: 'The money line',
            key: true,
          },
          {
            text: 'I want to be the millionaire client, who is the personal trainer. Just to tell them, this is what you\'ve got to do, just so we can get to where you need to be.',
            cite: 'He named the dynamic himself',
            key: true,
          },
          {
            text: "Hold me accountable, because I'm terrible for wandering off. I'm targeting work, but having six projects, then turning to ten, and then never get finished.",
            cite: 'On why courses fail him',
          },
          {
            text: 'I just want to be told, this will work for you, so we\'re going to do that today. If you can do that, not a problem.',
            cite: 'On what he is buying',
          },
          { text: 'I need guidance more than a course, if that makes sense.', cite: 'Said twice, different ways' },
          {
            text: "No one's given me no 90 day plan and then we'll reassess in 90 days. Not a chance. I will be on the phone daily until I have made a lot of money.",
            cite: 'On contact frequency',
          },
          {
            text: "I've wasted 1,500 because I've gained too much information for my brain to absorb.",
            cite: 'On a previous purchase',
          },
          {
            text: "I'm 40 years old, and everyone always says on Instagram, you do not look 40. I need to play on that longevity thing with the peptides, and just automate it, and then have small ticket, high ticket, everything ticket.",
            cite: 'He already has the strategy',
          },
          {
            text: "Gary, I've had a look at your Instagram and your socials and all of this. This is going to work initially. You need to just forget everything else and drive that.",
            cite: 'Gary roleplaying the pitch he wants to hear',
            key: true,
          },
        ],
        outro: [
          'That last one is not a description of his problem. It is him writing your opening line for you. He will buy from the person who says a version of it, having actually looked.',
        ],
      },
      {
        kind: 'bullets',
        eyebrow: 'Post-mortem',
        heading: 'Why the last pitch died',
        intro: [
          'Ian pitched the AI Automation Insiders community, $1,497 a year. Strong product, correct diagnosis of the bottleneck, wrong shape entirely. Gary rejected it on fit, not price, and was explicit that the number was fine and the format was the problem.',
        ],
        items: [
          {
            lead: 'Self-serve is a hard no.',
            text: 'He has ADHD, is medicated for it, and told the call he opens a course, starts six modules and finishes none. He described the failure mode before it could happen.',
          },
          {
            lead: 'He has already burned three mentors.',
            text: 'His words: "I had about three different ones and it didn\'t all work out. They weren\'t as good as what I thought they could have been." That is a buying signal and a warning in the same sentence.',
          },
          {
            lead: 'He does not want to become the operator.',
            text: 'Asked directly whether he wanted implementation or guidance, he said "a bit of both." He wants to be told what to do and have most of it built for him, so he can stay on content and clients.',
          },
          {
            lead: 'Price was never the objection.',
            text: '"If I knew it was the total right investment on a person-to-person basis, then the funds are there. It\'s more so just having the right person there." Conditional, but he raised £10k himself, unprompted.',
          },
        ],
        outro: [
          'The practical consequence: do not sell him access to anything. No portal, no library, no modules, no community. The moment it sounds like something he has to go and work through alone, it is dead, and he will be polite about killing it.',
        ],
      },
      {
        kind: 'bullets',
        eyebrow: 'Competitive',
        heading: 'Two-horse race, and the other horse moved first',
        intro: [
          'He is mid-conversation with Austin Coldiron, a business mentor for coaches and creators who runs a Skool community accelerator and works across niches rather than fitness specifically. Gary had a call with him on 26 Aug, the day before Ian\'s.',
        ],
        items: [
          {
            lead: 'What Austin did right:',
            text: 'he reviewed Gary\'s Instagram before the call and opened with what he saw. Gary volunteered this twice, unprompted. It is the single thing that impressed him most.',
          },
          {
            lead: 'Where it stands:',
            text: 'Austin is writing him a bespoke plan of action and coming back with it. Gary is waiting on that document before deciding anything.',
          },
          {
            lead: 'What Gary wants in that plan, verbatim:',
            text: '"The infrastructure, the automation, the integration, plus the mentorship of what steps we need to do to implement it."',
          },
          {
            lead: 'His own read on it:',
            text: '"It\'s basically the same as Jay, but he works directly with you. He did say that it\'ll be very, very expensive." Expensive is not scaring him off. It is qualifying Austin.',
          },
        ],
        outro: [
          'So the bar is set: a named human who studied his brand first, priced high, and is delivering something written. Anything that turns up looking generic loses on contrast alone. Beat it on specificity, not price.',
        ],
      },
      {
        kind: 'bullets',
        eyebrow: 'Fit',
        heading: 'Where you beat Austin',
        intro: [
          'Austin works with coaches and creators generally. You work with fitness coaches specifically, and your stated promise is scaling coaches to $20–100k/month. Gary is at £10–15k and told the call he wants to double it. His goal is the bottom rung of your ladder, which is the strongest possible position to sell from: he is not a stretch case, he is the obvious one.',
        ],
        items: [
          {
            lead: 'Your DM funnel work is his exact broken part.',
            text: 'He has 3,500 ManyChat contacts from one comment-to-DM hook and has converted zero of them. That is not a general marketing problem, it is a DM-conversion problem.',
          },
          {
            lead: 'Niche specificity is the differentiator.',
            text: 'Austin\'s whole edge was having looked at Gary\'s Instagram. You can go further and talk about fitness offers, physique transformation content and enhanced-athlete positioning without being briefed. Say it plainly on the call.',
          },
          {
            lead: 'Your results highlights matter here.',
            text: 'He is a results-driven coach who sells on before-and-afters. Client results are the language he already trusts, and he is competing against people he privately thinks are worse coaches than he is.',
          },
        ],
      },
      {
        kind: 'prose',
        heading: 'The one line to handle carefully',
        body: [
          'Your bio reads "scale to $20–100k/month WITHOUT relying on organic." Gary\'s entire asset is organic. 27k followers, 3,500 contacts, all built by hand, and he is proud of it. Delivered flat, that line sounds like "abandon the thing that finally worked," and it will land badly.',
          'The reframe is already sitting in his own words, so use his fear rather than fighting his pride. He grew 18k to 27k on peptide content, then got posts pulled and a Meta warning, and retreated to safer content that converts far worse. He raised this himself and nobody answered it.',
        ],
      },
      {
        kind: 'callout',
        text: 'He is one Meta strike away from losing 27,000 followers and 3,500 contacts he does not own. That is not a reason to stop posting. It is the reason to stop depending on it.',
      },
      {
        kind: 'prose',
        body: [
          'That framing keeps his content intact, makes independence the goal rather than the punishment, and answers the one strategic question he has been carrying around with no answer. It is very likely the sentence that wins the deal.',
        ],
      },
      {
        kind: 'panel',
        heading: 'If the answer involves paid traffic, here is the math',
        caption: 'Client lifetime value',
        meta: 'Derived from his live pricing',
        rows: [
          { label: 'Months 1–3', value: '£799', note: 'Total for the minimum term, not per month.' },
          { label: 'Months 4–12', value: '£2,475', note: 'Nine months of continuity at £275.' },
          {
            label: '12-month value',
            value: '£3,274',
            note: 'Comfortably supports paid acquisition. He has never framed his offer this way.',
            tone: 'good',
          },
          {
            label: 'Payback on £10k',
            value: '3 clients',
            note: 'Three signups covers the whole mentorship. He currently signs about one a month from referrals alone.',
          },
        ],
        outro: [
          'He thinks of his offer as "£799 for three months," which is why paid traffic has never looked viable to him. Showing him it is really a £3,274 client changes what he believes he can afford, on both the ad spend and your fee.',
        ],
      },
      {
        kind: 'bullets',
        eyebrow: 'Temperament',
        heading: 'How he wants to be sold',
        intro: [
          'He told Ian directly what turns him off, using a named example. Shown Brian Mark\'s programme, he reacted to the selling style rather than the offer: "He would be like, no, are you ready to make a decision now? Let\'s do it now. Should we shake hands and make payment? Very forceful, whereas I prefer the more lenient approach. I\'m no salesperson. I\'m very much just like to have a conversation."',
        ],
        items: [
          {
            lead: 'No pressure closes.',
            text: 'No now-or-never, no invented scarcity, no shaking hands on the call. He will comply in the moment and then go quiet.',
          },
          {
            lead: 'Conversation, not presentation.',
            text: 'He warmed over forty minutes of back-and-forth with Ian and gave away everything. A pitch deck gets nothing out of him.',
          },
          {
            lead: 'He responds to being seen.',
            text: 'His energy lifted twice: when told his content is clearly working and the problem sits downstream of it, and when describing how Austin had studied his Instagram. Diagnosis flatters him. A feature list does not.',
          },
          {
            lead: 'He is proud and quietly frustrated.',
            text: '"Nobody matches your transformation, your knowledge. So it\'s frustrating. All these guys are just absolutely smashing it and I\'m still trying to manually do everything." The driver is being outperformed by people he believes are worse coaches than he is.',
          },
        ],
      },
      {
        kind: 'steps',
        eyebrow: 'The call',
        heading: 'How to run it',
        items: [
          {
            title: 'Open with what you found, before he speaks',
            body: [
              'Study the Instagram and the site first, then lead with the read. This is the exact move that put Austin ahead and it costs half an hour. Name one specific thing you would change, and why.',
            ],
            script: 'Gary, before we get into anything, I went through your grid and your site. Here\'s what I think is actually going on. Tell me if I\'m wrong.',
          },
          {
            title: 'Say the bottleneck out loud, in his numbers',
            body: [
              '3,500 people raised their hand and none became clients. The content works. The conversion step does not exist. Do not soften it, and do not spread the diagnosis across five problems, because a long list is precisely the thing that overwhelms him.',
            ],
            script: 'You don\'t have a traffic problem. You\'ve got 3,500 people who already told you they\'re interested, and a PDF standing between them and you.',
          },
          {
            title: 'Mirror his own offer back at him',
            body: [
              'He believes in high-touch, application-only, daily-access coaching because he sells it and it works. Draw the line explicitly. This is the emotional close, and it is the one thing Ian was never able to use.',
            ],
            script: 'You don\'t hand people a PDF and tell them to figure out their own macros. That\'s exactly why the course was never going to work for you either.',
          },
          {
            title: 'Give him one thing to do, not a roadmap',
            body: [
              'He asked for this four separate times. Name the single first move, put a deadline on it, and say plainly you will not let him start anything else until it is done. Withholding the full 90-day plan is a feature here. He has been sold roadmaps before and did not execute them.',
            ],
            script: 'For the first two weeks you\'re doing one thing, and I\'m going to stop you touching anything else. That\'s the job.',
          },
          {
            title: 'Set the contact rhythm before the price',
            body: [
              '"I will be on the phone daily until I have made a lot of money." Whatever the real cadence is, state it concretely and early. A weekly call plus messaging access is what he is actually buying. If the offer cannot support genuine access, better to find out here than in month two.',
            ],
          },
          {
            title: 'Price it high, then stop talking',
            body: [
              'He anchored himself at £10k and said the funds are there for the right person. A low number reads as low-touch and puts you back beside the $1,497 he already refused. Say the number plainly, skip the justification stack, and let him respond. Pushing loses him.',
            ],
          },
          {
            title: 'Close the loop before Miami, not after',
            body: [
              'He flies to Miami 8 to 15 Sept for a peptide conference and says he will decide on his return. Austin\'s plan lands before then. Get your version in front of him this week, then let the trip do the thinking for him. Do not chase him through it.',
            ],
          },
        ],
      },
      {
        kind: 'objections',
        eyebrow: 'Objections',
        heading: 'What he will say, and what answers it',
        items: [
          {
            tag: 'Stall',
            said: 'I can\'t make a decision now. I\'ll decide when I\'m back from Miami.',
            answer:
              'Agree, then shrink the decision. Do not fight the timeline. He is honest about it, and pushing confirms the forceful-salesman pattern he told you he hates. Get agreement on the diagnosis and the first action now, with the start date after the trip. He is deciding on a person, and that gets decided on the call, not in September.',
          },
          {
            tag: 'Scarring',
            said: 'I\'ve had three mentors before and none of them worked out.',
            answer:
              'Ask what specifically they had him doing. He will tell you: "DM 30 people a day, wait for the response, DM them again." That is the answer handed to you. His previous mentors sold him manual labour, which is the one thing he cannot sustain. Whatever you build has to visibly remove work rather than add a daily task list.',
          },
          {
            tag: 'Self-doubt',
            said: 'I\'ll buy it and then not do it, because of the ADHD.',
            answer:
              'Do not reassure him. Agree, and make it your job. He is not asking to be talked out of the worry, he is telling you what the product needs to be. One task at a time, you set the order, you check the work. He already respects that dynamic, because it is exactly what he does for his own clients.',
          },
          {
            tag: 'Research mode',
            said: 'I\'ve only watched two videos. I want to do more research first, it\'s all about building that trust.',
            answer:
              'This is about you, not the material. He is not going to go away and study a curriculum. He told you he cannot. Replace research with proof of understanding: show him you already know his business better than the last three people who took his money did. That is what collapses the timeline.',
          },
          {
            tag: 'Budget',
            said: 'August was a month where I scaled my spending back.',
            answer:
              'Real, but soft. He raised £10k in the same conversation and is flying to Miami in ten days. If the number stalls him, a late-September start costs you nothing and matches his own stated timeline. Do not discount. It reprices you as the cheap option sitting next to Austin.',
          },
        ],
      },
      {
        kind: 'panel',
        eyebrow: 'Logistics',
        heading: 'Reaching him',
        caption: 'Contact',
        meta: 'Verified 28 Aug 2026',
        rows: [
          {
            label: 'WhatsApp',
            value: '+44 7741 252225',
            note: 'His preferred channel, offered unprompted: "WhatsApp me anytime, I\'m on UK time." It is also how he runs his own coaching, so it is the native channel.',
            tone: 'good',
          },
          {
            label: 'Email',
            value: 'Do not use',
            note: 'gary@formulacoaching.co.uk is bouncing and flagged do-not-contact in the CRM. Anything sent there disappears silently.',
            tone: 'bad',
          },
          {
            label: 'Instagram',
            value: 'Connected',
            note: 'You are already linked. Good for warmth, but move to WhatsApp or a call for anything substantive.',
          },
          {
            label: 'Time zone',
            value: 'UK',
            note: 'BST, eight hours ahead of Pacific. The Ian call ran 7pm his time and he was comfortable with it.',
          },
          {
            label: 'Unavailable',
            value: '8–15 Sept',
            note: 'Miami, peptide conference. First time in the US. Do not chase him through it.',
          },
        ],
        outro: [
          'Where Ian left it: he messaged Gary on Instagram about a mentorship solution and left him a voicemail on 28 Aug. Gary has not replied yet. The ground is prepared, so you arrive as the answer to something Gary asked for, not as a cold approach.',
        ],
      },
      {
        kind: 'risks',
        eyebrow: 'Honest assessment',
        heading: 'What would have to be true for this to fail',
        items: [
          {
            level: 'High',
            title: 'Stated intent is not a transaction',
            body: 'He has said £10k. He has bought nothing. He has been in the database since 22 Aug with zero purchases, and he has a documented history of saying yes to the idea and no to the invoice, including three previous mentors. Treat the £10k as an anchor he produced under no pressure, which is meaningful, rather than as money he has set aside.',
          },
          {
            level: 'High',
            title: 'He may be shopping for a free plan',
            body: 'Austin is writing him a bespoke plan at no cost, and Gary is explicitly waiting on it before deciding. There is a real chance the pattern here is collecting strategies and acting on none of them. Give him a diagnosis and a first move, not a written 90-day build. Charging a small amount for a scoping session would filter this quickly, though it risks reading as forceful.',
          },
          {
            level: 'Medium',
            title: 'He wants guidance and implementation, not one or the other',
            body: 'Asked directly, he said "a bit of both." Coaching that is advice-only hits the same wall Ian hit, just at a higher price, and the churn lands on you. Decide before the call whether there is a build component or a delivery partner behind it, because he will ask.',
          },
          {
            level: 'Medium',
            title: '"Without relying on organic" can read as an insult',
            body: 'Organic is the only thing that has ever worked for him and he built it by hand. Delivered flat, that positioning sounds like his 27k followers were a waste of three years. Use the platform-risk reframe above instead of the bio line as written. Same destination, opposite emotional read.',
          },
          {
            level: 'Medium',
            title: 'The scoring signals disagree',
            body: 'The automated read is split: the intake form marks him hot and ready to buy, while the call scoring puts close likelihood at 32% and grades the call a D. Both are partly right. He is genuinely in market and genuinely hard to close on a first offer. Plan for a two-touch close, not a one-call close.',
          },
          {
            level: 'In your favour',
            title: 'Everything that makes him worth the time',
            body: 'Real business owner with real revenue, a decade of credentials including the Royal Society of Medicine, a distribution asset he has not monetised, a bottleneck with obvious arithmetic behind it, a budget stated out loud, an urgent competitor forcing a decision, and an explicit preference for exactly the format you sell. He is not a tyre-kicker. He is a badly-served buyer.',
          },
        ],
      },
    ],
    sourcing:
      'Every quote is from the Fathom recording of Gary Crosby x Ian Kirk, 27 Aug 2026. Figures are Gary\'s own statements on that call, cross-checked against his live site and the CRM record. Automatic transcription is imperfect on a two-person call, so verify any quote against the recording before repeating it back to him word for word. Austin Coldiron\'s identity is inferred from a garbled name in the transcript plus a public profile match, and is probable rather than confirmed.',
  },
};

export function getBrief(slug: string | undefined): ReferralBrief | null {
  if (!slug) return null;
  return REFERRAL_BRIEFS[slug] ?? null;
}
