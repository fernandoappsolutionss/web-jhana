import { requireAdminPage } from '@/lib/admin';
import { sql } from '@/lib/db';
import IngresosClient, {
  type PaymentRow,
  type UserOption,
  type PlanOption,
} from './IngresosClient';
import './ingresos.css';

export const dynamic = 'force-dynamic';

type AggRow = {
  total_all: string;
  total_paid: string;
  total_pending: string;
  count_paid: string;
  count_pending: string;
};
type MonthRow = { total: string; count: string };

export default async function AdminIngresosPage() {
  await requireAdminPage();
  const db = sql();

  const [agg, thisMonth, lastMonth, payments, users, plans] = (await Promise.all([
    db`
      select
        coalesce(sum(amount),0)::text as total_all,
        coalesce(sum(amount) filter (where status = 'paid'),0)::text as total_paid,
        coalesce(sum(amount) filter (where status = 'pending'),0)::text as total_pending,
        count(*) filter (where status = 'paid')::text as count_paid,
        count(*) filter (where status = 'pending')::text as count_pending
      from payments
    `,
    db`
      select
        coalesce(sum(amount) filter (where status = 'paid'),0)::text as total,
        count(*) filter (where status = 'paid')::text as count
      from payments
      where paid_at >= date_trunc('month', now())
    `,
    db`
      select
        coalesce(sum(amount) filter (where status = 'paid'),0)::text as total,
        count(*) filter (where status = 'paid')::text as count
      from payments
      where paid_at >= date_trunc('month', now()) - interval '1 month'
        and paid_at <  date_trunc('month', now())
    `,
    db`
      select
        pay.id, pay.amount::text, pay.currency, pay.status, pay.method,
        pay.reference, pay.note, pay.paid_at,
        u.name as user_name, u.email as user_email,
        pl.name as plan_name
      from payments pay
      join users u on u.id = pay.user_id
      left join plans pl on pl.id = pay.plan_id
      order by pay.paid_at desc
      limit 100
    `,
    db`select id, name, email from users where role = 'user' order by name asc`,
    db`select id, slug, name, price_usd::text as price_usd from plans where active = true order by price_usd nulls first`,
  ])) as unknown as [
    AggRow[],
    MonthRow[],
    MonthRow[],
    PaymentRow[],
    UserOption[],
    PlanOption[],
  ];

  const a = agg[0];
  const tm = thisMonth[0];
  const lm = lastMonth[0];

  const totalPaid = Number(a?.total_paid ?? 0);
  const totalPending = Number(a?.total_pending ?? 0);
  const thisMonthTotal = Number(tm?.total ?? 0);
  const lastMonthTotal = Number(lm?.total ?? 0);
  const monthOverMonth =
    lastMonthTotal > 0
      ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100
      : null;

  const fmtUSD = (n: number) =>
    n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Admin · Ingresos</span>
        </div>
        <h1 className="page-h1">
          <em>Ingresos</em> de la plataforma
        </h1>
        <p className="page-sub">
          Resumen de pagos confirmados, pendientes y evolución mes a mes.
          Puedes registrar pagos manualmente (Zelle, transferencia, efectivo)
          desde el formulario.
        </p>
      </div>

      <div className="ing-kpis">
        <div className="ik">
          <div className="ik-label">Total cobrado</div>
          <div className="ik-val">{fmtUSD(totalPaid)}</div>
          <div className="ik-meta">{a?.count_paid ?? 0} pagos confirmados</div>
        </div>
        <div className="ik accent">
          <div className="ik-label">Este mes</div>
          <div className="ik-val">{fmtUSD(thisMonthTotal)}</div>
          <div className="ik-meta">
            {monthOverMonth === null ? (
              <>{tm?.count ?? 0} pagos</>
            ) : (
              <>
                {monthOverMonth >= 0 ? '▲' : '▼'}{' '}
                {Math.abs(Math.round(monthOverMonth))}% vs mes anterior
              </>
            )}
          </div>
        </div>
        <div className="ik">
          <div className="ik-label">Pendiente</div>
          <div className="ik-val" style={{ color: totalPending > 0 ? 'var(--accent)' : undefined }}>
            {fmtUSD(totalPending)}
          </div>
          <div className="ik-meta">{a?.count_pending ?? 0} cuotas por confirmar</div>
        </div>
        <div className="ik">
          <div className="ik-label">Mes anterior</div>
          <div className="ik-val">{fmtUSD(lastMonthTotal)}</div>
          <div className="ik-meta">{lm?.count ?? 0} pagos · referencia</div>
        </div>
      </div>

      <IngresosClient initialPayments={payments} users={users} plans={plans} />
    </>
  );
}
