import type { Metadata } from 'next';
import Link from 'next/link';
import ClientEnhancements from '@/components/landing/ClientEnhancements';
import './programa.css';

export const metadata: Metadata = {
  title: 'DESPIERTA · Sana tu relación con el dinero en 30 días · Jhana El Aridi',
  description:
    'Mini-programa de 30 días con Jhana El Aridi para sanar tu relación con el dinero desde la raíz. 4 videos, 8 meditaciones, workbook, cohorte privada. $397 USD con garantía de 14 días.',
  openGraph: {
    title: 'DESPIERTA · 30 días para sanar tu relación con el dinero',
    description:
      'Sin teorías financieras. Sin afirmaciones vacías. Solo el trabajo real que cambia tu manera de relacionarte con el dinero — desde la raíz.',
    images: ['/assets/jhana-stage-wide.jpg'],
    type: 'website',
    locale: 'es_LA',
  },
};

const TRANSFORMS = [
  {
    n: '01',
    title: 'Vas a ver, por primera vez con claridad, lo que heredaste.',
    body: 'Vas a mapear tu árbol genealógico del dinero. Identificar las frases que se grabaron en ti. Y entender por qué llevas años repitiendo patrones que ni siquiera son tuyos.',
  },
  {
    n: '02',
    title: 'Vas a identificar tu techo financiero invisible.',
    body: 'Ese número específico al que tu cerebro está calibrado — y que te trae de vuelta cada vez que intentas pasarlo. Vas a verlo en negro sobre blanco. Y por primera vez, vas a tener la herramienta para moverlo.',
  },
  {
    n: '03',
    title: 'Vas a sanar la raíz del merecimiento.',
    body: 'La pregunta más profunda de tu relación con el dinero — «¿yo merezco esto?» — la vas a tocar de frente. Vas a llorar, probablemente. Y vas a salir del otro lado con un permiso interno que llevaba años bloqueado.',
  },
  {
    n: '04',
    title: 'Vas a darle nombre, voz y decisiones a la mujer que estás eligiendo ser.',
    body: 'Tu Yo 4.0. La que rompe el techo. La que merece sin probar nada. La que sana el linaje. Vas a articularla con tal claridad que después de las 4 semanas, ya estará viviendo en ti.',
  },
];

const WEEKS = [
  {
    n: 1,
    title: 'Lo heredado',
    arc: '«Lo que cargo no me define. Solo me explica.»',
    body: 'Vas a descubrir que la mayoría de tus creencias sobre el dinero no son tuyas — son heredadas. Vas a llenar tu árbol genealógico (3 generaciones), identificar la frase más profunda que se grabó en ti, y empezar a soltarla del cuerpo. Es el primer despertar, y es el más liberador.',
  },
  {
    n: 2,
    title: 'El techo invisible',
    arc: '«Veo el termostato. Y al verlo, dejo de obedecerlo.»',
    body: 'Vas a identificar tu termostato financiero con un número específico. Vas a ver el patrón de los últimos 12 meses con ojos nuevos. Y vas a calibrar conscientemente un nuevo techo — empezando a operar desde el nuevo nivel, no solo a soñarlo.',
  },
  {
    n: 3,
    title: 'Merecer',
    arc: '«Yo merezco. Sin probar nada. Sin ganar nada.»',
    body: 'La semana más profunda. Vas a tocar la raíz del merecimiento, sanar a la niña interior que aprendió que merecer era condicional, y soltar la culpa de tener cuando otras no tienen. Probablemente vas a llorar. Y vas a salir del otro lado.',
  },
  {
    n: 4,
    title: 'Tu nueva identidad',
    arc: '«Soy ella. Hoy. Mañana. Siempre.»',
    body: 'Vas a articular por primera vez quién es tu Yo 4.0 — la mujer que estás eligiendo ser. Le vas a dar nombre, decisiones específicas, frases propias. Y vas a vivir 7 días siendo ella — no como ejercicio, sino como práctica real.',
  },
];

