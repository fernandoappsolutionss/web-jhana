'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { Role } from '@/lib/auth';
import type { ModuleKey } from '@/lib/plans';

type NavItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
  module?: ModuleKey; // if set, user's plan must include this
};

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 10.5 12 3l9 7.5v9a1.5 1.5 0 0 1-1.5 1.5H4.5A1.5 1.5 0 0 1 3 19.5v-9Z" />
      <path d="M9 21v-6h6v6" />
    </svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v18H6.5A2.5 2.5 0 0 0 4 22.5v-18Z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="9" cy="8" r="4" />
      <path d="M2 22a7 7 0 0 1 14 0" />
      <circle cx="17" cy="9" r="3" />
      <path d="M22 21a5 5 0 0 0-6-5" />
    </svg>
  ),
  wallet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" />
      <path d="M3 7V5a2 2 0 0 1 2-2h12" />
      <circle cx="17" cy="13" r="1.5" fill="currentColor" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path d="M3 21h18" />
      <path d="M7 17V10" />
      <path d="M12 17V6" />
      <path d="M17 17v-5" />
    </svg>
  ),
  content: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 8h10M7 12h10M7 16h6" />
    </svg>
  ),
  coin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
};

const NAV: Record<Role, NavItem[]> = {
  user: [
    { href: '/dashboard/user',              label: 'Mi espacio',   icon: ICONS.home,   module: 'dashboard' },
    { href: '/dashboard/user/curso',        label: 'Curso',        icon: ICONS.book,   module: 'curso' },
    { href: '/dashboard/user/comunidad',    label: 'Comunidad',    icon: ICONS.users,  module: 'comunidad' },
    { href: '/dashboard/user/planificador', label: 'Planificador', icon: ICONS.chart,  module: 'planificador' },
    { href: '/dashboard/user/billetera',    label: 'Billetera',    icon: ICONS.wallet, module: 'billetera' },
  ],
  coach: [
    { href: '/dashboard/coach',             label: 'Resumen',     icon: ICONS.home },
    { href: '/dashboard/coach/alumnas',     label: 'Mis alumnas', icon: ICONS.users },
    { href: '/dashboard/user/comunidad',    label: 'Comunidad',   icon: ICONS.users },
  ],
  admin: [
    { href: '/dashboard/admin',             label: 'Resumen',   icon: ICONS.home },
    { href: '/dashboard/admin/usuarios',    label: 'Usuarios',  icon: ICONS.users },
    { href: '/dashboard/admin/contenido',   label: 'Contenido', icon: ICONS.content },
    { href: '/dashboard/admin/ingresos',    label: 'Ingresos',  icon: ICONS.coin },
    { href: '/dashboard/user/comunidad',    label: 'Comunidad', icon: ICONS.book },
  ],
};

const ROLE_LABEL: Record<Role, string> = {
  user: 'Alumna',
  coach: 'Coach',
  admin: 'Admin',
};

export default function Sidebar({
  role,
  name,
  email,
  modules,
  planName,
}: {
  role: Role;
  name: string;
  email: string;
  modules: ModuleKey[];
  planName: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const initial = (name.trim().charAt(0) || 'E').toUpperCase();

  // For alumnas: filter items whose `module` isn't in the user's plan.
  // For coach/admin: show everything their role has.
  const items =
    role === 'user'
      ? NAV.user.filter((i) => !i.module || modules.includes(i.module))
      : NAV[role];

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/');
    router.refresh();
  };

  return (
    <aside className="sidebar">
      <Link className="sb-logo" href="/">
        <span className="j">Jhana</span>
        <span className="el">El Aridi</span>
      </Link>

      <span className={`sb-role ${role}`}>
        <span className="rdot" />
        {ROLE_LABEL[role]} · Expansión 10X
      </span>

      <div className="sb-section">
        <div className="sb-section-label">Navegación</div>
        <ul className="sb-nav">
          {items.map((it) => {
            const active =
              pathname === it.href ||
              (it.href !== `/dashboard/${role}` && pathname.startsWith(it.href));
            return (
              <li key={it.href}>
                <Link
                  href={it.href}
                  className={active ? 'active' : undefined}
                  aria-current={active ? 'page' : undefined}
                >
                  {it.icon}
                  <span>{it.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {role === 'user' && planName && (
        <div className="sb-plan">
          <div className="sp-label">Tu plan activo</div>
          <div className="sp-title">{planName}</div>
          <div className="sp-meta">
            {modules.filter((m) => m !== 'dashboard').length} módulos activos
          </div>
        </div>
      )}

      <Link className="sb-user" href="/dashboard/perfil" title="Editar perfil">
        <div className="avatar">{initial}</div>
        <div className="who">
          <div className="name">{name}</div>
          <div className="role">{email}</div>
        </div>
      </Link>
      <button
        type="button"
        className="sb-logout"
        onClick={handleLogout}
        aria-label="Cerrar sesión"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
          <path d="M10 17l-5-5 5-5" />
          <path d="M15 12H5" />
        </svg>
        <span>Cerrar sesión</span>
      </button>
    </aside>
  );
}
