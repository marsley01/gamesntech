import { createServerSupabase } from '@/lib/supabase/server';
import { createClient } from '@/lib/supabase/client';
import { redirect } from 'next/navigation';
import type { Profile, UserRole } from '@/types';

export async function getSession() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

export async function getCurrentUser() {
  const supabase = await createServerSupabase();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session?.user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  return { user: session.user, profile: profile as Profile | null };
}

export async function isAuthenticated() {
  const session = await getSession();
  return session !== null;
}

export async function requireAuth() {
  const result = await getCurrentUser();
  if (!result) redirect('/auth/signin');
  return result;
}

export async function requireRole(role: UserRole) {
  const { user, profile } = await requireAuth();
  if (profile?.role !== role) redirect('/');
  return { user, profile };
}

export async function requireSeller() {
  return requireRole('seller');
}

export async function requireAdmin() {
  return requireRole('admin');
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/auth/signin');
}

export function getRedirectPath(role: UserRole | undefined): string {
  switch (role) {
    case 'seller': return '/seller/dashboard';
    case 'admin': return '/admin';
    case 'buyer': return '/';
    default: return '/';
  }
}
