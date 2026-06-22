# Prompt para Claude Code — Rediseño "Dark + 3D/WebGL" de edi-developer.dev

> Pega esto como instrucción inicial en Claude Code, abierto en la raíz del repo `edi-developer-new`.
> Está escrito para ejecutarse de forma incremental, sin romper el build ni las rutas existentes.

---

## 0. Rol y objetivo

Actúa como un **ingeniero frontend senior + director de arte**. Vas a rediseñar mi portafolio
`edi-developer.dev` (Next.js 16 / React 19, ya en este repo). Hoy se ve **genérico**: fondo blanco,
ilustración a lápiz tenue, paleta default de shadcn (negro sobre blanco + gradiente morado), grids de
cards iguales y, lo más grave, **cero demostración de craft frontend** pese a que el stack tiene
React Three Fiber, GSAP, Framer Motion, Rive y postprocessing sin usarse en el hero.

El objetivo es una identidad **dark, cinematográfica y con 3D/WebGL como protagonista**, que:
1. Demuestre mi oficio de frontend en los primeros 3 segundos (hero vivo, no estático).
2. Tenga un sistema de marca propio y reconocible (no plantilla).
3. Mantenga TODO el contenido y rutas actuales, mejorando jerarquía y conversión.

No empieces a escribir código hasta haber leído el repo y devuelto un **plan corto** (ver §9).

---

## 1. Stack real (úsalo, no añadas dependencias nuevas salvo que lo justifiques)

- **Next.js 16 (App Router)**, **React 19**, TypeScript.
- 3D: `@react-three/fiber`, `@react-three/drei`, `@react-three/postprocessing`, `@react-three/rapier`, `three`, `postprocessing`, `ogl`.
- Animación: `gsap` (con ScrollTrigger), `framer-motion` / `motion`, `@rive-app/react-canvas`.
- UI: Tailwind v4 (`@import "tailwindcss"`), shadcn, `radix-ui`, `lucide-react`, `class-variance-authority`, `tailwind-merge`.
- Estado: `zustand`. Datos: `@tanstack/react-query`. Charts: `highcharts`.
- Fuentes ya cargadas en `app/layout.tsx`: **Geist** (`--font-sans`), **PT Sans** (`--font-pt-sans`), **Ubuntu Sans Mono** (`--font-ubuntu-mono`).
- Dev: `pnpm dev` corre en el puerto **8080** con `--webpack`.

Restricciones:
- No rompas rutas: `/`, `/blog`, `/apps`, `/presentaciones`, `/libro`.
- Trabaja en componentes; reutiliza los que ya existen en `components/` y `presentation/` cuando sumen.
- Respeta `prefers-reduced-motion` y mantén el build verde en cada paso.

---

## 2. Sistema de marca (definir como tokens en `app/globals.css`)

Hoy `:root` está en claro (`--background` blanco, `color: black`). **Invierte el tema a dark por defecto**
(`color-scheme: dark`) y redefine los tokens. Usa estos valores de marca:

```css
:root{
  /* superficies */
  --bg:        #07090E;   /* fondo base casi negro azulado */
  --bg-elev:   #0E1320;   /* paneles / cards */
  --bg-elev-2: #141A2B;   /* hover / capas */
  --border:    rgb(255 255 255 / 0.08);
  --border-strong: rgb(255 255 255 / 0.14);

  /* texto */
  --text:      #F4F6FB;
  --text-muted:#9AA4B2;

  /* acentos de marca */
  --cyan:   #22D3EE;
  --indigo: #6366F1;
  --violet: #A855F7;
  --amber:  #F5A524;   /* CTA/realce puntual, usar con moderación */

  /* gradiente y glow firma */
  --brand-grad: linear-gradient(120deg, var(--cyan), var(--indigo), var(--violet));
  --glow: 0 0 40px rgb(99 102 241 / 0.35);
}
```

- Mapea estos tokens a las variables shadcn (`--background`, `--foreground`, `--card`, `--primary`,
  `--muted-foreground`, `--border`, `--ring`, etc.) para que los componentes existentes hereden el tema oscuro.
- El **gradiente de marca** sólo en: 1-2 palabras clave de cada título, bordes de glow, líneas finas y estados activos. Nunca como relleno de bloques grandes.
- Define utilidades: `.text-gradient` (background-clip:text con `--brand-grad`), `.glow`, `.glass` (panel translúcido: `background: color-mix(in oklab, var(--bg-elev) 70%, transparent)` + `backdrop-filter: blur(12px)` + `border:1px solid var(--border)`).

