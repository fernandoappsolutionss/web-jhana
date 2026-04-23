import { readSession } from '@/lib/auth';

export default async function CoachDashboardPage() {
  const session = await readSession();
  const firstName = session?.name.split(' ')[0] ?? '';

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Coach · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          Hola coach <em>{firstName}</em>.
        </h1>
        <p className="page-sub">
          Aquí verás el progreso, las sesiones y los avances de tus alumnas
          asignadas. Un espacio para sostener el camino juntas.
        </p>
      </div>

      <div className="construccion">
        <div className="tag">— Próximamente</div>
        <h3>
          Tu dashboard de <em>alumnas</em> se está construyendo.
        </h3>
        <p>
          El panel de avances, sesiones programadas y reportes de cohortes
          aparecerá aquí en la próxima iteración.
        </p>
      </div>
    </>
  );
}
