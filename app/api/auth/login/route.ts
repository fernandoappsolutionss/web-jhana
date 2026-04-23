import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { signSession, setSessionCookie, type Role } from '@/lib/auth';
import { verifyPassword } from '@/lib/password';

export const runtime = 'nodejs';

const Body = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
  remember: z.boolean().optional().default(true),
});

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
  password_hash: string;
};

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Correo o contraseña inválidos' },
      { status: 400 }
    );
  }
  const { email, password, remember } = parsed.data;

  try {
    const rows = (await sql()`
      select id, email, name, role, password_hash
        from users where email = ${email} limit 1
    `) as UserRow[];

    const user = rows[0];
    // Use the same response to avoid email enumeration.
    const INVALID = NextResponse.json(
      { ok: false, error: 'Correo o contraseña incorrectos.' },
      { status: 401 }
    );
    if (!user) return INVALID;

    const ok = await verifyPassword(password, user.password_hash);
    if (!ok) return INVALID;

    await sql()`update users set last_login_at = now() where id = ${user.id}`;

    const token = await signSession(
      { sub: user.id, email: user.email, name: user.name, role: user.role },
      remember
    );
    await setSessionCookie(token, remember);

    return NextResponse.json({ ok: true, role: user.role });
  } catch (err) {
    console.error('login error', err);
    return NextResponse.json(
      { ok: false, error: 'Error interno. Inténtalo de nuevo en un momento.' },
      { status: 500 }
    );
  }
}
