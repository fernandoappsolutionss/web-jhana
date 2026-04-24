import { sql } from '@/lib/db';
import { moduleAccess } from '@/lib/guard';
import LockedModule from '@/components/dashboard/LockedModule';
import CourseList from './CourseList';
import './curso.css';

export const dynamic = 'force-dynamic';

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

export default async function CursoPage() {
  const { session, plan, hasAccess } = await moduleAccess('curso');

  if (!hasAccess) {
    return <LockedModule module="Curso" planName={plan.name} />;
  }

  const modules = (await sql()`
    select
      m.id, m.slug, m.title, m.phase, m.week_start, m.week_end, m.description,
      (select count(*)::text from lessons where module_id = m.id) as total_lessons,
      (select count(*)::text from lessons l
         inner join lesson_progress lp on lp.lesson_id = l.id
         where l.module_id = m.id and lp.user_id = ${session.sub}) as completed_lessons
    from course_modules m
    where m.published = true
    order by m.phase, m.position
  `) as unknown as ModuleRow[];

  const byPhase: Record<number, ModuleRow[]> = { 1: [], 2: [], 3: [] };
  for (const m of modules) byPhase[m.phase]?.push(m);

  const totalLessons = modules.reduce((s, m) => s + Number(m.total_lessons), 0);
  const done = modules.reduce((s, m) => s + Number(m.completed_lessons), 0);
  const pct = totalLessons > 0 ? Math.round((done / totalLessons) * 100) : 0;

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Curso · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          El método — <em>3 fases</em>, 12 semanas.
        </h1>
        <p className="page-sub">
          Cada fase tiene un arco. Cada semana construye sobre la anterior. La
          transformación solo ocurre si haces el trabajo.
        </p>
      </div>

      <div className="curso-overall">
        <div className="co-left">
          <div className="co-label">Progreso global</div>
          <div className="co-pct">{pct}%</div>
          <div className="co-meta">{done} de {totalLessons} lecciones</div>
        </div>
        <div className="co-bar"><span style={{ width: `${pct}%` }} /></div>
      </div>

      <CourseList
        phase1={byPhase[1] ?? []}
        phase2={byPhase[2] ?? []}
        phase3={byPhase[3] ?? []}
      />
    </>
  );
}
