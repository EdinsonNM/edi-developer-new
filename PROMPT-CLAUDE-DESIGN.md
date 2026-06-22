# Prompt para Claude (Design / Artifact) — mockup mejorado antes de implementar

> Pégalo en una conversación nueva de Claude. Genera un **mockup visual interactivo** (no el código final),
> para iterar el look antes de pasar a Claude Code.

---

Quiero que actúes como **director de arte + diseñador de producto frontend** y me generes un **mockup visual
interactivo de alta fidelidad** (artifact HTML autocontenido, responsive, en un solo archivo) de la home
rediseñada de mi portafolio **edi-developer.dev**. Es un mockup para validar la dirección visual: prioriza
estética, jerarquía y motion sobre la arquitectura de código.

**Quién soy:** Edinson Nuñez — ingeniero de software con 14+ años, especialista en **Frontend, IA aplicada y
gráficos 3D**. La web actual se ve genérica (fondo blanco, paleta default, todo estático) y no transmite craft.

**Dirección obligatoria: dark, cinematográfica, con 3D/WebGL como protagonista.**

### Sistema de marca
- Superficies: fondo `#07090E`, paneles `#0E1320`, capa hover `#141A2B`, bordes `rgba(255,255,255,.08)`.
- Texto: `#F4F6FB`, muted `#9AA4B2`.
- Acentos: cian `#22D3EE`, índigo `#6366F1`, violeta `#A855F7` (gradiente de marca `120deg`), ámbar `#F5A524` sólo para realce puntual.
- El gradiente sólo en 1–2 palabras de cada título, bordes glow, líneas finas y estados activos. Nunca como relleno grande.
- Tipografía: titulares display grandes con tracking ajustado y 1–2 palabras en degradado; **eyebrows en monospace** (ej. `// SOBRE MÍ`) para sello de ingeniero; cuerpo limpio.
- Componentes "glass": panel translúcido con blur, borde fino y glow del acento en hover. Nada de sombras grises planas.
- Layout editorial con **asimetría** y profundidad (no todo centrado e igual), líneas/grids sutiles, ruido muy bajo de fondo.

### Lenguaje visual de referencia
Nebulosa de partículas cian→índigo→violeta sobre negro, con bloom y un grid de perspectiva tenue. Ese es el ADN del hero y debe armonizar con todo.

### Estructura de la página (10 bloques, conservar contenido)
1. **Hero** a pantalla completa: fondo tipo nebulosa/partículas WebGL (simúlalo con canvas o gradientes animados + parallax al mover el mouse), eyebrow mono `// FRONTEND · IA · 3D`, titular display grande ("Construyo productos y soluciones con inteligencia artificial", 1–2 palabras en degradado), lead muted y **2 CTAs** (primario sólido con glow "Ver mis productos", secundario ghost "Trabajemos juntos").
2. **Productos con IA** (Slaim, Emotional AI): tarjetas glass con badges "En vivo/Gratis" y hover glow.
3. **Recursos/Productos** (libro "El Programador Aumentado", cuento "Fábrica de Programadores"): diferenciar "Gratis" vs "Producto" por color de acento.
4. **Sobre mí + widget terminal** "Pregúntale a la IA sobre mí" (estética mono/dark).
5. **Qué hago** (5 servicios: IA, Arquitectura & Desarrollo, Experiencias 3D, Educación, Producto/Innovación) en tiles glass con íconos glow.
6. **Charlas y Workshops**: chips de temas con borde glow.
7. **Blog**: 3 tarjetas con categoría en mono.
8. **Edi Academy** (Docentes / Desarrolladores / Empresas) + métricas con número en degradado.
9. **Contacto** "Trabajemos juntos": form dark con foco glow.
10. **Footer** dark con navegación, GitHub/LinkedIn y línea fina de gradiente arriba.
- **Navbar** sticky translúcido con indicador de sección en degradado y toggle ES/EN.

### Motion (simúlalo en el mockup)
Reveals al hacer scroll (fade+rise con stagger), parallax en el hero, hover con elevación+glow, CTA magnético. Incluye guard de `prefers-reduced-motion`. Curvas suaves, 0.4–0.8s.

### Entregable
- Un único artifact HTML responsive (mobile + desktop) que pueda previsualizar y del que pueda pedir variaciones.
- Texto placeholder coherente con mi contenido real (no inventes credenciales nuevas).
- Al final, dame **2–3 notas** de las decisiones de diseño clave y qué podríamos A/B testear.

Cuando termines, pregúntame qué quiero ajustar (paleta, densidad, tipografía, intensidad del hero) antes de
que lo convierta en código con Claude Code.
