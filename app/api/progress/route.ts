import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';

export const runtime = 'nodejs';

const Body = z.object({
  lessonId: z.string().uuid(),
  completed: z.boolean(),
});

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const plan = await getUserPlan(session.sub);
  if (!plan.modules.includes('curso')) {
    return NextResponse.json(
      { ok: false, error: 'Tu plan no incluye el curso.' },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 });
  }

  const parsed = Body.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Datos inválidos' }, { status: 400 });
  }
  const { lessonId, completed } = parsed.data;

  try {
    const db = sql();
    if (completed) {
      await db`
        insert into lesson_progress (user_id, lesson_id)
        values (${session.sub}, ${lessonId})
        on conflict (user_id, lesson_id) do nothing
      `;
    } else {
      await db`
        delete from lesson_progress
         where user_id = ${session.sub} and lesson_id = ${lessonId}
      `;
    }
    return NextResponse.json({ ok: true, completed });
  } catch (err) {
    console.error('progress error', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos guardar tu progreso.' },
      { status: 500 }
    );
  }
}
