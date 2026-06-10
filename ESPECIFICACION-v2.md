# Especificación v2 — Simple Block Builder

Documento de diseño. Entregable previo a código exigido por `LINEAMIENTOS.md`.
No es código: es la especificación que se aprueba antes de construir.

Fecha: 2026-06-10. Rama: `claude/exciting-hawking-zmknvq`.
Fuentes: `LINEAMIENTOS.md` (la biblia), `AUDITORIA.md`, `NOTAS-v2.md`, `V2-ARRANQUE.md`
y el skill de marca `gamonal-brand-commercial-performance`.

---

## 0. Reglas duras (innegociables)

1. **Canvas manda. Bloque hereda. Componente adapta. Contenido se ajusta. El usuario
   solo toca overrides controlados.** Ningún componente tiene reglas propias si existe
   una regla global.
2. **Dos renders por bloque**: `renderPantalla(d)` (editable, flex/grid OK) y
   `renderEmail(d)` (SOLO tablas + align/valign, anchos/altos fijos; sin flex, grid,
   aspect-ratio, object-fit, transform, position:absolute, SVG, iframe ni JS).
3. **Edición directa en TODOS los bloques** (`data-edit`, `data-edit-img`,
   `data-edit-link`, rutas anidadas `items.0.t`).
4. **Toda foto** pasa por el mismo helper de proporción (contenedor + imagen interna).
5. **Dos capas visuales que no se mezclan:**
   - **Capa A — interfaz del builder** (chrome: barra, paneles, canvas, biblioteca,
     Char-B). Es **Gamonal siempre**.
   - **Capa B — piezas creadas por el usuario** (emails, banners, landings). Heredan de
     la **paleta activa del proyecto**, no de Gamonal. Gamonal vive aquí solo como kit
     de marca por defecto.
6. **JAMÁS emojis** en ninguna capa. Íconos sí (SVG en pantalla; en email, PNG o se
   omiten). Esta regla aplica también a Char-B y a las plantillas.
7. **`box-sizing: border-box`** universal. Sin medidas arbitrarias si existe un token.
8. **Roboto, peso máximo 600** en la interfaz Gamonal. La jerarquía se construye con
   escala, espacio, color y posición, no con bold pesado.

---

## 1. Sistema de design tokens (la base que todo hereda)

### 1.1 Espaciado (escala única)

`0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80` (px). Controla padding (4 lados), margen
sup/inf, gap de columnas, gap de cards, separación entre bloques, título↔bajada,
bajada↔CTA. No existe padding o margen escondido dentro de un componente.

### 1.2 Tipografía (roles)

Fuente: **Roboto**. Pesos permitidos: 300, 400, 500, 600 (nunca >600).

| Rol | Uso | Tamaño base | Peso | Line-height |
|-----|-----|-------------|------|-------------|
| Display | Titular dominante de pieza | 48 | 600 | 1.1 |
| H1 | Título principal de bloque | 32 | 600 | 1.15 |
| H2 | Subtítulo | 24 | 600 | 1.2 |
| H3 | Encabezado menor | 20 | 500 | 1.25 |
| Bajada | Contexto bajo título | 18 | 400 | 1.4 |
| Párrafo | Cuerpo | 16 | 400 | 1.55 |
| Caption | Pie / nota | 13 | 400 | 1.4 |
| Label | Etiqueta de control | 13 | 500 | 1.2 |
| Botón | Texto de CTA | 15 | 500 | 1 |
| Link | Enlace | hereda | 500 | hereda |
| Cita | Testimonio | 20 | 400 (italic) | 1.4 |

Cada rol expone: tamaño, peso, line-height, letter-spacing (si aplica), color,
alineación, y "reset a global".

### 1.3 Paleta

**Capa A — interfaz Gamonal (fija):**

| Token UI | Color | Uso |
|----------|-------|-----|
| `--g-azul` | `#040764` | Identidad, sidebar, barra superior |
| `--g-azul-2` | `#1C73CB` | Botones, links, estado activo, interactivo |
| `--g-turquesa` | `#20B6B6` | Datos, automatización, tecnología, acento moderno |
| `--g-amarillo` | `#FCE865` | Atención / énfasis (acento, nunca fondo dominante) |
| `--g-magenta` | `#B318A3` | Acento expresivo (con control) |
| `--g-gris-osc` | `#3B3B3B` | Texto sobre claro |
| `--g-gris-clr` | `#F5F5F5` | Fondos de descanso, contenedores suaves |
| `--g-blanco` | `#FFFFFF` | Limpieza, lectura |

