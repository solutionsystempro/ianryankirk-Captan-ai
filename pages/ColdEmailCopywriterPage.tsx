import React from 'react';
import { ToolLandingPage } from './ToolLandingPage';

export function ColdEmailCopywriterPage() {
  return (
    <ToolLandingPage
      tag="Free · Cold Outreach · Email Copywriting"
      headline="Cold Email Copywriter"
      subheadline="Write cold emails that get replies, not unsubscribes."
      description="Most cold emails fail before they're read. Wrong opener, wrong frame, wrong ask. This tool uses Ian's Dyslexic Copywriter voice and the Poke The Bear Hybrid framework to write sequences that feel human, lead with a diagnosis, and ask for a reply. Not a sale."
      features={[
        { text: 'No "Hey [Name]" openers. Ever.' },
        { text: 'Poke The Bear Hybrid: stat-as-diagnosis + provocative question + lead magnet offer' },
        { text: 'Grade 5 to 7 reading level. Strips AI fluff automatically.' },
        { text: 'Reply-focused CTAs. The goal is a conversation, not a close.' },
        { text: 'Write Mode (generate sequences) + Critique Mode (score and rewrite yours)' },
      ]}
      ctaText="Try Cold Email Copywriter →"
      ctaHref="https://cold-email-copywriter-opal.vercel.app"
      price="Free to start"
      waitlistSource="cold-email-copywriter"
    />
  );
}
