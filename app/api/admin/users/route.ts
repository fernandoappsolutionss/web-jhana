import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';
import { hashPassword } from '@/lib/password';

export const runtime = 'nodejs';

type UserRow = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'coach' | 'admin';
  plan_slug: string | null;
  plan_name: string | null;
  coach_id: string | null;
  coach_name: string | null;
  created_at: string;
  last_login_at: string | null;
};

// ═════════════ GET /api/admin/users ═════════════
export async function GET() {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rows = (await sql()`
      select
        u.id, u.email, u.name, u.role,
        p.slug as plan_slug,
        p.name as plan_name,
        u.coach_id,
        c.name as coach_name,
        u.created_at,
        u.last_login_at
      from users u
      left join plans p on p.id = u.plan_id
      left join users c on c.id = u.coach_id
      order by u.created_at desc
    `) as unknown as UserRow[];

    return NextResponse.json({ ok: true, users: rows });
  } catch (err) {
    console.error('admin/users GET error', err);
    return NextResponse.json(
      { ok: false, error: 'Error al cargar usuarios' },
      { status: 500 }
    );
  }
}

// ═════════════ POST /api/admin/users — create user directly ═════════════
const Create = z.object({
  name: z.string().trim().min(2, 'Nombre muy corto').max(80),
  email: z.string().trim().toLowerCase().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').max(200),
  role: z.enum(['user', 'coach', 'admin']).default('user'),
  plan_slug: z.string().nullable().optional(),
  coach_id: z.string().uuid().nullable().optional(),
});

type CreatedRow = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'coach' | 'admin';
  plan_slug: string | null;
  coach_id: string | null;
  coach_name: string | null;
  created_at: string;
  last_login_at: string | null;
};

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
  const { name, email, password, role, plan_slug, coach_id } = parsed.data;

  try {
    const db = sql();

    const existing = (await db`select id from users where email = ${email} limit 1`) as unknown as { id: string }[];
    if (existing.length > 0) {
      return NextResponse.json(
        { ok: false, error: 'Ya existe una cuenta con ese correo.' },
        { status: 409 }
      );
    }

    if (coach_id) {
      const coachCheck = (await db`select id from users where id = ${coach_id} and role = 'coach' limit 1`) as unknown as { id: string }[];
      if (!coachCheck.length) {
        return NextResponse.json(
          { ok: false, error: 'La persona asignada como coach no tiene rol de coach.' },
          { status: 400 }
        );
      }
    }

    const passwordHash = await hashPassword(password);

    // Resolve plan_id from plan_slug (if provided)
    let planId: string | null = null;
    if (plan_slug) {
      const planRows = (await db`select id from plans where slug = ${plan_slug} limit 1`) as unknown as { id: string }[];
      planId = planRows[0]?.id ?? null;
    }

    const rows = (await db`
      with inserted as (
        insert into users (email, name, password_hash, role, plan_id, coach_id)
        values (${email}, ${name}, ${passwordHash}, ${role}, ${planId}, ${coach_id ?? null})
        returning id, email, name, role, plan_id, coach_id, created_at, last_login_at
      )
      select
        i.id, i.email, i.name, i.role,
        p.slug as plan_slug,
        i.coach_id,
        c.name as coach_name,
        i.created_at, i.last_login_at
      from inserted i
      left join plans p on p.id = i.plan_id
      left join users c on c.id = i.coach_id
    `) as unknown as CreatedRow[];

    return NextResponse.json({ ok: true, user: rows[0] });
  } catch (err) {
    console.error('admin/users POST', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos crear el usuario.' },
      { status: 500 }
    );
  }
}

// ═════════════ PATCH /api/admin/users — edit role/plan/coach ═════════════
const Patch = z.object({
  id: z.string().uuid(),
  role: z.enum(['user', 'coach', 'admin']).optional(),
  plan_slug: z.string().nullable().optional(), // null = clear plan
  coach_id: z.string().uuid().nullable().optional(), // null = clear coach
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
  const { id, role, plan_slug, coach_id } = parsed.data;

  // Disallow self-demotion to avoid locking yourself out of admin
  if (id === session.sub && role && role !== 'admin') {
    return NextResponse.json(
      { ok: false, error: 'No puedes cambiar tu propio rol de admin.' },
      { status: 400 }
    );
  }

  try {
    const db = sql();

    if (role !== undefined) {
      await db`update users set role = ${role}, updated_at = now() where id = ${id}`;
    }
    if (plan_slug !== undefined) {
      if (plan_slug === null) {
        await db`update users set plan_id = null, updated_at = now() where id = ${id}`;
      } else {
        await db`
          update users
             set plan_id = (select id from plans where slug = ${plan_slug}),
                 updated_at = now()
           where id = ${id}
        `;
      }
    }
    if (coach_id !== undefined) {
      // Enforce that coach_id references a user with role='coach'
      if (coach_id) {
        const coachCheck = (await db`
          select id from users where id = ${coach_id} and role = 'coach' limit 1
        `) as unknown as { id: string }[];
        if (!coachCheck.length) {
          return NextResponse.json(
            { ok: false, error: 'La persona asignada no tiene rol de coach.' },
            { status: 400 }
          );
        }
      }
      await db`update users set coach_id = ${coach_id}, updated_at = now() where id = ${id}`;
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('admin/users PATCH error', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos guardar los cambios.' },
      { status: 500 }
    );
  }
}
