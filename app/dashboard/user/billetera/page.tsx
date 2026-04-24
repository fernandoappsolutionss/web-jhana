import Link from 'next/link';
import { sql } from '@/lib/db';
import { moduleAccess } from '@/lib/guard';
import LockedModule from '@/components/dashboard/LockedModule';
import './billetera.css';

export const dynamic = 'force-dynamic';

type PaymentRow = {
  id: string;
  amount: string;
  currency: string;
  status: 'paid' | 'pending' | 'refunded' | 'failed';
  method: string | null;
  reference: string | null;
  note: string | null;
  paid_at: string;
  plan_name: string | null;
};

const STATUS_LABEL: Record<PaymentRow['status'], string> = {
  paid: 'Pagado',
  pending: 'Pendiente',
  refunded: 'Reembolsado',
  failed: 'Fallido',
};

const METHOD_LABEL: Record<string, string> = {
  zelle: 'Zelle',
  transfer: 'Transferencia',
  paypal: 'PayPal',
  card: 'Tarjeta',
  cash: 'Efectivo',
  manual: 'Registro manual',
};

function fmtUSD(n: number, currency = 'USD') {
  return n.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 2 });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BilleteraPage() {
  const { session, plan, hasAccess } = await moduleAccess('billetera');
  if (!hasAccess) return <LockedModule module="Billetera" planName={plan.name} />;

  const payments = (await sql()`
    select
      pay.id,
      pay.amount::text as amount,
      pay.currency,
      pay.status,
      pay.method,
      pay.reference,
      pay.note,
      pay.paid_at,
      pl.name as plan_name
    from payments pay
    left join plans pl on pl.id = pay.plan_id
    where pay.user_id = ${session.sub}
    order by pay.paid_at desc
  `) as unknown as PaymentRow[];

  const paidTotal = payments
    .filter((p) => p.status === 'paid')
    .reduce((s, p) => s + Number(p.amount), 0);
  const pendingTotal = payments
    .filter((p) => p.status === 'pending')
    .reduce((s, p) => s + Number(p.amount), 0);

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Billetera · Historial de inversión</span>
        </div>
        <h1 className="page-h1">
          Tu <em>inversión</em> en ti.
        </h1>
        <p className="page-sub">
          Cada pago registrado por el equipo aparece aquí. Si ves algo raro,
          escríbenos por WhatsApp.
        </p>
      </div>

      <div className="wallet-kpis">
        <div className="w-kpi">
          <div className="wk-label">Total pagado</div>
          <div className="wk-val">{fmtUSD(paidTotal)}</div>
          <div className="wk-meta">{payments.filter((p) => p.status === 'paid').length} pagos confirmados</div>
        </div>
        <div className="w-kpi">
          <div className="wk-label">Pendiente</div>
          <div className="wk-val" style={{ color: pendingTotal > 0 ? 'var(--accent)' : 'var(--ink-3)' }}>
            {fmtUSD(pendingTotal)}
          </div>
          <div className="wk-meta">
            {pendingTotal > 0 ? 'Cuotas por confirmar' : 'Sin pendientes'}
          </div>
        </div>
        <div className="w-kpi accent">
          <div className="wk-label">Plan activo</div>
          <div className="wk-val">{plan.name ?? 'Sin plan'}</div>
          <div className="wk-meta">
            {plan.modules.filter((m) => m !== 'dashboard').length} módulos desbloqueados
          </div>
        </div>
      </div>

      {payments.length === 0 ? (
        <div className="wallet-empty">
          <h3>Sin pagos registrados aún.</h3>
          <p>
            El equipo de Jhana registra los pagos manualmente conforme se
            confirman. Si acabas de pagar y no ves tu pago aquí,{' '}
            <a
              href="https://wa.me/584244245783?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20mi%20billetera"
              target="_blank"
              rel="noopener noreferrer"
            >
              escríbenos por WhatsApp
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="wallet-table-wrap">
          <table className="wallet-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Concepto</th>
                <th>Método</th>
                <th>Estado</th>
                <th className="num">Monto</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="mono-cell">{fmtDate(p.paid_at)}</td>
                  <td>
                    <div className="w-concept">
                      <div className="wc-plan">{p.plan_name ?? '—'}</div>
                      {p.note && <div className="wc-note">{p.note}</div>}
                      {p.reference && (
                        <div className="wc-ref">Ref. {p.reference}</div>
                      )}
                    </div>
                  </td>
                  <td>{p.method ? METHOD_LABEL[p.method] ?? p.method : '—'}</td>
                  <td>
                    <span className={`w-status st-${p.status}`}>
                      {STATUS_LABEL[p.status]}
                    </span>
                  </td>
                  <td className="num">
                    {fmtUSD(Number(p.amount), p.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="wallet-foot">
        <span>¿Necesitas una factura o tienes preguntas sobre tu pago?</span>
        <Link
          className="btn ghost"
          href="https://wa.me/584244245783?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20mi%20billetera"
          target="_blank"
        >
          Escribir por WhatsApp
        </Link>
      </div>
    </>
  );
}
