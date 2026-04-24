import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';
import { hashPassword } from '@/lib/password';

export const runtime = 'nodejs';

// ═════════════ DELETE /api/admin/users/[id] ═════════════
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  if (params.id === session.sub) {
    return NextResponse.json(
      { ok: false, error: 'No puedes eliminar tu propia cuenta.' },
      { status: 400 }
    );
  }

  try {
    const db = sql();

    // Check if this user is a coach with assigned students — unassign first
    const assigned = (await db`
      select count(*)::text as count from users where coach_id = ${params.id}
    `) as unknown as { count: string }[];
    if (Number(assigned[0]?.count ?? 0) > 0) {
      await db`update users set coach_id = null where coach_id = ${params.id}`;
    }

    const result = (await db`
      delete from users where id = ${params.id}
      returning email
    `) as unknown as { email: string }[];

    if (result.length === 0) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, email: result[0].email });
  } catch (err) {
    console.error('admin/users DELETE', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos eliminar el usuario.' },
      { status: 500 }
    );
  }
}

// ═════════════ PUT /api/admin/users/[id] — reset password ═════════════
const ResetBody = z.object({
  password: z.string().min(8, 'Mínimo 8 caracteres').max(200),
});

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }

  const parsed = ResetBody.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  try {
    const newHash = await hashPassword(parsed.data.password);
    const result = (await sql()`
      update users
         set password_hash = ${newHash}, updated_at = now()
       where id = ${params.id}
       returning email
    `) as unknown as { email: string }[];

    if (result.length === 0) {
      return NextResponse.json({ ok: false, error: 'Usuario no encontrado' }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin/users PUT', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos cambiar la contraseña.' },
      { status: 500 }
    );
  }
}
