import { redirect } from 'next/navigation';
import { readSession, type Role } from '@/lib/auth';

/**
 * Guard for admin pages and admin API routes (server-side).
 * Redirects non-admins away from pages; returns null/Response
 * for API handlers.
 */
export async function requireAdminPage() {
  const session = await readSession();
  if (!session) redirect('/login');
  if (session.role !== 'admin') redirect(`/dashboard/${session.role}`);
  return session;
}

/**
 * In API handlers: returns the session if admin, or null if not.
 * Caller should reply 401/403 on null.
 */
export async function assertRole(...allowed: Role[]) {
  const session = await readSession();
  if (!session) return null;
  if (!allowed.includes(session.role)) return null;
  return session;
}