const INCLUDES = [
  {
    icon: '📺',
    title: '4 videos de transformación profunda',
    value: '$397',
    desc: 'Uno por semana, grabados en estudio, de 40-45 minutos cada uno. NO son videos genéricos de «abundancia». Cada uno toca un nivel específico: El Despertar · Tu Techo Invisible · Merecer · Tu Nueva Identidad. Cada video viene con su Acción Despertar (ejercicio concreto) y un puente claro a la semana siguiente.',
  },
  {
    icon: '🧘',
    title: '8 meditaciones guiadas',
    value: '$297',
    desc: 'Dos por semana (lunes y jueves), de 9-12 minutos cada una. Diseñadas con frecuencia theta (4-8 Hz) para acceder al estado donde realmente se reescriben las creencias inconscientes. Sin ellas, DESPIERTA es solo educación. Con ellas, es transformación real.',
  },
  {
    icon: '📓',
    title: 'Workbook de 60 páginas',
    value: '$147',
    desc: 'El cuaderno donde haces el trabajo. NO es un cuestionario. Es un objeto sagrado que vas a llenar a mano durante los 30 días. Pre-evaluación inicial, árbol genealógico del dinero, identificación del termostato, las 3 frases del merecimiento, tabla Yo 3.0 vs Yo 4.0, 3 compromisos firmados.',
  },
  {
    icon: '👥',
    title: 'Acceso a la cohorte privada',
    value: '$200',
    desc: 'Un canal privado de WhatsApp donde vives DESPIERTA junto a otras mujeres latinas haciendo el mismo trabajo en el mismo momento. La transformación en aislamiento es más difícil. La transformación en comunidad se sostiene.',
  },
  {
    icon: '🎁',
    title: 'BONUS · Sesión grupal de cierre con Jhana',
    value: '$300',
    desc: 'Al final de las 4 semanas, una sesión en vivo conmigo, con tu cohorte, donde respondemos preguntas, integramos el proceso y armamos el mapa de tus próximos 90 días.',
  },
];

const VALUE_ROWS = [
  ['4 videos de transformación', '$397'],
  ['8 meditaciones guiadas', '$297'],
  ['Workbook de 60 páginas', '$147'],
  ['Cohorte privada', '$200'],
  ['Sesión grupal de cierre', '$300'],
];

const FOR_YOU_YES = [
  'Sientes que tu vida financiera está estancada y no entiendes por qué — ganas pero no acumulas, te esfuerzas pero el techo no se mueve.',
  'Reconoces que cargas algo de tu historia familiar con el dinero, aunque no sepas exactamente qué.',
  'Estás dispuesta a hacer trabajo profundo — no buscas técnicas rápidas, buscas transformación real.',
  'Eres mujer latina (o hombre latino) y reconoces los patrones culturales del sacrificio, la culpa, el «no merezco».',
  'Quieres invertir en ti misma sin tener que comprometer $2,000+ todavía. DESPIERTA es la puerta de entrada accesible al trabajo profundo.',
];

const FOR_YOU_NO = [
  'Buscas técnicas de inversión, trading o «hacerte rica rápido» — esto NO es educación financiera táctica, es trabajo identitario profundo.',
  'Esperas resultados sin hacer el trabajo — este programa requiere que llenes el workbook, hagas las meditaciones, te comprometas con las acciones semanales.',
  'Estás atravesando una crisis emocional severa que requiere atención psicológica profesional. DESPIERTA toca temas profundos pero no sustituye terapia.',
  'No estás dispuesta a mirar tu historia familiar — este programa requiere honestidad con tu pasado, lo que tus padres te transmitieron, lo que aún cargas.',
  'Crees que «el dinero es lo único que importa» — DESPIERTA usa el dinero como puerta para sanar algo más profundo. Si solo te interesa la cifra, este no es tu lugar.',
];

