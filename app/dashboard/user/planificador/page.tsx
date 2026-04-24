import { sql } from '@/lib/db';
import { moduleAccess } from '@/lib/guard';
import LockedModule from '@/components/dashboard/LockedModule';
import PlannerClient, { type Snapshot } from './PlannerClient';
import './planificador.css';

export const dynamic = 'force-dynamic';

export default async function PlanificadorPage() {
  const { session, plan, hasAccess } = await moduleAccess('planificador');
  if (!hasAccess) return <LockedModule module="Planificador" planName={plan.name} />;

  const rawRows = (await sql()`
    select
      id,
      recorded_at::text as recorded_at,
      net_worth::text as net_worth,
      income::text as income,
      savings::text as savings,
      investments::text as investments,
      debts::text as debts,
      notes
    from planner_snapshots
    where user_id = ${session.sub}
    order by recorded_at asc
  `) as unknown as {
    id: string;
    recorded_at: string;
    net_worth: string;
    income: string | null;
    savings: string | null;
    investments: string | null;
    debts: string | null;
    notes: string | null;
  }[];

  const snapshots: Snapshot[] = rawRows.map((r) => ({
    id: r.id,
    recorded_at: r.recorded_at,
    net_worth: Number(r.net_worth),
    income: r.income !== null ? Number(r.income) : null,
    savings: r.savings !== null ? Number(r.savings) : null,
    investments: r.investments !== null ? Number(r.investments) : null,
    debts: r.debts !== null ? Number(r.debts) : null,
    notes: r.notes,
  }));

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Planificador financiero · Riqueza</span>
        </div>
        <h1 className="page-h1">
          Tu <em>Fondo de Libertad</em> en números.
        </h1>
        <p className="page-sub">
          Registra tu patrimonio cada semana o cada mes. La consistencia es
          lo que hace visible el cambio. El gráfico se construye solo con tus
          datos.
        </p>
      </div>

      <PlannerClient initialSnapshots={snapshots} />
    </>
  );
}