Combinaciones válidas: blanco/azul, azul/blanco, azul/gris-claro, gris-osc/claro,
azul/amarillo, blanco/magenta, blanco/turquesa (si contrasta), amarillo-acento/azul.
Prohibidas: amarillo sobre blanco o gris claro, turquesa sobre blanco con texto chico,
magenta+amarillo sin jerarquía, azul-2 sobre azul sin contraste, exceso de acentos.
Sin negro puro.

**Capa B — paleta activa por proyecto (semántica, intercambiable):**

`principal, secundario, acento, cta, texto-principal, texto-secundario,
fondo-principal, fondo-secundario, borde, link, error, warning, success, info`.

Todo color de un bloque viene de esta paleta o de un override explícito.
**Validación de contraste obligatoria**: si el texto no se lee al instante, la
combinación se rechaza. Gamonal es uno de los kits que rellena esta paleta por defecto.

### 1.4 Bordes, radio y sombra

- Radio: token global (`0, 4, 8, 12, 16, full`), esquinas modernas y consistentes.
- Borde: grosor + color (desde paleta).
- Sombra: `none, soft, medium, strong`. Suaves y discretas; solo para separar planos.

### 1.5 Grid

1, 2, 3, 4 columnas; mosaico 2x2 y 3x3; proporciones 50/50, 40/60, 60/40, 30/70, 70/30.
Reglas: gap global, respeta ancho útil del canvas, apila en mobile (salvo excepción
explícita), orden invertible en mobile, cards de un grid pueden igualar altura, sin
medidas arbitrarias.

### 1.6 Canvas

Cada bloque: width 100% del padre, max-width heredado del canvas, border-box, padding y
margen por tokens, overflow controlado, altura automática salvo override. Propiedades
explícitas `full width` y `contained`. Ningún bloque calcula su ancho/alto ajeno al
lienzo activo.

### 1.7 Componente Imagen (sistema, no bloque a bloque)

Dos capas: **contenedor** (ancho, alto, aspect ratio, radio, borde, sombra, ubicación) e
**imagen interna** (archivo/URL, alt, object-fit, object-position, zoom, mover X/Y, foco,
reset). Ratios: 1:1, 16:9, 4:3, 3:2, 4:5, 9:16, 21:9, custom. Crop independiente
desktop/tablet/mobile. Nunca se deforma salvo `fill` explícito. En email: recorte por
ancho/alto fijos (no aspect-ratio, no object-fit).

### 1.8 Panel de propiedades (orden fijo en TODOS los bloques)

`Contenido · Layout · Espaciado · Tipografía · Color · Imagen (si aplica) · Bordes ·
Sombra · Responsive · Estados · Exportación · Avanzado`. Solo se muestran los grupos que
aplican al bloque; el orden nunca cambia. Se indica qué valores son heredados y cuáles
override, con reset a global.

---

## 2. Tabla maestra de estandarización

Columnas: Componente · Problema probable (heredado de v1) · Propiedades obligatorias ·
Propiedades que faltan · Riesgo de ruptura · Prioridad.

Todos heredan, salvo excepción anotada: tokens de espaciado, tipografía (roles, Roboto),
paleta activa, border-box, ancho útil del canvas, panel de orden fijo, doble render,
edición directa, helper de imagen, validación de contraste, sin emojis.

Prioridad: **P0** crítico (rompe sistema o email) · **P1** alto · **P2** medio · **P3** bajo.

