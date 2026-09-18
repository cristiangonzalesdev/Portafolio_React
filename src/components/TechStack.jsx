import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TECHS = ['HTML', 'CSS', 'JavaScript', 'Python', 'Node.js', 'Flutter', 'Dart', 'MySQL', 'Git', 'GitHub', 'REST APIs'];

export default function TechStack() {
  const canvasRef = useRef(null);
  const fallbackRef = useRef(null);
  const hintRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const narrow = window.innerWidth < 720;

    if (reduceMotion || narrow) {
      if (hintRef.current) hintRef.current.style.display = 'none';
      return;
    }

    let frameId;
    const canvas = canvasRef.current;
    const section = canvas.parentElement;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 9;

    const group = new THREE.Group();
    scene.add(group);

    function makeLabel(text, color) {
      const c = document.createElement('canvas');
      c.width = 256; c.height = 64;
      const ctx = c.getContext('2d');
      ctx.font = '500 30px IBM Plex Mono, monospace';
      ctx.fillStyle = color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 32);
      const tex = new THREE.CanvasTexture(c);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
      const sprite = new THREE.Sprite(mat);
      sprite.scale.set(2.4, 0.6, 1);
      return sprite;
    }

    const hub = makeLabel('CG', '#5fe3c9');
    hub.scale.set(1.2, 0.5, 1);
    group.add(hub);

    const nodes = [];
    const lineMat = new THREE.LineBasicMaterial({ color: 0x5fe3c9, transparent: true, opacity: 0.22 });
    TECHS.forEach((name, idx) => {
      const phi = Math.acos(-1 + (2 * idx) / TECHS.length);
      const theta = Math.sqrt(TECHS.length * Math.PI) * phi;
      const r = 4.2;
      const x = r * Math.cos(theta) * Math.sin(phi);
      const y = r * Math.sin(theta) * Math.sin(phi);
      const z = r * Math.cos(phi);
      const label = makeLabel(name, '#f5f6f5');
      label.position.set(x, y, z);
      group.add(label);
      nodes.push(label);

      const lineGeo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(x, y, z)]);
      const line = new THREE.Line(lineGeo, lineMat);
      group.add(line);
    });

    function sizeCanvas() {
      const rect = section.getBoundingClientRect();
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-10, -10);
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    }
    if (fine) canvas.addEventListener('mousemove', onMouseMove);

    const scrollTween = gsap.to(group.rotation, {
      y: Math.PI * 1.4,
      ease: 'none',
      scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
    });

    function animate() {
      group.rotation.y += 0.0009;
      if (fine) {
        raycaster.setFromCamera(mouse, camera);
        const hits = raycaster.intersectObjects(nodes);
        nodes.forEach((n) => n.scale.set(2.4, 0.6, 1));
        if (hits.length) hits[0].object.scale.set(3.1, 0.78, 1);
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    if (fallbackRef.current) fallbackRef.current.style.opacity = '0.25';

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', sizeCanvas);
      if (fine) canvas.removeEventListener('mousemove', onMouseMove);
      scrollTween.scrollTrigger?.kill();
      scrollTween.kill();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="s5">
      <span className="numeral">05</span>
      <canvas id="tech-canvas" ref={canvasRef} aria-hidden="true"></canvas>
      <div className="content-col">
        <h2 className="id-head" data-reveal>Mi stack, en red.</h2>
        <p className="tech-hint" ref={hintRef} data-reveal>Pasa el cursor sobre cada nodo.</p>
      </div>
      <ul className="tech-fallback" ref={fallbackRef} data-reveal>
        {TECHS.map((t) => <li key={t}>{t}</li>)}
      </ul>
    </section>
  );
}
