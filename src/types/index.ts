// Core types for WhoKnows Models

export interface Model {
  id: string;
  name: string;
  slug: string;
  gender: 'women' | 'men';
  height: string | null;
  chest: string | null;
  waist: string | null;
  hips: string | null;
  hair: string | null;
  eyes: string | null;
  location: string | null;
  bio: string | null;
  featured: boolean;
  order: number;
  images: ModelImage[];
}

export interface ModelImage {
  id: string;
  modelId: string;
  imageUrl: string;
  alt: string | null;
  order: number;
  isPrimary: boolean;
}

export interface Campaign {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  client: string | null;
  year: string | null;
  coverImage: string | null;
  order: number;
  models: { model: Model }[];
  images: CampaignImage[];
}

export interface CampaignImage {
  id: string;
  campaignId: string;
  imageUrl: string;
  alt: string | null;
  order: number;
}

export interface Application {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  age: string | null;
  height: string | null;
  city: string | null;
  country: string | null;
  instagram: string | null;
  message: string | null;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  photos: ApplicationPhoto[];
}

export interface ApplicationPhoto {
  id: string;
  applicationId: string;
  imageUrl: string;
  type: 'headshot' | 'side' | 'fullbody';
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
}

export interface HeroSlide {
  id: string;
  title: string | null;
  subtitle: string | null;
  imageUrl: string;
  link: string | null;
  order: number;
  active: boolean;
}

export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  order: number;
  active: boolean;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
}

// Navigation
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Form Types
export interface ApplyFormData {
  fullName: string;
  age: string;
  height: string;
  city: string;
  country: string;
  instagram: string;
  email: string;
  phone: string;
  message?: string;
  headshot?: File;
  sideProfile?: File;
  fullBody?: File;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
