// Middleware untuk cek autentikasi admin
import { createMiddlewareClient } from '@supabase/supabase-js';

export async function checkAuth(supabase) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return session;
}

export function isAdmin(email) {
  // Ganti dengan email admin kamu
  const ADMIN_EMAILS = ['admin@kulturaindonesia.or.id', 'hendi@kulturaindonesia.or.id'];
  return ADMIN_EMAILS.includes(email);
}