### Grupo 1 — Estructura

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Contenedor libre (`seccionlibre`) | Sub-elementos con reglas propias; fotos sin proporción | fondo, ancho, alto, padding, margen, gap, alinH, alinV, contiene bloques | proporción de foto en sub-elementos; edición directa total | Alta: contenedor padre, afecta hijos | P1 |
| 2 / 3 columnas (`grid`) | Medidas arbitrarias; no siempre apila | nº columnas, proporción, gap, padding, orden mobile, alinV, igualar alto, stack mobile | igualar altura opcional explícita; invertir orden mobile | Alta: layout base | P1 |
| Grid / mosaico (`grid`) | Mosaico sin token de gap | nº columnas, tipo mosaico, gap, padding, proporción, orden mobile, alto igualado | mosaico 2x2 / 3x3 formal | Alta | P1 |
| Separador (`divisor`) | — | color, grosor, estilo, margen | tokens de margen | Baja | P3 |
| Espaciador (`espaciador`) | Altura suelta | altoEsp por token | snap a escala de spacing | Baja | P3 |
| Hero (`hero`) | overlay `position:absolute` (no email); foto de fondo no editable al clic; `escalaTexto` fantasma | imagen, titulo, sub, cta, overlay/veil, alto, foco | edición directa de foto de fondo; renderEmail con tabla + imagen; quitar campo fantasma | **P0 email + edición** |
| Banner/Alerta (`alert`) | — | tipo, titulo, mensaje, color de alerta | fallback email | P2 |
| Header (`header`) | — | logo, eyebrow, titulo, bajada, tamaños, colores, fondo, padding, alin, alto mín | — (edición directa ya OK) | P2 |
| Footer (`footer`) | — | texto, links, redes, legal, fondo, padding, alin, compat email | edición directa de logo | P2 |
| Sección con fondo (`seccion`) | — | eyebrow, titulo, subtitulo, boton, colores, fuente, padV/padH | — (edición directa completa) | P2 |
| Header de marca (`bandaHeader`) | — | estilo, bg, logoClaro, logoColor | — | P2 |
| Footer de marca (`bandaFooter`) | Logo no editable al clic (inconsistencia con bandaHeader) | estilo, bg, redes, copyright, dirección, unsub, disclaimer, web, logos | edición directa de logo | P1 |

### Grupo 2 — Contenido

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Texto (`texto`) | — | contenido, rol, tamaño, peso, normal/negrita/cursiva, color, alin, line-height, letter-spacing, link, margen, reset | rol tipográfico explícito (Display…Cita) | Media: define roles globales | P1 |
| Imagen (`imagen`) | `altoImg` concatena `${alto}px` → "300pxpx" | url, alt, link, caption, ancho, radio, aspecto, zoom, posición, alto | validar unidades; crop desktop/tablet/mobile | Alta: helper común | P1 |
| Imagen + Texto (`imgtext`) | Campo de imagen es `text`, sin botón biblioteca | imagen, lado, proporción, alto, gap, radio, titulo, texto, colores, alin, link | campo `imgurl` con biblioteca | Media | P1 |
| Lista de features (`features`) | — | titulo, colorIcono, disposición, porFila, orientación, tamaños, gap, items | — (edición directa de ítems OK) | P2 |
| Encabezado / Botón CTA / HTML custom | (CTA en grupo Acción; HTML en Avanzado) | — | — | — |

### Grupo 3 — Acción

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Botón CTA (`cta`) | — | texto, url, variante (primario/secundario/outline/ghost/link), colores, padX/padY, radio, tamaño, alin, ancho auto/full/custom, hover, disabled, email-safe | botón bulletproof para email (tabla + VML) | **P0 email** |
| Oferta/promoción | No existe como bloque propio | titulo, bajada, precio/beneficio, imagen, cta, badge, fecha, fondo, padding | crear bloque (hoy se arma con seccion/product) | P1 |
| Cupón | No existe | código, beneficio, condición, cta, vencimiento, recorte visual, copiar código | crear bloque | P2 |
| Urgencia/escasez | No existe; countdown depende de JS | mensaje, countdown opcional, stock, color alerta, cta | crear bloque + fallback email | P2 |
| Testimonio (`testimonial`) | Foto sin proporción; campo imagen `text` | cita, avatar, autor, cargo, rating, card, alin | proporción de foto; `imgurl`; edición directa | P1 |
| Comparación | No existe | columna A, B, labels, diferencias, conclusión, stack mobile | crear bloque | P2 |
| Pricing (`pricing`) | Sin edición directa | plan, precio, periodo, features, cta, destacado, grid | edición directa; igualar altura en grid | P1 |
| Beneficios | Se cubre con features | titulo, lista, iconos, cards/lista, grid | mapear a features o bloque propio | P3 |
| Formulario/lead (`formulario`) | Modo embed usa iframe (no email) | campos, labels, placeholders, error, cta, éxito, legal | fallback email (link a landing) | **P0 email** |

