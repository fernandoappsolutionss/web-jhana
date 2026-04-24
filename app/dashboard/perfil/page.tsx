import { readSession } from '@/lib/auth';
import { getUserPlan } from '@/lib/plans';
import { sql } from '@/lib/db';
import PerfilClient from './PerfilClient';
import './perfil.css';

export const dynamic = 'force-dynamic';

type UserRow = {
  name: string;
  email: string;
  created_at: string;
  last_login_at: string | null;
};

const ROLE_LABEL = {
  user: 'Alumna',
  coach: 'Coach',
  admin: 'Admin',
} as const;

export default async function PerfilPage() {
  const session = await readSession();
  if (!session) return null;

  const plan = await getUserPlan(session.sub);
  const rows = (await sql()`
    select name, email, created_at, last_login_at
      from users where id = ${session.sub} limit 1
  `) as unknown as UserRow[];
  const me = rows[0];

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Tu perfil</span>
        </div>
        <h1 className="page-h1">
          Hola, <em>{(me?.name ?? session.name).split(' ')[0]}</em>.
        </h1>
        <p className="page-sub">
          Aquí puedes actualizar tu nombre y cambiar tu contraseña. El correo
          solo puede modificarlo un admin.
        </p>
      </div>

      <div className="perfil-grid">
        <aside className="perfil-aside">
          <div className="pa-card">
            <div className="pa-label">Rol</div>
            <div className="pa-value">{ROLE_LABEL[session.role]}</div>
          </div>
          {session.role === 'user' && (
            <div className="pa-card">
              <div className="pa-label">Plan activo</div>
              <div className="pa-value">{plan.name ?? 'Sin plan'}</div>
              <div className="pa-meta">
                {plan.modules.filter((m) => m !== 'dashboard').length} módulos desbloqueados
              </div>
            </div>
          )}
          <div className="pa-card">
            <div className="pa-label">Correo</div>
            <div className="pa-value mono" style={{ fontSize: 13 }}>
              {me?.email ?? session.email}
            </div>
          </div>
          <div className="pa-card">
            <div className="pa-label">Miembro desde</div>
            <div className="pa-value" style={{ fontSize: 18 }}>
              {me?.created_at
                ? new Date(me.created_at).toLocaleDateString('es', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })
                : '—'}
            </div>
          </div>
        </aside>

        <section className="perfil-main">
          <PerfilClient initialName={me?.name ?? session.name} />
        </section>
      </div>
    </>
  );
}
