'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type Role = 'user' | 'coach' | 'admin';

export default function LoginForm() {
  const router = useRouter();
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
        // The server tells us the user's role — the dashboard routes to it.
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
        <span>{pending ? 'Entrando…' : 'Iniciar sesión'}</span>
        <span className="arrow">→</span>
      </button>

      <div className="signup">
        ¿Todavía no tienes cuenta?{' '}
        <Link href="/registro">Crea tu cuenta →</Link>
      </div>
    </form>
  );
}
