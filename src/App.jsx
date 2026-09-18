import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import Loader from './components/Loader.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import BackgroundCanvas from './components/BackgroundCanvas.jsx';
import SiteNav from './components/SiteNav.jsx';
import Hero from './components/Hero.jsx';
import Identity from './components/Identity.jsx';
import Projects from './components/Projects.jsx';
import AiLab from './components/AiLab.jsx';
import TechStack from './components/TechStack.jsx';
import Contact from './components/Contact.jsx';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ['#s1', '#s2', '#s3', '#s4', '#s5', '#s6'];

export default function App() {
  const [loaderHidden, setLoaderHidden] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const lenisRef = useRef(null);

  // Loader + intro text animation
  useEffect(() => {
    const t = setTimeout(() => {
      gsap.to('#loader', {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => setLoaderHidden(true),
      });

      const lines = document.querySelectorAll('.intro-name .line span');
      gsap.set(lines, { yPercent: 110 });
      gsap.to(lines, { yPercent: 0, duration: 1.1, ease: 'power4.out', stagger: 0.12 });
      gsap.to('.intro-role', { opacity: 1, duration: 1, delay: 0.5, ease: 'power2.out' });
      gsap.fromTo('.intro-line', { opacity: 0 }, { opacity: 1, duration: 1, delay: 0.9 });
    }, 400);
    return () => clearTimeout(t);
  }, []);

  // Lenis + ScrollTrigger wiring, scroll reveals, section tracking
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;

    try {
      if (!reduceMotion) {
        lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
        lenisRef.current = lenis;
      }
    } catch (e) {
      lenis = null;
    }

    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    const revealTriggers = [];
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      revealTriggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: () => el.classList.add('is-in'),
        })
      );
    });

    const sectionTriggers = SECTION_IDS.map((sel, i) =>
      ScrollTrigger.create({
        trigger: sel,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) setActiveIndex(i);
        },
      })
    );

    return () => {
      revealTriggers.forEach((t) => t.kill());
      sectionTriggers.forEach((t) => t.kill());
      gsap.ticker.remove((time) => lenis && lenis.raf(time * 1000));
      if (lenis) lenis.destroy();
    };
  }, []);

  function handleNavigate(targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;
    if (lenisRef.current) lenisRef.current.scrollTo(target);
    else target.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <>
      <a href="#s1" className="skip-link">Saltar al contenido</a>
      <Loader hidden={loaderHidden} />
      <CustomCursor />
      <BackgroundCanvas />
      <SiteNav activeIndex={activeIndex} onNavigate={handleNavigate} />
      <main>
        <Hero />
        <Identity />
        <Projects />
        <AiLab />
        <TechStack />
        <Contact />
      </main>
    </>
  );
}
