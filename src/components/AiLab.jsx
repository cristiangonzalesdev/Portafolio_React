import { useEffect, useRef } from 'react';

const PHRASES = [
  'Claude → prototipa interfaces y arquitectura',
  'Codex → acelera el código repetitivo',
  'Claude → documenta antes de escribir',
  'Codex → sugiere el fix en segundos',
];
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export default function AiLab() {
  const readoutRef = useRef(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const el = readoutRef.current;
    let timer;

    function scrambleTo(text, done) {
      let iterations = 0;
      clearInterval(timer);
      timer = setInterval(() => {
        let out = '';
        for (let i = 0; i < text.length; i++) {
          if (i < iterations || text[i] === ' ' || text[i] === '→') out += text[i];
          else out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        el.textContent = out;
        iterations += 1;
        if (iterations > text.length) {
          clearInterval(timer);
          if (done) setTimeout(done, 1700);
        }
      }, reduceMotion ? 1 : 26);
    }

    function runLoop() {
      if (playedRef.current || !el) return;
      playedRef.current = true;
      let idx = 0;
      const next = () => {
        scrambleTo(PHRASES[idx], () => {
          idx = (idx + 1) % PHRASES.length;
          next();
        });
      };
      next();
    }

    let observer;
    if (el) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) runLoop();
        },
        { threshold: 0.4 }
      );
      observer.observe(el);
    }

    return () => {
      clearInterval(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section id="s4">
      <span className="numeral">04</span>
      <div className="content-col">
        <h2 className="id-head" data-reveal>También construyo con IA como copiloto.</h2>
        <p className="id-body" data-reveal>
          Claude y Codex son las herramientas de IA que más uso en mi flujo de trabajo:
          para prototipar interfaces más rápido, depurar código, automatizar tareas repetitivas
          y explorar arquitecturas antes de escribir la primera línea. Este mismo sitio,
          animaciones, estructura y todo se construyó con esa mezcla de criterio propio y
          asistencia de IA.
        </p>
        <div className="ai-panel" data-reveal aria-hidden="true">
          <span className="ai-node ai-node--claude"><span className="ai-pulse"></span>Claude</span>
          <span className="ai-link"><span></span></span>
          <span className="ai-node ai-node--codex"><span className="ai-pulse"></span>Codex</span>
          <p className="ai-readout" ref={readoutRef}></p>
        </div>
      </div>
    </section>
  );
}
