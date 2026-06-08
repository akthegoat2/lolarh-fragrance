import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const isConfigured = Boolean(supabaseUrl && supabaseUrl.startsWith("http") && supabaseAnonKey);

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : (null as unknown as ReturnType<typeof createClient>);

export function getSupabase() {
  if (!isConfigured) return null;
  return supabase;
}

export { isConfigured };
