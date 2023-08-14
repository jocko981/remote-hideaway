// supabase client
import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://qdajkonmxhaknjmdcbpf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkYWprb25teGhha25qbWRjYnBmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1MTIxOTIsImV4cCI6MjAwNTA4ODE5Mn0.aCej6pZZuywKFnEiMt4U2QKJIm9_G3lPdpOFK9M5DyY";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
