
export interface ProductTier {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  ctaText: string;
  accent: 'lime' | 'blue';
  image: string;
  href?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum SectionId {
  Hero = 'hero',
  Problem = 'problem',
  StarterKit = 'starter-kit',
  Proof = 'proof',
  Anchor = 'anchor',
  Origin = 'origin',
  Ladder = 'ladder',
  Footer = 'footer'
}