const TESTIMONIALS = [
  {
    quote: 'Llevaba años en terapia. Llevaba años leyendo libros de finanzas. Llevaba años sintiendo que algo en mí se boicoteaba. En 30 días con Jhana entendí más sobre mi relación con el dinero que en 5 años de búsqueda. Identifiqué la frase de mi mamá que llevaba grabada. Y por primera vez, cobré lo que valía sin disculparme.',
    name: 'Carolina M., 34',
    meta: 'Diseñadora gráfica · Bogotá',
    initial: 'C',
  },
  {
    quote: 'Lo que más me sorprendió fue cuánto lloré. No me esperaba eso. Pensé que iba a ser un curso de mentalidad. Pero terminó siendo el trabajo más profundo que he hecho con mi historia. Y los resultados financieros llegaron solos: en los 3 meses siguientes facturé el doble que en los 6 anteriores. Sin trabajar más horas. Trabajando distinto.',
    name: 'María Fernanda L., 38',
    meta: 'Emprendedora · Caracas',
    initial: 'M',
  },
  {
    quote: 'Tenía 47 años y había aceptado que mi vida financiera era «lo que era». Hice DESPIERTA pensando que sería interesante. Salí de las 4 semanas con una identidad distinta. Hoy cobro tres veces más por mi trabajo. Pero más importante: por primera vez en mi vida, recibo sin culpa.',
    name: 'Lucía R., 47',
    meta: 'Consultora · Buenos Aires',
    initial: 'L',
  },
];

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: '¿Cuándo empieza DESPIERTA exactamente?',
    a: <>DESPIERTA es <strong>autónomo</strong>. Puedes empezar el día que pagues. Recibes los accesos en menos de 2 horas, y empiezas con el Video 1 cuando estés lista. La cadencia ideal es un video por semana — pero si necesitas más tiempo, lo manejas a tu ritmo.</>,
  },
  {
    q: '¿Tengo acceso a Jhana directamente?',
    a: <>Tienes acceso a Jhana en la <strong>sesión grupal de cierre</strong> (al final de las 4 semanas) y en la <strong>cohorte privada</strong> donde Jhana participa cuando puede. Para acompañamiento 1:1 directo y semanal con Jhana, ese es el siguiente nivel — <Link href="/" style={{ color: 'var(--clay)', borderBottom: '1px solid var(--clay)' }}>Expansión 10X</Link>.</>,
  },
  {
    q: '¿Cuánto dura mi acceso al material?',
    a: <><strong>Acceso de por vida</strong> a los 4 videos, 8 meditaciones y workbook digital. Los puedes revisitar cuando quieras, las veces que quieras, durante los próximos años.</>,
  },
  {
    q: '¿Puedo hacer DESPIERTA si soy hombre?',
    a: <>Sí. Aunque la mayoría de mi audiencia son mujeres y mucho del lenguaje refleja eso, la programación inconsciente del dinero es transversal. Si te identificas con los patrones — lealtad familiar, sacrificio, «no merezco» — DESPIERTA funciona igual de bien para ti.</>,
  },
  {
    q: '¿Puedo hacer DESPIERTA si no soy latina/o?',
    a: <>Sí, pero ten en cuenta que muchos de los ejemplos y referencias culturales están enraizados en la experiencia latinoamericana. Las herramientas son universales; las anécdotas son específicas a nuestro contexto.</>,
  },
  {
    q: '¿Puedo pagar en cuotas?',
    a: <>Sí, ofrecemos opción de <strong>2 cuotas de $210 USD</strong> (con un pequeño cargo administrativo) para hacerlo más accesible. Selecciona esa opción al checkout.</>,
  },
  {
    q: '¿Y si no me funciona?',
    a: <>Tienes <strong>garantía completa de 14 días</strong>. Si después de 2 semanas sientes que DESPIERTA no es para ti, escríbenos y te devolvemos el 100% de tu inversión, sin preguntas, sin proceso engorroso.</>,
  },
  {
    q: '¿Cómo se diferencia DESPIERTA de otros cursos de mentalidad de abundancia?',
    a: <>La mayoría de los cursos de «abundancia» son afirmaciones positivas y visualizaciones genéricas. DESPIERTA es trabajo identitario profundo basado en psicología transgeneracional, neuroplasticidad y herramientas somáticas. Aquí no te dicen «piensa positivo» — aquí mapeas tu historia, identificas patrones específicos, y reescribes desde la raíz.</>,
  },
  {
    q: '¿Voy a ver resultados financieros concretos en 30 días?',
    a: <>Algunas mujeres sí — empiezan a cobrar más, dejan de regalar su trabajo, toman decisiones financieras distintas. Pero <strong>DESPIERTA no es un programa de resultados financieros rápidos</strong>. Es un programa de transformación identitaria. Los resultados financieros son una consecuencia natural — pero llegan en su propio tiempo, generalmente entre 60 y 180 días después.</>,
  },
  {
    q: '¿Qué viene después de DESPIERTA?',
    a: <>DESPIERTA es la puerta. Si después de las 4 semanas quieres ir más profundo, existe <strong><Link href="/" style={{ color: 'var(--clay)', borderBottom: '1px solid var(--clay)' }}>EXPANSIÓN 10X</Link></strong> — el programa principal de 12 semanas, con coach personal, sesiones individuales, retiro de cierre y método completo. Las graduadas de DESPIERTA reciben información completa al final, con un descuento del 20% si deciden continuar. Pero esa decisión es 100% tuya.</>,
  },
];

