import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';

export const runtime = 'nodejs';

type PaymentRow = {
  id: string;
  amount: string;
  currency: string;
  status: 'paid' | 'pending' | 'refunded' | 'failed';
  method: string | null;
  reference: string | null;
  note: string | null;
  paid_at: string;
  user_name: string;
  user_email: string;
  plan_name: string | null;
};

// ═════════════ POST /api/admin/payments ═════════════
const Create = z.object({
  user_id: z.string().uuid(),
  plan_id: z.string().uuid().nullable().optional(),
  amount: z.number().positive(),
  currency: z.string().length(3).optional().default('USD'),
  method: z.string().trim().max(40).nullable().optional(),
  reference: z.string().trim().max(200).nullable().optional(),
  note: z.string().trim().max(500).nullable().optional(),
  status: z.enum(['paid', 'pending', 'refunded', 'failed']).default('paid'),
  paid_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
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
  const d = parsed.data;
  const paidAt = d.paid_at ? `${d.paid_at}T12:00:00Z` : null;

  try {
    const rows = (await sql()`
      with inserted as (
        insert into payments (user_id, plan_id, amount, currency, status, method, reference, note, paid_at)
        values (
          ${d.user_id},
          ${d.plan_id ?? null},
          ${d.amount},
          ${d.currency ?? 'USD'},
          ${d.status},
          ${d.method ?? null},
          ${d.reference ?? null},
          ${d.note ?? null},
          coalesce(${paidAt}::timestamptz, now())
        )
        returning id, amount, currency, status, method, reference, note, paid_at, user_id, plan_id
      )
      select
        i.id, i.amount::text, i.currency, i.status, i.method, i.reference, i.note, i.paid_at,
        u.name as user_name, u.email as user_email,
        pl.name as plan_name
      from inserted i
      join users u on u.id = i.user_id
      left join plans pl on pl.id = i.plan_id
    `) as unknown as PaymentRow[];

    return NextResponse.json({ ok: true, payment: rows[0] });
  } catch (err) {
    console.error('payments POST', err);
    return NextResponse.json(
      { ok: false, error: 'No pudimos guardar el pago.' },
      { status: 500 }
    );
  }
}

// ═════════════ PATCH /api/admin/payments ═════════════
const Patch = z.object({
  id: z.string().uuid(),
  status: z.enum(['paid', 'pending', 'refunded', 'failed']),
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
    return NextResponse.json({ ok: false, error: 'Datos inválidos' }, { status: 400 });
  }
  try {
    await sql()`update payments set status = ${parsed.data.status} where id = ${parsed.data.id}`;
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('payments PATCH', err);
    return NextResponse.json({ ok: false, error: 'Error al actualizar' }, { status: 500 });
  }
}
