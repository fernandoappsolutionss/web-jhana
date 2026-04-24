import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { readSession } from '@/lib/auth';
import { hashPassword, verifyPassword } from '@/lib/password';

export const runtime = 'nodejs';

const Body = z.object({
  current: z.string().min(1, 'Contraseña actual requerida'),
  next: z.string().min(8, 'Mínimo 8 caracteres').max(200),
});

type PwRow = { password_hash: string };

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }
  const { current, next } = parsed.data;

  try {
    const rows = (await sql()`
      select password_hash from users where id = ${session.sub} limit 1
    `) as unknown as PwRow[];

    const hash = rows[0]?.password_hash;
    if (!hash) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }
    const ok = await verifyPassword(current, hash);
    if (!ok) {
      return NextResponse.json(
        { ok: false, error: 'La contraseña actual no es correcta.' },
        { status: 401 }
      );
    }

    const newHash = await hashPassword(next);
    await sql()`
      update users set password_hash = ${newHash}, updated_at = now() where id = ${session.sub}
    `;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('password POST', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos actualizar la contraseña.' },
      { status: 500 }
    );
  }
}
