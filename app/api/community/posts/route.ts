import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';

export const runtime = 'nodejs';

const Body = z.object({
  title: z.string().trim().max(160).nullable().optional(),
  body: z.string().trim().min(2, 'Muy corto').max(4000),
});

type PostRow = {
  id: string;
  title: string | null;
  body: string;
  pinned: boolean;
  created_at: string;
  author_id: string;
  author_name: string;
  author_role: 'user' | 'coach' | 'admin';
};

async function ensureAccess(userId: string) {
  const plan = await getUserPlan(userId);
  return plan.modules.includes('comunidad');
}

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }
  if (session.role === 'user' && !(await ensureAccess(session.sub))) {
    return NextResponse.json(
      { ok: false, error: 'Tu plan no incluye la comunidad.' },
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
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  try {
    const rows = (await sql()`
      with inserted as (
        insert into community_posts (author_id, title, body)
        values (${session.sub}, ${parsed.data.title ?? null}, ${parsed.data.body})
        returning id, title, body, pinned, created_at, author_id
      )
      select
        i.id, i.title, i.body, i.pinned, i.created_at, i.author_id,
        u.name as author_name, u.role as author_role
      from inserted i
      join users u on u.id = i.author_id
    `) as unknown as PostRow[];

    const r = rows[0];
    if (!r) {
      return NextResponse.json({ ok: false, error: 'No se creó el post' }, { status: 500 });
    }
    return NextResponse.json({
      ok: true,
      post: {
        id: r.id,
        title: r.title,
        body: r.body,
        pinned: r.pinned,
        created_at: r.created_at,
        authorId: r.author_id,
        authorName: r.author_name,
        authorRole: r.author_role,
      },
    });
  } catch (err) {
    console.error('community POST error', err);
    return NextResponse.json({ ok: false, error: 'Error al publicar' }, { status: 500 });
  }
}

// ═════════════ PATCH — pin/unpin (admin only) ═════════════
const Patch = z.object({
  id: z.string().uuid(),
  pinned: z.boolean(),
});

export async function PATCH(req: Request) {
  const session = await readSession();
  if (!session || session.role !== 'admin') {
    return NextResponse.json({ ok: false, error: 'Solo admin' }, { status: 403 });
  }

  let body: unknown;
  try { body = await req.json(); }
  catch { return NextResponse.json({ ok: false, error: 'JSON inválido' }, { status: 400 }); }

  const parsed = Patch.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Datos inválidos' }, { status: 400 });
  }

  try {
    await sql()`update community_posts set pinned = ${parsed.data.pinned} where id = ${parsed.data.id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('community PATCH', err);
    return NextResponse.json({ ok: false, error: 'Error al actualizar' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Falta id' }, { status: 400 });
  }

  try {
    // Authors can delete their own; admin can delete any
    if (session.role === 'admin') {
      await sql()`delete from community_posts where id = ${id}`;
    } else {
      await sql()`delete from community_posts where id = ${id} and author_id = ${session.sub}`;
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('community DELETE error', err);
    return NextResponse.json({ ok: false, error: 'Error al eliminar' }, { status: 500 });
  }
}
