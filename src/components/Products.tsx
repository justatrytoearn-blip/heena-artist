"use client";

import React, { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Product } from "@/types";
import { getProducts } from "@/lib/dataService";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [whatsappNumber, setWhatsappNumber] = useState("919876543210");

  useEffect(() => {
    getProducts().then(setProducts).finally(() => setLoading(false));
    import("@/lib/dataService").then(({ getSiteConfig }) => {
      getSiteConfig().then((c) => setWhatsappNumber(c.whatsappNumber));
    });
  }, []);

  if (loading || products.length === 0) return null;

  return (
    <section id="products" className="py-20 bg-white/40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-terracotta text-sm font-medium mb-4">
            <ShoppingBag size={18} />
            <span>Shop</span>
          </div>
          <h2
            className="text-3xl sm:text-4xl text-brown font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            Our Products
          </h2>
          <p className="text-brown/50 max-w-xl mx-auto">
            Premium organic mehendi cones and oils — handcrafted for the richest, longest-lasting color.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => {
            const waMsg = encodeURIComponent(
              `Hello, I would like to order: ${product.name} (${product.price}). Please share details.`
            );
            const waLink = `https://wa.me/${whatsappNumber}?text=${waMsg}`;
            return (
              <div
                key={product.id}
                className="bg-white/60 rounded-2xl border border-beige/30 overflow-hidden hover:shadow-sm transition-shadow"
              >
                <div className="aspect-[4/3] bg-beige/30 overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <h3
                    className="text-brown font-semibold text-lg mb-1"
                    style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
                  >
                    {product.name}
                  </h3>
                  <p className="text-terracotta font-bold text-lg mb-3">
                    {product.price}
                  </p>
                  <p className="text-brown/50 text-sm leading-relaxed mb-5">
                    {product.description}
                  </p>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    <MessageCircle size={16} />
                    Order via WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
