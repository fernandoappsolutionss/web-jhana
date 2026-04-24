import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import {
  readSession,
  signSession,
  setSessionCookie,
} from '@/lib/auth';

export const runtime = 'nodejs';

const Patch = z.object({
  name: z.string().trim().min(2, 'Nombre muy corto').max(80),
});

export async function PATCH(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }

  const parsed = Patch.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }
  const { name } = parsed.data;

  try {
    await sql()`update users set name = ${name}, updated_at = now() where id = ${session.sub}`;

    // Refresh the session cookie so the new name is reflected everywhere
    const newToken = await signSession(
      { sub: session.sub, email: session.email, name, role: session.role },
      true
    );
    await setSessionCookie(newToken, true);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('profile PATCH', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos guardar el cambio.' },
      { status: 500 }
    );
  }
}