**Tipografía**
- Headings/display: **Geist** en pesos altos (600/700), tracking ajustado (`-0.02em`), tamaños grandes (clamp). Si quieres más carácter, puedes añadir `Space_Grotesk` vía `next/font/google` como `--font-display` con fallback a Geist.
- Cuerpo: Geist / PT Sans.
- **Mono (Ubuntu Mono)** para "eyebrows"/etiquetas de sección (ej. `// SOBRE MÍ`), código y el widget terminal. Esto refuerza el sello "ingeniero".
- Reemplaza los títulos centrados uniformes por jerarquía editorial: algunos a la izquierda, eyebrow mono + título display + lead muted.

**Layout y ritmo**
- Introduce asimetría y profundidad: secciones con anchos distintos, líneas/grids sutiles, bordes glow, `noise` de fondo muy bajo.
- Tarjetas con `.glass`, borde fino, hover con elevación + glow del acento, no sombras grises planas.

---

## 3. Assets ya generados (están en `public/brand/`)

Úsalos. Rutas servidas desde `/brand/...`:

| Archivo | Uso |
|---|---|
| `/brand/hero-nebula.webp` (1672×941) | **Poster/fallback** del hero 3D y fallback en reduced-motion / móvil de baja potencia. |
| `/brand/section-texture.webp` (1672×941) | Fondo sutil para secciones intermedias (overlay a baja opacidad sobre `--bg`). |
| `/brand/product-icons.webp` (tira de 5) | Set glass de íconos de producto/servicio. |
| `/brand/icon-1-ai.webp` … `/brand/icon-5-innovation.webp` | Los 5 íconos ya recortados: 1 IA, 2 arquitectura, 3 3D, 4 educación, 5 innovación. |
| `/brand/og-cover.jpg` (1200×630) | Imagen Open Graph / redes (reemplaza la portada genérica actual). |

> El estilo de estos assets (nebulosa cian→índigo→violeta sobre negro, glow, grid de perspectiva) **es** el lenguaje visual de la marca: que el resto del diseño combine con ellos.

---

## 4. Hero + FONDO DE VIDEO con scroll (la pieza estrella)

> Dirección final elegida: **minimalista monocromo** (ver `PROMPT-CLAUDE-DESIGN-v3.md`), con el
> **personaje de marca** (developer ilustrado + zorro bebé) como **fondo de video** que evoluciona con el scroll.
> Esto reemplaza la idea anterior de nebulosa WebGL. El degradado multicolor NO se usa.

**Asset de video:** `/videos/edi-hero.mp4` — un único clip de ~30s, 16:9, en **3 partes** que evolucionan
(0–10s teclea en su teclado · 10–20s formas 3D wireframe flotan a su alrededor · 20–30s red neuronal de
partículas IA). Personaje cálido iluminado, fondo casi negro, con **espacio negativo a la izquierda** para el texto.
> Pendiente: genera/añade `/brand/edi-hero-poster.jpg` (un frame del video) como poster/fallback.

**Componente ya creado:** `components/ScrollVideoBackground.tsx` (scroll-scrubbing: la posición del scroll controla
el playhead, así cada zona del landing muestra una parte distinta; incluye velo oscuro para legibilidad y fallback a
poster en `prefers-reduced-motion`). Renderízalo **una vez**, fuera del contenido que scrollea (arriba en
`app/page.client.tsx`):

```tsx
import ScrollVideoBackground from "@/components/ScrollVideoBackground";
// ...
<ScrollVideoBackground src="/videos/edi-hero.mp4" poster="/brand/edi-hero-poster.jpg" />
```

- El fondo es **fijo** detrás de todo el contenido (`-z-10`). Las secciones van encima con fondo transparente o
  `rgba(10,10,11,·)` para que el video se perciba pero el texto se lea (el componente ya aplica un gradiente más
  oscuro a la izquierda).
- **No** uses la nebulosa WebGL como hero. Three.js/R3F queda solo para detalles puntuales opcionales (p. ej. un
  objeto monocromo sutil), nunca para reintroducir color.
- **Texto del hero** (minimalista): eyebrow en **mono** `// FRONTEND · IA · 3D`, titular display grande
  ("Construyo productos y soluciones con **inteligencia artificial**", la palabra clave en blanco hueso sólido,
  **sin degradado arcoíris**), lead muted, y **dos CTAs** (primario sólido neutro, secundario ghost). Entrada con
  GSAP (stagger por línea). La fila de stats va **sin cajas ni líneas**, separada por aire.
- Copy: no inventes credenciales; mantén el mensaje real (14+ años, especialista frontend/IA/3D, Lima-Perú).
- **Rendimiento/A11y**: el video es `muted`/`playsInline`; el LCP debe ser el titular o el poster, nunca el video;
  respeta `prefers-reduced-motion` (ya manejado en el componente).

---

## 5. Reestructura sección por sección (mantener contenido, elevar forma)

Orden actual a conservar, con mejoras:

