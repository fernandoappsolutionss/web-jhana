import Link from 'next/link';
import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';
import { sql } from '@/lib/db';
import './user.css';

type Count = { count: string };
type LatestSnap = { net_worth: string; recorded_at: string } | undefined;
type FirstSnap = { net_worth: string } | undefined;

export default async function UserDashboardPage() {
  const session = await readSession();
  if (!session) return null;

  const plan = await getUserPlan(session.sub);
  const firstName = session.name.split(' ')[0] ?? '';

  const db = sql();
  const [lessonsDone, totalLessons, latestSnap, firstSnap] = (await Promise.all([
    db`select count(*)::text as count from lesson_progress where user_id = ${session.sub}`,
    db`select count(*)::text as count from lessons l join course_modules m on m.id = l.module_id where m.published = true`,
    db`select net_worth::text, recorded_at from planner_snapshots where user_id = ${session.sub} order by recorded_at desc limit 1`,
    db`select net_worth::text from planner_snapshots where user_id = ${session.sub} order by recorded_at asc limit 1`,
  ])) as unknown as [Count[], Count[], LatestSnap[], FirstSnap[]];

  const done = Number(lessonsDone[0]?.count ?? 0);
  const total = Number(totalLessons[0]?.count ?? 0);
  const progressPct = total > 0 ? Math.round((done / total) * 100) : 0;

  const latest = latestSnap[0];
  const first = firstSnap[0];
  const growthPct =
    latest && first && Number(first.net_worth) > 0
      ? Math.round(((Number(latest.net_worth) - Number(first.net_worth)) / Number(first.net_worth)) * 100)
      : null;

  const today = new Date().toLocaleDateString('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <>
      <div className="user-welcome">
        <div>
          <div className="eyebrow">
            <span className="bar" />
            <span>Tu espacio · Expansión 10X</span>
          </div>
          <h1 className="welcome-h1">
            Hola, <em>{firstName || 'bienvenida'}</em>.
          </h1>
          <p className="welcome-sub">
            Plan activo: <strong>{plan.name ?? 'Acceso libre'}</strong>. Aquí
            ves tu progreso en el curso, tu riqueza acumulada y los módulos
            abiertos hoy.
          </p>
        </div>
        <div className="today-card">
          <div className="day">{today}</div>
          <div className="q">
            &ldquo;La abundancia no se persigue,<br />se <em>sostiene</em> desde adentro.&rdquo;
          </div>
          <div className="sig">— Jhana</div>
        </div>
      </div>

      {/* Hero row: riqueza + curso progress */}
      <div className="user-hero">
        <div className="wealth">
          <div className="wl-label">Riqueza registrada · Planificador</div>
          {latest ? (
            <>
              <h2>
                <em>${Number(latest.net_worth).toLocaleString('en-US')}</em>
              </h2>
              <div className="wl-sub">
                Última actualización:{' '}
                {new Date(latest.recorded_at).toLocaleDateString('es', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
              {growthPct !== null && growthPct !== 0 && (
                <div className="wl-growth">
                  {growthPct > 0 ? '▲' : '▼'} {growthPct}% desde tu primer registro
                </div>
              )}
            </>
          ) : (
            <>
              <h2>Sin registro <em>aún</em>.</h2>
              <div className="wl-sub">
                Agrega tu primer snapshot en el planificador — la primera
                medición es tu punto de partida.
              </div>
            </>
          )}
          <div className="wl-foot">
            <Link href="/dashboard/user/planificador" className="btn-wl">
              Ir al planificador →
            </Link>
          </div>
        </div>

        <div className="course-prog">
          <div className="ch">
            <div className="cmod">Progreso del curso</div>
            <h3>
              {done} de {total} <em>lecciones</em>.
            </h3>
            <div className="pbar"><span style={{ width: `${progressPct}%` }} /></div>
            <div className="pct">
              <span>{progressPct}% completado</span>
              <span>{total - done} restantes</span>
            </div>
          </div>
          <div className="cfoot">
            <Link href="/dashboard/user/curso">Continuar el curso →</Link>
          </div>
        </div>
      </div>

      {/* Shortcuts to available modules */}
      <div className="shortcuts">
        {plan.modules.includes('curso') && (
          <Link href="/dashboard/user/curso" className="sc">
            <div className="sc-idx">— 01</div>
            <div className="sc-title">Curso <em>Expansión</em></div>
            <div className="sc-desc">12 semanas · 12 módulos · el método completo</div>
            <div className="sc-meta"><span>{done}/{total}</span><span className="arr">→</span></div>
          </Link>
        )}
        {plan.modules.includes('planificador') && (
          <Link href="/dashboard/user/planificador" className="sc">
            <div className="sc-idx">— 02</div>
            <div className="sc-title">Planificador <em>financiero</em></div>
            <div className="sc-desc">Registra tu riqueza semanal y ve el progreso</div>
            <div className="sc-meta"><span>Abierto</span><span className="arr">→</span></div>
          </Link>
        )}
        {plan.modules.includes('comunidad') && (
          <Link href="/dashboard/user/comunidad" className="sc">
            <div className="sc-idx">— 03</div>
            <div className="sc-title"><em>Comunidad</em> privada</div>
            <div className="sc-desc">Conecta con tu cohorte y las egresadas</div>
            <div className="sc-meta"><span>Entra</span><span className="arr">→</span></div>
          </Link>
        )}
        {plan.modules.includes('billetera') && (
          <Link href="/dashboard/user/billetera" className="sc">
            <div className="sc-idx">— 04</div>
            <div className="sc-title"><em>Billetera</em> · inversión</div>
            <div className="sc-desc">Historial de pagos, cuotas y estado</div>
            <div className="sc-meta"><span>Ver</span><span className="arr">→</span></div>
          </Link>
        )}
      </div>

      {plan.modules.length === 1 && (
        <div className="upgrade-nudge">
          <div>
            <div className="un-tag">— Tu plan actual</div>
            <h4>
              Estás en <strong>{plan.name ?? 'Acceso libre'}</strong>. Para
              activar curso, comunidad, planificador y billetera, entra a
              Expansión 10X.
            </h4>
          </div>
          <a
            className="btn primary"
            href="https://wa.me/584244245783?text=Hola%20Jhana%2C%20quiero%20activar%20Expansi%C3%B3n%2010X"
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribir por WhatsApp
          </a>
        </div>
      )}
    </>
  );
}
