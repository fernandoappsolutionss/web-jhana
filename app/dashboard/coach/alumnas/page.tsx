import { readSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import '../coach.css';

export const dynamic = 'force-dynamic';

type AlumnaRow = {
  id: string;
  name: string;
  email: string;
  plan_name: string | null;
  plan_tier: string | null;
  last_login_at: string | null;
  created_at: string;
  lessons_done: string;
  total_lessons: string;
  latest_snapshot_value: string | null;
  first_snapshot_value: string | null;
};

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es', { year: 'numeric', month: 'short', day: '2-digit' });
}
function fmtUSD(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default async function CoachAlumnasDetailPage() {
  const session = await readSession();
  if (!session) return null;

  const rows = (await sql()`
    with total_lessons as (
      select count(*)::text as total
        from lessons l
        join course_modules m on m.id = l.module_id
       where m.published = true
    )
    select
      u.id, u.name, u.email,
      p.name as plan_name,
      p.tier as plan_tier,
      u.last_login_at,
      u.created_at,
      (select count(*)::text
         from lesson_progress lp
         join lessons l on l.id = lp.lesson_id
         join course_modules m on m.id = l.module_id
        where lp.user_id = u.id and m.published = true) as lessons_done,
      (select total from total_lessons) as total_lessons,
      (select net_worth::text from planner_snapshots where user_id = u.id order by recorded_at desc limit 1) as latest_snapshot_value,
      (select net_worth::text from planner_snapshots where user_id = u.id order by recorded_at asc limit 1) as first_snapshot_value
    from users u
    left join plans p on p.id = u.plan_id
    where u.coach_id = ${session.sub}
      and u.role = 'user'
    order by u.created_at desc
  `) as unknown as AlumnaRow[];

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Coach · Mis alumnas</span>
        </div>
        <h1 className="page-h1">
          Tus <em>alumnas</em> en detalle.
        </h1>
        <p className="page-sub">
          Progreso del curso, último patrimonio registrado y tendencia de
          riqueza. Es el mapa para decidir a quién tocar esta semana.
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="construccion">
          <div className="tag">— Sin alumnas asignadas aún</div>
          <h3>
            Cuando el admin te <em>asigne</em> alumnas, aparecerán aquí.
          </h3>
          <p>
            Verás su progreso en el curso y el crecimiento de su Fondo de
            Libertad.
          </p>
        </div>
      ) : (
        <div className="coach-table-wrap">
          <table className="coach-table">
            <thead>
              <tr>
                <th>Alumna</th>
                <th>Plan</th>
                <th>Progreso curso</th>
                <th>Riqueza actual</th>
                <th>Crecimiento</th>
                <th>Último acceso</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => {
                const done = Number(a.lessons_done);
                const total = Number(a.total_lessons);
                const pct = total > 0 ? Math.round((done / total) * 100) : 0;
                const latest = a.latest_snapshot_value ? Number(a.latest_snapshot_value) : null;
                const first = a.first_snapshot_value ? Number(a.first_snapshot_value) : null;
                const growthPct =
                  latest !== null && first !== null && first > 0
                    ? Math.round(((latest - first) / first) * 100)
                    : null;
                const initial = (a.name.trim().charAt(0) || '?').toUpperCase();
                return (
                  <tr key={a.id}>
                    <td>
                      <div className="who">
                        <div className="av">{initial}</div>
                        <div>
                          <div className="nm">{a.name}</div>
                          <div className="em">{a.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {a.plan_name ? (
                        <span className={`chip tier-${a.plan_tier ?? 'free'}`}>
                          {a.plan_name}
                        </span>
                      ) : (
                        <span className="chip ghost">— sin plan —</span>
                      )}
                    </td>
                    <td>
                      <div className="progress-cell">
                        <div className="b"><span style={{ width: `${pct}%` }} /></div>
                        <div className="val">{pct}% · {done}/{total}</div>
                      </div>
                    </td>
                    <td className="num">{latest !== null ? fmtUSD(latest) : '—'}</td>
                    <td>
                      {growthPct !== null ? (
                        <span className={growthPct >= 0 ? 'trend-up' : 'trend-down'}>
                          {growthPct >= 0 ? '▲' : '▼'} {Math.abs(growthPct)}%
                        </span>
                      ) : (
                        <span style={{ color: 'var(--ink-3)' }}>—</span>
                      )}
                    </td>
                    <td className="mono-cell">{fmtDate(a.last_login_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
