export interface SiteConfig {
  artistName: string;
  tagline: string;
  aboutText: string;
  artistPhoto?: string;
  experience: string;
  location: string;
  whatsappNumber: string;
  instagramUrl: string;
  facebookUrl: string;
  phone: string;
  phoneNumber?: string;
  email: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  description: string;
  category: GalleryCategory;
  imageUrl: string;
  createdAt: string;
  uploadedBy: string;
}

export type GalleryItem = GalleryImage;

export type GalleryCategory =
  | "Bridal Mehndi"
  | "Arabic Mehndi"
  | "Traditional Mehndi"
  | "Engagement"
  | "Party"
  | "Custom Designs";

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  "Bridal Mehndi",
  "Arabic Mehndi",
  "Traditional Mehndi",
  "Engagement",
  "Party",
  "Custom Designs",
];

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  created_at: string;
}

export interface Testimonial {
  id: string;
  customerName: string;
  type: string;
  content: string;
  imageUrl: string;
  created_at: string;
}
