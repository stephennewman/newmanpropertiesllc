import { createClient } from "@supabase/supabase-js";

// Optional: Only initialize if env vars are present
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

export const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey)
    : null;

// Lead types matching the database schema
export interface LeadRecord {
  id?: string;
  created_at?: string;
  property_slug: string;
  property_name: string;
  business_type: string;
  space_needed: string;
  timeline: string;
  budget: string;
  name: string;
  phone: string;
  email: string;
  business_name?: string;
  message?: string;
  scheduled_date?: string;
  scheduled_time?: string;
  lead_score?: number;
  lead_priority?: string;
  status?: string;
}

export async function insertLead(lead: LeadRecord): Promise<{ data: LeadRecord | null; error: Error | null }> {
  if (!supabase) {
    console.log("Supabase not configured, skipping database insert");
    return { data: lead, error: null };
  }

  const { data, error } = await supabase
    .from("leads")
    .insert([lead])
    .select()
    .single();

  return { data, error: error ? new Error(error.message) : null };
}