1. **Hero** → §4.
2. **Productos que construyo con IA** (Slaim, Emotional AI…): carrusel/tarjetas `.glass` con preview real, badges "En vivo/Gratis", hover con glow del acento. Embla ya está disponible.
3. **Recursos y productos** (libro "El Programador Aumentado", cuento "Fábrica de Programadores"): tarjetas con mockup, CTA claro de compra/descarga; diferenciar visualmente "Gratis" vs "Producto" con color de acento, no sólo texto.
4. **Sobre mí + terminal IA "Pregúntale a la IA sobre mí"**: mantener el widget tipo terminal (queda perfecto con la marca mono/dark). Mejorar contraste, foco y estados; integrar la bio y los 3 bullets de diferenciación.
5. **Qué hago** (5 servicios): usar los íconos `/brand/icon-*.webp` o, mejor para nitidez, **íconos `lucide` estilizados con el glow de marca** sobre tiles `.glass`. Mapear: IA → `icon-1`, Arquitectura → `icon-2`, 3D → `icon-3`, Educación → `icon-4`, Producto/Innovación → `icon-5`.
6. **Charlas y Workshops**: chips de temas con borde glow; CTA "Invítame a dar una charla".
7. **Blog**: 3 tarjetas destacadas con etiqueta de categoría en mono; mejorar tipografía editorial.
8. **Formación / Edi Academy** (Docentes / Desarrolladores / Empresas): tarjetas diferenciadas, métricas (Modular / 100% / IA) con número en `.text-gradient`.
9. **Trabajemos juntos** (form de contacto): inputs dark con foco glow, validación visible, botón con estado de carga; no cambiar la lógica de envío si existe.
10. **Footer**: dark, con navegación, redes (GitHub/LinkedIn) y el logo. Línea fina de gradiente arriba.

**Navbar**: sticky, translúcido `.glass` al hacer scroll, subrayado/indicador con gradiente en la sección activa, toggle de idioma ES/EN existente conservado.

---

## 6. Motion (sello, sin exceso)

- GSAP + ScrollTrigger para reveals (fade+rise con stagger), líneas que se dibujan, contadores.
- Framer/motion para micro-interacciones (hover de cards, magnetic en CTA primario, tabs).
- Cursor/realces opcionales discretos. **Todo** detrás de un guard `prefers-reduced-motion`.
- Curvas suaves (ease tipo `power3.out`), duraciones 0.4–0.8s, nada que maree.

---

## 7. Accesibilidad, performance y SEO

- Contraste AA sobre fondo oscuro (texto muted mínimo ~`#9AA4B2` sobre `--bg`). Estados de foco visibles (ring con `--indigo`).
- Imágenes con `next/image`, `alt` reales, `sizes` correctos; los webp ya están optimizados.
- Hero 3D **no** debe degradar el LCP: el LCP debe ser el titular o el poster, no el canvas.
- Actualiza la metadata en `app/layout.tsx`: `openGraph.images` y `twitter.image` deben apuntar a **`/brand/og-cover.jpg`** (1200×630) en vez de `edi-dev-portada.png`. Mantén el JSON-LD `Person`; puedes actualizar `image` al nuevo OG.
- Lighthouse objetivo: Performance ≥ 90 móvil, Accesibilidad ≥ 95.

---

## 8. Criterios de aceptación (checklist)

- [ ] Tema dark de marca aplicado vía tokens; sin restos del look blanco/genérico.
- [ ] Hero con escena R3F viva + bloom + parallax, con fallback `hero-nebula.webp` y respeto a reduced-motion.
- [ ] Tipografía con jerarquía editorial (eyebrow mono + display + lead), no todo centrado e igual.
- [ ] Las 10 secciones reestructuradas conservando contenido y rutas.
- [ ] Assets de `/brand/` integrados (hero, textura, íconos, OG).
- [ ] `build` verde, sin errores de TS/ESLint; `prefers-reduced-motion` funciona.
- [ ] Metadata OG/Twitter apuntando a `/brand/og-cover.jpg`.
- [ ] Lighthouse Perf ≥ 90 / A11y ≥ 95 en home.

---

## 9. Cómo proceder

1. Lee el repo (`app/`, `components/`, `presentation/`, `app/globals.css`, `app/page.client.tsx`, `app/layout.tsx`) y devuélveme un **plan de 8–12 pasos** antes de codear.
2. Implementa por fases, en este orden: (a) tokens + tema dark global, (b) navbar + layout/tipografía, (c) hero 3D con fallback, (d) secciones 2→10, (e) motion, (f) metadata/OG + a11y/perf.
3. Tras cada fase: corre `pnpm dev` (puerto 8080), verifica que compila y enséñame el diff resumido. No avances de fase con el build roto.
4. Si una decisión visual es ambigua, propón 2 opciones breves y sigue con la recomendada.

Empieza devolviendo el plan.
