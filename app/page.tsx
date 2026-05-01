import Link from 'next/link';
import ClientEnhancements from '@/components/landing/ClientEnhancements';

export default function LandingPage() {
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
          <li><a href="#testimonios">Testimonios</a></li>
          <li><a href="#precio">Inversión</a></li>
          <li><a href="#faq">Preguntas</a></li>
          <li><Link className="nav-pill" href="/programa-expansion">Programa 7 sem</Link></li>
        </ul>
        <div className="nav-cluster">
          <Link className="nav-login" href="/login">Iniciar sesión</Link>
          <Link className="cta-nav" href="/registro">
            <span className="dot" /> Crear cuenta
          </Link>
        </div>
      </nav>

      {/* ═════════════ 01 · HERO (video background) ═════════════ */}
      <header className="hero">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/assets/jhana-hero.jpg"
          aria-hidden="true"
        >
          <source src="/assets/hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="container">
          <div className="hero-content">
            <div className="eyebrow">
              <span className="bar" />
              <span className="mono">
                Expansión 10X · Con Jhana El Aridi · Coach de abundancia
              </span>
            </div>
            <h1 className="display">
              Si sabes que viniste a <em>más</em>, pero algo invisible te frena
              — <em>este</em> es el camino que llevabas años buscando sin
              saberlo.
            </h1>
            <p className="lede">
              <strong>Expansión 10X</strong> — un programa de 12 semanas para
              sanar tu relación con el dinero, reprogramar tu merecimiento y
              construir la estructura financiera real que te compra la
              libertad.
            </p>
            <div className="ctas">
              <a className="btn primary big" href="#precio">
                Quiero mi lugar en Expansión 10X{' '}
                <span className="arrow">→</span>
              </a>
            </div>
            <div className="subcta">
              Cupos limitados · Escríbenos para conocer la próxima apertura ·
              Inversión desde $2,500 USD
            </div>
          </div>
        </div>
      </header>

      {/* ═════════════ Ticker ═════════════ */}
      <div className="ticker" aria-hidden="true">
        <div className="track">
          <span><i />abundancia</span><span><i />merecer sin culpa</span>
          <span><i />soltar la escasez</span><span><i />dinero como herramienta</span>
          <span><i />identidad</span><span><i />fondo de libertad</span>
          <span><i />expansión</span>
          <span><i />abundancia</span><span><i />merecer sin culpa</span>
          <span><i />soltar la escasez</span><span><i />dinero como herramienta</span>
          <span><i />identidad</span><span><i />fondo de libertad</span>
          <span><i />expansión</span>
        </div>
      </div>

      {/* ═════════════ 02 · RECONOCIMIENTO DEL DOLOR ═════════════ */}
      <section className="sec reveal">
        <div className="container-narrow">
          <div className="s-head">
            <span className="s-idx">— 01 / Probablemente esta seas tú</span>
          </div>
          <div className="prose">
            <p>
              Probablemente llegaste aquí porque sientes que{' '}
              <strong>vienes haciendo todo bien</strong> y sin embargo no ves
              los resultados que deberías estar viendo.
            </p>
            <p>
              Trabajas. Te esfuerzas. Estudias. Aprendes. Y sin embargo{' '}
              <strong>el dinero no se queda contigo</strong>. O cuando llega,
              te genera más ansiedad que alivio. Cobras menos de lo que sabes
              que vales. Das descuentos que nadie te pidió. Te sientes culpable
              cuando tienes algo bueno. Te haces pequeña para que otros no se
              sientan incómodos.
            </p>
            <p>
              Y mientras tanto ves a otras personas — no necesariamente más
              talentosas que tú — vivir con una soltura financiera que tú no
              logras. Y te preguntas, silenciosamente:{' '}
              <em>¿qué tienen ellas que yo no tengo?</em>
            </p>
            <p>
              La respuesta no es lo que crees. No es más educación financiera.
              No es trabajar más horas. No es más disciplina.{' '}
              <em>Es otra cosa.</em> Algo mucho más profundo. Y en este
              programa lo vamos a desarmar pieza por pieza.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════ 03 · LA VERDAD (neurociencia) ═════════════ */}
      <section className="sec dark reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 02 / La verdad que nadie te dijo</span>
            <h2>
              La razón por la que nada de lo que <em>intentaste</em> hasta hoy
              funcionó.
            </h2>
          </div>
          <div className="truth-card">
            <span className="truth-pill">
              Neurociencia · Sistema Reticular Activador
            </span>
            <h3>
              Tu cerebro tiene un filtro que decide qué oportunidades{' '}
              <em>ves</em> y cuáles <em>no</em>.
            </h3>
            <p>
              Y ese filtro está calibrado según quién crees que eres. Si
              inconscientemente crees que{' '}
              <em>&ldquo;no eres buena con el dinero&rdquo;</em>, tu cerebro
              literalmente{' '}
              <strong>descarta las oportunidades de ingresos</strong> antes de
              que lleguen a tu conciencia. No porque no estén — están ahí todo
              el tiempo — sino porque tu filtro las tacha como &ldquo;no para
              mí&rdquo;.
            </p>
            <p>
              Eso se llama <strong>Sistema Reticular Activador</strong>. Y es
              neurociencia pura.
            </p>
            <p>
              Por eso dos mujeres con el mismo talento, la misma formación, la
              misma industria, tienen vidas radicalmente distintas.{' '}
              <em>No es suerte. Es identidad.</em> Una cree que merece, la otra
              cree que no. Y el cerebro obedece a esa creencia con una
              fidelidad total.
            </p>
            <p>
              Ahora — y esto es lo más doloroso — la identidad que cargas hoy{' '}
              <strong>no la elegiste tú</strong>. Te la construyeron en la
              infancia. Etiquetas que te pusieron. Creencias sobre el dinero
              que escuchaste en tu casa antes de los 7 años. Un linaje de
              escasez que viene de generaciones. Emociones densas — culpa,
              vergüenza, miedo — que se grabaron sin que te dieras cuenta.
            </p>
            <p>
              Y si no las desarmas,{' '}
              <strong>vas a repetir el mismo resultado toda tu vida</strong>.
              Por más que te esfuerces. Por más cursos que tomes. Por más
              libros que leas.
            </p>
            <p>
              Porque la información no reprograma el subconsciente. La
              información no mueve la identidad.{' '}
              <em>
                Solo un proceso estructurado, emocional y de acción real lo
                hace.
              </em>
            </p>
            <p>
              <strong>
                Y ese proceso es lo que vas a vivir en Expansión 10X.
              </strong>
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════ 04 · HISTORIA DE JHANA ═════════════ */}
      <section className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 03 / Quién te está hablando</span>
            <h2>
              De la carencia emocional<br />
              a una vida <em>expansiva</em>.
            </h2>
          </div>
          <div className="story">
            <div className="photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/jhana-story.jpg"
                alt="Jhana El Aridi — retrato íntimo"
                loading="lazy"
              />
              <div className="meta">Jhana El Aridi · Coach</div>
            </div>
            <div className="copy">
              <h3>
                Soy <em>Jhana</em> — y durante años yo también creí que el
                problema era mío.
              </h3>
              <p>
                Crecí en una familia donde el dinero era tema de tensión.
                Estudié bioanálisis — ciencia dura — porque necesitaba
                certezas. En mi adolescencia atravesé una depresión profunda y
                una condición de salud que parecía imposible de superar.
                Temblaba de miedo cada vez que tenía que hablar en público.
              </p>
              <p>
                Y con todo eso, cargaba una creencia que no sabía que cargaba:{' '}
                <strong>
                  que yo era &ldquo;la enferma&rdquo;, &ldquo;la que no
                  podía&rdquo;, &ldquo;la que tenía que conformarse con
                  menos&rdquo;
                </strong>
                . Y mi vida entera obedecía a esa programación.
              </p>
              <p>
                Hasta que descubrí que{' '}
                <em>la identidad no es destino — es programación</em>. Y la
                programación se puede reescribir.
              </p>
              <p>
                Hice el trabajo. Pasé de ser víctima de mi salud a usarla de
                inspiración. Del miedo paralizante a educar a{' '}
                <strong>más de 1.000 personas en un solo escenario</strong>.
                De la carencia emocional a construir una vida y un negocio
                alineados con mi propósito.
              </p>
              <p>
                En los últimos 5 años acompañé a{' '}
                <strong>más de 1.500 personas</strong> en su camino de sanación
                con el dinero, a través de mis programas{' '}
                <em>Una Vida Contigo</em> y <em>Expansión</em>, y mi
                conferencia <em>¿Qué piensas del dinero?</em>. Trabajo también
                con equipos corporativos despertando consciencia y elevando
                potencial.
              </p>
              <p>
                Me certifiqué en oratoria con Ismael Cala. Pero más importante
                que cualquier certificación:{' '}
                <strong>yo viví lo que enseño</strong>. No te voy a hablar
                desde la teoría. Te voy a hablar desde lo que me funcionó, lo
                que falló, y lo que terminó siendo método replicable.
              </p>
              <p>
                Y ese método — destilado, ordenado y amplificado — es lo que
                vas a recibir en <em>Expansión 10X</em>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 05 · PARA QUIÉN ES ═════════════ */}
      <section className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 04 / Selección honesta</span>
            <h2>¿Este programa es <em>para ti</em>?</h2>
            <p className="kicker">
              Prefiero ser clara antes que venderte algo que no es para ti. Lee
              las dos columnas con honestidad.
            </p>
          </div>
          <div className="foryou-grid">
            <div className="fy-col yes">
              <h4>Es para ti si…</h4>
              <ul>
                <li><span className="mark">✓</span><span>Sabes que tienes mucho más potencial del que estás expresando hoy.</span></li>
                <li><span className="mark">✓</span><span>Tienes una relación tensa con el dinero — culpa, miedo, vergüenza, ansiedad — que ya no quieres seguir cargando.</span></li>
                <li><span className="mark">✓</span><span>Te sientes estancada en un nivel de ingresos que sabes que está por debajo de lo que puedes ganar.</span></li>
                <li><span className="mark">✓</span><span>Eres profesional, emprendedora, líder o persona con mentalidad de crecimiento y buscas resultados reales: más claridad, más dinero, más paz interna.</span></li>
                <li><span className="mark">✓</span><span>Estás cansada de vivir desde el &quot;deber ser&quot;, la lealtad familiar o el sacrificio — y quieres empezar a vivir desde el merecimiento y la elección.</span></li>
                <li><span className="mark">✓</span><span>Ya probaste otras cosas — terapia, cursos, libros — y sientes que llegaste a un techo que no sabes cómo romper.</span></li>
                <li><span className="mark">✓</span><span>Estás dispuesta a dedicar 4-6 horas por semana durante 3 meses para hacer un trabajo real.</span></li>
              </ul>
            </div>
            <div className="fy-col no">
              <h4>No es para ti si…</h4>
              <ul>
                <li><span className="mark">✗</span><span>Buscas una fórmula para hacerte rica rápido sin trabajar internamente.</span></li>
                <li><span className="mark">✗</span><span>No estás dispuesta a mirar tus heridas emocionales y familiares con honestidad.</span></li>
                <li><span className="mark">✗</span><span>Quieres soluciones mágicas, afirmaciones vacías o &quot;pensamiento positivo&quot; sin método.</span></li>
                <li><span className="mark">✗</span><span>No puedes comprometer el tiempo semanal que el programa requiere.</span></li>
                <li><span className="mark">✗</span><span>Todavía no llegaste al punto de estar cansada del patrón — y decidida a cambiarlo.</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 06 · EL MÉTODO · 3 FASES ═════════════ */}
      <section id="metodo" className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 05 / El método</span>
            <h2>
              El método: <em>3 fases</em>,<br />
              12 semanas, una transformación completa.
            </h2>
            <p className="kicker">
              Cada fase tiene su propio objetivo. Cada semana construye sobre
              la anterior. Cuando sales de la fase 3, la persona que entró ya
              no existe.
            </p>
          </div>
          <div className="phases">
            <div className="phase">
              <span className="ph-label">Fase 01 · Semanas 1-4</span>
              <div className="ph-num">01</div>
              <h4>Reset — Ver y Soltar</h4>
              <div className="weeks">Arqueología emocional</div>
              <p className="arc">
                <strong>Arco:</strong> iluminamos la programación heredada —
                etiquetas, linaje financiero, emociones densas, creencias de
                merecimiento — para poder soltarla.
              </p>
              <ul className="modules">
                <li><span className="wk">SEM 01</span>Identidad y etiquetas heredadas</li>
                <li><span className="wk">SEM 02</span>El dinero en tu árbol familiar</li>
                <li><span className="wk">SEM 03</span>El peso invisible — culpa, vergüenza, miedo</li>
                <li><span className="wk">SEM 04</span>Merecer sin sacrificio</li>
              </ul>
              <div className="salida">
                <span className="mono">Sales con</span>
                Tu Autobiografía Pre-Expansión — documento que consolida quién
                fuiste, qué te programaron y qué cargaste que no era tuyo.
              </div>
            </div>

            <div className="phase">
              <span className="ph-label">Fase 02 · Semanas 5-8</span>
              <div className="ph-num">02</div>
              <h4>Reprogramación — La Nueva Versión</h4>
              <div className="weeks">Estructura financiera real</div>
              <p className="arc">
                <strong>Arco:</strong> construyes el sistema financiero que
                sostiene la nueva mentalidad. La fase que casi ningún programa
                de abundancia tiene.
              </p>
              <ul className="modules">
                <li><span className="wk">SEM 05</span>El techo invisible y cómo moverlo</li>
                <li><span className="wk">SEM 06</span>¿Qué piensas del dinero? · Masterclass en vivo</li>
                <li><span className="wk">SEM 07</span>Automatización del Fondo de Libertad</li>
                <li><span className="wk">SEM 08</span>Tu dinero tiene 3 vidas — arquitectura completa</li>
              </ul>
              <div className="salida">
                <span className="mono">Sales con</span>
                Tu Plan Financiero Personal Expansión — Fondo de Libertad
                automatizado, las 3 Vidas del Dinero y la calculadora de tu
                libertad con cifras específicas.
              </div>
            </div>

            <div className="phase">
              <span className="ph-label">Fase 03 · Semanas 9-12</span>
              <div className="ph-num">03</div>
              <h4>Expansión 10X — Salir al mundo</h4>
              <div className="weeks">A jugar grande</div>
              <p className="arc">
                <strong>Arco:</strong> rediseñas oferta, subes precios,
                entrenas ventas, armas plan de 90 días con métricas. Y cierras
                con el Retiro de Graduación.
              </p>
              <ul className="modules">
                <li><span className="wk">SEM 09</span>El valor de lo que das · Masterclass en vivo</li>
                <li><span className="wk">SEM 10</span>La caza de los 100 NO</li>
                <li><span className="wk">SEM 11</span>El Plan 10X con estructura real</li>
                <li><span className="wk">SEM 12</span>Vision Board y Retiro de Graduación</li>
              </ul>
              <div className="salida">
                <span className="mono">Sales con</span>
                Tu Autobiografía Post-Expansión — identidad nueva, estructura
                financiera, oferta rediseñada, plan 10X y Vision Board.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 07 · QUÉ INCLUYE ═════════════ */}
      <section id="incluye" className="sec earth reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 06 / Qué incluye tu inversión</span>
            <h2>
              Esto es <em>todo</em> lo que recibes cuando entras a Expansión
              10X.
            </h2>
          </div>

          <div className="incl-group">
            <h4>Contenido núcleo</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">📚</div><div className="body"><strong>12 clases grabadas en alta calidad</strong><span>Método completo de Jhana · disponibles de por vida en la plataforma.</span></div></div>
              <div className="incl-item"><div className="ico">🎙️</div><div className="body"><strong>4 Masterclasses en vivo con Jhana</strong><span>Bienvenida · &ldquo;¿Qué piensas del dinero?&rdquo; · &ldquo;El valor de lo que das&rdquo; · Ceremonia de Cierre.</span></div></div>
            </div>
          </div>

          <div className="incl-group">
            <h4>Acompañamiento humano</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">👥</div><div className="body"><strong>Sesión 1:1 de diagnóstico (90 min)</strong><span>Con una Coach Certificada por Jhana · al inicio, para personalizar tu camino.</span></div></div>
              <div className="incl-item"><div className="ico">🌟</div><div className="body"><strong>Lives semanales grupales</strong><span>10+ encuentros con tu coach asignada durante el programa.</span></div></div>
              <div className="incl-item"><div className="ico">💬</div><div className="body"><strong>Accountability Partner</strong><span>Una compañera de cohorte para sostener el camino juntas.</span></div></div>
              <div className="incl-item"><div className="ico">📱</div><div className="body"><strong>Grupo de WhatsApp exclusivo</strong><span>Con tu coach moderadora · resolución de dudas en el día a día.</span></div></div>
            </div>
          </div>

          <div className="incl-group">
            <h4>Herramientas y recursos</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">📖</div><div className="body"><strong>Manual de Expansión</strong><span>Workbook digital premium de 200+ páginas · ejercicios, trackers y guías.</span></div></div>
              <div className="incl-item"><div className="ico">🎧</div><div className="body"><strong>Biblioteca de 20+ meditaciones</strong><span>Producidas profesionalmente con la voz de Jhana.</span></div></div>
              <div className="incl-item"><div className="ico">📊</div><div className="body"><strong>Los 6 Trackers del programa</strong><span>Hábitos · Acciones Semilla · 100 NO · Diario del Dinero · Fondo de Libertad · Plan 10X.</span></div></div>
              <div className="incl-item"><div className="ico">✍️</div><div className="body"><strong>Plantillas descargables</strong><span>Oferta rediseñada · guion de precios · Vision Board guiado · calculadora de libertad.</span></div></div>
            </div>
          </div>

          <div className="incl-group">
            <h4>Kit de bienvenida físico</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">📦</div><div className="body"><strong>Enviado a tu casa</strong><span>Caja premium · cuaderno de journaling exclusivo · carta manuscrita de Jhana · tarjeta de acceso y materiales complementarios.</span></div></div>
            </div>
          </div>

          <div className="incl-group">
            <h4>Evento de cierre</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">🌅</div><div className="body"><strong>Retiro Virtual de Graduación (2 días)</strong><span>Incluido en tu inversión.</span></div></div>
              <div className="incl-item"><div className="ico">🏝️</div><div className="body"><strong>Upgrade opcional a Retiro Presencial</strong><span>Retiro inmersivo en Canaima, Venezuela · +$1,500-$2,300 USD opcional.</span></div></div>
            </div>
          </div>

          <div className="incl-group">
            <h4>Bonos extraordinarios</h4>
            <div className="incl-grid">
              <div className="incl-item"><div className="ico">🎁</div><div className="body"><strong>Comunidad Alumni de por vida</strong><span>Reencuentros trimestrales · masterclasses anuales con Jhana · descuentos en cohortes futuras.</span></div></div>
              <div className="incl-item"><div className="ico">🎁</div><div className="body"><strong>Masterclass bonus: &ldquo;Las 8 mentiras que te dijeron sobre el dinero&rdquo;</strong><span>Adaptación profunda al mercado latino.</span></div></div>
              <div className="incl-item"><div className="ico">🎁</div><div className="body"><strong>20% de descuento para certificarte como Coach Expansión</strong><span>Al completar el programa, si quieres dedicarte a acompañar a otras.</span></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 08 · TESTIMONIOS ═════════════ */}
      <section id="testimonios" className="sec reveal">
        <div className="container">
          <div className="s-head">
            <span className="s-idx">— 07 / Testimonios</span>
            <h2>Lo que dicen <em>quienes ya hicieron</em> el camino.</h2>
          </div>
          <div className="testi-grid">
            <div className="testi">
              <p className="quote">&ldquo;Llevaba 4 años estancada en los mismos ingresos. Pensaba que era falta de estrategia. Descubrí en el programa que era un tema de identidad — yo no me permitía ganar más que mi papá. Tres meses después, estoy facturando el doble. Y sin agotarme.&rdquo;</p>
              <div className="who"><div className="avatar">C</div><div><p className="name">Carolina M., 34</p><div className="meta">Emprendedora · Bogotá</div></div></div>
            </div>
            <div className="testi">
              <p className="quote">&ldquo;Cobraba $40 por sesión y me mataba. En Expansión subí a $120 y tuve miedo de perder todo. Perdí algunos clientes, sí. Pero los que quedaron me valoran, y atraje nuevos que pagan lo que valgo. Facturo 3 veces más con menos trabajo.&rdquo;</p>
              <div className="who"><div className="avatar">D</div><div><p className="name">Daniela R., 41</p><div className="meta">Terapeuta Holística · México DF</div></div></div>
            </div>
            <div className="testi">
              <p className="quote">&ldquo;Nunca había ahorrado. Ni un peso. En la semana 7 automaticé el Fondo de Libertad con $50 al mes. Parece poco pero fue lo primero. Un año después tengo casi $3.000 invertidos que nunca toqué. Pero lo más importante: soy otra persona con el dinero.&rdquo;</p>
              <div className="who"><div className="avatar">A</div><div><p className="name">Andrea L., 38</p><div className="meta">Ejecutiva · Lima</div></div></div>
            </div>
            <div className="testi video" role="button" aria-label="Ver testimonio en video">
              <div className="play"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z" /></svg></div>
              <span className="label">Video testimonio · 90 seg</span>
              <div className="title">&ldquo;No es un programa,<br />es una experiencia.&rdquo;</div>
            </div>
            <div className="testi">
              <p className="quote">&ldquo;El retiro de cierre me cambió. Ver a todas las mujeres del grupo leyéndose cartas al Yo de hace 3 meses, llorar juntas, graduarnos — no es un programa, es una experiencia que te marca. Hoy no tomo decisiones sin preguntarme &lsquo;¿qué haría mi Yo 4.0?&rsquo;.&rdquo;</p>
              <div className="who"><div className="avatar">L</div><div><p className="name">Lucía S., 45</p><div className="meta">Consultora · Miami</div></div></div>
            </div>
            <div className="testi">
              <p className="quote">&ldquo;Vengo de muchos cursos de abundancia. Todos se quedan en &lsquo;sanar la relación con el dinero&rsquo;. Este fue el primero que me enseñó qué hacer con el dinero una vez sanada la relación. El Fondo de Libertad, las 3 Vidas, el Plan 10X — eso es lo que marca la diferencia.&rdquo;</p>
              <div className="who"><div className="avatar">P</div><div><p className="name">Patricia V., 39</p><div className="meta">Arquitecta · Santiago</div></div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 09 · VALOR vs PRECIO ═════════════ */}
      <section className="sec earth reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 08 / Valor total</span>
            <h2>Lo que estás recibiendo, <em>valorado</em> individualmente.</h2>
          </div>
          <div className="value-table">
            <div className="value-row"><div className="item">Sesión 1:1 de diagnóstico con Coach Certificada (90 min)</div><div className="price">$250 USD</div></div>
            <div className="value-row"><div className="item">4 Masterclasses en vivo con Jhana</div><div className="price">$1,200 USD</div></div>
            <div className="value-row"><div className="item">12 clases grabadas + ejercicios + método completo</div><div className="price">$1,500 USD</div></div>
            <div className="value-row"><div className="item">10+ Lives grupales con tu coach</div><div className="price">$800 USD</div></div>
            <div className="value-row"><div className="item">Acompañamiento en WhatsApp durante 12 semanas</div><div className="price">$600 USD</div></div>
            <div className="value-row"><div className="item">Biblioteca de 20+ meditaciones producidas</div><div className="price">$200 USD</div></div>
            <div className="value-row"><div className="item">Manual de Expansión + 6 Trackers + plantillas</div><div className="price">$300 USD</div></div>
            <div className="value-row"><div className="item">Retiro Virtual de Graduación (2 días)</div><div className="price">$500 USD</div></div>
            <div className="value-row"><div className="item">Kit de Bienvenida físico</div><div className="price">$80 USD</div></div>
            <div className="value-row"><div className="item">2 Bonos extraordinarios</div><div className="price">$350 USD</div></div>
            <div className="value-row total"><div className="item">VALOR TOTAL REAL</div><div className="price">$5,780 USD</div></div>
          </div>
          <div className="value-highlight">
            Tu inversión hoy: <strong>$2,500 USD</strong><br />
            <span style={{ fontSize: '.7em', color: 'var(--ink-2)' }}>
              menos de la mitad del valor real del programa.
            </span>
          </div>
        </div>
      </section>

      {/* ═════════════ 10 · OPCIONES DE PAGO ═════════════ */}
      <section id="precio" className="sec reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 09 / Opciones de pago</span>
            <h2>Elige tu <em>forma</em> de pago.</h2>
          </div>
          <div className="pay-grid">
            <div className="pay">
              <span className="pay-label">Opción 1 · Pago único</span>
              <div className="pay-amount">$2,500<em>USD</em></div>
              <div className="pay-total">Un solo pago · Ahorro del 10%</div>
              <p className="pay-sub">La forma más eficiente. Un solo pago y listo — empiezas el programa sin cuotas pendientes.</p>
              <a className="btn dark" href="#contacto">Quiero pagar hoy <span className="arrow">→</span></a>
            </div>
            <div className="pay featured">
              <span className="ribbon">Recomendado</span>
              <span className="pay-label">Opción 2 · 3 cuotas</span>
              <div className="pay-amount">$875<em>USD</em></div>
              <div className="pay-total">3 pagos · Total $2,625</div>
              <p className="pay-sub">Primera cuota hoy · segunda a los 30 días · tercera a los 60. La más elegida por la mayoría de alumnas.</p>
              <a className="btn" href="#contacto">Quiero pagar en cuotas <span className="arrow">→</span></a>
            </div>
            <div className="pay">
              <span className="pay-label">Opción 3 · 6 cuotas</span>
              <div className="pay-amount">$470<em>USD</em></div>
              <div className="pay-total">6 pagos · Total $2,820</div>
              <p className="pay-sub">Para quienes necesitan más flexibilidad. Primer pago hoy y los siguientes mensuales.</p>
              <a className="btn dark" href="#contacto">Quiero 6 cuotas <span className="arrow">→</span></a>
            </div>
          </div>

          <div className="methods">
            <div className="methods-title">Métodos aceptados</div>
            <div className="methods-list">
              <span>💳 Tarjetas internacionales</span>
              <span>🏦 Transferencias</span>
              <span>💰 PayPal</span>
              <span>💸 Zelle (USA / Latam)</span>
            </div>
          </div>

          <div className="upgrade-box">
            <div>
              <h5>Upgrade opcional · Retiro en Canaima</h5>
              <p>Días inmersivos con Jhana presente en <strong>Canaima, Venezuela</strong> — uno de los escenarios naturales más poderosos del mundo. Hospedaje, comidas y experiencia completa incluidos.</p>
            </div>
            <div className="price-add">+ $1,500 – $2,300 USD</div>
          </div>
        </div>
      </section>

      {/* ═════════════ 11 · GARANTÍA ═════════════ */}
      <section className="guarantee reveal">
        <div className="container">
          <div className="guarantee-inner">
            <div className="seal" aria-hidden="true">
              <div className="big">14</div>
              <div className="small">días</div>
            </div>
            <div>
              <span className="s-idx" style={{ color: 'var(--earth)' }}>— 10 / Garantía de compromiso mutuo</span>
              <h3>Garantía de <em>compromiso mutuo</em>. 14 días.</h3>
              <p>Confío plenamente en el método. Tú, confía en el compromiso.</p>
              <p>Si en los primeros 14 días del programa completas las primeras 2 semanas <strong>con todos los ejercicios entregados</strong> y honestamente sientes que Expansión 10X no es para ti — te devuelvo el 100% de tu inversión. Sin preguntas incómodas. Sin culpas.</p>
              <p>La condición es simple: <strong>tienes que haber hecho el trabajo</strong>. No &ldquo;ver los videos&rdquo;. Hacer los ejercicios, entregar las Acciones Semilla, estar presente en tu sesión 1:1. Porque el método funciona cuando tú funcionas — y esa es la garantía que yo no puedo hacer sola.</p>
              <div className="sig">— Jhana</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 12 · URGENCIA ═════════════ */}
      <section className="urgency reveal">
        <div className="container">
          <div className="urgency-grid">
            <div>
              <span className="s-idx" style={{ color: 'var(--gold)' }}>— 11 / Por qué los cupos son limitados</span>
              <h3>Las cohortes son <em>limitadas</em>. Por una razón específica.</h3>
              <p>Expansión 10X no es un curso abierto todo el año. Cada cohorte tiene un máximo de <strong style={{ color: 'var(--cream)' }}>40 personas</strong>, porque cada coach sostiene a un máximo de 20 alumnas para poder darles atención real.</p>
              <p>Abrimos por invitación, y las cohortes se llenan rápido. <strong style={{ color: 'var(--cream)' }}>No hay listas de espera abiertas indefinidamente</strong> — cuando una cohorte se cierra, se cierra.</p>
              <p>Para conocer la próxima apertura y asegurar tu lugar, <strong style={{ color: 'var(--cream)' }}>escríbenos directamente por WhatsApp</strong>. Priorizamos a las personas que se comunican con intención clara.</p>
              <div style={{ marginTop: 32, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a className="btn primary big" href="https://wa.me/584244245783?text=Hola%20Jhana%2C%20quiero%20informaci%C3%B3n%20sobre%20Expansi%C3%B3n%2010X" target="_blank" rel="noopener">Escribir por WhatsApp <span className="arrow">→</span></a>
                <a className="btn ghost" style={{ borderColor: 'var(--cream)', color: 'var(--cream)' }} href="#precio">Ver opciones de pago</a>
              </div>
            </div>
            <div className="stat-box">
              <div className="num">40<em> máx</em></div>
              <div className="label">Cupos por cohorte</div>
              <div className="dates">Por invitación<br />· Escríbenos para aplicar ·</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════ 13 · FAQ ═════════════ */}
      <section id="faq" className="sec reveal">
        <div className="container">
          <div className="s-head" style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }}>
            <span className="s-idx">— 12 / Preguntas frecuentes</span>
            <h2>Preguntas que tal vez <em>estás pensando</em>.</h2>
          </div>
          <div className="faq-list">
            <details className="faq">
              <summary>¿Qué pasa si no puedo asistir a las clases en vivo?<span className="plus">+</span></summary>
              <p>Todas las masterclasses y lives se graban y quedan disponibles de por vida en la plataforma. Puedes hacerlas a tu ritmo. Sin embargo, te recomendamos conectar al menos al <strong>60% en vivo</strong> — la energía grupal no se reemplaza con la grabación.</p>
            </details>
            <details className="faq">
              <summary>¿Es solo para mujeres?<span className="plus">+</span></summary>
              <p>No. Expansión 10X es para cualquier persona latina que esté lista para transformar su relación con el dinero. Históricamente el 85% de las alumnas han sido mujeres, pero los hombres que entran suelen describir la experiencia como profundamente transformadora porque encuentran un espacio emocional que rara vez se les da.</p>
            </details>
            <details className="faq">
              <summary>Soy emprendedora / empleada / profesional independiente. ¿Funciona igual para mi perfil?<span className="plus">+</span></summary>
              <p>Sí. El método es independiente de tu fuente de ingresos. La estructura financiera (Fondo de Libertad, 3 Vidas) funciona igual para empleada que para emprendedora. La parte de oferta/precios en Fase 3 se adapta: si eres empleada trabajas en pedido de aumento y propuestas internas; si eres emprendedora trabajas en oferta externa.</p>
            </details>
            <details className="faq">
              <summary>¿Y si vivo en un país con moneda débil o restricciones (Venezuela, Argentina)?<span className="plus">+</span></summary>
              <p>Adaptamos las conversaciones a tu realidad económica. La mayoría de conceptos se aplican igual con cualquier moneda. Tu coach te ayuda a traducir el método a tu contexto específico. Tenemos alumnas de toda Latinoamérica, incluyendo Venezuela, Argentina y Cuba.</p>
            </details>
            <details className="faq">
              <summary>¿Cuánto tiempo semanal necesito?<span className="plus">+</span></summary>
              <p>Entre <strong>4 y 6 horas por semana</strong>. Eso incluye: clase grabada (30 min), live grupal (90 min), ejercicios del workbook (2 horas), meditación diaria (15 min/día) y Acción Semilla. Si tu semana es especialmente caótica, menos puede funcionar — pero 4 horas es el mínimo para recibir la transformación.</p>
            </details>
            <details className="faq">
              <summary>¿Me acompaña Jhana personalmente durante todo el programa?<span className="plus">+</span></summary>
              <p>Jhana aparece en vivo en 4 Masterclasses y en el Retiro de Graduación. El resto del programa es sostenido por Coaches Certificadas directamente por ella, entrenadas en su método. Este modelo es lo que nos permite ofrecerte el programa a $2,500 — si Jhana acompañara personalmente, el precio sería superior a $8,000, como su programa 1:1.</p>
            </details>
            <details className="faq">
              <summary>¿Qué pasa si ya hice otros programas de abundancia?<span className="plus">+</span></summary>
              <p>Expansión 10X es probablemente distinto a todos los que hiciste. La mayoría de programas de abundancia se quedan en la parte emocional. Acá vamos desde lo emocional hasta la automatización real del Fondo de Libertad, la estructura de las 3 Vidas y el Plan 10X con métricas. Muchas de nuestras alumnas vienen de otros cursos y nos dicen: <em>&ldquo;por fin un programa que baja la teoría al dinero real&rdquo;</em>.</p>
            </details>
            <details className="faq">
              <summary>¿Puedo hablar con alguien antes de decidir?<span className="plus">+</span></summary>
              <p>Sí. Puedes <a href="#contacto" style={{ color: 'var(--clay)', borderBottom: '1px solid var(--clay)' }}>agendar una llamada de 20 minutos</a> con nuestro equipo para resolver dudas específicas y evaluar si el programa es para ti.</p>
            </details>
            <details className="faq">
              <summary>¿Cuándo abren las inscripciones?<span className="plus">+</span></summary>
              <p>Las cohortes abren varias veces al año, pero los cupos son muy limitados y las fechas se comunican directamente a las personas que están en conversación con el equipo. <strong>Para conocer la próxima apertura y asegurar tu lugar, escríbenos por WhatsApp</strong> — priorizamos a quienes se comunican con intención clara.</p>
            </details>
            <details className="faq">
              <summary>¿Qué diferencia esto del programa 1:1 con Jhana?<span className="plus">+</span></summary>
              <p>El <strong>1:1</strong> es acceso directo a Jhana durante 12 sesiones personalizadas ($2,500). <strong>Expansión 10X</strong> es el método grupal con coaches certificadas, comunidad, masterclasses de Jhana y retiro de cierre ($2,500). Mismo precio, experiencias distintas: profundidad 1:1 vs sistema completo + comunidad. Muchas personas hacen Expansión 10X primero y después eligen continuar con 1:1.</p>
            </details>
          </div>
        </div>
      </section>

      {/* ═════════════ 14 · CIERRE EMOCIONAL ═════════════ */}
      <section id="contacto" className="close-sec reveal">
        <div className="container">
          <div className="close-inner">
            <span className="s-idx" style={{ color: 'var(--gold)' }}>— 13 / Lo que decidas hoy</span>
            <h2>Lo que decidas hoy <em>importa</em>.</h2>
            <p>Probablemente tu mente está haciendo ruido en este momento. Buscando razones para postergar. <em>&ldquo;Y si no es el momento&rdquo;, &ldquo;y si no funciona&rdquo;, &ldquo;mejor el próximo mes&rdquo;</em>.</p>
            <p>Escúchame esto.</p>
            <p><strong>Ese ruido es exactamente la programación que te trajo aquí.</strong> El mismo miedo que te ha hecho no cobrar lo que vales, no pedir lo que mereces, no expandirte hasta donde puedes llegar.</p>
            <p>Si le haces caso hoy, le vas a hacer caso mañana. Y dentro de un año vas a estar leyendo otra página como esta, prometiéndote otra vez <em>&ldquo;el próximo&rdquo;</em>.</p>
            <p>Pero si hoy decides <strong>ponerte en primer lugar</strong> — aunque sea con tres cuotas, aunque sea el primer paso — <em>algo cambia</em>. No por el programa. Por la declaración que implica. Porque el dinero que pagas hoy no es por clases. Es por ti. Por declararte a ti misma que ya te priorizas.</p>
            <p style={{ textAlign: 'center', fontFamily: "'Fraunces',serif", fontSize: '26px', lineHeight: 1.3, color: 'var(--cream)', fontStyle: 'italic', marginTop: '28px' }}>
              <strong>Esa declaración es el principio del despertar.</strong>
            </p>
            <div className="final-cta">
              <a className="btn primary big" href="#precio">Reservo mi lugar en Expansión 10X <span className="arrow">→</span></a>
            </div>
            <div className="whisper">
              Tu Yo de dentro de 5 años ya sabe qué vas a decidir.<br />
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
              <h5>Navegar</h5>
              <ul>
                <li><a href="#metodo">El método</a></li>
                <li><a href="#incluye">Qué incluye</a></li>
                <li><a href="#testimonios">Testimonios</a></li>
                <li><a href="#precio">Inversión</a></li>
                <li><a href="#faq">Preguntas</a></li>
              </ul>
            </div>
            <div>
              <h5>Programa</h5>
              <ul>
                <li><a href="#precio">Expansión 10X</a></li>
                <li><a href="#contacto">Llamada de 20 min</a></li>
                <li><a>Retiro presencial</a></li>
                <li><a>Talleres empresas</a></li>
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
