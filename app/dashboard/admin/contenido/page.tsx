import { requireAdminPage } from '@/lib/admin';
import { sql } from '@/lib/db';
import ContentManager, { type AdminModule } from './ContentManager';
import './contenido.css';

export const dynamic = 'force-dynamic';

export default async function AdminContenidoPage() {
  await requireAdminPage();

  const modules = (await sql()`
    select
      m.id, m.slug, m.title, m.phase, m.week_start, m.week_end,
      m.description, m.position, m.published,
      (select count(*)::text from lessons where module_id = m.id) as lesson_count
    from course_modules m
    order by m.phase, m.position
  `) as unknown as AdminModule[];

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Admin · CMS de contenido</span>
        </div>
        <h1 className="page-h1">
          <em>Módulos</em> del curso
        </h1>
        <p className="page-sub">
          Edita el título y descripción de cada módulo, agrega lecciones
          (videos, lecturas, ejercicios) y publica cuando estén listas.
        </p>
      </div>

      <ContentManager initialModules={modules} />
    </>
  );
}
