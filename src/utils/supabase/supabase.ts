import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Database } from "./_database.types";

const supabaseUrl = "https://enuzzkkzzjjmbnfqpwcq.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVudXp6a2t6empqbWJuZnFwd2NxIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDc0NjQyOSwiZXhwIjoyMDQ2MzIyNDI5fQ.wDQePuTFBASP7zphYgvTLL01ONNDV8Hc1vnZQ1VQ7sU";

console.log(supabaseAnonKey, supabaseUrl);

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: false,
    detectSessionInUrl: false,
  },
});
