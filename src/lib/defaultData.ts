import { SiteConfig, GalleryImage, Service, Product, Testimonial } from "@/types";

export const defaultSiteConfig: SiteConfig = {
  artistName: "Henna by Aisha",
  tagline: "Beautiful Henna Art for Every Special Moment",
  aboutText: "With over 10 years of experience in the art of Mehndi, I bring traditional and contemporary henna designs to life.",
  artistPhoto: "",
  experience: "10+ Years",
  location: "Mumbai, India",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210",
  instagramUrl: "https://instagram.com/hennabyaisha",
  facebookUrl: "https://facebook.com/hennabyaisha",
  phone: "+91 98765 43210",
  phoneNumber: "+91 98765 43210",
  email: "hello@hennabyaisha.com",
};

export const defaultGalleryImages: GalleryImage[] = [
  {
    id: "demo-1",
    title: "Bridal Mehndi Design",
    description: "Intricate bridal mehndi design featuring traditional motifs",
    category: "Bridal Mehndi",
    imageUrl: "https://images.unsplash.com/photo-1611599576775-88c49e91e42d?w=800&q=80",
    createdAt: "2024-01-15",
    uploadedBy: "admin",
  },
  {
    id: "demo-2",
    title: "Arabic Floral Pattern",
    description: "Bold Arabic floral design with modern touches",
    category: "Arabic Mehndi",
    imageUrl: "https://images.unsplash.com/photo-1585128903994-9788298932a4?w=800&q=80",
    createdAt: "2024-02-10",
    uploadedBy: "admin",
  },
  {
    id: "demo-3",
    title: "Traditional Indian Design",
    description: "Classic Indian mehndi with peacock and paisley motifs",
    category: "Traditional Mehndi",
    imageUrl: "https://images.unsplash.com/photo-1600372079209-b5e4d803c0e5?w=800&q=80",
    createdAt: "2024-03-05",
    uploadedBy: "admin",
  },
  {
    id: "demo-4",
    title: "Engagement Special",
    description: "Elegant engagement mehndi design for the hands",
    category: "Engagement",
    imageUrl: "https://images.unsplash.com/photo-1610258316288-e0b6a3f03e55?w=800&q=80",
    createdAt: "2024-04-12",
    uploadedBy: "admin",
  },
  {
    id: "demo-5",
    title: "Party Mehndi",
    description: "Quick and beautiful party mehndi design",
    category: "Party",
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&q=80",
    createdAt: "2024-05-20",
    uploadedBy: "admin",
  },
  {
    id: "demo-6",
    title: "Custom Mandala Design",
    description: "Custom mandala-inspired henna design",
    category: "Custom Designs",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&q=80",
    createdAt: "2024-06-15",
    uploadedBy: "admin",
  },
];

export const defaultServices: Service[] = [
  { id: "svc-1", name: "Bridal Mehndi", description: "Exquisite bridal mehndi designs for your special day.", price: "Starting from ₹5,000", icon: "heart" },
  { id: "svc-2", name: "Engagement Mehndi", description: "Elegant engagement mehndi designs.", price: "Starting from ₹2,000", icon: "sparkles" },
  { id: "svc-3", name: "Party Mehndi", description: "Quick yet beautiful mehndi designs for parties.", price: "Starting from ₹500", icon: "party-popper" },
  { id: "svc-4", name: "Arabic Designs", description: "Bold and beautiful Arabic mehndi designs.", price: "Starting from ₹800", icon: "flower" },
  { id: "svc-5", name: "Traditional Designs", description: "Classic Indian mehndi designs.", price: "Starting from ₹1,000", icon: "lotus" },
  { id: "svc-6", name: "Custom Mehndi", description: "Custom mehndi designs tailored to you.", price: "Contact for pricing", icon: "palette" },
];

export const defaultProducts: Product[] = [
  {
    id: "prod-1",
    name: "Organic Mehendi Cone",
    description: "100% natural organic mehendi cone made from pure henna powder. Long-lasting color. Net weight: 25g.",
    price: "₹150",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&q=80",
    createdAt: "2024-01-01",
  },
  {
    id: "prod-2",
    name: "Premium Mehendi Oil",
    description: "Premium essential oil blend to enhance mehendi color. Contains eucalyptus, clove, and tea tree oil. Volume: 30ml.",
    price: "₹350",
    imageUrl: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=600&q=80",
    createdAt: "2024-01-01",
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: "test-1",
    customerName: "Priya Sharma",
    name: "Priya Sharma",
    type: "text",
    text: "Absolutely stunning bridal mehndi! She captured every detail perfectly. Highly recommended!",
    content: "Absolutely stunning bridal mehndi! She captured every detail perfectly. Highly recommended!",
    createdAt: "2024-06-15",
  },
  {
    id: "test-2",
    customerName: "Anjali Mehta",
    name: "Anjali Mehta",
    type: "text",
    text: "The organic cones are amazing! So easy to use and the color comes out beautifully dark.",
    content: "The organic cones are amazing! So easy to use and the color comes out beautifully dark.",
    createdAt: "2024-08-20",
  },
];
