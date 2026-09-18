# Cristian // Digital Lab — versión React + Vite

Mismo portafolio inmersivo, ahora como proyecto React con imports normales
(en vez del HTML autocontenido con librerías por CDN).

## Instalación

```bash
npm install
npm run dev
```

Abre el link que te dé Vite (normalmente http://localhost:5173).

## Build para producción

```bash
npm run build
```

Esto genera la carpeta `dist/`, lista para subir a GitHub Pages, Vercel o Netlify.

## Estructura

- `src/App.jsx` — orquesta Lenis (smooth scroll), GSAP/ScrollTrigger (animaciones
  de scroll) y arma las 6 secciones.
- `src/components/` — un componente por sección/pieza (Hero, Identity, Projects,
  AiLab, TechStack, Contact, más Loader, CustomCursor, BackgroundCanvas, SiteNav).
- `src/styles.css` — todo el sistema de diseño (colores, tipografía, layout).

## Pendiente de tu parte

- En `src/components/Identity.jsx` hay un comentario TODO para la sección de
  certificaciones — en cuanto me des los nombres, la agrego ahí (y en la versión
  HTML también).
- Revisa los datos de contacto en `src/components/Contact.jsx` si cambian.
