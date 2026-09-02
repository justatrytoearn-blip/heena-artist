import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tqxjagaiogzxhapyckgu.supabase.co";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxeGphZ2Fpb2d6eGhhcHlja2d1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxMDgxNzIsImV4cCI6MjEwMzY4NDE3Mn0.J4kJuZVmkU-H2f4AfR9YMMaM-7F7YNAFg8wwkRRhwRA";

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Missing Supabase configuration");
  }

  _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  return _supabase;
}
