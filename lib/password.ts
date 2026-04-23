import bcrypt from 'bcryptjs';

/**
 * bcryptjs is Node-only. Keep it isolated from lib/auth.ts so that
 * Edge runtimes (middleware) can still import JWT/session helpers.
 */
export function hashPassword(pw: string): Promise<string> {
  return bcrypt.hash(pw, 11);
}

export function verifyPassword(pw: string, hash: string): Promise<boolean> {
  return bcrypt.compare(pw, hash);
}
