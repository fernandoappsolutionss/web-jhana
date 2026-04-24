'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export type PaymentRow = {
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

export type UserOption = { id: string; name: string; email: string };
export type PlanOption = { id: string; slug: string; name: string; price_usd: string | null };

const STATUS_LABEL: Record<PaymentRow['status'], string> = {
  paid: 'Pagado',
  pending: 'Pendiente',
  refunded: 'Reembolsado',
  failed: 'Fallido',
};

function fmtUSD(n: number, currency = 'USD') {
  return n.toLocaleString('en-US', { style: 'currency', currency, maximumFractionDigits: 2 });
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

export default function IngresosClient({
  initialPayments,
  users,
  plans,
}: {
  initialPayments: PaymentRow[];
  users: UserOption[];
  plans: PlanOption[];
}) {
  const router = useRouter();
  const [payments, setPayments] = useState(initialPayments);
  const [showForm, setShowForm] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const [userId, setUserId] = useState('');
  const [planId, setPlanId] = useState('');
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('zelle');
  const [reference, setReference] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<PaymentRow['status']>('paid');
  const [paidAt, setPaidAt] = useState(new Date().toISOString().slice(0, 10));
  const [error, setError] = useState<string | null>(null);

  const notify = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 2000);
  };

  const reset = () => {
    setUserId('');
    setPlanId('');
    setAmount('');
    setMethod('zelle');
    setReference('');
    setNote('');
    setStatus('paid');
    setPaidAt(new Date().toISOString().slice(0, 10));
    setError(null);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!userId) { setError('Selecciona una alumna.'); return; }
    const amt = Number(amount);
    if (!amt || amt <= 0) { setError('Monto inválido.'); return; }

    try {
      const res = await fetch('/api/admin/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          plan_id: planId || null,
          amount: amt,
          method,
          reference: reference.trim() || null,
          note: note.trim() || null,
          status,
          paid_at: paidAt,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        payment?: PaymentRow;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.payment) {
        setError(data.error ?? 'No pudimos guardar el pago.');
        return;
      }
      setPayments([data.payment, ...payments]);
      reset();
      setShowForm(false);
      notify('✓ Pago registrado');
      startTransition(() => router.refresh());
    } catch {
      setError('Problema de conexión.');
    }
  };

  const updateStatus = async (id: string, newStatus: PaymentRow['status']) => {
    const prev = payments;
    setPayments(payments.map((p) => (p.id === id ? { ...p, status: newStatus } : p)));
    try {
      const res = await fetch('/api/admin/payments', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (!res.ok) throw new Error();
      notify('✓ Estado actualizado');
      startTransition(() => router.refresh());
    } catch {
      setPayments(prev); // revert
      notify('Error al actualizar');
    }
  };

  return (
    <div className="ingresos">
      {flash && <div className={`flash ${flash.startsWith('✓') ? 'ok' : 'err'}`}>{flash}</div>}

      <div className="ing-toolbar">
        <h3>Pagos recientes</h3>
        <button
          type="button"
          className="btn primary"
          onClick={() => setShowForm((s) => !s)}
        >
          {showForm ? 'Cancelar' : '+ Registrar pago'}
        </button>
      </div>

      {showForm && (
        <form className="pay-form" onSubmit={submit}>
          <div className="pf-grid">
            <div className="pf-field">
              <label>Alumna *</label>
              <select required value={userId} onChange={(e) => setUserId(e.target.value)}>
                <option value="">— selecciona —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name} · {u.email}
                  </option>
                ))}
              </select>
            </div>
            <div className="pf-field">
              <label>Plan</label>
              <select value={planId} onChange={(e) => {
                const id = e.target.value;
                setPlanId(id);
                if (id) {
                  const p = plans.find((x) => x.id === id);
                  if (p?.price_usd && !amount) setAmount(p.price_usd);
                }
              }}>
                <option value="">— opcional —</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="pf-field">
              <label>Monto (USD) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                placeholder="2500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="pf-field">
              <label>Método</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="zelle">Zelle</option>
                <option value="transfer">Transferencia</option>
                <option value="paypal">PayPal</option>
                <option value="card">Tarjeta</option>
                <option value="cash">Efectivo</option>
                <option value="manual">Registro manual</option>
              </select>
            </div>
            <div className="pf-field">
              <label>Estado</label>
              <select value={status} onChange={(e) => setStatus(e.target.value as PaymentRow['status'])}>
                <option value="paid">Pagado</option>
                <option value="pending">Pendiente</option>
                <option value="refunded">Reembolsado</option>
                <option value="failed">Fallido</option>
              </select>
            </div>
            <div className="pf-field">
              <label>Fecha</label>
              <input type="date" value={paidAt} onChange={(e) => setPaidAt(e.target.value)} />
            </div>
            <div className="pf-field">
              <label>Referencia</label>
              <input type="text" placeholder="Ej. TX-12345" value={reference} onChange={(e) => setReference(e.target.value)} />
            </div>
            <div className="pf-field wide">
              <label>Nota</label>
              <input type="text" placeholder="Ej. Primera cuota de 3" value={note} onChange={(e) => setNote(e.target.value)} />
            </div>
          </div>

          {error && <div className="pf-err">{error}</div>}

          <div className="pf-actions">
            <button type="button" className="btn ghost" onClick={() => { setShowForm(false); reset(); }}>
              Cancelar
            </button>
            <button type="submit" className="btn primary">
              Guardar pago →
            </button>
          </div>
        </form>
      )}

      {payments.length === 0 ? (
        <div className="ing-empty">Sin pagos registrados todavía.</div>
      ) : (
        <div className="ing-table-wrap">
          <table className="ing-table">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Alumna</th>
                <th>Plan</th>
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
                    <div className="pay-user">
                      <div className="pu-name">{p.user_name}</div>
                      <div className="pu-email">{p.user_email}</div>
                      {p.note && <div className="pu-note">{p.note}</div>}
                    </div>
                  </td>
                  <td>{p.plan_name ?? '—'}</td>
                  <td>{p.method ?? '—'}</td>
                  <td>
                    <select
                      className={`st-sel st-${p.status}`}
                      value={p.status}
                      onChange={(e) => updateStatus(p.id, e.target.value as PaymentRow['status'])}
                    >
                      {(['paid', 'pending', 'refunded', 'failed'] as const).map((s) => (
                        <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                      ))}
                    </select>
                  </td>
                  <td className="num">{fmtUSD(Number(p.amount), p.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
