import React from 'react';
import { ToolLandingPage } from './ToolLandingPage';

export function CallReflektPage() {
  return (
    <ToolLandingPage
      tag="Free Tool · Sales Call Diagnosis"
      headline="Call Reflekt Agent"
      subheadline="Paste any sales call transcript. Get back exactly where you lost the frame."
      description="Most reps replay lost calls and feel bad. Call Reflekt tells you the buyer archetype, the exact moment you lost control, the missing belief that killed the close, and the one sentence that would have changed everything. Built on 500+ real call analyses."
      features={[
        { text: 'Buyer archetype diagnosis' },
        { text: 'Frame-loss timestamp detection' },
        { text: 'Missing belief identification' },
        { text: 'The one sentence that would have changed the outcome' },
      ]}
      ctaText="Analyze a Call →"
      ctaHref="https://chatgpt.com/g/g-68bce0888438819185f398e815027b33-call-reflekt-5-0"
      price="Free"
    />
  );
}
