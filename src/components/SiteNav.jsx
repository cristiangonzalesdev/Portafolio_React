const SECTIONS = [
  { id: '#s1', label: 'Ir a Intro' },
  { id: '#s2', label: 'Ir a Identidad' },
  { id: '#s3', label: 'Ir a Proyectos' },
  { id: '#s4', label: 'Ir a AI Lab' },
  { id: '#s5', label: 'Ir a Tecnología' },
  { id: '#s6', label: 'Ir a Contacto' },
];

export default function SiteNav({ activeIndex, onNavigate }) {
  return (
    <>
      <nav className="site-nav">
        <span>CG</span>
        <span className="scene-count">{String(activeIndex + 1).padStart(2, '0')} / 06</span>
      </nav>
      <div className="dot-nav" aria-label="Navegación de secciones">
        {SECTIONS.map((s, i) => (
          <button
            key={s.id}
            data-target={s.id}
            className={i === activeIndex ? 'is-active' : ''}
            aria-label={s.label}
            onClick={() => onNavigate(s.id)}
          />
        ))}
      </div>
    </>
  );
}
