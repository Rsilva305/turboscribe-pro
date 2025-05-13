import { createClient } from '@supabase/supabase-js';

// These environment variables need to be defined in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key';

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 