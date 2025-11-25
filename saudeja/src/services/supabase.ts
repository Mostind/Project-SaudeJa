import { createClient } from '@supabase/supabase-js';



const supabaseUrl = process.env.SUPABASE_URL || 'https://hrqeuyiubbfglyxctoph.supabase.co';
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycWV1eWl1YmJmZ2x5eGN0b3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTMzMjAsImV4cCI6MjA3OTI2OTMyMH0.N4d6H64oUqbTJUcCtfl79N-eeyJAW4hIUR9HX6SlHg8';

if (supabaseUrl === 'https://hrqeuyiubbfglyxctoph.supabase.co' || supabaseAnonKey === 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhycWV1eWl1YmJmZ2x5eGN0b3BoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTMzMjAsImV4cCI6MjA3OTI2OTMyMH0.N4d6H64oUqbTJUcCtfl79N-eeyJAW4hIUR9HX6SlHg8') {
  console.error('As credenciais do Supabase não foram configuradas. Por favor, configure SUPABASE_URL e SUPABASE_ANON_KEY no seu arquivo .env.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // O Supabase Client para React Native precisa de um storage compatível
    storage: {
      getItem: (key) => localStorage.getItem(key),
      setItem: (key, value) => localStorage.setItem(key, value),
      removeItem: (key) => localStorage.removeItem(key),
    },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
