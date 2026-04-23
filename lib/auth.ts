import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export type Role = 'user' | 'coach' | 'admin';

export type SessionPayload = {
  sub: string; // user id
  email: string;
  role: Role;
  name: string;
};

const COOKIE_NAME = 'exp10x_session';
const ISSUER = 'jhana-el-aridi';
const AUDIENCE = 'expansion-10x';

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error(
      'AUTH_SECRET is missing or too short. Set a 32+ character secret in the environment.'
    );
  }
  return new TextEncoder().encode(secret);
}

// ═════════════ Passwords → moved to lib/password.ts ═════════════
// Kept separate because bcryptjs isn't Edge-safe; middleware imports
// only the JWT + cookie helpers from this module.

// ═════════════ JWT sessions (HttpOnly cookie) ═════════════
const SHORT_MAX_AGE = 60 * 60 * 12; // 12h (session-only)
const LONG_MAX_AGE = 60 * 60 * 24 * 30; // 30d (remember me)

export async function signSession(
  payload: SessionPayload,
  remember = true
): Promise<string> {
  const ttl = remember ? LONG_MAX_AGE : SHORT_MAX_AGE;
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .setExpirationTime(`${ttl}s`)
    .setSubject(payload.sub)
    .sign(getSecret());
}

export async function verifySession(
  token: string
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret(), {
      issuer: ISSUER,
      audience: AUDIENCE,
      algorithms: ['HS256'],
    });
    if (typeof payload.sub !== 'string') return null;
    const role = payload.role;
    if (role !== 'user' && role !== 'coach' && role !== 'admin') return null;
    return {
      sub: payload.sub,
      email: String(payload.email ?? ''),
      name: String(payload.name ?? ''),
      role,
    };
  } catch {
    return null;
  }
}

// ═════════════ Cookie helpers (server-side) ═════════════
// Note: In Next 14, cookies() is synchronous. Only usable in Server Actions
// and Route Handlers for .set()/.delete(); readable from Server Components.
export async function setSessionCookie(token: string, remember: boolean) {
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: remember ? LONG_MAX_AGE : SHORT_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  cookies().delete(COOKIE_NAME);
}

export async function readSession(): Promise<SessionPayload | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export const SESSION_COOKIE_NAME = COOKIE_NAME;
