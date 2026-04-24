'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'coach' | 'admin';
  plan_slug: string | null;
  coach_id: string | null;
  coach_name: string | null;
  created_at: string;
  last_login_at: string | null;
};

export type PlanOption = { slug: string; name: string; tier: string };
export type CoachOption = { id: string; name: string };

function fmtDate(iso: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('es', { year: 'numeric', month: 'short', day: '2-digit' });
}

export default function UsersTable({
  initialUsers,
  plans,
  coaches,
}: {
  initialUsers: AdminUser[];
  plans: PlanOption[];
  coaches: CoachOption[];
}) {
  const router = useRouter();
  const [users, setUsers] = useState(initialUsers);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();
  const [flash, setFlash] = useState<string | null>(null);
  const [showCreate, setShowCreate] = useState(false);

  // Create form state
  const [cName, setCName] = useState('');
  const [cEmail, setCEmail] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [cRole, setCRole] = useState<AdminUser['role']>('user');
  const [cPlan, setCPlan] = useState<string>('');
  const [cCoach, setCCoach] = useState<string>('');
  const [cError, setCError] = useState<string | null>(null);
  const [cPending, setCPending] = useState(false);

  const resetCreate = () => {
    setCName(''); setCEmail(''); setCPassword('');
    setCRole('user'); setCPlan(''); setCCoach('');
    setCError(null);
  };

  const genPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let s = '';
    const arr = crypto.getRandomValues(new Uint8Array(14));
    for (const b of arr) s += chars[b % chars.length];
    setCPassword(s);
  };

  const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCError(null);
    setCPending(true);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cName.trim(),
          email: cEmail.trim().toLowerCase(),
          password: cPassword,
          role: cRole,
          plan_slug: cRole === 'user' ? (cPlan || null) : null,
          coach_id: cRole === 'user' ? (cCoach || null) : null,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        user?: AdminUser;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.user) {
        setCError(data.error ?? 'No pudimos crear el usuario.');
        return;
      }
      setUsers([data.user, ...users]);
      setFlash('✓ Usuario creado');
      setTimeout(() => setFlash(null), 2000);
      resetCreate();
      setShowCreate(false);
      startTransition(() => router.refresh());
    } catch {
      setCError('Problema de conexión.');
    } finally {
      setCPending(false);
    }
  };

  const patch = async (
    id: string,
    patch: Partial<{ role: AdminUser['role']; plan_slug: string | null; coach_id: string | null }>
  ) => {
    setSavingId(id);
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setFlash(data.error ?? 'Error al guardar');
        setTimeout(() => setFlash(null), 3000);
        // Revert: re-fetch from server to restore correct state
        startTransition(() => router.refresh());
        return;
      }
      setFlash('✓ Guardado');
      setTimeout(() => setFlash(null), 1500);
      startTransition(() => router.refresh());
    } catch {
      setFlash('Problema de conexión');
      setTimeout(() => setFlash(null), 3000);
    } finally {
      setSavingId(null);
    }
  };

  const updateRow = (id: string, patch: Partial<AdminUser>) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...patch } : u)));
  };

  return (
    <div className="admin-users">
      {flash && <div className={`flash ${flash.startsWith('✓') ? 'ok' : 'err'}`}>{flash}</div>}

      <div className="users-toolbar">
        <span className="mono">{users.length} usuarios en total</span>
        <button
          type="button"
          className="btn primary"
          onClick={() => setShowCreate((s) => !s)}
        >
          {showCreate ? 'Cancelar' : '+ Crear usuario'}
        </button>
      </div>

      {showCreate && (
        <form className="create-form" onSubmit={createUser}>
          <div className="cf-header">
            <div>
              <div className="mono">Nuevo usuario</div>
              <h3>Crear una <em>cuenta</em></h3>
            </div>
            <p className="cf-note">
              El usuario recibirá estos datos para entrar. Puedes cambiar su rol,
              plan o coach después.
            </p>
          </div>

          <div className="cf-grid">
            <div className="cf-field">
              <label htmlFor="cf-name">Nombre completo *</label>
              <input
                id="cf-name" type="text" required placeholder="Ej. María Pérez"
                value={cName} onChange={(e) => setCName(e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-email">Correo electrónico *</label>
              <input
                id="cf-email" type="email" required placeholder="tu@correo.com"
                value={cEmail} onChange={(e) => setCEmail(e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-pw">
                Contraseña *
                <button
                  type="button"
                  className="gen-btn"
                  onClick={genPassword}
                  tabIndex={-1}
                >
                  generar
                </button>
              </label>
              <input
                id="cf-pw" type="text" required minLength={8}
                placeholder="Mínimo 8 caracteres"
                value={cPassword} onChange={(e) => setCPassword(e.target.value)}
              />
            </div>
            <div className="cf-field">
              <label htmlFor="cf-role">Rol</label>
              <select
                id="cf-role" value={cRole}
                onChange={(e) => setCRole(e.target.value as AdminUser['role'])}
              >
                <option value="user">Alumna</option>
                <option value="coach">Coach</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-plan">
                Plan {cRole !== 'user' && <span className="dim">(solo alumnas)</span>}
              </label>
              <select
                id="cf-plan" value={cPlan}
                onChange={(e) => setCPlan(e.target.value)}
                disabled={cRole !== 'user'}
              >
                <option value="">— sin plan —</option>
                {plans.map((p) => (
                  <option key={p.slug} value={p.slug}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="cf-field">
              <label htmlFor="cf-coach">
                Coach {cRole !== 'user' && <span className="dim">(solo alumnas)</span>}
              </label>
              <select
                id="cf-coach" value={cCoach}
                onChange={(e) => setCCoach(e.target.value)}
                disabled={cRole !== 'user'}
              >
                <option value="">— sin asignar —</option>
                {coaches.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {cError && <div className="cf-err" role="alert">{cError}</div>}

          <div className="cf-actions">
            <button
              type="button" className="btn ghost"
              onClick={() => { setShowCreate(false); resetCreate(); }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn primary" disabled={cPending}>
              {cPending ? 'Creando…' : 'Crear usuario →'}
            </button>
          </div>
        </form>
      )}

      <div className="table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Rol</th>
              <th>Plan</th>
              <th>Coach asignado</th>
              <th>Último acceso</th>
              <th>Registro</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => {
              const initial = (u.name.trim().charAt(0) || '?').toUpperCase();
              const saving = savingId === u.id;
              const canHaveCoach = u.role === 'user';
              return (
                <tr key={u.id} className={saving ? 'saving' : ''}>
                  <td>
                    <div className="who">
                      <div className="av">{initial}</div>
                      <div>
                        <div className="nm">{u.name}</div>
                        <div className="em">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <select
                      className={`sel role-${u.role}`}
                      value={u.role}
                      onChange={(e) => {
                        const role = e.target.value as AdminUser['role'];
                        updateRow(u.id, { role });
                        void patch(u.id, { role });
                      }}
                    >
                      <option value="user">Alumna</option>
                      <option value="coach">Coach</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="sel"
                      value={u.plan_slug ?? ''}
                      onChange={(e) => {
                        const slug = e.target.value || null;
                        updateRow(u.id, { plan_slug: slug });
                        void patch(u.id, { plan_slug: slug });
                      }}
                      disabled={u.role !== 'user'}
                      title={u.role !== 'user' ? 'Solo alumnas tienen plan' : ''}
                    >
                      <option value="">— sin plan —</option>
                      {plans.map((p) => (
                        <option key={p.slug} value={p.slug}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <select
                      className="sel"
                      value={u.coach_id ?? ''}
                      onChange={(e) => {
                        const coachId = e.target.value || null;
                        updateRow(u.id, {
                          coach_id: coachId,
                          coach_name: coachId
                            ? coaches.find((c) => c.id === coachId)?.name ?? null
                            : null,
                        });
                        void patch(u.id, { coach_id: coachId });
                      }}
                      disabled={!canHaveCoach}
                      title={!canHaveCoach ? 'Solo se asigna coach a alumnas' : ''}
                    >
                      <option value="">— sin asignar —</option>
                      {coaches.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="mono-cell">{fmtDate(u.last_login_at)}</td>
                  <td className="mono-cell">{fmtDate(u.created_at)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {users.length === 0 && (
        <div className="empty">Todavía no hay usuarios registrados.</div>
      )}
    </div>
  );
}
