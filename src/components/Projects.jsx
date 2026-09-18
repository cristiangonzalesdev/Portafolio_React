export default function Projects() {
  return (
    <section id="s3">
      <span className="numeral">03</span>

      <article className="project project--alert">
        <div className="radar" aria-hidden="true"><span></span><span></span><span></span></div>
        <p className="project-eyebrow" data-reveal>Proyecto académico colaborativo</p>
        <h3 className="project-title" data-reveal>ALERTA ROJA</h3>
        <p className="project-tag" data-reveal>Sistema de gestión de emergencias</p>
        <div className="project-tech" data-reveal>
          <span>Flutter</span><span>Dart</span><span>Node.js</span><span>Express.js</span>
          <span>MySQL</span><span>JWT</span><span>GPS</span>
        </div>
        <p className="project-desc" data-reveal>
          Una app para reportar emergencias en tiempo real con geolocalización y evidencia
          fotográfica. Distintos roles, ciudadano, bombero, administrador; gestionan cada
          reporte desde su propia vista. Es un proyecto colaborativo: yo me encargué
          principalmente de las funciones y el diseño de la app en Flutter, mientras que
          el backend fue un aporte mayor de mi compañero.
        </p>
        <a
          className="project-link"
          href="https://github.com/cristiangonzalesdev/Alerta_roja-app"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          Ver repositorio
        </a>
      </article>

      <article className="project project--jobs">
        <div className="marquee" aria-hidden="true">
          <div>
            Backend Developer Jr · Full Stack Engineer · Python Automation Dev · Software
            Developer Trainee · API Developer · React / Node Developer · Backend Developer Jr
            · Full Stack Engineer ·&nbsp;
          </div>
        </div>
        <p className="project-eyebrow" data-reveal>Automatización personal</p>
        <h3 className="project-title" data-reveal>JOB MARKET MONITOR</h3>
        <p className="project-tag" data-reveal>Búsqueda de empleo, automatizada</p>
        <div className="project-tech" data-reveal>
          <span>Python</span><span>Web Scraping</span><span>SQLite</span><span>SMTP</span><span>Automation</span>
        </div>
        <p className="project-desc" data-reveal>
          Un script en Python que rastrea ofertas laborales, las guarda en una base de datos
          local y avisa por correo cuando aparece algo nuevo, para no perder tiempo revisando
          bolsas de empleo manualmente todos los días.
        </p>
        <a
          className="project-link"
          href="https://github.com/cristiangonzalesdev/Buscador_empleos"
          target="_blank"
          rel="noopener noreferrer"
          data-reveal
        >
          Ver repositorio
        </a>
      </article>
    </section>
  );
}
