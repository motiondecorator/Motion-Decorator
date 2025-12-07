
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  // Extended details for Service Page
  heroTitle?: string;
  heroSubtitle?: string;
  features?: string[];
  deliverables?: string[];
  process?: { title: string; desc: string }[];
  relatedPortfolioIds?: string[];
  image?: string; // New field for SEO/OG Image
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'All' | 'Web' | 'Graphics' | 'Social' | 'Motion' | 'Ads' | 'Branding' | 'IT';
  imageUrl: string;
  description: string;
  // Extended details for Case Study Page
  client?: string;
  year?: string;
  tags?: string[];
  challenge?: string;
  solution?: string;
  results?: { label: string; value: string }[];
  gallery?: string[];
  testimonial?: Testimonial;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}
