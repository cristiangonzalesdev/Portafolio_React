import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const narrow = window.innerWidth < 720;
    const cursor = cursorRef.current;
    if (!cursor || !fine || narrow) {
      if (cursor) cursor.style.display = 'none';
      return;
    }

    const qx = gsap.quickTo(cursor, 'x', { duration: 0.35, ease: 'power3.out' });
    const qy = gsap.quickTo(cursor, 'y', { duration: 0.35, ease: 'power3.out' });

    function onMove(e) {
      qx(e.clientX);
      qy(e.clientY);
    }
    function onEnter() { cursor.classList.add('active'); }
    function onLeave() { cursor.classList.remove('active'); }

    window.addEventListener('mousemove', onMove);
    const interactive = document.querySelectorAll('a,button');
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return <div id="cursor" ref={cursorRef} aria-hidden="true"></div>;
}
