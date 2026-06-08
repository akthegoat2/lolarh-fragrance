import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const isConfigured = Boolean(supabaseUrl && supabaseUrl.startsWith("http") && supabaseServiceKey);

export const supabaseAdmin = isConfigured
  ? createClient(supabaseUrl, supabaseServiceKey)
  : (null as unknown as ReturnType<typeof createClient>);
