# Prompt v2 para Claude (Design) — anti-genérico, art-directed

> Pégalo en una conversación NUEVA de Claude. Esta versión obliga a comprometerse con UN concepto fuerte
> y prohíbe explícitamente los patrones de plantilla. Si el resultado parece una landing de startup, falló.

---

Eres un **director de arte de estudio digital premiado (nivel Awwwards / FWA)**. No eres un generador de
plantillas. Vas a diseñar la home de mi portafolio **edi-developer.dev** como un **artifact HTML interactivo
de una sola pieza**, responsive. Tu trabajo se juzga por **distinción visual**, no por "limpio y seguro".

Soy **Edinson Nuñez** — ingeniero frontend con 14+ años, especialista en **Frontend, IA aplicada y 3D/WebGL**.
La web debe DEMOSTRAR ese craft en 3 segundos.

## Regla de oro
Comprométete con **UN concepto art-directed fuerte** y ejecútalo hasta el final. Nada de promediar hacia lo
seguro. Antes de codear, elige y declárame el concepto en 2 frases. Concepto guía (puedes refinarlo, no
diluirlo): **"una sala de control / observatorio WebGL hacia mi trabajo"** — el sitio se siente como un
instrumento vivo, no como un folleto.

## PROHIBIDO (esto es exactamente lo "genérico" que ya me entregaste — evítalo)
- ❌ Hero centrado con título + subtítulo + dos botones sobre un gradiente liso o blob morado.
- ❌ Tres/cuatro tarjetas en fila con un ícono circular arriba y texto centrado.
- ❌ Tipografía default (Inter/Roboto/system) y todo del mismo tamaño y peso.
- ❌ Secciones simétricas apiladas, todas centradas, mismo padding, mismo ritmo.
- ❌ Sombras grises suaves estilo Bootstrap/shadcn por defecto.
- ❌ Copy de marketing vacío ("Innovamos para tu éxito").
Si tu diseño contiene cualquiera de estos, reescríbelo.

## OBLIGATORIO (haz que se sienta de estudio, no de template)
- **Hero asimétrico**: tipografía display ENORME (clamp hasta ~12vw) alineada a un lado, rompiendo la grilla;
  el resto del espacio lo ocupa un **canvas WebGL vivo** (partículas/nebulosa cian→índigo→violeta que reaccionan
  al cursor, con bloom y grano). Implementa el canvas de verdad en el artifact (no una imagen).
- **Cromado de interfaz tipo instrumento**: etiquetas en **monospace** con numeración de secciones (`01 — HERO`,
  `02 — PRODUCTOS`…), líneas/hairlines, coordenadas, un índice lateral sticky que marca la sección activa.
- **Una sección con scroll horizontal** o un movimiento no estándar (p. ej. proyectos/productos que se desplazan
  lateralmente al hacer scroll vertical).
- **Jerarquía editorial**: mezcla pesos y tamaños con fuerza; algunas frases en degradado de marca, otras gigantes
  en blanco, micro-texto mono de apoyo. Tracking negativo en titulares.
- **Grano + viñeta + glow** sutiles en todo; profundidad por capas, no plano.
- **Detalle de craft frontend**: un cursor personalizado reactivo, un contador/clock en vivo, o números que
  cuentan al revelarse. Algo que diga "esto lo hizo alguien que sabe".

## Sistema visual (exacto)
- Fondo `#07090E` · paneles `#0E1320` · hover `#141A2B` · bordes `rgba(255,255,255,.08)`.
- Texto `#F4F6FB` · muted `#9AA4B2`. Acentos: cian `#22D3EE`, índigo `#6366F1`, violeta `#A855F7`
  (gradiente `120deg`), ámbar `#F5A524` sólo realce puntual. Degradado SOLO en 1–2 palabras por título, líneas y estados.
- Tipografía: display con carácter (**Space Grotesk** o **Clash Display**), mono **JetBrains Mono / Geist Mono**,
  cuerpo neutro. Cárgalas por CDN en el artifact.

## Contenido real (úsalo, no inventes credenciales)
Hero: "Construyo productos y soluciones con **inteligencia artificial**" · eyebrow `// FRONTEND · IA · 3D` ·
2 CTAs (primario glow "Ver mis productos", ghost "Trabajemos juntos").
Secciones a incluir (puedes reordenar con criterio editorial): Productos con IA (Slaim, Emotional AI) ·
Recursos (libro "El Programador Aumentado", cuento "Fábrica de Programadores") · Sobre mí + widget terminal
"Pregúntale a la IA sobre mí" · Qué hago (IA, Arquitectura & Desarrollo, Experiencias 3D, Educación, Producto)
· Charlas/Workshops · Blog · Edi Academy (Docentes/Desarrolladores/Empresas) · Contacto · Footer.

## Movimiento
Reveals con stagger al scroll, parallax real en el hero, hover con elevación+glow, CTA magnético, transiciones
de 0.4–0.8s con easing suave. Respeta `prefers-reduced-motion`.

## Entregable y autoevaluación
1. Declárame el **concepto** (2 frases) y el **font pairing** elegido.
2. Entrega UN artifact HTML responsive con el hero WebGL funcionando.
3. Antes de cerrar, **autoevalúate**: lista cualquier elemento que se parezca a una plantilla y reemplázalo.
   Termina preguntándome si quieres "más audaz" o "más sobrio" para iterar.

Sé valiente. Prefiero un diseño con una idea fuerte y discutible que uno correcto y olvidable.
