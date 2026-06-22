# Prompt v3 para Claude (Design) — minimalista, monocromo, anti-"IA"

> Itera sobre el diseño anterior. Misma estructura fuerte, pero **sin degradados de colores** y **sin líneas
> dentro de las tarjetas**. Estética **minimalista y editorial**, no "landing de IA".

---

Eres un **director de arte de estudio (nivel Awwwards)** especializado en **minimalismo editorial**. Vas a
refinar la home de **edi-developer.dev** como un **artifact HTML interactivo** responsive. La versión anterior
iba bien en estructura, pero ahora la dirección es **restraint**: menos efecto, más tipografía, aire y silencio.

Soy **Edinson Nuñez**, ingeniero frontend (14+ años), especialista en **Frontend, IA aplicada y 3D/WebGL**.

## Qué CONSERVAR de la versión previa
- El hero **asimétrico** con tipografía display **enorme** rompiendo la grilla.
- El **índice de secciones en monospace** (`01–09`), el wordmark `edi-developer.dev`, el reloj y el cue `SCROLL`.
- La **sección de Productos** tal como quedó (me gusta): mantén su layout y tratamiento.
- El **widget consola/terminal de "Sobre mí"** ("Pregúntale a la IA sobre mí"): me gusta cómo quedó, consérvalo
  igual (estética terminal mono/dark, con sus estados y prompt). Encaja perfecto con el minimalismo.

## Cambios obligatorios (esto es lo que se sentía "IA", córtalo)
- ❌ **Nada de degradados multicolor** (el cian→índigo→violeta fuera). El texto "inteligencia artificial"
  va en **un solo color sólido** (blanco hueso, o un único acento sobrio), nunca arcoíris.
- ❌ **Sin líneas/hairlines dividiendo las tarjetas** ni cajas con bordes de grilla. Separa con **espacio en
  blanco** y jerarquía tipográfica, no con líneas. Si acaso, un borde a ≤6% de opacidad y muy de vez en cuando.
- ❌ Fuera los **glows/bokeh de colores** del fondo. Fondo casi negro **plano**, a lo sumo grano monocromo
  sutil y una viñeta tenue.
- ❌ Sin saturación. Si algo parece de plantilla de SaaS de IA, quítalo.

## Sistema visual minimalista (exacto)
- **Monocromo**: fondo `#0A0A0B`, superficie elevada `#101012`, texto `#FAFAF9`, muted `#9B9BA1`.
- **Un solo acento opcional, sólido, usado en <5%** (links, estado activo): por defecto **ninguno** (todo
  monocromo). Si hace falta, un único tono sobrio (p. ej. azul desaturado `#5B8DEF`) — **jamás un degradado**.
- Bordes/hairlines casi inexistentes (`rgba(255,255,255,.05)`), usados con cuentagotas.
- **Tipografía como protagonista**: display grotesca de carácter (**Space Grotesk** o similar neutra fuerte),
  etiquetas en **mono** (JetBrains/Geist Mono), cuerpo neutro. Mucho contraste de tamaño/peso, tracking negativo
  en titulares. Cárgalas por CDN.
- **Aire**: márgenes generosos, ritmo vertical amplio, pocas cosas por pantalla. El lujo aquí es el espacio.

## Hero (minimalista, sin color)
Tipografía gigante sobre negro plano. Movimiento **muy contenido y monocromo**: elige UNO →
(a) grano + una fina grilla de fuga en blanco a baja opacidad que reacciona apenas al cursor, o
(b) un único objeto 3D **wireframe/cristal blanco** girando lento, o
(c) un loop de **video monocromo** sutil (ver nota de video abajo).
Eyebrow mono `// FRONTEND · IA · 3D`. Lead muted. 2 CTAs: primario **sólido neutro** (blanco/grafito, sin
degradado) y secundario ghost. La fila de stats (Experiencia / Foco / Productos / Base): **sin cajas ni líneas**,
solo columnas con label mono pequeño + valor, separadas por espacio.

## Resto de secciones (mantener contenido, mismo minimalismo)
Productos con IA (conservar) · Recursos (libro + cuento) · Sobre mí + widget terminal · Qué hago (5 servicios,
sin tarjetas con líneas: usa tipografía + mucho aire, quizá lista numerada editorial) · Charlas · Blog ·
Edi Academy · Contacto · Footer. Todo monocromo, tipográfico, espacioso.

## Movimiento
Reveals sobrios con stagger, parallax mínimo, hover discreto (cambio de opacidad/peso, no glow de color).
Easing suave, 0.4–0.7s. Respeta `prefers-reduced-motion`.

## Nota sobre video
Si decides usar un **video** de fondo (opción c del hero), **no lo generes tú**: déjalo como un `<video>`
placeholder con poster monocromo y anota las specs (duración, loop, paleta gris, peso). El video lo generaré
yo aparte **con Grok**.

## Entregable y autoevaluación
1. Declárame en 2 frases la idea y el font pairing.
2. UN artifact HTML responsive, monocromo, con el hero funcionando.
3. Autoevalúate: lista cualquier degradado de color, línea de tarjeta o glow que se haya colado y elimínalo.
   Cierra preguntándome si lo quiero **aún más minimal** o con **un toque de acento**.

Menos es más. Que se sienta caro por la contención, no por los efectos.
