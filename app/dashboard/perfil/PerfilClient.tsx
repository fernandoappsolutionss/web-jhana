'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export default function PerfilClient({ initialName }: { initialName: string }) {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // ——— Name form ———
  const [name, setName] = useState(initialName);
  const [nameSaving, setNameSaving] = useState(false);
  const [nameMsg, setNameMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const saveName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setNameSaving(true);
    setNameMsg(null);
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setNameMsg({ kind: 'err', text: data.error ?? 'No pudimos guardar.' });
        return;
      }
      setNameMsg({ kind: 'ok', text: '✓ Nombre actualizado' });
      startTransition(() => router.refresh());
    } catch {
      setNameMsg({ kind: 'err', text: 'Problema de conexión.' });
    } finally {
      setNameSaving(false);
      setTimeout(() => setNameMsg(null), 3000);
    }
  };

  // ——— Password form ———
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwSaving, setPwSaving] = useState(false);
  const [pwMsg, setPwMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const savePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPwMsg(null);
    if (newPw.length < 8) {
      setPwMsg({ kind: 'err', text: 'La nueva contraseña debe tener al menos 8 caracteres.' });
      return;
    }
    if (newPw !== confirmPw) {
      setPwMsg({ kind: 'err', text: 'Las contraseñas no coinciden.' });
      return;
    }
    setPwSaving(true);
    try {
      const res = await fetch('/api/auth/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ current: currentPw, next: newPw }),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setPwMsg({ kind: 'err', text: data.error ?? 'No pudimos cambiar la contraseña.' });
        return;
      }
      setPwMsg({ kind: 'ok', text: '✓ Contraseña actualizada' });
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch {
      setPwMsg({ kind: 'err', text: 'Problema de conexión.' });
    } finally {
      setPwSaving(false);
      setTimeout(() => setPwMsg(null), 4000);
    }
  };

  return (
    <>
      {/* Name form */}
      <form className="pc-card" onSubmit={saveName}>
        <div className="pc-head">
          <div className="mono">— Datos personales</div>
          <h3>Nombre para mostrar</h3>
          <p>Cómo apareces en la comunidad, en el saludo de tu dashboard y para tu coach.</p>
        </div>
        <div className="pc-field">
          <label htmlFor="pp-name">Nombre completo</label>
          <input
            id="pp-name"
            type="text"
            required
            minLength={2}
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {nameMsg && <div className={`pc-msg ${nameMsg.kind}`}>{nameMsg.text}</div>}
        <div className="pc-actions">
          <button
            type="submit"
            className="btn primary"
            disabled={nameSaving || name.trim() === initialName.trim() || name.trim().length < 2}
          >
            {nameSaving ? 'Guardando…' : 'Guardar cambios'}
          </button>
        </div>
      </form>

      {/* Password form */}
      <form className="pc-card" onSubmit={savePassword}>
        <div className="pc-head">
          <div className="mono">— Seguridad</div>
          <h3>Cambiar contraseña</h3>
          <p>Ingresa tu contraseña actual y la nueva. Mínimo 8 caracteres.</p>
        </div>

        <div className="pc-field">
          <label htmlFor="pp-curr">Contraseña actual</label>
          <input
            id="pp-curr"
            type={showPw ? 'text' : 'password'}
            required
            value={currentPw}
            autoComplete="current-password"
            onChange={(e) => setCurrentPw(e.target.value)}
          />
        </div>
        <div className="pc-grid-2">
          <div className="pc-field">
            <label htmlFor="pp-new">Nueva contraseña</label>
            <input
              id="pp-new"
              type={showPw ? 'text' : 'password'}
              required
              minLength={8}
              value={newPw}
              autoComplete="new-password"
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <div className="pc-field">
            <label htmlFor="pp-conf">Confirma nueva</label>
            <input
              id="pp-conf"
              type={showPw ? 'text' : 'password'}
              required
              minLength={8}
              value={confirmPw}
              autoComplete="new-password"
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
        </div>

        <label className="pc-toggle">
          <input
            type="checkbox"
            checked={showPw}
            onChange={(e) => setShowPw(e.target.checked)}
          />
          <span>Mostrar contraseñas</span>
        </label>

        {pwMsg && <div className={`pc-msg ${pwMsg.kind}`}>{pwMsg.text}</div>}

        <div className="pc-actions">
          <button type="submit" className="btn primary" disabled={pwSaving}>
            {pwSaving ? 'Guardando…' : 'Actualizar contraseña'}
          </button>
        </div>
      </form>
    </>
  );
}
