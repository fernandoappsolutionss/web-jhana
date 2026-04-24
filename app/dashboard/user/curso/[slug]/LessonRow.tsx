'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';

const KIND_LABEL: Record<string, string> = {
  video: 'Video',
  reading: 'Lectura',
  exercise: 'Ejercicio',
  download: 'Descarga',
  live: 'En vivo',
};

export default function LessonRow({
  id,
  title,
  kind,
  url,
  duration,
  completed: initialCompleted,
}: {
  id: string;
  title: string;
  kind: string;
  url: string | null;
  duration: number | null;
  completed: boolean;
}) {
  const router = useRouter();
  const [completed, setCompleted] = useState(initialCompleted);
  const [, startTransition] = useTransition();

  const toggle = async () => {
    const next = !completed;
    setCompleted(next); // optimistic
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: id, completed: next }),
      });
      if (!res.ok) throw new Error('failed');
      startTransition(() => router.refresh());
    } catch {
      setCompleted(!next); // revert
    }
  };

  const content = (
    <>
      <button
        className={`lr-status${completed ? ' done' : ''}`}
        type="button"
        aria-label={completed ? 'Marcar como no completada' : 'Marcar completada'}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void toggle();
        }}
      />
      <div className="lr-title">{title}</div>
      <span className="lr-kind">{KIND_LABEL[kind] ?? kind}</span>
      <span className="lr-duration">{duration ? `${duration} min` : '—'}</span>
    </>
  );

  if (url) {
    return (
      <a className="lesson-row" href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <div className="lesson-row">{content}</div>;
}
