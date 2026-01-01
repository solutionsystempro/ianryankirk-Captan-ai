
export interface ProductTier {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  ctaText: string;
  accent: 'lime' | 'blue';
  image: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum SectionId {
  Hero = 'hero',
  Problem = 'problem',
  Victoria = 'victoria',
  Proof = 'proof',
  Anchor = 'anchor',
  Origin = 'origin',
  Ladder = 'ladder',
  Footer = 'footer'
}