export default function DespertaPage() {
  return (
    <>
      <nav className="top" id="nav">
        <Link className="brand" href="/" aria-label="Jhana El Aridi">
          <span className="script">Jhana</span>
          <span className="sub">EL ARIDI</span>
        </Link>
        <ul>
          <li><a href="#promesa">La promesa</a></li>
          <li><a href="#incluye">Qué incluye</a></li>
          <li><a href="#semanas">Las 4 semanas</a></li>
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#precio">Inversión</a></li>
        </ul>
        <div className="nav-cluster">
          <Link className="nav-login" href="/login">Iniciar sesión</Link>
          <Link className="cta-nav" href="#precio">
            <span className="dot" /> Empezar DESPIERTA
          </Link>
        </div>
      </nav>

      {/* ════════════════ 01 · ABOVE THE FOLD ════════════════ */}
      <header className="hero p7-hero despierta-hero">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="p7-hero-bg"
          src="/assets/jhana-stage-wide.jpg"
          alt="Jhana El Aridi"
          aria-hidden="true"
        />
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="bar" />
              <span className="mono">DESPIERTA · Mini-programa · Con Jhana El Aridi</span>
            </div>
            <h1 className="display">
              Sana tu relación<br />
              con el <em>dinero</em><br />
              en <em>30 días</em>.
            </h1>
            <p className="lede">
              <strong>Y descubre por qué, hagas lo que hagas, vuelves siempre al
              mismo nivel financiero.</strong> Sin teorías financieras. Sin afirmaciones
              vacías. Solo el trabajo real — el que casi nadie hace — que
              cambia, desde la raíz, tu manera de relacionarte con el dinero.
            </p>
            <div className="ctas">
              <a className="btn primary big" href="#precio">
                Empezar DESPIERTA · $397 USD <span className="arrow">→</span>
              </a>
            </div>
            <div className="subcta">
              30 días · Acceso inmediato · Garantía completa de 14 días
            </div>
          </div>
        </div>
      </header>

      {/* ════════════════ Ticker ════════════════ */}
      <div className="ticker" aria-hidden="true">
        <div className="track">
          <span><i />lo heredado</span><span><i />techo invisible</span>
          <span><i />merecer sin culpa</span><span><i />tu Yo 4.0</span>
          <span><i />reescribir la raíz</span><span><i />sanar el linaje</span>
          <span><i />lo heredado</span><span><i />techo invisible</span>
          <span><i />merecer sin culpa</span><span><i />tu Yo 4.0</span>
          <span><i />reescribir la raíz</span><span><i />sanar el linaje</span>
        </div>
      </div>

      {/* ════════════════ 02 · HOOK EMOCIONAL ════════════════ */}
      <section className="sec reveal">
        <div className="container-narrow">
          <div className="s-head">
            <span className="s-idx">— 01 / Déjame adivinar</span>
          </div>
          <div className="prose">
            <p>
              Ganas más que hace 5 años, pero el mes a mes se siente igual.
              Te aumentaron el sueldo, conseguiste un cliente nuevo, te llegó
              un bono — y a los pocos meses, el dinero ya no estaba.
            </p>
            <p>
              Trabajas mucho. Eres responsable. Eres inteligente. Y aun así,
              sientes que el dinero <strong>se te escapa entre los dedos</strong>. Que
              ganes lo que ganes, <strong>siempre vuelves al mismo punto</strong>.
            </p>
            <p>
              Tal vez ya leíste libros. Tal vez ya intentaste presupuestos,
              hojas de cálculo, apps de finanzas. Tal vez incluso hiciste
              cursos de «mentalidad de abundancia» que no movieron nada.
            </p>
            <p>
              Y la pregunta que ya no te dejas hacer en voz alta es:{' '}
              <em>¿por qué a mí me cuesta tanto?</em>
            </p>
          </div>
        </div>
      </section>

      <section className="sec dark reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 02 / La verdad incómoda</span>
            <h2>
              Te voy a decir algo que probablemente <em>no quieres</em> escuchar.
            </h2>
          </div>
          <div className="truth-card">
            <span className="truth-pill">El problema no son tus hábitos</span>
            <h3>El problema está mucho más <em>profundo</em>.</h3>
            <p>
              No es que no sepas presupuestar. No es que necesites otra app.
              No es que te falte disciplina.
            </p>
            <p>
              Está en una <strong>programación inconsciente</strong> que se grabó en ti
              antes de los 7 años. Una programación que tú no elegiste. Una
              programación que viene de tu mamá, de tu papá, de tus abuelos —
              y de los abuelos de tus abuelos.
            </p>
            <p>
              Esa programación es la que hoy decide, sin que te des cuenta,
              cuánto te permites cobrar. Cuánto te permites ahorrar. Cuánto
              te permites tener.
            </p>
            <p>
              Y mientras esa programación esté operando, <em>ningún libro,
              ningún curso, ninguna técnica financiera va a funcionar</em>.
            </p>
            <p>
              <strong>Por eso DESPIERTA existe.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ 03 · LA PROMESA ════════════════ */}
      <section id="promesa" className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 03 / Lo que vas a vivir en 30 días</span>
            <h2>
              DESPIERTA no es un curso.<br />
              Es un <em>proceso</em>.
            </h2>
            <p className="kicker">
              Al final de las 4 semanas, vas a haber hecho — paso a paso — el
              trabajo más importante que se puede hacer con el dinero.
            </p>
          </div>

          <div className="p7-pillars">
            {TRANSFORMS.map((t) => (
              <div key={t.n} className="p7-pillar">
                <div className="pp-num">{t.n}</div>
                <span className="pp-label">Transformación</span>
                <h4>{t.title}</h4>
                <p>{t.body}</p>
              </div>
            ))}
          </div>

          <p className="prose-tag">
            Esto no es teoría. Es <em>trabajo real</em>, guiado paso a paso,
            durante 30 días.
          </p>
        </div>
      </section>

      {/* ════════════════ 04 · QUIÉN SOY ════════════════ */}
      <section className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 04 / Quién te está hablando</span>
            <h2>
              Hola, soy <em>Jhana</em>.
            </h2>
          </div>
          <div className="story">
            <div className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/jhana-laughing.jpg"
                alt="Jhana El Aridi"
                loading="lazy"
              />
              <div className="meta">Jhana El Aridi · Coach</div>
            </div>
            <div className="copy">
              <h3>
                Coach de mentalidad de abundancia · <em>+1.500</em> mujeres latinas acompañadas.
              </h3>
              <p>
                Antes de los escenarios, antes de los programas, antes de los
                testimonios — yo era una mujer atrapada exactamente donde tú
                estás hoy.
              </p>
              <p>
                Crecí en una casa donde el dinero era un tema doloroso.{' '}
                <em>«No alcanza»</em>. <em>«Es muy caro»</em>. <em>«Espera al
                próximo mes»</em>. Mi mamá hacía malabares para que todo
                cuadrara, y yo, sin entender nada, absorbí algo importante:
                tener dinero es difícil, y siempre falta.
              </p>
              <p>
                Cuando me hice adulta y empecé a ganar bien, <strong>el dinero se me
                iba</strong>. Invariablemente. Cada vez que lograba acumular un poco,
                aparecía algo: una emergencia, una mala inversión, un préstamo
                que tenía que hacer. Como si mi vida entera estuviera
                diseñada para que yo nunca terminara con dinero acumulado.
              </p>
              <p>
                Tardé años en darme cuenta de qué pasaba. No era mala suerte.
                No era el universo en mi contra.{' '}
                <strong>Era mi programación inconsciente operando, las 24 horas del día, sin que yo la viera.</strong>
              </p>
              <p>
                El día que la vi, todo cambió. Y mi propósito desde entonces
                es simple: <em>ayudarte a ver la tuya</em>. Para que dejes de
                operar desde una historia que no elegiste. Para que empieces
                a vivir desde la mujer que sí.
              </p>
              <p>
                <strong>DESPIERTA</strong> es la condensación de todo lo que aprendí. La
                puerta de entrada al trabajo más importante de tu vida
                financiera.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 05 · QUÉ INCLUYE ════════════════ */}
      <section id="incluye" className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 05 / Qué incluye exactamente</span>
            <h2>
              Todo lo que <em>recibes</em> con DESPIERTA.
            </h2>
          </div>

          <div className="p7-includes-row">
            <div className="despierta-includes">
              {INCLUDES.map((item, i) => (
                <div key={i} className="d-incl">
                  <div className="di-head">
                    <div className="di-icon">{item.icon}</div>
                    <div className="di-titles">
                      <strong>{item.title}</strong>
                      <span className="di-value">Valor: {item.value}</span>
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </div>
              ))}
            </div>

            <aside className="p7-live-card" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/jhana-stage-mic.jpg"
                alt="Jhana en sesión en vivo"
                loading="lazy"
              />
              <div className="plc-overlay">
                <span className="mono">— Sesión grupal de cierre</span>
                <h4>
                  En vivo conmigo,<br />
                  con tu <em>cohorte</em>.
                </h4>
                <p>
                  Al final de las 4 semanas integramos el proceso, respondemos
                  preguntas y armamos juntas el mapa de los próximos 90 días.
                </p>
              </div>
            </aside>
          </div>

          {/* Value table */}
          <div className="value-table" style={{ marginTop: 56 }}>
            {VALUE_ROWS.map(([item, price]) => (
              <div key={item} className="value-row">
                <div className="item">{item}</div>
                <div className="price">{price}</div>
              </div>
            ))}
            <div className="value-row total">
              <div className="item">VALOR TOTAL</div>
              <div className="price">$1,341 USD</div>
            </div>
          </div>
          <div className="value-highlight">
            Tu inversión hoy: <strong>$397 USD</strong><br />
            <span style={{ fontSize: '.7em', color: 'var(--ink-2)' }}>
              menos del 30% del valor real del programa.
            </span>
          </div>

          <div className="puerta-note">
            <p>
              <em>«Mi propósito no es que esto sea un producto. Mi propósito
              es que sea una puerta. Y las puertas tienen que ser accesibles
              para quien necesita atravesarlas.»</em>
            </p>
            <span className="puerta-sig">— Jhana</span>
          </div>
        </div>
      </section>

      {/* ════════════════ 06 · CÓMO FUNCIONA · 4 SEMANAS ════════════════ */}
      <section id="semanas" className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 06 / Cómo funciona</span>
            <h2>
              Tu mes con DESPIERTA.<br />
              <em>Semana</em> a <em>semana</em>.
            </h2>
            <p className="kicker">
              Cada semana tiene una frase ancla. Cada semana abre una capa
              más profunda. Cada semana construye sobre la anterior.
            </p>
          </div>

          <div className="p7-weeks">
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

          <div className="commit-card">
            <div className="cc-tag">— Tu compromiso</div>
            <h3>
              <em>4-6 horas</em> a la semana. Distribuidas como tú prefieras.
            </h3>
            <p>
              DESPIERTA NO requiere que dejes tu trabajo, tu familia, tu vida.
              Solo requiere consistencia.
            </p>
            <ul className="cc-list">
              <li><span>1 video por semana</span><span className="t">40-45 min</span></li>
              <li><span>2 meditaciones por semana</span><span className="t">~20 min total</span></li>
              <li><span>Ejercicios del workbook</span><span className="t">3-4 horas</span></li>
              <li><span>Cohorte privada (opcional)</span><span className="t">a tu ritmo</span></li>
            </ul>
            <p className="cc-foot">
              Si tienes 30 minutos al día durante 30 días, tienes lo que se
              necesita. <strong>Pero tienen que ser 30 minutos honestos</strong> — sin
              pantallas, sin apuros, presente con el trabajo.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════ 07 · PARA QUIÉN ES ════════════════ */}
      <section className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 07 / Para quién es DESPIERTA</span>
            <h2>¿Es <em>para ti</em>?</h2>
            <p className="kicker">
              Prefiero ser clara antes que venderte algo que no es para ti.
              Lee las dos columnas con honestidad.
            </p>
          </div>
          <div className="foryou-grid">
            <div className="fy-col yes">
              <h4>DESPIERTA es para ti si…</h4>
              <ul>
                {FOR_YOU_YES.map((line, i) => (
                  <li key={i}><span className="mark">✓</span><span>{line}</span></li>
                ))}
              </ul>
            </div>
            <div className="fy-col no">
              <h4>DESPIERTA NO es para ti si…</h4>
              <ul>
                {FOR_YOU_NO.map((line, i) => (
                  <li key={i}><span className="mark">✗</span><span>{line}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 08 · TESTIMONIOS ════════════════ */}
      <section id="testimonios" className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 08 / Testimonios</span>
            <h2>Lo que dicen mujeres que <em>ya pasaron</em> por mi trabajo.</h2>
          </div>
          <div className="testi-grid">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testi">
                <p className="quote">«{t.quote}»</p>
                <div className="who">
                  <div className="avatar">{t.initial}</div>
                  <div>
                    <p className="name">{t.name}</p>
                    <div className="meta">{t.meta}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 09 · FAQ ════════════════ */}
      <section className="sec reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 09 / Preguntas frecuentes</span>
            <h2>Lo que <em>tal vez</em> estás pensando.</h2>
          </div>
          <div className="faq-list">
            {FAQS.map((f, i) => (
              <details key={i} className="faq">
                <summary>{f.q}<span className="plus">+</span></summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 10 · GARANTÍA ════════════════ */}
      <section className="guarantee reveal">
        <div className="container">
          <div className="guarantee-inner">
            <div className="seal" aria-hidden="true">
              <div className="big">14</div>
              <div className="small">días</div>
            </div>
            <div>
              <span className="s-idx" style={{ color: 'var(--earth)' }}>— 10 / Mi garantía contigo</span>
              <h3>14 días <em>sin riesgo</em>.</h3>
              <p>
                Empieza DESPIERTA hoy. Mira el primer video. Haz la primera
                meditación. Llena las primeras páginas del workbook.
              </p>
              <p>
                Si en los primeros 14 días sientes que <strong>DESPIERTA no es lo
                que esperabas, no es lo que necesitas, o simplemente no es tu
                momento</strong> — escríbeme a{' '}
                <a href="mailto:hola@jhanaaridi.com" style={{ color: 'var(--clay)', borderBottom: '1px solid var(--clay)' }}>hola@jhanaaridi.com</a>{' '}
                y te devuelvo el 100% de tu inversión.
              </p>
              <p>
                Sin preguntas. Sin formularios largos. Sin «espera 30 días
                para procesar». Te respondemos en menos de 48 horas y
                procesamos el reembolso de inmediato.
              </p>
              <p>
                <strong>¿Por qué ofrezco esta garantía?</strong> Porque sé que DESPIERTA
                funciona. Porque las mujeres que se comprometen con el
                proceso lo terminan transformadas. Y porque prefiero perder
                una venta que retener a alguien que no está lista.
              </p>
              <div className="sig">— Tu transformación o tu dinero. Esa es mi promesa. Jhana.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 11 · PRECIO + CTA ════════════════ */}
      <section id="precio" className="sec reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 11 / Tu inversión hoy</span>
            <h2>
              <em>$397 USD</em>. Pago único.<br />
              O 2 cuotas de $210 USD.
            </h2>
            <p className="kicker" style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              Acceso inmediato · Garantía de 14 días · Acceso de por vida al material.
            </p>
          </div>

          <div className="despierta-pay">
            <div className="dp-card primary">
              <div className="dp-eyebrow">— Recomendado</div>
              <div className="dp-title">DESPIERTA · Pago único</div>
              <div className="dp-amount">$397<em>USD</em></div>
              <ul className="dp-features">
                <li>4 videos de transformación profunda</li>
                <li>8 meditaciones guiadas en estado theta</li>
                <li>Workbook completo de 60 páginas</li>
                <li>Acceso a la cohorte privada</li>
                <li>Sesión grupal de cierre con Jhana</li>
                <li>Acceso de por vida al material</li>
                <li>Garantía completa de 14 días</li>
              </ul>
              <a className="btn primary big" href="https://wa.me/584244245783?text=Hola%2C%20quiero%20empezar%20DESPIERTA%20con%20pago%20%C3%BAnico%20de%20%24397%20USD" target="_blank" rel="noopener noreferrer">
                Sí, quiero empezar DESPIERTA <span className="arrow">→</span>
              </a>
              <span className="dp-note">Me uno al programa por $397 USD</span>
            </div>

            <div className="dp-card alt">
              <div className="dp-eyebrow">— Alternativa</div>
              <div className="dp-title">2 cuotas</div>
              <div className="dp-amount">$210<em>USD</em></div>
              <div className="dp-sub">2 pagos · Total $420</div>
              <p className="dp-text">
                Para hacerlo más accesible. Primera cuota al inscribirte,
                segunda a los 30 días. Mismo acceso completo.
              </p>
              <a className="btn ghost" href="https://wa.me/584244245783?text=Hola%2C%20quiero%20empezar%20DESPIERTA%20en%202%20cuotas%20de%20%24210%20USD" target="_blank" rel="noopener noreferrer">
                Quiero pagar en 2 cuotas <span className="arrow">→</span>
              </a>
            </div>
          </div>

          <div className="methods">
            <div className="methods-title">Formas de pago aceptadas</div>
            <div className="methods-list">
              <span>💳 Tarjeta (Stripe)</span>
              <span>💸 Zelle</span>
              <span>🏦 Transferencia</span>
              <span>💰 PayPal</span>
              <span>₿ Binance</span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 12 · PD · ÚLTIMA CARTA ════════════════ */}
      <section className="close-sec reveal">
        <div className="container">
          <div className="close-inner">
            <span className="s-idx" style={{ color: 'var(--gold)' }}>— P.D. · Una última cosa</span>
            <h2>
              Si llegaste hasta <em>aquí</em><br />
              leyendo, algo dentro de ti<br />
              <em>reconoció</em> algo.
            </h2>
            <p>
              Tal vez la frase que tu mamá decía sobre el dinero. Tal vez el
              patrón de «siempre vuelvo al mismo nivel». Tal vez la culpa
              silenciosa cuando recibes algo bueno.
            </p>
            <p>
              <strong>Eso que reconociste no se va a ir solo.</strong>
            </p>
            <p>
              Llevas años — tal vez décadas — operando desde esa programación.
              No se va a desinstalar porque cierres esta página. Y tampoco
              se va a desinstalar leyendo otro libro, escuchando otro
              podcast, o esperando «el momento correcto».{' '}
              <em>El momento correcto no existe</em>. La energía correcta no
              aparece sola. <strong>Las cosas cambian cuando decidimos cambiarlas.</strong>
            </p>
            <p>
              Yo decidí cambiar la mía hace años. Y mi vida — financiera,
              profesional, emocional — es completamente otra hoy.
            </p>
            <p>
              DESPIERTA es la condensación de todo lo que aprendí.{' '}
              <em>30 días. $397. La inversión más rentable que vas a hacer este año</em>{' '}
              — no por el dinero que vas a ganar (que vas a ganar), sino por
              la mujer que vas a empezar a ser.
            </p>
            <p>
              Si tu intuición te está diciendo que sí, escúchala. Si tu
              intuición te está diciendo que esperes, también escúchala.
              <strong> Pero no escuches al miedo</strong>. El miedo siempre dice «no».
              Y si fuiste leyendo hasta aquí, no es miedo lo que te trajo.
            </p>
            <p style={{ textAlign: 'center', fontFamily: "'Fraunces',serif", fontSize: '24px', lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic', marginTop: '32px' }}>
              Te espero adentro.<br />Con amor, <strong>Jhana</strong>.
            </p>

            <div className="final-cta">
              <a className="btn primary big" href="#precio">
                Empezar DESPIERTA ahora · $397 <span className="arrow">→</span>
              </a>
            </div>
            <div className="whisper">
              Acceso inmediato · Garantía de 14 días
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ Bridge a Expansión 10X (sutil) ════════════════ */}
      <section className="sec earth reveal">
        <div className="container">
          <div className="bridge-card">
            <div className="bc-side">
              <span className="mono">— ¿Y después de DESPIERTA?</span>
              <h3>Si quieres ir <em>más profundo</em>, hay un camino.</h3>
            </div>
            <div className="bc-body">
              <p>
                DESPIERTA es la <strong>puerta de entrada</strong>. Para quien complete las
                4 semanas y sienta el llamado de seguir, existe{' '}
                <strong>Expansión 10X</strong> — el programa principal de 12 semanas con
                coach personal, sesiones individuales y retiro de cierre.
              </p>
              <p style={{ color: 'var(--ink-3)', fontSize: 14 }}>
                Sin presión. Las graduadas de DESPIERTA reciben información
                completa al final, con un descuento del 20% si deciden continuar.
              </p>
              <Link className="btn ghost" href="/">
                Conocer Expansión 10X →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ FOOTER ════════════════ */}
      <footer>
        <div className="container">
          <div className="f-grid">
            <div>
              <h5>Conecta conmigo</h5>
              <p style={{ fontFamily: "'Fraunces',serif", fontWeight: 300, fontSize: '22px', lineHeight: 1.3, color: 'var(--cream)', maxWidth: '380px', margin: '0 0 18px' }}>
                Coach especializada en mentalidad de abundancia. Tu expansión comienza con una decisión.
              </p>
              <p style={{ color: 'rgba(244,236,222,.7)', fontSize: '14px', margin: '0 0 4px' }}>
                <a href="mailto:hola@jhanaaridi.com">📧 hola@jhanaaridi.com</a>
              </p>
              <p style={{ color: 'rgba(244,236,222,.7)', fontSize: '14px', margin: 0 }}>
                <a href="https://wa.me/584244245783" target="_blank" rel="noopener noreferrer">📱 WhatsApp · +58 424-4245783</a>
              </p>
            </div>
            <div>
              <h5>Programas</h5>
              <ul>
                <li><Link href="/">Expansión 10X · 12 semanas</Link></li>
                <li><Link href="/programa-expansion">DESPIERTA · 30 días</Link></li>
              </ul>
            </div>
            <div>
              <h5>Navegar</h5>
              <ul>
                <li><a href="#promesa">La promesa</a></li>
                <li><a href="#incluye">Qué incluye</a></li>
                <li><a href="#semanas">Las 4 semanas</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
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
            <span>Política de Privacidad · Términos · Garantía de Reembolso</span>
          </div>
        </div>
      </footer>

      <ClientEnhancements />
    </>
  );
}
