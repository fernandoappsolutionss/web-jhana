'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export type Snapshot = {
  id: string;
  recorded_at: string;
  net_worth: number;
  income: number | null;
  savings: number | null;
  investments: number | null;
  debts: number | null;
  notes: string | null;
};

const fmtUSD = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const fmtDate = (iso: string) =>
  new Date(iso + 'T00:00:00').toLocaleDateString('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

// Build an SVG path for the line chart
function buildChart(snapshots: Snapshot[], w = 800, h = 220) {
  if (snapshots.length === 0) return { path: '', area: '', points: [] as { x: number; y: number; s: Snapshot }[] };

  const values = snapshots.map((s) => s.net_worth);
  const max = Math.max(...values);
  const min = Math.min(0, ...values);
  const range = Math.max(max - min, 1);
  const PAD = 32;

  const points = snapshots.map((s, i) => {
    const x =
      snapshots.length === 1
        ? w / 2
        : PAD + (i * (w - PAD * 2)) / (snapshots.length - 1);
    const y = h - PAD - ((s.net_worth - min) / range) * (h - PAD * 2);
    return { x, y, s };
  });

  const path = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(' ');

  const area =
    points.length > 0
      ? `${path} L ${points[points.length - 1].x.toFixed(1)} ${h - PAD} L ${points[0].x.toFixed(1)} ${h - PAD} Z`
      : '';

  return { path, area, points };
}

export default function PlannerClient({
  initialSnapshots,
}: {
  initialSnapshots: Snapshot[];
}) {
  const router = useRouter();
  const [snapshots, setSnapshots] = useState(initialSnapshots);
  const [showForm, setShowForm] = useState(initialSnapshots.length === 0);
  const [pending, startTransition] = useTransition();

  const [recordedAt, setRecordedAt] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [netWorth, setNetWorth] = useState('');
  const [income, setIncome] = useState('');
  const [savings, setSavings] = useState('');
  const [investments, setInvestments] = useState('');
  const [debts, setDebts] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState<string | null>(null);

  const latest = snapshots[snapshots.length - 1];
  const first = snapshots[0];
  const growth = latest && first && first.net_worth > 0
    ? (latest.net_worth - first.net_worth) / first.net_worth
    : null;
  const absGrowth = latest && first ? latest.net_worth - first.net_worth : null;

  const chart = buildChart(snapshots);

  const reset = () => {
    setNetWorth('');
    setIncome('');
    setSavings('');
    setInvestments('');
    setDebts('');
    setNotes('');
    setRecordedAt(new Date().toISOString().slice(0, 10));
    setError(null);
  };

  const toNum = (v: string) => (v.trim() === '' ? null : Number(v));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const nw = toNum(netWorth);
    if (nw === null || Number.isNaN(nw)) {
      setError('Ingresa tu patrimonio total (Net Worth).');
      return;
    }

    const payload = {
      recorded_at: recordedAt,
      net_worth: nw,
      income: toNum(income),
      savings: toNum(savings),
      investments: toNum(investments),
      debts: toNum(debts),
      notes: notes.trim() || null,
    };

    try {
      const res = await fetch('/api/planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        error?: string;
        snapshot?: Snapshot;
      };
      if (!res.ok || !data.ok || !data.snapshot) {
        setError(data.error ?? 'No pudimos guardar el registro.');
        return;
      }
      const next = [...snapshots.filter((s) => s.recorded_at !== data.snapshot!.recorded_at), data.snapshot!]
        .sort((a, b) => a.recorded_at.localeCompare(b.recorded_at));
      setSnapshots(next);
      reset();
      setShowForm(false);
      startTransition(() => router.refresh());
    } catch {
      setError('Problema de conexión. Inténtalo de nuevo.');
    }
  };

  return (
    <>
      {/* Big KPI row */}
      <div className="planner-kpis">
        <div className="kpi">
          <div className="k-label">Patrimonio actual</div>
          <div className="k-val">{latest ? fmtUSD(latest.net_worth) : '—'}</div>
          <div className="k-meta">
            {latest ? `Actualizado ${fmtDate(latest.recorded_at)}` : 'Sin registros aún'}
          </div>
        </div>
        <div className="kpi">
          <div className="k-label">Primer registro</div>
          <div className="k-val">{first ? fmtUSD(first.net_worth) : '—'}</div>
          <div className="k-meta">
            {first ? fmtDate(first.recorded_at) : 'Empieza hoy'}
          </div>
        </div>
        <div className="kpi accent">
          <div className="k-label">Crecimiento total</div>
          <div className="k-val">
            {growth === null ? '—' : `${growth >= 0 ? '+' : ''}${(growth * 100).toFixed(1)}%`}
          </div>
          <div className="k-meta">
            {absGrowth !== null
              ? `${absGrowth >= 0 ? '+' : ''}${fmtUSD(absGrowth)}`
              : 'Necesitas 2+ registros'}
          </div>
        </div>
        <div className="kpi">
          <div className="k-label">Snapshots guardados</div>
          <div className="k-val">{snapshots.length}</div>
          <div className="k-meta">Ideal: 1 por semana</div>
        </div>
      </div>

      {/* Chart + Form */}
      <div className="planner-hero">
        <div className="chart-card">
          <div className="ch-head">
            <div>
              <div className="mono">Evolución de tu riqueza</div>
              <h3>
                De <em>inicio</em> hasta <em>hoy</em>.
              </h3>
            </div>
            {!showForm && (
              <button
                type="button"
                className="btn primary"
                onClick={() => setShowForm(true)}
              >
                + Nuevo snapshot
              </button>
            )}
          </div>

          {snapshots.length === 0 ? (
            <div className="chart-empty">
              Sin datos todavía. Agrega tu primer registro — es el 0 desde el
              que mides tu expansión.
            </div>
          ) : (
            <svg className="chart" viewBox="0 0 800 220" preserveAspectRatio="none">
              <defs>
                <linearGradient id="wealth-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(63,107,75,.3)" />
                  <stop offset="100%" stopColor="rgba(63,107,75,0)" />
                </linearGradient>
              </defs>
              <path d={chart.area} fill="url(#wealth-grad)" />
              <path d={chart.path} stroke="#3F6B4B" strokeWidth="2" fill="none" strokeLinejoin="round" />
              {chart.points.map((p) => (
                <circle
                  key={p.s.id}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  fill="#FBFBF7"
                  stroke="#3F6B4B"
                  strokeWidth="2"
                >
                  <title>
                    {fmtDate(p.s.recorded_at)}: {fmtUSD(p.s.net_worth)}
                  </title>
                </circle>
              ))}
            </svg>
          )}
        </div>

        {showForm && (
          <div className="form-card">
            <div className="fc-head">
              <div>
                <div className="mono">Nuevo snapshot</div>
                <h3>Registra <em>hoy</em></h3>
              </div>
              {snapshots.length > 0 && (
                <button
                  type="button"
                  className="btn ghost"
                  onClick={() => {
                    setShowForm(false);
                    reset();
                  }}
                >
                  Cancelar
                </button>
              )}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="grid-2">
                <div className="field">
                  <label htmlFor="p-date">Fecha</label>
                  <input
                    id="p-date"
                    type="date"
                    required
                    value={recordedAt}
                    onChange={(e) => setRecordedAt(e.target.value)}
                  />
                </div>
                <div className="field">
                  <label htmlFor="p-nw">Patrimonio total (USD) *</label>
                  <input
                    id="p-nw"
                    type="number"
                    step="0.01"
                    required
                    placeholder="Ej. 5800"
                    value={netWorth}
                    onChange={(e) => setNetWorth(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid-2">
                <div className="field">
                  <label htmlFor="p-inc">Ingresos del mes</label>
                  <input id="p-inc" type="number" step="0.01" placeholder="Opcional" value={income} onChange={(e) => setIncome(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="p-sav">Ahorros líquidos</label>
                  <input id="p-sav" type="number" step="0.01" placeholder="Opcional" value={savings} onChange={(e) => setSavings(e.target.value)} />
                </div>
              </div>

              <div className="grid-2">
                <div className="field">
                  <label htmlFor="p-inv">Inversiones / Fondo de Libertad</label>
                  <input id="p-inv" type="number" step="0.01" placeholder="Opcional" value={investments} onChange={(e) => setInvestments(e.target.value)} />
                </div>
                <div className="field">
                  <label htmlFor="p-deb">Deudas</label>
                  <input id="p-deb" type="number" step="0.01" placeholder="Opcional" value={debts} onChange={(e) => setDebts(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label htmlFor="p-notes">Notas (privadas)</label>
                <textarea
                  id="p-notes"
                  placeholder="Cómo te sentiste al registrarlo, qué cambió, qué decisión tomaste…"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {error && <div className="form-err" role="alert">{error}</div>}

              <button type="submit" className="btn primary" disabled={pending}>
                Guardar snapshot →
              </button>
            </form>
          </div>
        )}
      </div>

      {/* History */}
      {snapshots.length > 0 && (
        <div className="history">
          <div className="hist-head">
            <h3>Historial</h3>
            <span className="mono">{snapshots.length} registros</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Patrimonio</th>
                  <th>Ingresos</th>
                  <th>Ahorros</th>
                  <th>Inversiones</th>
                  <th>Deudas</th>
                </tr>
              </thead>
              <tbody>
                {[...snapshots].reverse().map((s) => (
                  <tr key={s.id}>
                    <td className="mono-cell">{fmtDate(s.recorded_at)}</td>
                    <td className="num strong">{fmtUSD(s.net_worth)}</td>
                    <td className="num">{s.income !== null ? fmtUSD(s.income) : '—'}</td>
                    <td className="num">{s.savings !== null ? fmtUSD(s.savings) : '—'}</td>
                    <td className="num">{s.investments !== null ? fmtUSD(s.investments) : '—'}</td>
                    <td className="num">{s.debts !== null ? fmtUSD(s.debts) : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
