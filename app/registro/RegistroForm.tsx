'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegistroForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [accept, setAccept] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.');
      return;
    }
    if (!accept) {
      setError('Debes aceptar los términos para continuar.');
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = (await res.json()) as {
          ok: boolean;
          role?: string;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.error ?? 'No pudimos crear tu cuenta.');
          return;
        }
        router.push(`/dashboard/${data.role ?? 'user'}`);
        router.refresh();
      } catch {
        setError('Problema de conexión. Inténtalo de nuevo.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="reg-name">Nombre completo</label>
        <input
          id="reg-name"
          type="text"
          required
          placeholder="Ej. María Pérez"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="reg-email">Correo electrónico</label>
        <input
          id="reg-email"
          type="email"
          required
          placeholder="tu@correo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="reg-pw">Contraseña</label>
        <input
          id="reg-pw"
          type={showPw ? 'text' : 'password'}
          required
          minLength={8}
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          className="reveal"
          onClick={() => setShowPw((s) => !s)}
        >
          {showPw ? 'ocultar' : 'mostrar'}
        </button>
      </div>
      <div className="field">
        <label htmlFor="reg-confirm">Confirma la contraseña</label>
        <input
          id="reg-confirm"
          type={showPw ? 'text' : 'password'}
          required
          placeholder="Repite tu contraseña"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
        />
      </div>

      <div className="row">
        <label className="check">
          <input
            type="checkbox"
            checked={accept}
            onChange={(e) => setAccept(e.target.checked)}
          />
          <span>Acepto términos y política de privacidad</span>
        </label>
      </div>

      {error && (
        <div className="login-error" role="alert">
          {error}
        </div>
      )}

      <button className="btn primary" type="submit" disabled={pending}>
        <span>{pending ? 'Creando cuenta…' : 'Crear cuenta'}</span>
        <span className="arrow">→</span>
      </button>

      <div className="signup">
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión →</Link>
      </div>
    </form>
  );
}
