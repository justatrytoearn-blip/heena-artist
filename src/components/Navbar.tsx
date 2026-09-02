"use client";

import React, { useState, useEffect } from "react";
import { dataService } from "@/lib/dataService";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Services", href: "#services" },
  { label: "Shop", href: "#products" },
  { label: "Reviews", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [artistName, setArtistName] = useState("Henna by Bhoomi");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    dataService.getConfig().then((config) => {
      if (config.artistName) setArtistName(config.artistName);
    }).catch(() => {});
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-sm border-b border-beige"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <a href="#home" className="flex flex-col">
            <span className="text-lg sm:text-xl font-serif font-bold text-darkBrown">
              {artistName.split(" ").slice(0, -1).join(" ") + " "}
              <span className="text-mehndiGreen">{artistName.split(" ").slice(-1)}</span>
            </span>
            <span className="text-[10px] sm:text-xs text-stone-400 tracking-widest uppercase -mt-1">
              Mehndi Artist
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-darkBrown transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mehndiGreen transition-all group-hover:w-full" />
              </a>
            ))}
            <a
              href="/admin/login"
              className="text-xs text-stone-400 hover:text-darkBrown transition-colors ml-2"
            >
              Admin
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-darkBrown p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-beige shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-sm font-medium text-stone-600 hover:text-darkBrown py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin/login"
              className="block text-xs text-stone-400 hover:text-darkBrown py-2"
              onClick={() => setIsOpen(false)}
            >
              Admin Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
