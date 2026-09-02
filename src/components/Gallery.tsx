"use client";

import React, { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { GALLERY_CATEGORIES, GalleryImage } from "@/types";
import { getGalleryImages } from "@/lib/dataService";

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGalleryImages().then((data) => {
      setImages(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filteredImages =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.classList.add("lightbox-open");
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.classList.remove("lightbox-open");
  }, []);

  const navigateLightbox = useCallback(
    (direction: "prev" | "next") => {
      if (lightboxIndex === null) return;
      if (direction === "next") {
        setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
      } else {
        setLightboxIndex(
          (lightboxIndex - 1 + filteredImages.length) % filteredImages.length
        );
      }
    },
    [lightboxIndex, filteredImages.length]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-terracotta/40" />
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">Portfolio</span>
            <div className="w-8 h-px bg-terracotta/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-brown" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            My <span className="text-terracotta italic">Gallery</span>
          </h2>
          <p className="text-brown/50 mt-3 max-w-lg mx-auto">Browse through my collection of henna designs.</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button onClick={() => setActiveCategory("All")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === "All" ? "bg-terracotta text-cream shadow-md" : "bg-beige/60 text-brown/60 hover:bg-beige hover:text-brown"}`}>
            All
          </button>
          {GALLERY_CATEGORIES.map((cat) => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeCategory === cat ? "bg-terracotta text-cream shadow-md" : "bg-beige/60 text-brown/60 hover:bg-beige hover:text-brown"}`}>
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square rounded-xl bg-beige/50 animate-pulse" />
            ))}
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-brown/40 text-lg">No images found in this category.</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {filteredImages.map((image, index) => (
              <div key={image.id} className="masonry-item">
                <button onClick={() => openLightbox(index)} className="block w-full group cursor-pointer">
                  <div className="relative rounded-xl overflow-hidden bg-beige">
                    <img src={image.imageUrl} alt={image.title} loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brown/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-cream text-sm font-medium">{image.title}</p>
                        <p className="text-cream/70 text-xs mt-1">{image.category}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
          <button onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
            className="absolute top-4 right-4 text-cream/80 hover:text-cream transition-colors z-10 p-2" aria-label="Close">
            <X size={28} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
            className="absolute left-2 md:left-6 text-cream/60 hover:text-cream transition-colors z-10 p-2" aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
          <div className="max-w-5xl max-h-[85vh] mx-4 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <img src={filteredImages[lightboxIndex].imageUrl} alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg mx-auto" />
            <div className="text-center mt-4">
              <p className="text-cream font-medium">{filteredImages[lightboxIndex].title}</p>
              <p className="text-cream/50 text-sm mt-1">{filteredImages[lightboxIndex].description}</p>
              <p className="text-cream/30 text-xs mt-2">{lightboxIndex + 1} / {filteredImages.length}</p>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
            className="absolute right-2 md:right-6 text-cream/60 hover:text-cream transition-colors z-10 p-2" aria-label="Next">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </section>
  );
}
