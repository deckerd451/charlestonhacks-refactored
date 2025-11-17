import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hvmotpzhliufzomewzfl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bW90cHpobGl1ZnpvbWV3emZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NzY2NDUsImV4cCI6MjA1ODE1MjY0NX0.foHTGZVtRjFvxzDfMf1dpp0Zw4XFfD-FPZK-zRnjc6s';

// Use the global supabase object from the UMD script
const supabaseClient = (window as any).supabase.createClient(supabaseUrl, supabaseAnonKey);

export const supabase = supabaseClient;

// Expose globally for console debugging
if (typeof window !== 'undefined') {
  (window as any).supabaseClient = supabaseClient;
}
