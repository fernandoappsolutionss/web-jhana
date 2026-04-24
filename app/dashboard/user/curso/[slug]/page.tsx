import Link from 'next/link';
import { notFound } from 'next/navigation';
import { sql } from '@/lib/db';
import { moduleAccess } from '@/lib/guard';
import LockedModule from '@/components/dashboard/LockedModule';
import LessonRow from './LessonRow';
import '../curso.css';

export const dynamic = 'force-dynamic';

type ModuleRow = {
  id: string;
  slug: string;
  title: string;
  phase: number;
  week_start: number | null;
  week_end: number | null;
  description: string | null;
};

type LessonRowData = {
  id: string;
  title: string;
  kind: 'video' | 'reading' | 'exercise' | 'download' | 'live';
  url: string | null;
  duration_min: number | null;
  position: number;
  completed: boolean;
};

export default async function ModuleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const { session, plan, hasAccess } = await moduleAccess('curso');
  if (!hasAccess) return <LockedModule module="Curso" planName={plan.name} />;

  const db = sql();
  const mods = (await db`
    select id, slug, title, phase, week_start, week_end, description
      from course_modules
     where slug = ${params.slug} and published = true
     limit 1
  `) as unknown as ModuleRow[];

  const module = mods[0];
  if (!module) notFound();

  const lessons = (await db`
    select
      l.id, l.title, l.kind, l.url, l.duration_min, l.position,
      (lp.lesson_id is not null) as completed
    from lessons l
    left join lesson_progress lp
      on lp.lesson_id = l.id and lp.user_id = ${session.sub}
    where l.module_id = ${module.id}
    order by l.position, l.created_at
  `) as unknown as LessonRowData[];

  const weekLabel =
    module.week_start && module.week_end && module.week_start === module.week_end
      ? `Semana ${module.week_start}`
      : module.week_start && module.week_end
      ? `Semanas ${module.week_start}-${module.week_end}`
      : `Fase ${module.phase}`;

  return (
    <>
      <div className="mod-detail-head">
        <Link className="back" href="/dashboard/user/curso">
          ← volver al curso
        </Link>
        <div className="week">{weekLabel} · Fase {module.phase}</div>
        <h1>
          {module.title.split(' ').slice(0, -1).join(' ')}{' '}
          <em>{module.title.split(' ').slice(-1)[0]}</em>
        </h1>
        {module.description && <p>{module.description}</p>}
      </div>

      {lessons.length === 0 ? (
        <div className="lesson-empty">
          Aún no hay lecciones publicadas para este módulo. Tu coach las irá
          activando durante la cohorte.
        </div>
      ) : (
        <div className="lesson-list">
          {lessons.map((l) => (
            <LessonRow
              key={l.id}
              id={l.id}
              title={l.title}
              kind={l.kind}
              url={l.url}
              duration={l.duration_min}
              completed={l.completed}
            />
          ))}
        </div>
      )}
    </>
  );
}
