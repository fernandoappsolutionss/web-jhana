import type { Metadata } from 'next';
import Link from 'next/link';
import RegistroForm from './RegistroForm';
import '../login/login.css';

export const metadata: Metadata = {
  title: 'Expansión 10X · Crear cuenta',
  description: 'Crea tu cuenta para acceder al portal Expansión 10X.',
};

export default function RegistroPage() {
  return (
    <div className="login-page">
      <section className="form-side">
        <div className="topbar">
          <Link className="logo" href="/">
            <span className="j">Jhana</span>
            <span className="el">El Aridi</span>
          </Link>
          <Link className="back" href="/">
            ← volver al sitio
          </Link>
        </div>

        <div className="form-wrap">
          <div className="idx mono">
            <span className="bar" />
            <span>Crear cuenta · Expansión 10X</span>
          </div>

          <h1>
            Comienza tu<br />
            <em>expansión</em>.
          </h1>
          <p className="sub">
            Crea tu cuenta para explorar el programa y — cuando actives tu
            cohorte — acceder al curso, comunidad, billetera y planificador.
          </p>

          <RegistroForm />
        </div>

        <div className="footmeta">
          <span>© 2026 · Jhana El Aridi</span>
          <span>
            <Link href="/">Privacidad</Link> · <Link href="/">Términos</Link>
          </span>
        </div>
      </section>

      <aside className="visual-side">
        <div className="vmeta">
          <span>Portal · v.2.0</span>
          <span>Edición 2026</span>
        </div>

        <div className="metric-card">
          <div className="mc-label">Riqueza promedio · alumnas</div>
          <div className="mc-val">
            +312<span className="unit">% en 13 sem.</span>
          </div>
          <div className="mc-trend">▲ 4.1x promedio</div>
          <div className="mc-bars">
            <span /><span /><span /><span />
            <span /><span /><span /><span />
          </div>
        </div>

        <div className="visual-core">
          <div className="plan-chip">
            <span className="dot" />
            <span>Expansión 10X · Inscripciones abiertas</span>
          </div>
          <p className="quote">
            No necesitas trabajar más duro, sino{' '}
            <em>aprender a ver más grande</em>.
          </p>
          <div className="quote-by">
            <div className="avatar">J</div>
            <div>
              <div className="qname">Jhana El Aridi</div>
              <div>Guía · Expansión 10X</div>
            </div>
          </div>
        </div>

        <div className="vfoot">
          <div>
            <div className="vf-label">Alumnas</div>
            <div className="big">2,847</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="vf-label">Promedio</div>
            <div className="big">4.1x</div>
          </div>
        </div>
      </aside>
    </div>
  );
}
