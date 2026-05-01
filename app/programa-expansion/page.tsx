import type { Metadata } from 'next';
import Link from 'next/link';
import ClientEnhancements from '@/components/landing/ClientEnhancements';
import './programa.css';

export const metadata: Metadata = {
  title: 'Programa Expansión · 7 semanas para recibir tu abundancia · Jhana El Aridi',
  description:
    'Programa de 7 semanas con Jhana El Aridi para sanar tu relación con el dinero, recuperar tu poder personal y crear la vida que sabes que mereces. Inversión: $497 USD.',
  openGraph: {
    title: 'Programa Expansión · 7 semanas',
    description:
      'Tu mente es millonaria. Solo necesitas recordarlo. 7 semanas con Jhana El Aridi.',
    images: ['/assets/jhana-extra-1.jpg'],
    type: 'website',
    locale: 'es_LA',
  },
};

const PILLARS = [
  {
    n: '01',
    label: 'Pilar uno',
    title: 'Mentalidad de abundancia',
    desc: 'Identificas y transformas las creencias limitantes que bloquean tu prosperidad — desde la raíz, no como afirmaciones vacías.',
  },
  {
    n: '02',
    label: 'Pilar dos',
    title: 'Fugas energéticas',
    desc: 'Más de 100 creencias mapeadas que están drenando tu dinero, tu tiempo y tu energía sin que te des cuenta.',
  },
  {
    n: '03',
    label: 'Pilar tres',
    title: 'Relación con el dinero',
    desc: 'Aprendes a generar, multiplicar y merecer dinero sin culpa, sin autosabotaje y sin tener que sufrir para lograrlo.',
  },
  {
    n: '04',
    label: 'Pilar cuatro',
    title: 'Emociones y energía',
    desc: 'Técnicas reales de visualización, respiración y escritura terapéutica para liberar bloqueos y elevar tu vibración.',
  },
];

const WEEKS = [
  {
    n: 1,
    title: 'Identidad Millonaria',
    arc: 'Quién eres y quién decides ser.',
    body: 'Sueltas las etiquetas que te pusieron de pequeña (insegura, poco constante, no era para ti…) y construyes una versión poderosa, segura y millonaria de ti. Verás cómo tu cuerpo cambia cuando afirmas frente al espejo: «Yo puedo. Yo soy capaz. Yo confío en mí».',
  },
  {
    n: 2,
    title: 'Dinero sin culpa',
    arc: 'Sanamos desde la raíz.',
    body: 'Infancia, familia, dolor, vergüenza y frustración. ¿Tu papá se estresaba por dinero? ¿Tu mamá decía que los ricos son malos? Aquí rompemos con esas creencias para siempre. Tu merecimiento no depende de cuánto sufriste para lograrlo.',
  },
  {
    n: 3,
    title: 'Brillar sin miedo',
    arc: 'Tu luz no molesta: ilumina.',
    body: 'Revisamos la creencia de que sobresalir es ego. Que mostrar tu éxito es vanidad. Te conectas con tu propósito y entiendes que si no te permites brillar, alguien más está dejando de recibir un rayo de luz de tu interior.',
  },
  {
    n: 4,
    title: 'Merecimiento real',
    arc: 'Tu capacidad de recibir, expandida.',
    body: 'Revisamos en qué momento aprendiste a aceptar migajas. Recuperamos el orden energético: Ser, Hacer, Tener. Aprenderás que no tienes que ganarte el amor, el dinero o la felicidad. Te lo mereces por ser tú.',
  },
  {
    n: 5,
    title: 'Techos mentales',
    arc: 'Tu mente solo ve lo que cree posible.',
    body: '¿Hasta cuánto crees que puedes ganar al mes? ¿$1.000? ¿$5.000? ¿$50.000? Aquí te enseño cómo expandir tu sistema reticular activador. Vas a aprender a pensar, sentir y actuar desde metas más grandes.',
  },
  {
    n: 6,
    title: 'Valor y ventas',
    arc: 'Tu servicio tiene un valor. Y tú también.',
    body: 'Si no lo reconoces, nadie más lo hará. Aquí vas a poder decir tu precio sin pena, rechazar clientes que no lo valoran y atraer a personas dispuestas a pagarte lo que realmente mereces.',
  },
  {
    n: 7,
    title: 'Enfoque y plan de expansión',
    arc: 'No solo se trata de sanar. Se trata de accionar.',
    body: 'Cierras con un plan claro, pasos concretos y energía alta. Te vas con una nueva identidad, herramientas prácticas y el fuego encendido para crear más.',
  },
];