### Grupo 4 — Agenda

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Día divisor (`diadivisor`) | — | día, fecha, estilo, margen sup/inf | tokens de margen | P3 |
| Evento/cita (`evento`) | Sin edición directa | hora, titulo, descripción, ubicación, cta, link calendario | edición directa | P2 |
| Fecha destacada (`fechaCard`) | Sin edición directa | día, mes, año, descripción, estilo | edición directa | P3 |

### Grupo 5 — Datos

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Tarjeta KPI (`kpi`) | Sin edición directa | número, unidad, label, variación, contexto, color, tamaño dominante | edición directa; número domina | P1 |
| Gráfico simple (`spark`) | SVG no renderiza en Outlook | tipo, datos, labels, colores de paleta, leyenda, titulo, conclusión | fallback imagen/PNG para email | **P0 email** |
| Anillo de progreso (`ring`) | SVG no renderiza en Outlook | valor, máximo, %, color, grosor, label | fallback email (barra de tabla o PNG) | **P0 email** |
| Tabla de datos (`tabla`) | Variable muerta `__SEP__`/`cells` | encabezados, filas, columnas, padding celda, bordes, alin | scroll/stack en mobile; limpiar código | P2 |
| Comparación numérica | Se cubre con spark/kpi | métrica A, B, diferencia, variación, color según resultado | bloque propio o composición | P3 |
| Grilla de estadísticas (`statGrid`) | Sin edición directa | KPIs, columnas, gap, cards, número dominante, label | edición directa | P1 |

### Grupo 6 — Cards

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Card simple | No existe formal; se arma con seccion | fondo, padding, radio, borde, sombra, titulo, texto, cta, gap, igualar alto | bloque card base | P2 |
| Card con imagen (`product`) | Campo imagen `text` | imagen, nombre, descripción, precio, cta, alin, tamaños, radio, colores | `imgurl`; proporción; edición directa | P1 |
| Card de perfil (`profileCard`) | Foto sin proporción; imagen `text` | avatar, nombre, sub, cta, stats | proporción; `imgurl`; edición directa | P1 |
| Card de producto (`product`) | (igual que card con imagen) | — | — | P1 |
| Card de artículo (`article`) | Campo imagen `text` | imagen, categoria, titulo, lead, link, alin, tamaños, radio, colores | `imgurl`; proporción; edición directa | P1 |
| Testimonio card (`testimonial`) | (ver Grupo 3) | — | — | P1 |

### Grupo 7 — Multimedia

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Video embed | No existe; iframe no va en email | url, thumbnail, alto, aspect ratio, play, fallback | bloque; en email = imagen + link | **P0 email** |
| Audio/podcast (`audio`) | Foto sin proporción; imagen `text` | cover, titulo, artista, descripción, duración, link | proporción; `imgurl`; fallback email | P2 |
| Galería | No existe | imágenes, aspect ratio, grid, gap, crop, alt | bloque + helper de imagen | P2 |
| Mapa (`mapa`) | iframe no va en email | dirección, embed/imagen, alto, zoom, link externo | fallback email (imagen estática + link) | **P0 email** |

### Grupo 8 — Widgets

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Contador | No existe | valor inicial/final, label, animación, fallback | bloque; fallback estático email | P3 |
| Cuenta regresiva (`countdown`) | Depende de JS (no email) | fecha final, d/h/m/s, labels | fallback email (imagen o texto fijo) | **P0 email** |
| Clima (`clima`) | Sin edición directa | ubicación, temperatura, condición, icono, datos | edición directa; fallback | P3 |
| Reloj en vivo (`reloj`) | Depende de JS (no email) | zona, formato, estado vivo | fallback estático email | **P0 email** |
| Redes sociales (`social`) | Iconos SVG en email | redes, urls, iconos, tamaño, color, alin | iconos PNG para email | P1 |

