import React from 'react';
import { ToolLandingPage } from './ToolLandingPage';

export function ObjectionCardsPage() {
  return (
    <ToolLandingPage
      tag="Free · $27/mo · Objection Handling"
      headline="Objection Card App"
      subheadline="56 objections. 56 reframes. Never be caught flat-footed on a live call again."
      description="Built for the field. Flip through before a call, drill patterns on the go, or pull it up mid-conversation when you need a reframe fast. Every objection your buyer throws has a pattern. This app trains you to see it coming and close through it."
      features={[
        { text: '56 real-world objection reframes' },
        { text: 'Mobile-first drill interface' },
        { text: 'Pre-call prep mode' },
        { text: 'Pocketable. Works anywhere, no internet needed after load.' },
      ]}
      ctaText="Try It Free →"
      ctaHref="https://objection-cards-app.vercel.app/"
      price="Free to try"
    />
  );
}
