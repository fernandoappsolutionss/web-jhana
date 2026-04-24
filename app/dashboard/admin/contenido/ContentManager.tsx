'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

export type AdminModule = {
  id: string;
  slug: string;
  title: string;
  phase: number;
  week_start: number | null;
  week_end: number | null;
  description: string | null;
  position: number;
  published: boolean;
  lesson_count: string;
};

export type AdminLesson = {
  id: string;
  slug: string;
  title: string;
  kind: 'video' | 'reading' | 'exercise' | 'download' | 'live';
  url: string | null;
  duration_min: number | null;
  position: number;
};

const KIND_OPTIONS = [
  { value: 'video', label: 'Video' },
  { value: 'reading', label: 'Lectura' },
  { value: 'exercise', label: 'Ejercicio' },
  { value: 'download', label: 'Descarga' },
  { value: 'live', label: 'En vivo' },
] as const;

export default function ContentManager({
  initialModules,
}: {
  initialModules: AdminModule[];
}) {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(
    initialModules[0]?.id ?? null
  );
  const [lessons, setLessons] = useState<Record<string, AdminLesson[]>>({});
  const [loadingModuleId, setLoadingModuleId] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const activeModule = modules.find((m) => m.id === activeModuleId) ?? null;

  const notify = (msg: string) => {
    setFlash(msg);
    setTimeout(() => setFlash(null), 2000);
  };

  // ——— Load lessons for a module (on demand) ———
  const loadLessons = async (moduleId: string) => {
    if (lessons[moduleId]) return;
    setLoadingModuleId(moduleId);
    try {
      const res = await fetch(`/api/admin/content/lessons?moduleId=${moduleId}`);
      const data = (await res.json()) as { ok: boolean; lessons: AdminLesson[] };
      if (data.ok) {
        setLessons((prev) => ({ ...prev, [moduleId]: data.lessons }));
      }
    } finally {
      setLoadingModuleId(null);
    }
  };

  const selectModule = (id: string) => {
    setActiveModuleId(id);
    void loadLessons(id);
  };

  // ——— Update module ———
  const patchModule = async (id: string, patch: Partial<AdminModule>) => {
    setModules((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
    try {
      const res = await fetch('/api/admin/content/modules', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, ...patch }),
      });
      if (!res.ok) throw new Error('patch failed');
      notify('✓ Guardado');
      startTransition(() => router.refresh());
    } catch {
      notify('Error al guardar');
    }
  };

  // ——— Create lesson ———
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonKind, setNewLessonKind] = useState<AdminLesson['kind']>('video');
  const [newLessonUrl, setNewLessonUrl] = useState('');
  const [newLessonDuration, setNewLessonDuration] = useState('');

  const createLesson = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!activeModule) return;
    const title = newLessonTitle.trim();
    if (!title) return;

    try {
      const res = await fetch('/api/admin/content/lessons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          moduleId: activeModule.id,
          title,
          kind: newLessonKind,
          url: newLessonUrl.trim() || null,
          duration_min: newLessonDuration ? Number(newLessonDuration) : null,
        }),
      });
      const data = (await res.json()) as {
        ok: boolean;
        lesson?: AdminLesson;
        error?: string;
      };
      if (!res.ok || !data.ok || !data.lesson) {
        notify(data.error ?? 'Error al crear lección');
        return;
      }
      setLessons((prev) => ({
        ...prev,
        [activeModule.id]: [...(prev[activeModule.id] ?? []), data.lesson!],
      }));
      setModules((prev) =>
        prev.map((m) =>
          m.id === activeModule.id
            ? { ...m, lesson_count: String(Number(m.lesson_count) + 1) }
            : m
        )
      );
      setNewLessonTitle('');
      setNewLessonUrl('');
      setNewLessonDuration('');
      notify('✓ Lección creada');
    } catch {
      notify('Problema de conexión');
    }
  };

  // ——— Delete lesson ———
  const deleteLesson = async (lessonId: string) => {
    if (!activeModule) return;
    if (!confirm('¿Eliminar esta lección?')) return;
    try {
      const res = await fetch(
        `/api/admin/content/lessons?id=${encodeURIComponent(lessonId)}`,
        { method: 'DELETE' }
      );
      if (!res.ok) throw new Error();
      setLessons((prev) => ({
        ...prev,
        [activeModule.id]: (prev[activeModule.id] ?? []).filter((l) => l.id !== lessonId),
      }));
      setModules((prev) =>
        prev.map((m) =>
          m.id === activeModule.id
            ? { ...m, lesson_count: String(Math.max(0, Number(m.lesson_count) - 1)) }
            : m
        )
      );
      notify('✓ Eliminada');
    } catch {
      notify('Error al eliminar');
    }
  };

  const currentLessons = activeModule ? lessons[activeModule.id] : undefined;

  return (
    <div className="cms">
      {flash && (
        <div className={`flash ${flash.startsWith('✓') ? 'ok' : 'err'}`}>{flash}</div>
      )}

      <div className="cms-grid">
        {/* Modules column */}
        <div className="cms-modules">
          <div className="cms-col-head">
            <h3>Módulos · {modules.length}</h3>
          </div>
          <div className="module-stack">
            {[1, 2, 3].map((phase) => (
              <div key={phase} className="phase-group">
                <div className="pg-label">
                  Fase 0{phase} —{' '}
                  {phase === 1 ? 'Reset' : phase === 2 ? 'Reprogramación' : 'Expansión 10X'}
                </div>
                {modules
                  .filter((m) => m.phase === phase)
                  .map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => selectModule(m.id)}
                      className={`mod-btn${activeModuleId === m.id ? ' on' : ''}`}
                    >
                      <div className="mb-week">
                        {m.week_start && m.week_end
                          ? m.week_start === m.week_end
                            ? `Sem ${m.week_start}`
                            : `Sem ${m.week_start}-${m.week_end}`
                          : ''}
                      </div>
                      <div className="mb-title">{m.title}</div>
                      <div className="mb-meta">
                        {m.lesson_count} lecciones · {m.published ? 'Publicado' : 'Borrador'}
                      </div>
                    </button>
                  ))}
              </div>
            ))}
          </div>
        </div>

        {/* Editor column */}
        <div className="cms-editor">
          {!activeModule ? (
            <div className="cms-empty">Selecciona un módulo para editarlo.</div>
          ) : (
            <>
              <div className="editor-head">
                <div className="eh-tag">
                  Fase 0{activeModule.phase} ·{' '}
                  {activeModule.week_start && activeModule.week_end
                    ? activeModule.week_start === activeModule.week_end
                      ? `Semana ${activeModule.week_start}`
                      : `Semanas ${activeModule.week_start}-${activeModule.week_end}`
                    : 'Sin semana'}
                </div>
                <input
                  className="eh-title"
                  type="text"
                  value={activeModule.title}
                  onChange={(e) =>
                    setModules((prev) =>
                      prev.map((m) =>
                        m.id === activeModule.id ? { ...m, title: e.target.value } : m
                      )
                    )
                  }
                  onBlur={(e) => patchModule(activeModule.id, { title: e.target.value })}
                />
                <textarea
                  className="eh-desc"
                  value={activeModule.description ?? ''}
                  placeholder="Descripción breve del módulo (lo que verá la alumna)…"
                  onChange={(e) =>
                    setModules((prev) =>
                      prev.map((m) =>
                        m.id === activeModule.id
                          ? { ...m, description: e.target.value }
                          : m
                      )
                    )
                  }
                  onBlur={(e) =>
                    patchModule(activeModule.id, { description: e.target.value })
                  }
                  rows={2}
                />

                <div className="eh-toggles">
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={activeModule.published}
                      onChange={(e) =>
                        patchModule(activeModule.id, { published: e.target.checked })
                      }
                    />
                    <span>Publicado (visible para alumnas)</span>
                  </label>
                </div>
              </div>

              {/* Lessons */}
              <div className="lessons-section">
                <div className="lc-head">
                  <h4>Lecciones</h4>
                  <span className="mono">{activeModule.lesson_count}</span>
                </div>

                {loadingModuleId === activeModule.id ? (
                  <div className="lc-loading">Cargando lecciones…</div>
                ) : (
                  <ul className="lc-list">
                    {(currentLessons ?? []).map((l) => (
                      <li key={l.id}>
                        <div className="ll-main">
                          <span className={`ll-kind k-${l.kind}`}>
                            {KIND_OPTIONS.find((k) => k.value === l.kind)?.label ?? l.kind}
                          </span>
                          <div className="ll-title">{l.title}</div>
                          {l.duration_min && (
                            <span className="ll-duration">{l.duration_min} min</span>
                          )}
                          {l.url && (
                            <a
                              href={l.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ll-link"
                            >
                              ↗
                            </a>
                          )}
                        </div>
                        <button
                          type="button"
                          className="ll-del"
                          onClick={() => deleteLesson(l.id)}
                          aria-label="Eliminar lección"
                        >
                          ×
                        </button>
                      </li>
                    ))}
                    {(currentLessons ?? []).length === 0 && (
                      <li className="lc-empty">Sin lecciones aún. Agrega una abajo.</li>
                    )}
                  </ul>
                )}

                <form className="new-lesson" onSubmit={createLesson}>
                  <div className="nl-label">Nueva lección</div>
                  <div className="nl-row">
                    <input
                      type="text"
                      placeholder="Título de la lección"
                      required
                      value={newLessonTitle}
                      onChange={(e) => setNewLessonTitle(e.target.value)}
                    />
                    <select
                      value={newLessonKind}
                      onChange={(e) =>
                        setNewLessonKind(e.target.value as AdminLesson['kind'])
                      }
                    >
                      {KIND_OPTIONS.map((k) => (
                        <option key={k.value} value={k.value}>
                          {k.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="nl-row">
                    <input
                      type="url"
                      placeholder="URL (video, documento, enlace…)"
                      value={newLessonUrl}
                      onChange={(e) => setNewLessonUrl(e.target.value)}
                    />
                    <input
                      type="number"
                      placeholder="min"
                      min="0"
                      value={newLessonDuration}
                      onChange={(e) => setNewLessonDuration(e.target.value)}
                      style={{ maxWidth: 90 }}
                    />
                    <button type="submit" className="btn primary">
                      Agregar
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
