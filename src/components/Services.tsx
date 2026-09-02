"use client";

import React, { useState, useEffect } from "react";
import { Heart, Sparkles, PartyPopper, Flower, Palette, CircleDot } from "lucide-react";
import { getServices } from "@/lib/dataService";
import { Service } from "@/types";
import { defaultServices } from "@/lib/defaultData";

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart size={24} />,
  sparkles: <Sparkles size={24} />,
  "party-popper": <PartyPopper size={24} />,
  flower: <Flower size={24} />,
  lotus: <CircleDot size={24} />,
  palette: <Palette size={24} />,
};

export default function Services() {
  const [services, setServices] = useState<Service[]>(defaultServices);

  useEffect(() => {
    getServices().then(setServices);
  }, []);

  return (
    <section id="services" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-terracotta/40" />
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">What I Offer</span>
            <div className="w-8 h-px bg-terracotta/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-brown" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            My <span className="text-terracotta italic">Services</span>
          </h2>
          <p className="text-brown/50 mt-3 max-w-lg mx-auto">Professional henna services tailored to your special occasions</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <div key={service.id} className="group bg-white/60 rounded-2xl p-6 md:p-8 border border-beige/50 hover:border-terracotta/20 transition-all duration-300 hover:shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-peach/60 flex items-center justify-center text-terracotta mb-5 group-hover:bg-terracotta group-hover:text-cream transition-all duration-300">
                {iconMap[service.icon] || <Heart size={24} />}
              </div>
              <h3 className="text-xl text-brown font-semibold mb-3" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
                {service.name}
              </h3>
              <p className="text-brown/50 text-sm leading-relaxed mb-4">{service.description}</p>
              {service.price && <p className="text-terracotta font-medium text-sm">{service.price}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
