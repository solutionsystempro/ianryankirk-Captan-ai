import React from 'react';
import { ToolLandingPage } from './ToolLandingPage';

export function SlapMethodPage() {
  return (
    <ToolLandingPage
      tag="Free · Pro from $37/mo · DM Sales"
      headline="SLAP Method"
      subheadline="The framework that turns ignored DMs into booked calls."
      description="Stop the script. Lead with proof. Arouse curiosity. Position as shortcut. The SLAP Method is the 4-principle framework behind Ian's highest-converting DM closes. Paste your conversation and the AI rewrites your close — free to start, or go Pro for weekly personalized rewrites."
      features={[
        { text: 'Stop — pattern interrupt that breaks the scroll' },
        { text: 'Lead with proof — social proof before the pitch' },
        { text: 'Arouse curiosity — open loops that demand a reply' },
        { text: 'Position as shortcut — the close that doesn\'t feel like a close' },
        { text: 'AI DM rewriter + 9-step execution flow + bonus scripts' },
      ]}
      ctaText="Get SLAP Method →"
      ctaHref="https://slap-method-production.up.railway.app/"
      price="Free to start"
    />
  );
}
