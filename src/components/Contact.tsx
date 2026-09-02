"use client";

import React, { useState, useEffect } from "react";
import { Instagram, Facebook, Phone, Mail } from "lucide-react";
import { getSiteConfig } from "@/lib/dataService";
import { SiteConfig } from "@/types";
import { defaultSiteConfig } from "@/lib/defaultData";

export default function Contact() {
  const [config, setConfig] = useState<SiteConfig>(defaultSiteConfig);

  useEffect(() => {
    getSiteConfig().then(setConfig);
  }, []);

  const message = encodeURIComponent("Hello, I would like to enquire about your Henna/Mehndi services.");

  return (
    <section id="contact" className="py-16 md:py-24 bg-cream-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-terracotta/40" />
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">Get in Touch</span>
            <div className="w-8 h-px bg-terracotta/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-brown" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Book Your <span className="text-terracotta italic">Appointment</span>
          </h2>
          <p className="text-brown/50 mt-3 max-w-lg mx-auto">Ready to get beautiful henna? Reach out and let&apos;s create something special together.</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-[#25D366]/10 to-[#25D366]/5 border border-[#25D366]/20 rounded-2xl p-8 mb-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="#25D366" className="w-8 h-8"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
            </div>
            <h3 className="text-xl text-brown font-semibold mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>Prefer WhatsApp?</h3>
            <p className="text-brown/50 text-sm mb-6">The quickest way to reach me and discuss your henna needs.</p>
            <a href={`https://wa.me/${config.whatsappNumber}?text=${message}`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#25D366] text-white rounded-full text-sm font-medium hover:bg-[#20BA5C] transition-all duration-300 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href={config.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/60 border border-beige/50 rounded-xl p-5 hover:border-[#E1306C]/30 hover:bg-[#E1306C]/5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#E1306C]/10 flex items-center justify-center"><Instagram size={20} className="text-[#E1306C]" /></div>
              <div><p className="text-brown font-medium text-sm">Instagram</p><p className="text-brown/40 text-xs">Follow me</p></div>
            </a>
            <a href={config.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 bg-white/60 border border-beige/50 rounded-xl p-5 hover:border-[#1877F2]/30 hover:bg-[#1877F2]/5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-[#1877F2]/10 flex items-center justify-center"><Facebook size={20} className="text-[#1877F2]" /></div>
              <div><p className="text-brown font-medium text-sm">Facebook</p><p className="text-brown/40 text-xs">Like my page</p></div>
            </a>
            <a href={`tel:${config.phoneNumber}`} className="flex items-center gap-4 bg-white/60 border border-beige/50 rounded-xl p-5 hover:border-terracotta/30 hover:bg-terracotta/5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-terracotta/10 flex items-center justify-center"><Phone size={20} className="text-terracotta" /></div>
              <div><p className="text-brown font-medium text-sm">Phone</p><p className="text-brown/40 text-xs">{config.phoneNumber}</p></div>
            </a>
            <a href={`mailto:${config.email}`} className="flex items-center gap-4 bg-white/60 border border-beige/50 rounded-xl p-5 hover:border-mehndi-green/30 hover:bg-mehndi-green/5 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-mehndi-green/10 flex items-center justify-center"><Mail size={20} className="text-mehndi-green" /></div>
              <div><p className="text-brown font-medium text-sm">Email</p><p className="text-brown/40 text-xs">{config.email}</p></div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
