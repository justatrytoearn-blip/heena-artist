"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSiteConfig } from "@/lib/dataService";
import { SiteConfig } from "@/types";
import { defaultSiteConfig } from "@/lib/defaultData";

export default function Hero() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    getSiteConfig().then(setConfig);
  }, []);

  const whatsappNumber = config.whatsappNumber || "919876543210";
  const message = encodeURIComponent(
    "Hello, I would like to enquire about your Henna/Mehendi services."
  );

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-cream via-peach to-beige">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235C3D2E' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="absolute top-20 left-4 md:left-12 w-20 h-20 md:w-32 md:h-32 opacity-10">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" stroke="#5C3D2E" strokeWidth="1" /><circle cx="50" cy="50" r="35" stroke="#5C3D2E" strokeWidth="0.5" /><circle cx="50" cy="50" r="25" stroke="#5C3D2E" strokeWidth="0.5" /><path d="M50 5 L50 95 M5 50 L95 50" stroke="#5C3D2E" strokeWidth="0.5" /><path d="M20 20 L80 80 M80 20 L20 80" stroke="#5C3D2E" strokeWidth="0.5" /></svg>
      </div>
      <div className="absolute bottom-20 right-4 md:right-12 w-20 h-20 md:w-32 md:h-32 opacity-10 rotate-45">
        <svg viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="45" stroke="#C67B5C" strokeWidth="1" /><circle cx="50" cy="50" r="35" stroke="#C67B5C" strokeWidth="0.5" /><circle cx="50" cy="50" r="25" stroke="#C67B5C" strokeWidth="0.5" /></svg>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-6 animate-fade-in">
          <div className="w-12 h-px bg-terracotta/40" />
          <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">Professional Mehendi Artist</span>
          <div className="w-12 h-px bg-terracotta/40" />
        </div>

        {/* Artist Name - just show it once, clearly */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-brown leading-tight mb-6 animate-fade-in"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", animationDelay: "0.1s" }}
        >
          {config.artistName || "Henna by Aisha"}
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-brown/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif", animationDelay: "0.2s" }}
        >
          {config.tagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <Link href="/#gallery" className="inline-flex items-center px-8 py-3.5 bg-terracotta text-cream rounded-full text-sm font-medium tracking-wide hover:bg-terracotta-light transition-all duration-300 hover:shadow-lg">
            View Gallery
          </Link>
          <a href={`https://wa.me/${whatsappNumber}?text=${message}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3.5 border-2 border-brown/20 text-brown rounded-full text-sm font-medium tracking-wide hover:border-brown/40 hover:bg-brown/5 transition-all duration-300">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            Contact on WhatsApp
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream to-transparent" />
    </section>
  );
}
