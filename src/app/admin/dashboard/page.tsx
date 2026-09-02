"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/context/AuthContext";
import { dataService } from "@/lib/dataService";
import {
  GalleryImage,
  Service,
  SiteConfig,
  Product,
  Testimonial,
} from "@/types";

type Tab = "content" | "gallery" | "services" | "products" | "testimonials";

export default function AdminDashboard() {
  const { user, isAdmin, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>("content");
  const [config, setConfig] = useState<SiteConfig>({
    artistName: "", tagline: "", aboutText: "", experience: "",
    location: "", whatsappNumber: "", instagramUrl: "", facebookUrl: "",
    phone: "", email: "",
  });
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const loadData = useCallback(async () => {
    try {
      const [c, s, g, p, t] = await Promise.all([
        dataService.getConfig(),
        dataService.getServices(),
        dataService.getGallery(),
        dataService.getProducts(),
        dataService.getTestimonials(),
      ]);
      setConfig(c);
      setServices(s);
      setGallery(g);
      setProducts(p);
      setTestimonials(t);
      setDataLoaded(true);
    } catch (e) {
      console.error("Failed to load:", e);
      setDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (user && isAdmin) loadData();
  }, [user, isAdmin, loadData]);

  // Redirect if not logged in
  if (loading) {
    return <div className="min-h-screen bg-ivory flex items-center justify-center"><p className="text-stone-500">Loading...</p></div>;
  }
  if (!user || !isAdmin) {
    if (typeof window !== "undefined") window.location.href = "/admin/login";
    return null;
  }

  const saveConfig = async () => {
    setSaving(true); setMessage("");
    try {
      await dataService.updateConfig(config);
      setMessage("✅ Saved!");
      setTimeout(() => setMessage(""), 3000);
    } catch (e: unknown) {
      setMessage("❌ " + (e instanceof Error ? e.message : "Save failed"));
    } finally { setSaving(false); }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = "/";
  };

  const goHome = () => { window.location.href = "/"; };

  const tabs: { key: Tab; label: string; icon: string }[] = [
    { key: "content", label: "Content", icon: "📝" },
    { key: "gallery", label: "Gallery", icon: "🖼️" },
    { key: "services", label: "Services", icon: "💅" },
    { key: "products", label: "Products", icon: "🛒" },
    { key: "testimonials", label: "Reviews", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="bg-white border-b border-beige sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-darkBrown">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500 hidden sm:block">{user.email}</span>
            <button onClick={goHome} className="text-sm text-mehndiGreen hover:underline cursor-pointer">View Site</button>
            <button onClick={handleSignOut} className="text-sm text-stone-500 hover:text-darkBrown cursor-pointer">Logout</button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap cursor-pointer transition-colors ${
                activeTab === tab.key ? "bg-darkBrown text-white" : "bg-white text-stone-600 hover:bg-beige"
              }`}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {message && (
          <div className={`mb-4 p-3 rounded-lg text-sm ${message.startsWith("✅") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
            {message}
          </div>
        )}

        {/* Content Tab */}
        {activeTab === "content" && dataLoaded && (
          <div className="bg-white rounded-xl p-6 border border-beige space-y-4">
            <h2 className="text-xl font-semibold text-darkBrown mb-4">Website Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Artist Name</label>
                <input type="text" value={config.artistName} onChange={(e) => setConfig({ ...config, artistName: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Tagline</label>
                <input type="text" value={config.tagline} onChange={(e) => setConfig({ ...config, tagline: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-darkBrown mb-1">About Text</label>
                <textarea value={config.aboutText} onChange={(e) => setConfig({ ...config, aboutText: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" rows={4} />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Experience</label>
                <input type="text" value={config.experience} onChange={(e) => setConfig({ ...config, experience: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Location</label>
                <input type="text" value={config.location} onChange={(e) => setConfig({ ...config, location: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">WhatsApp Number (with country code)</label>
                <input type="text" value={config.whatsappNumber} onChange={(e) => setConfig({ ...config, whatsappNumber: e.target.value })}
                  placeholder="919876543210"
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Phone Number</label>
                <input type="text" value={config.phone} onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Email</label>
                <input type="email" value={config.email} onChange={(e) => setConfig({ ...config, email: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Instagram URL</label>
                <input type="url" value={config.instagramUrl} onChange={(e) => setConfig({ ...config, instagramUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
              <div>
                <label className="block text-sm font-medium text-darkBrown mb-1">Facebook URL</label>
                <input type="url" value={config.facebookUrl} onChange={(e) => setConfig({ ...config, facebookUrl: e.target.value })}
                  className="w-full px-3 py-2 border border-beige rounded-lg focus:outline-none focus:border-mehndiGreen" />
              </div>
            </div>
            <button onClick={saveConfig} disabled={saving}
              className="bg-darkBrown text-white px-6 py-2 rounded-lg hover:bg-darkBrown/90 disabled:opacity-50 cursor-pointer">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && dataLoaded && (
          <div className="space-y-6">
            <GalleryUpload onUpload={async (file, title, desc, cat) => {
              setSaving(true); setMessage("");
              try {
                await dataService.uploadImage(file, title, desc, cat);
                setGallery(await dataService.getGallery());
                setMessage("✅ Image uploaded!");
              } catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Upload failed")); }
              finally { setSaving(false); }
            }} saving={saving} />
            <div className="bg-white rounded-xl p-6 border border-beige">
              <h2 className="text-xl font-semibold text-darkBrown mb-4">Gallery ({gallery.length})</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {gallery.map((item) => (
                  <div key={item.id} className="relative group">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-32 object-cover rounded-lg" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center gap-1 p-2">
                      <span className="text-white text-xs text-center">{item.title}</span>
                      <button onClick={async () => {
                        if (!confirm("Delete?")) return;
                        try { await dataService.deleteImage(item.id, item.imageUrl); setGallery(gallery.filter(g => g.id !== item.id)); setMessage("✅ Deleted!"); }
                        catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
                      }} className="bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600 cursor-pointer">Delete</button>
                    </div>
                  </div>
                ))}
                {gallery.length === 0 && <p className="text-stone-400 col-span-full text-center py-8">No images yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Services Tab */}
        {activeTab === "services" && dataLoaded && (
          <div className="bg-white rounded-xl p-6 border border-beige">
            <h2 className="text-xl font-semibold text-darkBrown mb-4">Services</h2>
            <div className="space-y-3">
              {services.map((s) => (
                <ServiceRow key={s.id} service={s} onSave={async (updated) => {
                  try { await dataService.updateService(updated); setMessage("✅ Saved!"); }
                  catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
                }} />
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && dataLoaded && (
          <div className="space-y-6">
            <ProductForm onAdd={async (name, price, desc, file) => {
              setSaving(true); setMessage("");
              try {
                if (file) await dataService.uploadProductImage(file, { name, price, description: desc });
                else await dataService.addProduct({ name, price, description: desc, imageUrl: "" });
                setProducts(await dataService.getProducts());
                setMessage("✅ Product added!");
              } catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
              finally { setSaving(false); }
            }} saving={saving} />
            <div className="bg-white rounded-xl p-6 border border-beige">
              <h2 className="text-xl font-semibold text-darkBrown mb-4">Products ({products.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((p) => (
                  <div key={p.id} className="relative group bg-ivory rounded-lg p-3">
                    {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-36 object-cover rounded-lg" />}
                    <p className="font-medium text-darkBrown mt-2">{p.name}</p>
                    <p className="text-sm text-mehndiGreen">{p.price}</p>
                    <button onClick={async () => {
                      if (!confirm("Delete?")) return;
                      try { await dataService.deleteProduct(p.id, p.imageUrl); setProducts(products.filter(x => x.id !== p.id)); setMessage("✅ Deleted!"); }
                      catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
                    }} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                  </div>
                ))}
                {products.length === 0 && <p className="text-stone-400 col-span-full text-center py-8">No products yet.</p>}
              </div>
            </div>
          </div>
        )}

        {/* Testimonials Tab */}
        {activeTab === "testimonials" && dataLoaded && (
          <div className="space-y-6">
            <TestimonialForm onAdd={async (name, text, file) => {
              setSaving(true); setMessage("");
              try {
                if (file) await dataService.uploadTestimonialImage(file, { name, text });
                else await dataService.addTestimonial({ name, text, imageUrl: "" });
                setTestimonials(await dataService.getTestimonials());
                setMessage("✅ Review added!");
              } catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
              finally { setSaving(false); }
            }} saving={saving} />
            <div className="bg-white rounded-xl p-6 border border-beige">
              <h2 className="text-xl font-semibold text-darkBrown mb-4">Reviews ({testimonials.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {testimonials.map((t) => (
                  <div key={t.id} className="relative group bg-ivory rounded-lg p-3">
                    {t.imageUrl && <img src={t.imageUrl} alt={t.customerName || t.name || ""} className="w-full h-36 object-cover rounded-lg" />}
                    {!t.imageUrl && <div className="w-full h-36 bg-beige rounded-lg flex items-center justify-center text-stone-400 text-sm p-4">&quot;{t.text || t.content || ""}&quot;</div>}
                    <p className="font-medium text-darkBrown mt-2">{t.customerName || t.name}</p>
                    {(t.text || t.content) && <p className="text-sm text-stone-500 line-clamp-2">{t.text || t.content}</p>}
                    <button onClick={async () => {
                      if (!confirm("Delete?")) return;
                      try { await dataService.deleteTestimonial(t.id, t.imageUrl || ""); setTestimonials(testimonials.filter(x => x.id !== t.id)); setMessage("✅ Deleted!"); }
                      catch (e: unknown) { setMessage("❌ " + (e instanceof Error ? e.message : "Failed")); }
                    }} className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">Delete</button>
                  </div>
                ))}
                {testimonials.length === 0 && <p className="text-stone-400 col-span-full text-center py-8">No reviews yet.</p>}
              </div>
            </div>
          </div>
        )}

        {!dataLoaded && <p className="text-stone-500 text-center py-10">Loading data...</p>}
      </div>
    </div>
  );
}

/* Gallery Upload Form */
function GalleryUpload({ onUpload, saving }: { onUpload: (file: File, title: string, desc: string, cat: string) => Promise<void>; saving: boolean }) {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState("Bridal Mehndi");
  const [preview, setPreview] = useState<string | null>(null);
  const cats = ["Bridal Mehndi", "Arabic Mehndi", "Traditional Mehndi", "Engagement", "Party", "Custom Designs"];

  return (
    <div className="bg-white rounded-xl p-6 border border-beige">
      <h2 className="text-xl font-semibold text-darkBrown mb-4">Upload Image</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }} className="w-full text-sm" />
          {preview && <img src={preview} alt="Preview" className="mt-2 rounded-lg max-h-48 object-cover" />}
        </div>
        <div className="space-y-3">
          <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" rows={2} />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg">
            {cats.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button onClick={() => { if (file) onUpload(file, title, desc, cat); }} disabled={saving || !file}
            className="bg-mehndiGreen text-white px-6 py-2 rounded-lg hover:bg-mehndiGreen/90 disabled:opacity-50 cursor-pointer">
            {saving ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Service Row */
function ServiceRow({ service, onSave }: { service: Service; onSave: (s: Service) => Promise<void> }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(service.name);
  const [desc, setDesc] = useState(service.description);
  const [price, setPrice] = useState(service.price);

  return (
    <div className="flex items-center justify-between p-3 bg-ivory rounded-lg">
      {editing ? (
        <div className="flex-1 space-y-2 mr-4">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-2 py-1 border border-beige rounded text-sm" />
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-2 py-1 border border-beige rounded text-sm" />
          <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-2 py-1 border border-beige rounded text-sm" />
          <button onClick={async () => { await onSave({ ...service, name, description: desc, price }); setEditing(false); }}
            className="bg-mehndiGreen text-white px-3 py-1 rounded text-sm cursor-pointer">Save</button>
        </div>
      ) : (
        <div className="flex-1">
          <p className="font-medium text-darkBrown">{service.name}</p>
          <p className="text-sm text-stone-500">{service.description}</p>
          <p className="text-sm text-mehndiGreen">{service.price}</p>
        </div>
      )}
      {!editing && <button onClick={() => setEditing(true)} className="text-mehndiGreen hover:underline text-sm cursor-pointer">Edit</button>}
    </div>
  );
}

/* Product Form */
function ProductForm({ onAdd, saving }: { onAdd: (name: string, price: string, desc: string, file: File | null) => Promise<void>; saving: boolean }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-6 border border-beige">
      <h2 className="text-xl font-semibold text-darkBrown mb-4">Add Product</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }} className="w-full text-sm" />
          {preview && <img src={preview} alt="Preview" className="mt-2 rounded-lg max-h-48 object-cover" />}
        </div>
        <div className="space-y-3">
          <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" />
          <input type="text" placeholder="Price (e.g., ₹299)" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" />
          <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" rows={3} />
          <button onClick={() => { if (name && price) onAdd(name, price, desc, file); }} disabled={saving || !name}
            className="bg-mehndiGreen text-white px-6 py-2 rounded-lg hover:bg-mehndiGreen/90 disabled:opacity-50 cursor-pointer">
            {saving ? "Adding..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Testimonial Form */
function TestimonialForm({ onAdd, saving }: { onAdd: (name: string, text: string, file: File | null) => Promise<void>; saving: boolean }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-6 border border-beige">
      <h2 className="text-xl font-semibold text-darkBrown mb-4">Add Review</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) { setFile(f); setPreview(URL.createObjectURL(f)); } }} className="w-full text-sm" />
          {preview && <img src={preview} alt="Preview" className="mt-2 rounded-lg max-h-48 object-cover" />}
          <p className="text-xs text-stone-400 mt-1">Upload screenshot (WhatsApp/Instagram DM)</p>
        </div>
        <div className="space-y-3">
          <input type="text" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" />
          <textarea placeholder="Written review text" value={text} onChange={(e) => setText(e.target.value)} className="w-full px-3 py-2 border border-beige rounded-lg" rows={3} />
          <button onClick={() => { if (name) onAdd(name, text, file); }} disabled={saving || !name}
            className="bg-mehndiGreen text-white px-6 py-2 rounded-lg hover:bg-mehndiGreen/90 disabled:opacity-50 cursor-pointer">
            {saving ? "Adding..." : "Add Review"}
          </button>
        </div>
      </div>
    </div>
  );
}
