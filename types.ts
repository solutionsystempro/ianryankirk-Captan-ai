export interface Product {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  description: string;
  price: string;
  priceBadge: string;
  ctaText: string;
  accent: 'lime' | 'blue' | 'white';
  href?: string;
  comingSoon?: boolean;
  isExternal?: boolean;
  features: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Testimonial {
  name: string;
  title: string;
  text: string;
  result: string;
  initials: string;
}

// Keep for backward compat with existing components
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
