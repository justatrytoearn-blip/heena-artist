"use client";

import React, { useState, useEffect } from "react";
import { Award, MapPin, Palette } from "lucide-react";
import { getSiteConfig } from "@/lib/dataService";
import { SiteConfig } from "@/types";

export default function About() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    getSiteConfig().then(setConfig).catch(() => {});
  }, []);

  const name = config?.artistName || "Henna by Bhoomi";
  const about = config?.aboutText || "With over 10 years of experience in the art of Mehndi, I bring traditional and contemporary henna designs to life.";
  const experience = config?.experience || "10+ Years";
  const location = config?.location || "Mumbai, India";
  const photo = config?.artistPhoto || "";

  return (
    <section id="about" className="py-16 md:py-24 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-terracotta/40" />
            <span className="text-terracotta text-xs tracking-[0.3em] uppercase font-medium">About Me</span>
            <div className="w-8 h-px bg-terracotta/40" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-brown" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            The Artist Behind <span className="text-terracotta italic">the Art</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-beige">
              {photo ? (
                <img src={photo} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-peach to-beige">
                  <div className="text-center">
                    <Palette className="w-12 h-12 text-terracotta/30 mx-auto mb-3" />
                    <p className="text-brown/30 text-sm">Artist Photo</p>
                  </div>
                </div>
              )}
            </div>
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-terracotta/20 rounded-2xl -z-10" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-terracotta/10 rounded-2xl -z-10" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl text-brown mb-6" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>{name}</h3>
            <div className="space-y-4 mb-8">
              {about.split("\n").filter(Boolean).map((para, i) => (
                <p key={i} className="text-brown/60 leading-relaxed">{para}</p>
              ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-peach/50 rounded-xl p-4 text-center">
                <Award className="w-5 h-5 text-terracotta mx-auto mb-2" />
                <p className="text-brown font-semibold text-sm">{experience}</p>
                <p className="text-brown/50 text-xs mt-1">Experience</p>
              </div>
              <div className="bg-peach/50 rounded-xl p-4 text-center">
                <MapPin className="w-5 h-5 text-terracotta mx-auto mb-2" />
                <p className="text-brown font-semibold text-sm">{location}</p>
                <p className="text-brown/50 text-xs mt-1">Location</p>
              </div>
              <div className="bg-peach/50 rounded-xl p-4 text-center">
                <Palette className="w-5 h-5 text-terracotta mx-auto mb-2" />
                <p className="text-brown font-semibold text-sm">All Styles</p>
                <p className="text-brown/50 text-xs mt-1">Specialization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