const INCLUDES = [
  { icon: '📚', title: '7 clases grabadas en alta calidad', desc: 'Contenido profundo dividido en explicación teórica y emocional, ejercicios para revisar tus patrones y activaciones energéticas (meditaciones, visualizaciones, afirmaciones).' },
  { icon: '🎙️', title: '7 encuentros en vivo por Zoom', desc: '2 horas cada uno. Profundos, transformadores y completamente prácticos para que integres cada aprendizaje en tu vida real, no solo en tu cabeza.' },
  { icon: '💬', title: 'Comunidad activa', desc: 'Grupo privado de WhatsApp y comunidad de Facebook para sostener la energía entre clases y avanzar acompañada.' },
  { icon: '📱', title: 'Acompañamiento directo', desc: 'Acceso vía WhatsApp con Jhana durante las 7 semanas para resolver dudas, sostener el proceso y celebrar tus avances.' },
  { icon: '📥', title: 'Herramientas descargables', desc: 'Workbooks, libros, frases, plantillas y meditaciones que quedan contigo de por vida — incluso después de terminar el programa.' },
];

const OUTCOMES = [
  'Confiar más en ti y sentirte merecedora sin culpa.',
  'Romper con la historia de carencia en tu familia.',
  'Poner límites sanos con tus clientes, familia y pareja.',
  'Vender con seguridad, sin titubear ni dar descuentos por pena.',
  'Crear más dinero desde el disfrute y no desde el sacrificio.',
  'Sentir que brillas sin miedo al juicio o a la crítica.',
  'Tener un plan claro y energía enfocada para expandirte.',
];

const PARA_TI = [
  '«Sé que puedo más, pero no sé qué me pasa.»',
  'Te ha dolido tener dinero porque te sentiste culpable.',
  'Has dado descuentos que no querías dar, por pena.',
  'Te ha dado miedo brillar o cobrar por lo que realmente vale tu trabajo.',
  'Has sentido que tener más dinero te haría menos espiritual, menos mujer, o menos humana.',
];

