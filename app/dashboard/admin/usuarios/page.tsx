import { requireAdminPage } from '@/lib/admin';
import { sql } from '@/lib/db';
import UsersTable, { type AdminUser, type PlanOption, type CoachOption } from './UsersTable';
import './users.css';

export const dynamic = 'force-dynamic';

export default async function AdminUsersPage() {
  await requireAdminPage();

  const db = sql();
  const [users, plans, coaches] = (await Promise.all([
    db`
      select
        u.id, u.email, u.name, u.role,
        p.slug as plan_slug,
        u.coach_id,
        c.name as coach_name,
        u.created_at,
        u.last_login_at
      from users u
      left join plans p on p.id = u.plan_id
      left join users c on c.id = u.coach_id
      order by u.created_at desc
    `,
    db`select slug, name, tier from plans where active = true order by price_usd nulls first`,
    db`select id, name from users where role = 'coach' order by name asc`,
  ])) as unknown as [AdminUser[], PlanOption[], CoachOption[]];

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Admin · Gestión de usuarios</span>
        </div>
        <h1 className="page-h1">
          <em>Usuarios</em> · {users.length}
        </h1>
        <p className="page-sub">
          Cambia el rol (alumna / coach / admin), asigna un plan y conecta
          alumnas con su coach. Los cambios se aplican al instante.
        </p>
      </div>

      <UsersTable initialUsers={users} plans={plans} coaches={coaches} />
    </>
  );
}
