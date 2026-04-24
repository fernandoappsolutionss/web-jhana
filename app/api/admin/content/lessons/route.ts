import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';

export const runtime = 'nodejs';

type LessonRow = {
  id: string;
  slug: string;
  title: string;
  kind: 'video' | 'reading' | 'exercise' | 'download' | 'live';
  url: string | null;
  duration_min: number | null;
  position: number;
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120)
    || 'leccion';
}

// ═════════════ GET /api/admin/content/lessons?moduleId=uuid ═════════════
export async function GET(req: Request) {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const moduleId = new URL(req.url).searchParams.get('moduleId');
  if (!moduleId) {
    return NextResponse.json({ ok: false, error: 'Falta moduleId' }, { status: 400 });
  }

  try {
    const rows = (await sql()`
      select id, slug, title, kind, url, duration_min, position
        from lessons
       where module_id = ${moduleId}
       order by position, created_at
    `) as unknown as LessonRow[];
    return NextResponse.json({ ok: true, lessons: rows });
  } catch (err) {
    console.error('lessons GET', err);
    return NextResponse.json({ ok: false, error: 'Error al cargar' }, { status: 500 });
  }
}

// ═════════════ POST /api/admin/content/lessons ═════════════
const Create = z.object({
  moduleId: z.string().uuid(),
  title: z.string().trim().min(2).max(200),
  kind: z.enum(['video', 'reading', 'exercise', 'download', 'live']).default('video'),
  url: z.string().trim().url().nullable().optional().or(z.literal('').transform(() => null)),
  duration_min: z.number().int().min(0).max(10000).nullable().optional(),
});

export async function POST(req: Request) {
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

  const parsed = Create.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Datos inválidos' },
      { status: 400 }
    );
  }

  const { moduleId, title, kind, url, duration_min } = parsed.data;
  const db = sql();

  try {
    // Compute next slug + position
    const existing = (await db`
      select slug, position from lessons where module_id = ${moduleId}
    `) as unknown as { slug: string; position: number }[];

    let baseSlug = slugify(title);
    let slug = baseSlug;
    let n = 2;
    const taken = new Set(existing.map((r) => r.slug));
    while (taken.has(slug)) {
      slug = `${baseSlug}-${n++}`;
    }
    const nextPos = existing.length > 0 ? Math.max(...existing.map((r) => r.position)) + 1 : 1;

    const rows = (await db`
      insert into lessons (module_id, slug, title, kind, url, duration_min, position)
      values (${moduleId}, ${slug}, ${title}, ${kind}, ${url ?? null}, ${duration_min ?? null}, ${nextPos})
      returning id, slug, title, kind, url, duration_min, position
    `) as unknown as LessonRow[];

    return NextResponse.json({ ok: true, lesson: rows[0] });
  } catch (err) {
    console.error('lessons POST', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos crear la lección.' },
      { status: 500 }
    );
  }
}

// ═════════════ DELETE /api/admin/content/lessons?id=uuid ═════════════
export async function DELETE(req: Request) {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get('id');
  if (!id) {
    return NextResponse.json({ ok: false, error: 'Falta id' }, { status: 400 });
  }

  try {
    await sql()`delete from lessons where id = ${id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('lessons DELETE', err);
    return NextResponse.json({ ok: false, error: 'Error al eliminar' }, { status: 500 });
  }
}