### Grupo 9 — Decoración

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Badge/etiqueta | Se cubre con icono | texto, color fondo/texto, radio, tamaño, alin | bloque o variante | P3 |
| Línea decorativa (`divisor`) | — | grosor, color, largo, orientación, margen | orientación | P3 |
| Forma geométrica | No existe | tipo, tamaño, color, opacidad, posición | bloque; no tapar contenido | P3 |
| Fondo con patrón | No existe | patrón, color, opacidad, escala | bloque; no afectar legibilidad | P3 |
| Overlay | Vive dentro de hero | color, opacidad, blend, posición | no afectar contraste | P3 |
| Ícono (`icono`) | — | icono/imagen, tamaño, grosor, color, estilo, textoLado, url | — | P3 |

### Grupo 10 — Avanzado

| Componente | Problema probable | Propiedades obligatorias | Faltan | Riesgo ruptura | Prio |
|---|---|---|---|---|---|
| Código HTML/CSS/JS (`codigo`) | Metadatos `<!--SBB:{}-->` se rompen si el código trae `-->` | campo código, scope aislado, advertencias, fallback, validación básica | sanear `-->`; no inyectar HTML crudo en metadatos; no tocar estilos globales | **P0 export** |
| Embed externo / iframe | No va en email; puede romper canvas | url/código, alto, ancho, fallback, seguridad | fallback email; sandbox | P1 |

### Grupo 11 — Plantillas

| Plantilla | Problema probable | Regla | Prio |
|---|---|---|---|
| Email promoción/oferta, newsletter, bienvenida | Reusan CSS de pantalla → rompen en Outlook | Componer con bloques que tengan `renderEmail` de tablas; canvas 600px | P1 |
| LinkedIn portada/cuadrado/enlace, Facebook post | Tamaños fijos | Cargar canvas + safe area + proporción exacta; sin reglas propias | P2 |
| Cuadrado 1080, Story 1080x1920, Portada 820x312 | Alto fijo | Respetar proporción; banner usa render de banner, no de email | P2 |
| Google Display set / 8 banners | Múltiples tamaños | Mismos tokens; cada tamaño es composición, no sistema paralelo | P2 |

Regla transversal: una plantilla es composición prearmada, **no** un sistema visual
paralelo. Usa los mismos tokens y bloques. Editable sin romper componentes. Sin emojis.

### Grupo 12 — Diseño global (panel)

Controla marca activa, paleta, tipografía, canvas, fondo, espaciado global, estilos de
botón, estilos de card, responsive, exportación. Reglas: todo cambio global afecta a los
bloques que heredan; los overrides locales se marcan visualmente; existe reset a global;
no mezclar diseño global con propiedades internas de un bloque; el usuario distingue qué
es global y qué es local.

---

## 3. Prioridades de corrección (orden de construcción sugerido)

**P0 — primero (rompen email/export, núcleo del aprendizaje v1):**
motor de export email (tablas) · CTA bulletproof · hero (overlay+foto editable) ·
ring/spark (fallback) · mapa/formulario/video/iframe (fallback) · countdown/reloj
(fallback) · social (iconos PNG email) · código (sanear `-->`).

**P1 — alto (estandarización y edición directa que faltan):**
grid/columnas · texto (roles) · imagen (validar unidades + helper) · imgtext/product/
article/profileCard/testimonial (foto + `imgurl` + edición directa) · kpi/statGrid/
pricing (edición directa) · bandaFooter (logo editable) · oferta · embed.

**P2 — medio:** evento, tabla, audio, galería, alert, footer, cupón, urgencia,
comparación, card simple, header/seccion (pulido).

**P3 — bajo:** divisor, espaciador, fechaCard, decoración, contador, clima, widgets
menores, beneficios.

---

## 4. Criterio de diseño Gamonal aplicado al builder (Capa A)

La interfaz se evalúa con el checklist del skill: claridad comercial, jerarquía, aire
visual, paleta Gamonal, Roboto ≤600, hover suaves (`transition 300ms`, elevación leve),
esquinas modernas consistentes, sombras discretas, sin negro puro, sin saturación de
acentos, íconos digitales y limpios, **sin emojis**. Cada pantalla deja claro qué
problema resuelve y reduce fricción: el builder se presenta como herramienta comercial,
no como experimento técnico.
