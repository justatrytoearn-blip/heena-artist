"use client";

import React, { useEffect, useState } from "react";
import { Star, ChevronLeft, ChevronRight, MessageSquare, ImageIcon } from "lucide-react";
import { Testimonial } from "@/types";
import { getTestimonials } from "@/lib/dataService";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    getTestimonials().then(setTestimonials).finally(() => setLoading(false));
  }, []);

  if (loading || testimonials.length === 0) return null;

  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  const t = testimonials[current];

  return (
    <section id="testimonials" className="py-20 bg-cream">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-terracotta text-sm font-medium mb-4">
            <Star size={18} />
            <span>Reviews</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl text-brown font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Client Reviews
          </h2>
          <p className="text-brown/50 max-w-xl mx-auto">
            What our happy clients say about our mehendi art and products.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Carousel Card */}
          <div className="bg-white/60 rounded-2xl border border-beige/30 p-8 sm:p-10 relative">
            {/* Quote icon */}
            <div className="text-terracotta/20 text-6xl font-serif absolute top-4 left-6 leading-none">"</div>

            {t.type === "screenshot" && t.imageUrl ? (
              <div
                className="mt-6 mb-6 rounded-xl overflow-hidden bg-beige/20 cursor-pointer border border-beige/40"
                onClick={() => setLightboxImg(t.imageUrl!)}
              >
                <img
                  src={t.imageUrl}
                  alt={`Review by ${t.customerName}`}
                  className="w-full object-contain max-h-[400px]"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="flex gap-1 mb-4 mt-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-terracotta text-terracotta" />
                ))}
              </div>
            )}

            {t.type === "text" && (
              <p className="text-brown/70 text-base leading-relaxed italic mb-6 relative z-10">
                "{t.content}"
              </p>
            )}

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-terracotta/10 flex items-center justify-center">
                <span className="text-terracotta font-semibold text-sm">
                  {t.customerName.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-brown font-medium text-sm">{t.customerName}</p>
                <div className="flex items-center gap-1 text-brown/30 text-xs">
                  {t.type === "text" ? <MessageSquare size={12} /> : <ImageIcon size={12} />}
                  <span>{t.type === "text" ? "Written Review" : "Screenshot Review"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="p-2 rounded-full bg-white/60 border border-beige/30 text-brown/50 hover:text-brown hover:bg-white transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      i === current ? "bg-terracotta" : "bg-beige"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="p-2 rounded-full bg-white/60 border border-beige/30 text-brown/50 hover:text-brown hover:bg-white transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for screenshot reviews */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <img
            src={lightboxImg}
            alt="Review screenshot"
            className="max-w-full max-h-[90vh] rounded-xl object-contain"
          />
        </div>
      )}
    </section>
  );
}
