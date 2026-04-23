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
