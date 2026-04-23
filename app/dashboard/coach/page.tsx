import { readSession } from '@/lib/auth';
import { sql } from '@/lib/db';
import './coach.css';

type AssignedRow = {
  id: string;
  name: string;
  email: string;
  plan_name: string | null;
  plan_tier: string | null;
  last_login_at: string | null;
  created_at: string;
};

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default async function CoachDashboardPage() {
  const session = await readSession();
  if (!session) return null;

  const firstName = session.name.split(' ')[0] ?? '';

  let assigned: AssignedRow[] = [];
  try {
    assigned = (await sql()`
      select
        u.id, u.name, u.email,
        p.name as plan_name,
        p.tier as plan_tier,
        u.last_login_at,
        u.created_at
      from users u
      left join plans p on p.id = u.plan_id
      where u.coach_id = ${session.sub}
        and u.role = 'user'
      order by u.created_at desc
    `) as unknown as AssignedRow[];
  } catch {
    // DB error — show empty state instead of crashing
  }

  const activeThisWeek = assigned.filter(
    (a) =>
      a.last_login_at &&
      new Date(a.last_login_at) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Coach · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          Hola coach <em>{firstName}</em>.
        </h1>
        <p className="page-sub">
          Estas son las alumnas que tienes asignadas. Verás su plan activo y
          su último acceso — para saber a quién sostener esta semana.
        </p>
      </div>

      <div className="coach-stats">
        <div className="cs-card">
          <div className="cs-label">Alumnas asignadas</div>
          <div className="cs-val">{assigned.length}</div>
        </div>
        <div className="cs-card">
          <div className="cs-label">Activas últ. 7 días</div>
          <div className="cs-val" style={{ color: 'var(--clay)' }}>
            {activeThisWeek}
          </div>
        </div>
        <div className="cs-card">
          <div className="cs-label">Sin acceso aún</div>
          <div className="cs-val" style={{ color: 'var(--accent)' }}>
            {assigned.filter((a) => !a.last_login_at).length}
          </div>
        </div>
      </div>

      {assigned.length === 0 ? (
        <div className="construccion">
          <div className="tag">— Sin alumnas asignadas aún</div>
          <h3>
            Cuando el admin te <em>asigne</em> alumnas, aparecerán aquí.
          </h3>
          <p>
            Verás su plan activo, último acceso y (en la próxima iteración)
            su progreso en el curso y planificador.
          </p>
        </div>
      ) : (
        <div className="coach-table-wrap">
          <table className="coach-table">
            <thead>
              <tr>
                <th>Alumna</th>
                <th>Plan</th>
                <th>Último acceso</th>
                <th>Se registró</th>
              </tr>
            </thead>
            <tbody>
              {assigned.map((a) => {
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
                    <td className="mono-cell">{fmtDate(a.last_login_at)}</td>
                    <td className="mono-cell">{fmtDate(a.created_at)}</td>
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
