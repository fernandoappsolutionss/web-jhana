import { readSession } from '@/lib/auth';
import { sql } from '@/lib/db';

type CountRow = { count: string };

export default async function AdminDashboardPage() {
  const session = await readSession();

  let userCount = 0;
  let coachCount = 0;
  let adminCount = 0;
  let last7d = 0;

  try {
    const db = sql();
    const [total, coaches, admins, recent] = (await Promise.all([
      db`select count(*)::text as count from users where role = 'user'`,
      db`select count(*)::text as count from users where role = 'coach'`,
      db`select count(*)::text as count from users where role = 'admin'`,
      db`select count(*)::text as count from users where created_at > now() - interval '7 days'`,
    ])) as unknown as CountRow[][];
    userCount = Number(total[0]?.count ?? 0);
    coachCount = Number(coaches[0]?.count ?? 0);
    adminCount = Number(admins[0]?.count ?? 0);
    last7d = Number(recent[0]?.count ?? 0);
  } catch {
    // DB not available — show zeros, dashboard still renders.
  }

  const firstName = session?.name.split(' ')[0] ?? '';

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Admin · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          Hola <em>{firstName}</em>.
        </h1>
        <p className="page-sub">
          Resumen general de la plataforma. Usuarios, coaches, ingresos y
          contenido — todo vivirá aquí.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 40 }}>
        <StatCard label="Alumnas" value={userCount} />
        <StatCard label="Coaches" value={coachCount} />
        <StatCard label="Administradores" value={adminCount} />
        <StatCard label="Nuevas (últ. 7 días)" value={last7d} accent />
      </div>

      <div className="construccion">
        <div className="tag">— Próximamente</div>
        <h3>
          Panel completo de <em>administración</em>.
        </h3>
        <p>
          Gestor de contenido (subir cursos y videos), reportes de ingresos,
          edición de usuarios y asignación de coaches. En la próxima iteración.
        </p>
      </div>
    </>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="card" style={{ padding: 22 }}>
      <div className="mono" style={{ color: 'var(--ink-3)', marginBottom: 6 }}>
        {label}
      </div>
      <div
        style={{
          fontFamily: "'Fraunces',serif",
          fontWeight: 300,
          fontSize: 42,
          letterSpacing: '-.02em',
          color: accent ? 'var(--clay)' : 'var(--ink)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
    </div>
  );
}
