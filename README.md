# edi-developer-new

Sitio personal y portafolio en **Next.js** (App Router), migrado desde la versión React + Vite. Incluye secciones de inicio, presentaciones, diseño con Tailwind, componentes 3D (Three.js/React Three Fiber) y soporte i18n.

## Tecnologías

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Tailwind CSS** (v4)
- **React Query**, **Framer Motion** / **Motion**, **Lucide React**
- **Three.js**, **@react-three/fiber**, **@react-three/drei**, **postprocessing**
- **OpenAI** y **Gemini** (hooks en `presentation/utils/hooks`)

## Scripts

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build
pnpm start
pnpm lint
```

## Variables de entorno

Copia `.env.example` a `.env.local` y rellena las claves que uses:

- `NEXT_PUBLIC_OPENAI_API_KEY` – para el asistente/chat (OpenAI).
- `NEXT_PUBLIC_GOOGLE_API_KEY` – para funcionalidades con Gemini.

Solo las variables con prefijo `NEXT_PUBLIC_` están disponibles en el cliente. Para no exponer claves, usa API Routes o Server Actions y lee env sin prefijo en el servidor.

## Estructura relevante

- `app/` – layout, página principal, `/presentaciones`, `not-found`
- `components/` – providers, UI y componentes (Hyperspeed, etc.)
- `presentation/` – layout, páginas (index, presentaciones), componentes de sección, utils (i18n, hooks)
- `design/` – átomos, moléculas, plantillas
- `core/`, `hooks/`, `lib/` – utilidades y hooks compartidos
- `public/` – estáticos (imágenes, modelos, PDFs, etc.)

## Despliegue

- **Vercel**: conectar el repo y la carpeta `edi-developer-new`; configurar env en el dashboard.
- **GitHub Pages**: en `next.config.ts` usar `output: "export"` y, si aplica, `basePath`; desplegar la carpeta `out`.

## Licencia

MIT.
