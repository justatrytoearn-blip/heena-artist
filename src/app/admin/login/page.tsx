"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Lock, Mail, AlertCircle, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, loading: authLoading, signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      window.location.href = "/admin/dashboard";
    }
  }, [user, isAdmin, authLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signIn(email, password);
      setSuccess("Login successful! Redirecting to dashboard...");

      // Force redirect after short delay
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to sign in";

      if (errorMessage.includes("Invalid login credentials") || errorMessage.includes("invalid")) {
        setError("Invalid email or password. Please try again.");
      } else if (errorMessage.includes("Email not confirmed")) {
        setError("Please confirm your email first. Check your inbox.");
      } else if (errorMessage.includes("email_provider_disabled")) {
        setError("Email login is disabled. Please enable it in Supabase → Authentication → Providers → Email.");
      } else {
        setError("Error: " + errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream via-peach to-beige px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-brown font-bold mb-2" style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}>
            Admin Login
          </h1>
          <p className="text-brown/50 text-sm">Sign in to manage your website content</p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm border border-beige/30">
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-6 text-sm">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-6 text-sm">
              <CheckCircle size={16} className="flex-shrink-0" />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-brown/70 mb-2">Email Address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/30" />
                <input
                  id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                  className="w-full pl-10 pr-4 py-3 bg-cream/50 border border-beige rounded-xl text-brown text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all"
                  placeholder="bhoomiart@website.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-brown/70 mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown/30" />
                <input
                  id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full pl-10 pr-12 py-3 bg-cream/50 border border-beige rounded-xl text-brown text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/30 focus:border-terracotta/50 transition-all"
                  placeholder="Enter your password"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown/30 hover:text-brown/60 transition-colors">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-terracotta text-cream rounded-xl text-sm font-medium hover:bg-terracotta-light transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>
        </div>

        <div className="text-center mt-6">
          <a href="/" className="text-brown/40 hover:text-brown/60 text-sm transition-colors">← Back to website</a>
        </div>
      </div>
    </div>
  );
}
