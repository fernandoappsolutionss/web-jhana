'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Role } from '@/lib/auth';

export type CommunityPost = {
  id: string;
  title: string | null;
  body: string;
  pinned: boolean;
  created_at: string;
  authorId: string;
  authorName: string;
  authorRole: Role;
};

function timeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const diff = (Date.now() - then) / 1000;
  if (diff < 60) return 'hace un momento';
  if (diff < 3600) return `hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)} h`;
  if (diff < 604800) return `hace ${Math.floor(diff / 86400)} días`;
  return new Date(iso).toLocaleDateString('es', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

const ROLE_LABEL: Record<Role, string> = {
  user: 'Alumna',
  coach: 'Coach',
  admin: 'Admin',
};

export default function CommunityClient({
  initialPosts,
  currentUserId,
  currentUserName,
  currentUserRole,
}: {
  initialPosts: CommunityPost[];
  currentUserId: string;
  currentUserName: string;
  currentUserRole: Role;
}) {
  const router = useRouter();
  const [posts, setPosts] = useState(initialPosts);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (body.trim().length < 2) {
      setError('Escribe algo más largo para compartir.');
      return;
    }
    try {
      const res = await fetch('/api/community/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: title.trim() || null, body: body.trim() }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        post?: CommunityPost;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.post) {
        setError(data.error ?? 'No pudimos publicar.');
        return;
      }
      setPosts([data.post, ...posts]);
      setTitle('');
      setBody('');
      startTransition(() => router.refresh());
    } catch {
      setError('Problema de conexión.');
    }
  };

  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta publicación?')) return;
    try {
      const res = await fetch(`/api/community/posts?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      });
      if (!res.ok) return;
      setPosts(posts.filter((p) => p.id !== id));
      startTransition(() => router.refresh());
    } catch {
      // ignore
    }
  };

  const togglePin = async (id: string, currentPinned: boolean) => {
    const nextPinned = !currentPinned;
    // Optimistic: toggle and re-sort (pinned first, then by date)
    setPosts((prev) => {
      const updated = prev.map((p) =>
        p.id === id ? { ...p, pinned: nextPinned } : p
      );
      return updated.sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.created_at.localeCompare(a.created_at);
      });
    });
    try {
      const res = await fetch('/api/community/posts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, pinned: nextPinned }),
      });
      if (!res.ok) throw new Error();
      startTransition(() => router.refresh());
    } catch {
      // Revert
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, pinned: currentPinned } : p))
      );
    }
  };

  const avatarInitial = currentUserName.trim().charAt(0).toUpperCase() || 'E';

  return (
    <div className="community">
      <form className="post-composer" onSubmit={submit}>
        <div className="pc-row">
          <div className="pc-avatar">{avatarInitial}</div>
          <div className="pc-who">
            <div className="pc-name">{currentUserName}</div>
            <div className="pc-meta">{ROLE_LABEL[currentUserRole]}</div>
          </div>
        </div>
        <input
          className="pc-title"
          type="text"
          placeholder="Un título (opcional) · ej. &ldquo;Mi primer Fondo de Libertad&rdquo;"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
        />
        <textarea
          className="pc-body"
          placeholder="Comparte algo: un avance, una pregunta, una celebración…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={3}
          maxLength={4000}
        />
        {error && <div className="pc-err" role="alert">{error}</div>}
        <div className="pc-foot">
          <span className="mono">
            {body.length} / 4000
          </span>
          <button type="submit" className="btn primary" disabled={pending || body.trim().length === 0}>
            Publicar →
          </button>
        </div>
      </form>

      {posts.length === 0 ? (
        <div className="feed-empty">
          Todavía no hay publicaciones. Sé la primera en escribir — abre el
          espacio para tu cohorte.
        </div>
      ) : (
        <div className="feed">
          {posts.map((p) => {
            const isAuthor = p.authorId === currentUserId;
            const canDelete = isAuthor || currentUserRole === 'admin';
            const initial = p.authorName.trim().charAt(0).toUpperCase() || '?';
            return (
              <article key={p.id} className={`post${p.pinned ? ' pinned' : ''}`}>
                {p.pinned && <div className="pin-badge">📌 Fijado</div>}
                <div className="post-head">
                  <div className="ph-left">
                    <div className={`av r-${p.authorRole}`}>{initial}</div>
                    <div>
                      <div className="ph-name">{p.authorName}</div>
                      <div className="ph-meta">
                        <span className={`role-chip r-${p.authorRole}`}>
                          {ROLE_LABEL[p.authorRole]}
                        </span>
                        <span>·</span>
                        <span>{timeAgo(p.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="post-actions">
                    {currentUserRole === 'admin' && (
                      <button
                        type="button"
                        className={`post-pin${p.pinned ? ' active' : ''}`}
                        onClick={() => togglePin(p.id, p.pinned)}
                        aria-label={p.pinned ? 'Despinnear' : 'Fijar'}
                        title={p.pinned ? 'Despinnear este post' : 'Fijar este post arriba'}
                      >
                        📌
                      </button>
                    )}
                    {canDelete && (
                      <button
                        type="button"
                        className="post-del"
                        onClick={() => remove(p.id)}
                        aria-label="Eliminar publicación"
                        title="Eliminar"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
                {p.title && <h3 className="post-title">{p.title}</h3>}
                <div className="post-body">
                  {p.body.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
