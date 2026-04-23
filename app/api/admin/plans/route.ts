import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { assertRole } from '@/lib/admin';

export const runtime = 'nodejs';

type PlanRow = {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  tier: string;
  modules: string[];
  price_usd: string | null;
  active: boolean;
};

// ═════════════ GET /api/admin/plans ═════════════
// Used by the users page to populate the plan selector.
export async function GET() {
  const session = await assertRole('admin');
  if (!session) {
    return NextResponse.json({ ok: false, error: 'No autorizado' }, { status: 401 });
  }

  try {
    const rows = (await sql()`
      select id, slug, name, description, tier, modules, price_usd, active
        from plans
       where active = true
       order by price_usd nulls first
    `) as unknown as PlanRow[];
    return NextResponse.json({ ok: true, plans: rows });
  } catch (err) {
    console.error('admin/plans GET error', err);
    return NextResponse.json(
      { ok: false, error: 'Error al cargar planes' },
      { status: 500 }
    );
  }
}
