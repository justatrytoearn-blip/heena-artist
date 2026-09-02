import { getSupabase } from "./supabase";
import { SiteConfig, GalleryImage, Service, Product, Testimonial, GalleryCategory } from "@/types";
import {
  defaultSiteConfig,
  defaultGalleryImages,
  defaultServices,
  defaultProducts,
  defaultTestimonials,
} from "./defaultData";

function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"
  );
}

// ─── Site Config ─────────────────────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  if (!isSupabaseConfigured()) return defaultSiteConfig;
  try {
    const sb = getSupabase();
    const { data, error } = await sb.from("settings").select("value").eq("key", "siteConfig").single();
    if (error || !data) {
      await sb.from("settings").upsert({ key: "siteConfig", value: defaultSiteConfig });
      return defaultSiteConfig;
    }
    return { ...defaultSiteConfig, ...(data.value as SiteConfig) };
  } catch {
    return defaultSiteConfig;
  }
}

export async function updateSiteConfig(config: Partial<SiteConfig>): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  const { data } = await sb.from("settings").select("value").eq("key", "siteConfig").single();
  const current = (data?.value as SiteConfig) || defaultSiteConfig;
  await sb.from("settings").upsert({ key: "siteConfig", value: { ...current, ...config } });
}

// ─── Gallery ─────────────────────────────────────────────────────────────────

export async function getGalleryImages(category?: string): Promise<GalleryImage[]> {
  if (!isSupabaseConfigured()) {
    if (category && category !== "All") return defaultGalleryImages.filter((img) => img.category === category);
    return defaultGalleryImages;
  }
  try {
    const sb = getSupabase();
    let query = sb.from("gallery").select("*").order("createdAt", { ascending: false });
    if (category && category !== "All") query = query.eq("category", category);
    const { data, error } = await query;
    if (error) throw error;
    return (data || []) as GalleryImage[];
  } catch {
    return defaultGalleryImages;
  }
}

export async function addGalleryImage(image: Omit<GalleryImage, "id">): Promise<string> {
  if (!isSupabaseConfigured()) return "demo-id";
  const sb = getSupabase();
  const { data, error } = await sb.from("gallery").insert({
    title: image.title,
    description: image.description,
    category: image.category,
    imageUrl: image.imageUrl,
    createdAt: image.createdAt,
    uploadedBy: image.uploadedBy,
  }).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function deleteGalleryImage(id: string, imageUrl?: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  if (imageUrl && imageUrl.includes("supabase")) {
    try {
      const urlParts = imageUrl.split("/gallery/");
      if (urlParts[1]) await sb.storage.from("gallery").remove([urlParts[1]]);
    } catch {}
  }
  const { error } = await sb.from("gallery").delete().eq("id", id);
  if (error) throw error;
}

export async function uploadImage(file: File, onProgress?: (progress: number) => void, bucket = "gallery"): Promise<{ url: string; path: string }> {
  if (!isSupabaseConfigured()) {
    const url = URL.createObjectURL(file);
    return { url, path: `${bucket}/${file.name}` };
  }
  const sb = getSupabase();
  const fileName = `${Date.now()}-${file.name}`;
  onProgress?.(30);
  const { error } = await sb.storage.from(bucket).upload(fileName, file);
  if (error) throw error;
  onProgress?.(70);
  const { data: { publicUrl } } = sb.storage.from(bucket).getPublicUrl(fileName);
  onProgress?.(100);
  return { url: publicUrl, path: `${bucket}/${fileName}` };
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  if (!isSupabaseConfigured()) return defaultServices;
  try {
    const sb = getSupabase();
    const { data, error } = await sb.from("services").select("*").order("name");
    if (error) throw error;
    if (!data || data.length === 0) {
      const servicesToInsert = defaultServices.map(({ id, ...rest }) => rest);
      await sb.from("services").insert(servicesToInsert);
      return defaultServices;
    }
    return data as Service[];
  } catch {
    return defaultServices;
  }
}

export async function updateService(id: string, data: Partial<Service>): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  const { error } = await sb.from("services").update(data).eq("id", id);
  if (error) throw error;
}

// ─── Products ────────────────────────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return defaultProducts;
  try {
    const sb = getSupabase();
    const { data, error } = await sb.from("products").select("*").order("createdAt", { ascending: false });
    if (error) throw error;
    if (!data || data.length === 0) return defaultProducts;
    return data as Product[];
  } catch {
    return defaultProducts;
  }
}

