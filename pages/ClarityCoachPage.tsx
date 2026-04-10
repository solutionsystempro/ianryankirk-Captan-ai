import React from 'react';
import { ToolLandingPage } from './ToolLandingPage';

export function ClarityCoachPage() {
  return (
    <ToolLandingPage
      tag="Free Tool · AI Diagnostic"
      headline="Business Clarity Coach"
      subheadline="Stuck between 10 ideas and zero traction? This fixes that in one session."
      description="Clarity Coach runs you through the same framework the world's sharpest founders use to validate offers, lock in one audience, and map the simplest path forward. No fluff. No generic advice. Just the one clear move you should make next."
      features={[
        { text: 'Offer validation framework' },
        { text: 'Target audience identification' },
        { text: 'One clear path forward — not a list of options' },
      ]}
      ctaText="Get Clarity Now →"
      ctaHref="https://ultimate-clarity-coach.vercel.app/"
      price="Free"
    />
  );
}
