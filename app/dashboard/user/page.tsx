import { readSession } from '@/lib/auth';

export default async function UserDashboardPage() {
  const session = await readSession();
  const firstName = session?.name.split(' ')[0] ?? '';

  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Tu espacio · Expansión 10X</span>
        </div>
        <h1 className="page-h1">
          Hola, <em>{firstName || 'bienvenida'}</em>.
        </h1>
        <p className="page-sub">
          Aquí vas a ver tu progreso en el curso, tu comunidad, la billetera de
          pagos y el planificador financiero que refleja cómo crece tu riqueza
          semana a semana.
        </p>
      </div>

      <div className="construccion">
        <div className="tag">— Próximamente</div>
        <h3>
          Los módulos de tu <em>portal</em> están en construcción.
        </h3>
        <p>
          Curso, comunidad, planificador financiero y billetera aparecerán aquí
          una vez actives tu cohorte. Mientras tanto, usa tu sesión para
          acompañamiento por WhatsApp con tu coach asignada.
        </p>
      </div>
    </>
  );
}
