import Link from 'next/link';

/**
 * Shown when an alumna tries to access a module not included in her plan.
 * Fits into the main area of the dashboard shell.
 */
export default function LockedModule({
  module,
  planName,
}: {
  module: string;
  planName: string | null;
}) {
  return (
    <>
      <div className="page-head">
        <div className="eyebrow">
          <span className="bar" />
          <span>Módulo restringido</span>
        </div>
        <h1 className="page-h1">
          Este espacio está <em>cerrado</em> en tu plan.
        </h1>
        <p className="page-sub">
          <strong>{planName ?? 'Tu plan actual'}</strong> no incluye el módulo{' '}
          <em>{module}</em>. Para activarlo, escríbenos y evaluamos con vos la
          mejor opción para entrar a Expansión 10X.
        </p>
      </div>

      <div className="locked-card">
        <div className="lc-inner">
          <div className="lc-lock" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </div>
          <div className="lc-copy">
            <h3>Desbloquea <em>Expansión 10X</em>.</h3>
            <p>
              Curso completo de 12 semanas, planificador financiero en vivo,
              comunidad privada y acompañamiento 1:1 con tu coach asignada.
            </p>
          </div>
          <div className="lc-actions">
            <a
              className="btn primary"
              href="https://wa.me/584244245783?text=Hola%20Jhana%2C%20quiero%20activar%20Expansi%C3%B3n%2010X"
              target="_blank"
              rel="noopener noreferrer"
            >
              Escribir por WhatsApp
            </a>
            <Link className="btn ghost" href="/#precio">
              Ver opciones de pago
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
