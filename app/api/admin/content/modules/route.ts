import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';

export const runtime = 'nodejs';

const Patch = z.object({
  id: z.string().uuid(),
  title: z.string().trim().min(2).max(200).optional(),
  description: z.string().trim().max(2000).nullable().optional(),
  published: z.boolean().optional(),
  phase: z.number().int().min(1).max(3).optional(),
  week_start: z.number().int().min(1).max(12).nullable().optional(),
  week_end: z.number().int().min(1).max(12).nullable().optional(),
});

export async function PATCH(req: Request) {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = Patch.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const { id, title, description, published, phase, week_start, week_end } = parsed.data;
  const db = sql();

  try {
    if (title !== undefined)
      await db`update course_modules set title = ${title}, updated_at = now() where id = ${id}`;
    if (description !== undefined)
      await db`update course_modules set description = ${description}, updated_at = now() where id = ${id}`;
    if (published !== undefined)
      await db`update course_modules set published = ${published}, updated_at = now() where id = ${id}`;
    if (phase !== undefined)
      await db`update course_modules set phase = ${phase}, updated_at = now() where id = ${id}`;
    if (week_start !== undefined)
      await db`update course_modules set week_start = ${week_start}, updated_at = now() where id = ${id}`;
    if (week_end !== undefined)
      await db`update course_modules set week_end = ${week_end}, updated_at = now() where id = ${id}`;

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('modules PATCH', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos guardar los cambios.' },
      { status: 500 }
    );
  }
}
