import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { signSession, setSessionCookie, type Role } from '@/lib/auth';
import { hashPassword } from '@/lib/password';

export const runtime = 'nodejs'; // bcryptjs works on both, but keep Node for clarity

const Body = z.object({
  name: z.string().trim().min(2, 'Nombre muy corto').max(80),
  email: z.string().trim().toLowerCase().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(200),
});

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: Role;
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
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }
  const { name, email, password } = parsed.data;

  try {
    const exists = await sql()`
      select id from users where email = ${email} limit 1
    `;
    if ((exists as unknown[]).length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Ya existe una cuenta con ese correo.' },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    const rows = (await sql()`
      insert into users (email, name, password_hash, role)
      values (${email}, ${name}, ${passwordHash}, 'user')
      returning id, email, name, role
    `) as UserRow[];

    const user = rows[0];
    if (!user) {
      return NextResponse.json(
        { ok: false, error: 'No pudimos crear la cuenta.' },
        { status: 500 }
      );
    }

    const token = await signSession(
      { sub: user.id, email: user.email, name: user.name, role: user.role },
      true
    );
    await setSessionCookie(token, true);

    return NextResponse.json({ ok: true, role: user.role });
  } catch (err) {
    console.error('register error', err);
    return NextResponse.json(
      { ok: false, error: 'Error interno. Inténtalo de nuevo en un momento.' },
      { status: 500 }
    );
  }
}
