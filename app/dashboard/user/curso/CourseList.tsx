'use client';

import { useState } from 'react';
import Link from 'next/link';

type ModuleRow = {
  id: string;
  slug: string;
  title: string;
  phase: number;
  week_start: number | null;
  week_end: number | null;
  description: string | null;
  total_lessons: string;
  completed_lessons: string;
};

const PHASE_META: Record<number, { label: string; title: string; tagline: string }> = {
  1: { label: 'Fase 01', title: 'Reset — Ver y Soltar',      tagline: 'Arqueología emocional · semanas 1-4' },
  2: { label: 'Fase 02', title: 'Reprogramación',            tagline: 'Estructura financiera · semanas 5-8' },
  3: { label: 'Fase 03', title: 'Expansión 10X',             tagline: 'Salir al mundo · semanas 9-12' },
};

export default function CourseList({
  phase1,
  phase2,
  phase3,
}: {
  phase1: ModuleRow[];
  phase2: ModuleRow[];
  phase3: ModuleRow[];
}) {
  const [active, setActive] = useState<1 | 2 | 3>(1);
  const phases = { 1: phase1, 2: phase2, 3: phase3 };
  const current = phases[active];

  return (
    <>
      <div className="phase-tabs" role="tablist">
        {[1, 2, 3].map((p) => {
          const meta = PHASE_META[p];
          const list = phases[p as 1 | 2 | 3];
          const done = list.reduce((s, m) => s + Number(m.completed_lessons), 0);
          const total = list.reduce((s, m) => s + Number(m.total_lessons), 0);
          return (
            <button
              key={p}
              type="button"
              role="tab"
              aria-selected={active === p}
              className={`phase-tab${active === p ? ' on' : ''}`}
              onClick={() => setActive(p as 1 | 2 | 3)}
            >
              <div className="pt-label">{meta.label}</div>
              <div className="pt-title">{meta.title}</div>
              <div className="pt-meta">
                {total > 0
                  ? `${done}/${total} lecciones`
                  : `${list.length} módulos`}
              </div>
            </button>
          );
        })}
      </div>

      <div className="phase-intro">
        <span className="mono">{PHASE_META[active].label}</span>
        <h3>{PHASE_META[active].title}</h3>
        <p>{PHASE_META[active].tagline}</p>
      </div>

      <div className="module-list">
        {current.map((m) => {
          const done = Number(m.completed_lessons);
          const total = Number(m.total_lessons);
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const weekLabel =
            m.week_start && m.week_end && m.week_start === m.week_end
              ? `Semana ${m.week_start}`
              : m.week_start && m.week_end
              ? `Semanas ${m.week_start}-${m.week_end}`
              : '';

          return (
            <Link
              key={m.id}
              href={`/dashboard/user/curso/${m.slug}`}
              className="mod-card"
            >
              <div className="mod-head">
                <div className="mod-week">{weekLabel}</div>
                <div className="mod-status">
                  {total === 0 ? (
                    <span className="chip ghost">Próximamente</span>
                  ) : done === total ? (
                    <span className="chip ok">Completado</span>
                  ) : done > 0 ? (
                    <span className="chip">En curso · {pct}%</span>
                  ) : (
                    <span className="chip ghost">Por empezar</span>
                  )}
                </div>
              </div>
              <h4 className="mod-title">{m.title}</h4>
              {m.description && (
                <p className="mod-desc">{m.description}</p>
              )}
              {total > 0 && (
                <div className="mod-bar">
                  <span style={{ width: `${pct}%` }} />
                </div>
              )}
              <div className="mod-foot">
                <span className="mono">
                  {total > 0 ? `${done}/${total} lecciones` : 'Sin lecciones aún'}
                </span>
                <span className="arr">→</span>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
