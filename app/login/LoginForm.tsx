'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'user' | 'coach' | 'admin';

const ROLE_META: Record<
  Role,
  { tag: string; name: string; sub: string; cta: string }
> = {
  user: {
    tag: 'Rol 01',
    name: 'Alumna',
    sub: 'Curso, comunidad, billetera y planificador',
    cta: 'Entrar como alumna',
  },
  coach: {
    tag: 'Rol 02',
    name: 'Coach',
    sub: 'Avances de tus alumnas asignadas',
    cta: 'Entrar como coach',
  },
  admin: {
    tag: 'Rol 03',
    name: 'Admin',
    sub: 'Ingresos, usuarios y contenido',
    cta: 'Entrar como admin',
  },
};

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, remember }),
        });
        const data = (await res.json()) as {
          ok: boolean;
          role?: Role;
          error?: string;
        };
        if (!res.ok || !data.ok) {
          setError(data.error ?? 'No pudimos iniciar sesión.');
          return;
        }
        // Use the role returned by the server (source of truth), not the UI selection
        const nextRole = data.role ?? role;
        router.push(`/dashboard/${nextRole}`);
        router.refresh();
      } catch (err) {
        setError('Problema de conexión. Inténtalo de nuevo.');
      }
    });
  };

  return (
    <>
      <div className="roles" role="radiogroup" aria-label="Rol">
        {(Object.keys(ROLE_META) as Role[]).map((r) => {
          const m = ROLE_META[r];
          return (
            <button
              key={r}
              type="button"
              role="radio"
              aria-checked={role === r}
              className={`role${role === r ? ' active' : ''}`}
              onClick={() => setRole(r)}
            >
              <span className="r-tag">{m.tag}</span>
              <span className="r-name">{m.name}</span>
              <span className="r-sub">{m.sub}</span>
            </button>
          );
        })}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            placeholder="tu@correo.com"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="pw">Contraseña</label>
          <input
            id="pw"
            type={showPw ? 'text' : 'password'}
            name="password"
            required
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="reveal"
            onClick={() => setShowPw((s) => !s)}
            aria-label={showPw ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPw ? 'ocultar' : 'mostrar'}
          </button>
        </div>

        <div className="row">
          <label className="check">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Mantener sesión iniciada</span>
          </label>
          <a href="#" className="forgot">
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        {error && (
          <div className="login-error" role="alert">
            {error}
          </div>
        )}

        <button className="btn primary" type="submit" disabled={pending}>
          <span>{pending ? 'Entrando…' : ROLE_META[role].cta}</span>
          <span className="arrow">→</span>
        </button>

        <div className="signup">
          ¿Todavía no eres parte?{' '}
          <Link href="/registro">Súmate a Expansión 10X →</Link>
        </div>
      </form>
    </>
  );
}
