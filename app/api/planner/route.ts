import { NextResponse } from 'next/server';
import { z } from 'zod';
import { sql } from '@/lib/db';
import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';

export const runtime = 'nodejs';

const Body = z.object({
  recorded_at: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Fecha inválida'),
  net_worth: z.number().finite(),
  income: z.number().finite().nullable().optional(),
  savings: z.number().finite().nullable().optional(),
  investments: z.number().finite().nullable().optional(),
  debts: z.number().finite().nullable().optional(),
  notes: z.string().trim().max(2000).nullable().optional(),
});

type SnapshotRow = {
  id: string;
  recorded_at: string;
  net_worth: string;
  income: string | null;
  savings: string | null;
  investments: string | null;
  debts: string | null;
  notes: string | null;
};

export async function POST(req: Request) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  const plan = await getUserPlan(session.sub);
  if (!plan.modules.includes('planificador')) {
    return NextResponse.json(
      { ok: false, error: 'Tu plan no incluye el planificador.' },
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
  const { recorded_at, net_worth, income, savings, investments, debts, notes } = parsed.data;

  try {
    const rows = (await sql()`
      insert into planner_snapshots
        (user_id, recorded_at, net_worth, income, savings, investments, debts, notes)
      values
        (${session.sub}, ${recorded_at}, ${net_worth},
         ${income ?? null}, ${savings ?? null},
         ${investments ?? null}, ${debts ?? null},
         ${notes ?? null})
      on conflict (user_id, recorded_at)
        do update set
          net_worth   = excluded.net_worth,
          income      = excluded.income,
          savings     = excluded.savings,
          investments = excluded.investments,
          debts       = excluded.debts,
          notes       = excluded.notes
      returning
        id,
        recorded_at::text as recorded_at,
        net_worth::text as net_worth,
        income::text as income,
        savings::text as savings,
        investments::text as investments,
        debts::text as debts,
        notes
    `) as unknown as SnapshotRow[];

    const r = rows[0];
    if (!r) {
      return NextResponse.json(
        { ok: false, error: 'No pudimos guardar el snapshot.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      snapshot: {
        id: r.id,
        recorded_at: r.recorded_at,
        net_worth: Number(r.net_worth),
        income: r.income !== null ? Number(r.income) : null,
        savings: r.savings !== null ? Number(r.savings) : null,
        investments: r.investments !== null ? Number(r.investments) : null,
        debts: r.debts !== null ? Number(r.debts) : null,
        notes: r.notes,
      },
    });
  } catch (err) {
    console.error('planner POST error', err);
    return NextResponse.json(
      { ok: false, error: 'Error al guardar el snapshot.' },
      { status: 500 }
    );
  }
}