export default function Expansion7Page() {
  return (
    <>
      <nav className="top" id="nav">
        <Link className="brand" href="/" aria-label="Jhana El Aridi">
          <span className="script">Jhana</span>
          <span className="sub">EL ARIDI</span>
        </Link>
        <ul>
          <li><a href="#metodo">Método</a></li>
          <li><a href="#incluye">Qué incluye</a></li>
          <li><a href="#semanas">Las 7 semanas</a></li>
          <li><a href="#precio">Inversión</a></li>
        </ul>
        <div className="nav-cluster">
          <Link className="nav-login" href="/login">Iniciar sesión</Link>
          <Link className="cta-nav" href="#precio">
            <span className="dot" /> Quiero entrar
          </Link>
        </div>
      </nav>

      {/* ═════════════ HERO ═════════════ */}
      <header className="hero p7-hero">
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="bar" />
              <span className="mono">Programa Expansión · 7 semanas · Con Jhana El Aridi</span>
            </div>
            <h1 className="display">
              7 semanas para <em>recibir</em><br />
              tu <em>abundancia</em>.
            </h1>
            <p className="lede">
              <strong>Tu mente es millonaria. Solo necesitas recordarlo.</strong> Un programa para
              transformar tu relación con el dinero, sanar tu historia,
              recuperar tu poder personal y crear la vida que sabes que mereces.
            </p>
            <div className="ctas">
              <a className="btn primary big" href="#precio">
                Quiero comenzar mi expansión <span className="arrow">→</span>
              </a>
            </div>
            <div className="subcta">
              Cohortes limitadas · Inversión desde $497 USD · Inicia con tu inscripción
            </div>
          </div>
        </div>
      </header>

      {/* ═════════════ Ticker ═════════════ */}
      <div className="ticker" aria-hidden="true">
        <div className="track">
          <span><i />merecimiento</span><span><i />dinero sin culpa</span>
          <span><i />brillar sin miedo</span><span><i />techos mentales</span>
          <span><i />identidad millonaria</span><span><i />plan de expansión</span>
          <span><i />merecimiento</span><span><i />dinero sin culpa</span>
          <span><i />brillar sin miedo</span><span><i />techos mentales</span>
          <span><i />identidad millonaria</span><span><i />plan de expansión</span>
        </div>
      </div>

      {/* ═════════════ 4 PILARES ═════════════ */}
      <section className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 01 / Lo que vas a transformar</span>
            <h2>
              4 pilares · 7 semanas ·<br />
              una <em>nueva</em> tú.
            </h2>
            <p className="kicker">
              Durante 7 semanas trabajamos juntas en estos cuatro frentes —
              porque la abundancia no se logra arreglando uno solo.
            </p>
          </div>

          <div className="p7-pillars">
            {PILLARS.map((p) => (
              <div key={p.n} className="p7-pillar">
                <div className="pp-num">{p.n}</div>
                <span className="pp-label">{p.label}</span>
                <h4>{p.title}</h4>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ MANIFESTO ═════════════ */}
      <section className="sec dark reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 02 / Por qué este programa existe</span>
          </div>
          <div className="p7-manifesto">
            <p>
              Este no es un curso más. Es una <em>experiencia transformadora</em>{' '}
              diseñada para personas como tú, que saben que vinieron a más,
              pero que sienten que algo interno sigue deteniéndolas.
            </p>
            <p>
              Aquí no solo vas a aprender. Vas a <strong>sentir, soltar,
              reprogramar, visualizar, expandirte</strong>.
            </p>
            <p className="quote">
              Tú no viniste a esta vida a sobrevivir, ni a conformarte. Viniste
              a <em>expandirte</em>, a disfrutarla, a servir desde tu grandeza.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════ ¿ES PARA TI? ═════════════ */}
      <section className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 03 / ¿Es para ti?</span>
            <h2>Sí, si alguna vez <em>te has dicho</em>…</h2>
            <p className="kicker">
              Si te reconoces en una sola de estas frases, este programa fue
              diseñado pensando exactamente en este momento de tu vida.
            </p>
          </div>

          <div className="p7-foryou">
            <ul>
              {PARA_TI.map((line, i) => (
                <li key={i}>
                  <span className="check">✓</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="p7-photo" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/jhana-extra-2.jpg" alt="" loading="lazy" />
            </div>
          </div>

          <div className="p7-bridge">
            <p className="serif">
              Este programa es un <em>puente</em>.<br />
              De la frustración a la confianza. Del miedo al merecimiento.
              Del límite a la <em>expansión</em>.
            </p>
            <p className="bridge-tag">Si sientes el llamado, escúchalo. Este es tu lugar.</p>
          </div>
        </div>
      </section>

      {/* ═════════════ ¿QUÉ INCLUYE? ═════════════ */}
      <section id="incluye" className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 04 / Qué incluye tu inversión</span>
            <h2>
              Todo lo que <em>recibes</em><br />
              al entrar al programa.
            </h2>
          </div>

          <div className="p7-includes">
            {INCLUDES.map((item, i) => (
              <div key={i} className="p7-incl">
                <div className="pi-icon">{item.icon}</div>
                <div className="pi-body">
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ MÓDULO A MÓDULO · 7 SEMANAS ═════════════ */}
      <section id="metodo" className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 05 / Las 7 semanas</span>
            <h2>
              Módulo a <em>módulo</em>.<br />
              Esto vas a vivir cada semana.
            </h2>
            <p className="kicker">
              Cada semana construye sobre la anterior. La transformación es
              progresiva, profunda y permanente.
            </p>
          </div>

          <div id="semanas" className="p7-weeks">
            {WEEKS.map((w) => (
              <article key={w.n} className="p7-week">
                <div className="pw-side">
                  <div className="pw-num">{String(w.n).padStart(2, '0')}</div>
                  <div className="pw-label">Semana {w.n}</div>
                </div>
                <div className="pw-body">
                  <h4>{w.title}</h4>
                  <p className="pw-arc">{w.arc}</p>
                  <p className="pw-text">{w.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ QUÉ VAS A LOGRAR ═════════════ */}
      <section className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 06 / Lo que vas a lograr</span>
            <h2>
              Cuando termines el programa,<br />
              <em>tu vida</em> ya será otra.
            </h2>
          </div>

          <div className="p7-outcomes">
            {OUTCOMES.map((o, i) => (
              <div key={i} className="p7-outcome">
                <span className="po-num">{String(i + 1).padStart(2, '0')}</span>
                <p>{o}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════ INVERSIÓN ═════════════ */}
      <section id="precio" className="sec earth reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 07 / Inversión</span>
            <h2>
              Elige tu <em>forma</em> de pago.
            </h2>
            <p className="kicker" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Inversión total del programa: <strong>$497 USD</strong>.<br />
              Tres opciones para que entres en el momento que es para ti.
            </p>
          </div>

          <div className="pay-grid">
            <div className="pay">
              <span className="pay-label">Opción 1 · Pago único</span>
              <div className="pay-amount">$497<em>USD</em></div>
              <div className="pay-total">Un solo pago</div>
              <p className="pay-sub">
                <strong>Bono extraordinario:</strong> incluye <strong>2 sesiones individuales</strong> de
                90 minutos de Reprogramación del Inconsciente con Jhana,
                valoradas en $180 cada una.
              </p>
              <a className="btn dark" href="#contacto">Quiero pagar hoy <span className="arrow">→</span></a>
            </div>

            <div className="pay featured">
              <span className="ribbon">Recomendado</span>
              <span className="pay-label">Opción 2 · 2 cuotas</span>
              <div className="pay-amount">$262<em>USD</em></div>
              <div className="pay-total">2 pagos · Total $524</div>
              <p className="pay-sub">
                Inscripción + segunda cuota en la semana 3.{' '}
                <strong>Bono:</strong> incluye <strong>1 sesión individual</strong> de 90 min de
                Reprogramación del Inconsciente, valorada en $180.
              </p>
              <a className="btn" href="#contacto">Quiero pagar en 2 cuotas <span className="arrow">→</span></a>
            </div>

            <div className="pay">
              <span className="pay-label">Opción 3 · 3 cuotas</span>
              <div className="pay-amount">$183<em>USD</em></div>
              <div className="pay-total">3 pagos · Total $549</div>
              <p className="pay-sub">
                Para quienes necesitan más flexibilidad. Cuotas en
                semana 1, semana 3 y semana 5 del programa.
              </p>
              <a className="btn dark" href="#contacto">Quiero 3 cuotas <span className="arrow">→</span></a>
            </div>
          </div>

          <div className="methods">
            <div className="methods-title">Formas de pago aceptadas</div>
            <div className="methods-list">
              <span>💸 Zelle</span>
              <span>🏦 Transferencia bancaria</span>
              <span>💰 PayPal</span>
              <span>₿ Binance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ CIERRE EMOCIONAL ═════════════ */}
      <section id="contacto" className="close-sec reveal">
        <div className="container">
          <div className="close-inner">
            <span className="s-idx" style={{ color: 'var(--gold)' }}>— 08 / Tu decisión</span>
            <h2>
              Si sientes el <em>llamado</em>,<br />
              escúchalo.
            </h2>
            <p>
              Probablemente tu mente ya está buscando razones para postergar.
              <em>«Y si no es el momento», «y si no funciona», «mejor el próximo mes»</em>.
            </p>
            <p>
              <strong>Ese ruido es exactamente la programación que te trajo aquí.</strong>{' '}
              El mismo miedo que te ha hecho no cobrar lo que vales, no pedir
              lo que mereces, no expandirte hasta donde puedes llegar.
            </p>
            <p>
              Si hoy decides <strong>ponerte en primer lugar</strong> — aunque sea
              con tres cuotas, aunque sea el primer paso — <em>algo cambia</em>.
              Por la declaración que implica. Porque el dinero que pagas hoy
              no es por clases. Es por ti. Por declararte a ti misma que ya
              te priorizas.
            </p>
            <p style={{ textAlign: 'center', fontFamily: "'Fraunces',serif", fontSize: '26px', lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic', marginTop: '28px' }}>
              <strong>Esa declaración es el principio del despertar.</strong>
            </p>
            <div className="final-cta">
              <a
                className="btn primary big"
                href="https://wa.me/584244245783?text=Hola%20Jhana%2C%20quiero%20entrar%20al%20Programa%20Expansi%C3%B3n%20de%207%20semanas"
                target="_blank"
                rel="noopener noreferrer"
              >
                Reservar mi lugar por WhatsApp <span className="arrow">→</span>
              </a>
            </div>
            <div className="whisper">
              Tu Yo del año que viene ya sabe qué vas a decidir.<br />
              Demuéstrale que era la decisión correcta.
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ FOOTER ═════════════ */}
      <footer>
        <div className="container">
          <div className="f-grid">
            <div>
              <h5>Conecta conmigo</h5>
              <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: '22px', lineHeight: 1.3, color: 'var(--cream)', maxWidth: '380px', margin: '0 0 18px' }}>
                Coach especializada en mentalidad de abundancia. Tu expansión comienza con una decisión.
              </p>
              <p style={{ color: 'rgba(244,236,222,.7)', fontSize: '14px', margin: '0 0 4px' }}>
                <a href="mailto:info@jhanaaridi.com">📧 info@jhanaaridi.com</a>
              </p>
              <p style={{ color: 'rgba(244,236,222,.7)', fontSize: '14px', margin: 0 }}>
                <a href="https://wa.me/584244245783" target="_blank" rel="noopener noreferrer">📱 WhatsApp · +58 424-4245783</a>
              </p>
            </div>
            <div>
              <h5>Programas</h5>
              <ul>
                <li><Link href="/">Expansión 10X · 12 semanas</Link></li>
                <li><Link href="/programa-expansion">Programa Expansión · 7 semanas</Link></li>
                <li><a href="#contacto">Sesión 1:1</a></li>
              </ul>
            </div>
            <div>
              <h5>Navegar</h5>
              <ul>
                <li><a href="#metodo">El método</a></li>
                <li><a href="#incluye">Qué incluye</a></li>
                <li><a href="#semanas">Las 7 semanas</a></li>
                <li><a href="#precio">Inversión</a></li>
              </ul>
            </div>
            <div>
              <h5>Redes</h5>
              <ul>
                <li><a href="https://www.instagram.com/jhanaaridi" target="_blank" rel="noopener noreferrer">Instagram</a></li>
                <li><a href="https://www.tiktok.com/@jhanaaridicoach" target="_blank" rel="noopener noreferrer">TikTok</a></li>
                <li><a href="https://youtube.com/@jhanaelaridi5658" target="_blank" rel="noopener noreferrer">YouTube</a></li>
                <li><a href="https://wa.me/584244245783" target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              </ul>
            </div>
          </div>
          <div className="legal">
            <span>© 2026 Jhana El Aridi · Todos los derechos reservados.</span>
            <span>Política de Privacidad · Términos y Condiciones · Garantía de Reembolso</span>
          </div>
        </div>
      </footer>

      <ClientEnhancements />
    </>
  );
}
