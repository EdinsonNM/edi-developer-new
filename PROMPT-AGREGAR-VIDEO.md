# Prompt para Claude Code — AÑADIR el fondo de video SIN tocar el diseño existente

> Pégalo en Claude Code, abierto en la raíz del repo. Objetivo: integrar el fondo de video del personaje
> **como una capa nueva detrás de todo**, sin modificar el diseño minimalista que ya está hecho.

---

Tarea **quirúrgica y no invasiva**: agrega un **fondo de video con scroll** detrás del landing actual,
**sin cambiar nada del diseño existente** (layout, tipografía, colores, contenido, secciones, animaciones).
Es una capa de fondo, no un rediseño.

## Reglas duras (no las rompas)
- **No** modifiques la estructura, estilos, textos ni componentes de las secciones ya hechas.
- **No** cambies la paleta, la tipografía ni el espaciado.
- Solo puedes: (1) montar el componente de fondo una vez, (2) hacer **transparentes** los fondos opacos que
  tapen el video, (3) ajustar `z-index` si hiciera falta. Nada más.
- Si algo te obliga a tocar el diseño, **detente y pregúntame** antes.

## Qué añadir
1. Usa el componente ya creado `components/ScrollVideoBackground.tsx` (no lo reescribas).
   Renderízalo **una sola vez**, al inicio del árbol de la home, **fuera** del contenedor que scrollea
   (por ejemplo, lo primero dentro del return de `app/page.client.tsx`):

   ```tsx
   import ScrollVideoBackground from "@/components/ScrollVideoBackground";

   export default function Home() {
     return (
       <>
         <ScrollVideoBackground src="/videos/edi-hero.mp4" poster="/brand/edi-hero-poster.jpg" />
         {/* ...todo el contenido actual queda EXACTAMENTE igual... */}
       </>
     );
   }
   ```

2. El componente ya es `position: fixed; inset: 0; z-index: -10` con velo oscuro y fallback a poster en
   `prefers-reduced-motion`. Para que se vea **a través** del contenido:
   - Asegúrate de que el `body`/contenedor raíz **no** tenga un fondo sólido opaco que tape el `-z-10`
     (si lo tiene, hazlo `transparent` o usa `rgba(10,10,11,·)` translúcido — el color base `#0A0A0B` ya vive en el componente).
   - Las **secciones** que deban dejar ver el video: fondo `transparent` o semitransparente. Las que deban
     ocultarlo (p. ej. bloques densos): mantenlas con su fondo oscuro actual. Tú decides por sección para no
     dañar legibilidad; ante la duda, **déjalo como está**.

## Verificación antes de cerrar
- El diseño se ve **idéntico** al actual, solo que con el video evolucionando detrás del hero/secciones iniciales.
- El texto sigue **perfectamente legible** (el velo del componente ayuda; sube `veil` si hace falta vía prop).
- `pnpm dev` (puerto 8080) compila sin errores; el video es `muted`/`playsInline`; respeta reduced-motion.
- Haz un diff resumido y muéstramelo. No toques nada fuera de lo descrito.

> Nota assets: el video va en `/public/videos/edi-hero.mp4` y el poster en `/public/brand/edi-hero-poster.jpg`.
> Si el poster aún no existe, usa solo `src` (el `poster` es opcional).

---

### (Solo si en vez del repo lo quieres dentro del HTML que hizo Claude Design)
Pídele esto a Claude Design en el mismo chat del artifact: *"Sin cambiar nada del diseño, agrega como primer
elemento del body un `<video>` de fondo fijo a pantalla completa (`position:fixed; inset:0; object-fit:cover;
z-index:-1; muted; playsinline; preload=auto`) con `src` a mi video, un overlay oscuro encima para legibilidad,
y un pequeño script que en el evento `scroll` ponga `video.currentTime = (scrollY / (scrollHeight - innerHeight))
* video.duration`. No modifiques el resto del HTML/CSS."*