export async function addProduct(product: { name: string; description: string; price: string; imageUrl: string }): Promise<string> {
  if (!isSupabaseConfigured()) return "demo-product-id";
  const sb = getSupabase();
  const { data, error } = await sb.from("products").insert({
    name: product.name,
    description: product.description,
    price: product.price,
    imageUrl: product.imageUrl,
    createdAt: new Date().toISOString(),
  }).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function deleteProduct(id: string, imageUrl?: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  if (imageUrl && imageUrl.includes("supabase")) {
    try {
      const urlParts = imageUrl.split("/products/");
      if (urlParts[1]) await sb.storage.from("products").remove([urlParts[1]]);
    } catch {}
  }
  const { error } = await sb.from("products").delete().eq("id", id);
  if (error) throw error;
}

// ─── Testimonials ────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) return defaultTestimonials;
  try {
    const sb = getSupabase();
    const { data, error } = await sb.from("testimonials").select("*").order("createdAt", { ascending: false });
    if (error) throw error;
    if (!data || data.length === 0) return defaultTestimonials;
    return data as Testimonial[];
  } catch {
    return defaultTestimonials;
  }
}

export async function addTestimonial(testimonial: { name: string; text: string; imageUrl: string }): Promise<string> {
  if (!isSupabaseConfigured()) return "demo-testimonial-id";
  const sb = getSupabase();
  const { data, error } = await sb.from("testimonials").insert({
    customerName: testimonial.name,
    type: testimonial.imageUrl ? "screenshot" : "text",
    content: testimonial.text,
    text: testimonial.text,
    imageUrl: testimonial.imageUrl || null,
    createdAt: new Date().toISOString(),
  }).select("id").single();
  if (error) throw error;
  return data.id;
}

export async function deleteTestimonial(id: string, imageUrl?: string): Promise<void> {
  if (!isSupabaseConfigured()) return;
  const sb = getSupabase();
  if (imageUrl && imageUrl.includes("supabase")) {
    try {
      const urlParts = imageUrl.split("/testimonials/");
      if (urlParts[1]) await sb.storage.from("testimonials").remove([urlParts[1]]);
    } catch {}
  }
  const { error } = await sb.from("testimonials").delete().eq("id", id);
  if (error) throw error;
}

// ─── dataService wrapper (used by admin dashboard & navbar) ──────────────────

export const dataService = {
  getConfig: getSiteConfig,
  updateConfig: updateSiteConfig,
  getGallery: getGalleryImages,
  deleteImage: deleteGalleryImage,
  getServices: getServices,
  updateService: async (service: Service) => {
    if (!service.id) return;
    await updateService(service.id, { name: service.name, description: service.description, price: service.price, icon: service.icon });
  },
  getProducts,
  addProduct: async (product: { name: string; price: string; description: string; imageUrl: string }) => {
    await addProduct({ name: product.name, description: product.description, price: product.price, imageUrl: product.imageUrl });
  },
  deleteProduct,
  getTestimonials,
  addTestimonial: async (testimonial: { name: string; text: string; imageUrl: string }) => {
    await addTestimonial({
      name: testimonial.name,
      text: testimonial.text,
      imageUrl: testimonial.imageUrl || "",
    });
  },
  deleteTestimonial,

  uploadImage: async (file: File, title: string, description: string, category: string): Promise<void> => {
    const { url } = await uploadImage(file);
    await addGalleryImage({
      title,
      description,
      category: category as GalleryCategory,
      imageUrl: url,
      createdAt: new Date().toISOString(),
      uploadedBy: "admin",
    });
  },

  uploadProductImage: async (file: File, productData: { name: string; price: string; description: string }): Promise<void> => {
    const { url } = await uploadImage(file, undefined, "products");
    await addProduct({
      name: productData.name,
      price: productData.price,
      description: productData.description,
      imageUrl: url,
    });
  },

  uploadTestimonialImage: async (file: File, testimonialData: { name: string; text: string }): Promise<void> => {
    const { url } = await uploadImage(file, undefined, "testimonials");
    await addTestimonial({
      name: testimonialData.name,
      text: testimonialData.text,
      imageUrl: url,
    });
  },
};
