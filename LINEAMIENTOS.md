Estoy trabajando en un editor HTML llamado Simple Block Builder.

Es una herramienta para crear emails, banners, landings, avisos, piezas comerciales, gráficas, presentaciones visuales y creatividades digitales.

El problema actual es que los componentes no están estandarizados. Cada bloque parece tener reglas propias: algunos no respetan el canvas, otros tienen padding o márgenes distintos, otros cambian tamaños de forma inconsistente, las imágenes no se pueden ajustar correctamente dentro de su contenedor y al corregir un componente se rompe otro.

No quiero que generes código todavía.

Primero necesito que revises el editor como un sistema completo de componentes y propongas una especificación clara para estandarizarlo.

## Principio general obligatorio

Canvas manda.
Bloque hereda.
Componente adapta.
Contenido se ajusta.
El usuario modifica solo overrides controlados.

Ningún componente debe funcionar con reglas propias si existe una regla global.

## Objetivo

Estandarizar todos los componentes del editor para que compartan el mismo sistema de:

* Canvas.
* Ancho.
* Alto.
* Padding.
* Márgenes.
* Gap.
* Grid.
* Tipografía.
* Estilos de letra.
* Paleta de colores.
* Botones.
* Cards.
* Imágenes.
* Bordes.
* Sombras.
* Estados visuales.
* Responsive.
* Exportación HTML.
* Compatibilidad email cuando aplique.

## Bloques actuales del editor

El editor tiene estos grupos de bloques. Debes considerarlos todos dentro del sistema.

### 1. Estructura

* Contenedor libre.
* 2 columnas.
* 3 columnas.
* Grid / mosaico.
* Separador.
* Espaciador.

### 2. Contenido

* Encabezado.
* Texto.
* Imagen.
* Botón CTA.
* Imagen + texto.
* Lista de features.
* Footer.
* Header de marca.
* HTML custom.

### 3. Acción

* Oferta / promoción.
* Cupón.
* Urgencia / escasez.
* Testimonio.
* Comparación.
* Pricing.
* Beneficios.
* Formulario / lead.

### 4. Agenda

* Día divisor.
* Evento / cita.
* Fecha destacada.

### 5. Datos

* Tarjeta KPI.
* Gráfico simple.
* Anillo de progreso.
* Tabla de datos.
* Comparación numérica.
* Grilla de estadísticas.

### 6. Cards

* Card simple.
* Card con imagen.
* Card de perfil.
* Card de producto.
* Card de artículo.
* Testimonio card.

### 7. Multimedia

* Video embed.
* Audio / podcast.
* Galería.
* Mapa.

### 8. Widgets

* Contador.
* Cuenta regresiva.
* Clima.
* Reloj en vivo.
* Redes sociales.

### 9. Decoración

* Badge / etiqueta.
* Línea decorativa.
* Forma geométrica.
* Fondo con patrón.
* Overlay.

### 10. Avanzado

* Código HTML.
* Código CSS.
* Código JS.
* Embed externo.
* Iframe.
* Script controlado.

### 11. Plantillas

* Email promoción / oferta.
* Email newsletter / artículos.
* Email bienvenida / informativo.
* LinkedIn portada perfil.
* LinkedIn post cuadrado.
* LinkedIn enlace.
* Facebook post.
* Cuadrado 1080x1080.
* Story 1080x1920.
* Portada 820x312.
* Google Display set desktop.
* Ocho banners separados.

### 12. Diseño global

* Marca activa.
* Paleta.
* Tipografía.
* Canvas.
* Fondo.
* Espaciado global.
* Estilos de botón.
* Estilos de card.
* Estilos responsive.
* Exportación.

## Reglas globales obligatorias

Todos los componentes deben:

1. Respetar el ancho útil del canvas.
2. Usar `box-sizing: border-box`.
3. Heredar fuente global.
4. Heredar paleta global.
5. Heredar padding, márgenes y gap desde tokens globales.
6. Permitir overrides locales visibles y reversibles.
7. No modificar estilos globales desde un componente.
8. No usar medidas arbitrarias si existe un token.
9. No romper desktop, tablet, mobile ni exportación HTML.
10. No corregirse de forma aislada sin revisar impacto en otros bloques.

## Design tokens mínimos

El editor debe tener tokens globales para que todos los componentes hablen el mismo idioma visual.

### Espaciado

Deben existir tokens de spacing:

* 0 px
* 4 px
* 8 px
* 12 px
* 16 px
* 20 px
* 24 px
* 32 px
* 40 px
* 48 px
* 64 px
* 80 px

Estos tokens deben controlar:

* Padding superior.
* Padding derecho.
* Padding inferior.
* Padding izquierdo.
* Margen superior.
* Margen inferior.
* Gap entre columnas.
* Gap entre cards.
* Separación entre bloques.
* Separación entre título y bajada.
* Separación entre bajada y CTA.

No debe haber padding o márgenes escondidos dentro de componentes.

### Tipografía

Todo texto debe tener:

* Fuente global heredada.
* Tamaño.
* Peso.
* Estilo normal.
* Negrita.
* Cursiva.
* Subrayado para links.
* Color.
* Alineación.
* Line-height.
* Letter-spacing si aplica.
* Reset a estilo global.

Deben existir roles tipográficos:

* Display.
* H1.
* H2.
* H3.
* Bajada.
* Párrafo.
* Caption.
* Label.
* Botón.
* Link.
* Cita.

Cada rol debe tener tamaño, peso y line-height definidos.

### Paleta de colores

Debe existir una paleta activa por proyecto.

Cada paleta debe tener:

* Color principal.
* Color secundario.
* Color acento.
* Color CTA.
* Color texto principal.
* Color texto secundario.
* Color fondo principal.
* Color fondo secundario.
* Color borde.
* Color link.
* Color error.
* Color warning.
* Color success.
* Color info.

Todo color usado por un componente debe venir de la paleta activa o de un override explícito.

Debe existir validación de contraste. Si el texto no se lee inmediatamente, la combinación no sirve.

## Sistema de grid

El builder debe soportar:

* 1 columna.
* 2 columnas.
* 3 columnas.
* 4 columnas.
* Mosaico 2x2.
* Mosaico 3x3.
* Proporciones 50/50.
* Proporciones 40/60.
* Proporciones 60/40.
* Proporciones 30/70.
* Proporciones 70/30.

Reglas:

* Todo grid debe usar gap global.
* Todo grid debe respetar el ancho útil del canvas.
* En mobile debe apilarse, salvo excepción explícita.
* El usuario debe poder invertir orden en mobile.
* Las cards de un mismo grid deben poder igualar altura.
* Ningún grid debe usar medidas arbitrarias invisibles.

## Canvas y dimensiones

Todos los bloques deben vivir dentro del ancho útil del canvas activo.

Ningún bloque puede calcular su ancho o alto de forma independiente al lienzo activo.

Cada bloque debe tener:

* Width 100% del contenedor padre.
* Max-width heredado del canvas.
* Box-sizing border-box.
* Padding controlado por tokens.
* Margen controlado por tokens.
* Overflow controlado.
* Altura automática salvo que el usuario defina altura específica.

Si un bloque necesita ancho completo, debe existir una propiedad explícita llamada “full width”.

Si un bloque necesita ancho contenido, debe existir una propiedad explícita llamada “contained”.

## Componente Imagen

Este componente es crítico y debe corregirse como sistema, no bloque por bloque.

Toda imagen debe tener dos capas:

1. Contenedor de imagen.
2. Imagen interna.

El contenedor controla:

* Ancho.
* Alto.
* Aspect ratio.
* Radio.
* Borde.
* Sombra.
* Ubicación dentro del bloque.

La imagen interna controla:

* Archivo o URL.
* Alt text.
* Object-fit.
* Object-position.
* Zoom.
* Mover X.
* Mover Y.
* Foco visual.
* Reset de posición.

La imagen debe permitir:

* Cuadrada 1:1.
* Apaisada 16:9.
* Apaisada 4:3.
* Horizontal 3:2.
* Vertical 4:5.
* Story 9:16.
* Panorámica 21:9.
* Custom.

El usuario debe poder:

* Cubrir el contenedor sin deformar.
* Encajar la imagen completa.
* Ajustar alto.
* Hacer zoom.
* Mover la imagen hacia arriba o abajo.
* Mover la imagen hacia izquierda o derecha.
* Definir foco visual.
* Tener ajustes distintos para desktop, tablet y mobile.
* Resetear el recorte.

La imagen nunca debe deformarse salvo que el usuario elija explícitamente `fill`.

## Propiedades mínimas por tipo de bloque

Cada bloque debe tener propiedades consistentes.

### Contenedor libre

Debe tener:

* Fondo.
* Ancho.
* Alto.
* Padding.
* Margen.
* Gap.
* Alineación horizontal.
* Alineación vertical.
* Capacidad para contener otros bloques.
* Responsive.
* Exportación limpia.

### Columnas

Debe tener:

* Número de columnas.
* Proporción.
* Gap.
* Padding.
* Orden mobile.
* Alineación vertical.
* Igualar altura.
* Stack en mobile.
* Responsive.

### Grid / mosaico

Debe tener:

* Número de columnas.
* Tipo de mosaico.
* Gap.
* Padding.
* Proporción.
* Orden mobile.
* Altura igualada opcional.
* Responsive.

### Texto

Debe tener:

* Contenido.
* Rol tipográfico.
* Fuente heredada.
* Tamaño.
* Peso.
* Normal/negrita/cursiva.
* Color.
* Alineación.
* Line-height.
* Letter-spacing.
* Link opcional.
* Margen superior.
* Margen inferior.
* Reset a global.

### Imagen

Debe tener:

* Archivo o URL.
* Alt text.
* Link opcional.
* Ancho.
* Alto.
* Aspect ratio.
* Object-fit.
* Object-position.
* Zoom.
* Mover X.
* Mover Y.
* Foco visual.
* Reset.
* Radio.
* Borde.
* Sombra.
* Crop desktop.
* Crop tablet.
* Crop mobile.

### Botón CTA

Debe tener:

* Texto.
* URL.
* Tipo: primario, secundario, outline, ghost o link.
* Color fondo.
* Color texto.
* Color borde.
* Padding horizontal.
* Padding vertical.
* Radio.
* Tamaño.
* Alineación.
* Ancho auto, full o custom.
* Hover si aplica.
* Disabled si aplica.
* Exportación compatible con email si el formato es email.

### Card

Debe tener:

* Fondo.
* Padding.
* Radio.
* Borde.
* Sombra opcional.
* Imagen opcional.
* Ícono opcional.
* Título.
* Texto.
* CTA opcional.
* Gap interno.
* Altura igualada si está dentro de un grid.

### Header

Debe tener:

* Logo o marca opcional.
* Título.
* Bajada.
* CTA opcional.
* Fondo.
* Padding.
* Alineación.
* Altura mínima.
* Responsive.

### Footer

Debe tener:

* Texto.
* Links.
* Redes opcionales.
* Legal opcional.
* Fondo.
* Padding.
* Alineación.
* Compatibilidad email.

### Oferta / promoción

Debe tener:

* Título.
* Bajada.
* Precio o beneficio.
* Imagen opcional.
* CTA.
* Badge opcional.
* Fecha o condición opcional.
* Fondo.
* Padding.
* Responsive.

### Cupón

Debe tener:

* Código.
* Beneficio.
* Condición.
* CTA.
* Fecha de vencimiento.
* Estilo de borde o recorte visual.
* Copiar código si aplica.
* Responsive.

### Urgencia / escasez

Debe tener:

* Mensaje.
* Cuenta regresiva opcional.
* Stock o cupos opcionales.
* Color de alerta.
* CTA.
* Responsive.
* Fallback email.

### Testimonio

Debe tener:

* Texto de cita.
* Nombre.
* Cargo o descripción.
* Imagen opcional.
* Rating opcional.
* Card o bloque destacado.
* Responsive.

### Comparación

Debe tener:

* Columna A.
* Columna B.
* Labels.
* Diferencias.
* Resultado o conclusión.
* Responsive.
* Stack mobile.

### Pricing

Debe tener:

* Nombre del plan.
* Precio.
* Periodo.
* Features.
* CTA.
* Plan destacado.
* Grid.
* Responsive.

### Beneficios

Debe tener:

* Título.
* Lista de beneficios.
* Íconos opcionales.
* Cards o lista.
* Grid.
* Responsive.

### Formulario / lead

Debe tener:

* Campos.
* Labels.
* Placeholders.
* Estados de error.
* CTA.
* Mensaje de éxito.
* Privacidad/legal opcional.
* Responsive.
* Fallback email si aplica.

### Día divisor

Debe tener:

* Día.
* Fecha.
* Estilo visual.
* Margen superior.
* Margen inferior.
* Responsive.

### Evento / cita

Debe tener:

* Hora.
* Título.
* Descripción.
* Ubicación opcional.
* CTA opcional.
* Link calendario opcional.
* Responsive.

### Fecha destacada

Debe tener:

* Día.
* Mes.
* Año opcional.
* Descripción.
* Estilo visual.
* Responsive.

### Tarjeta KPI

Debe tener:

* Número principal.
* Unidad.
* Label.
* Variación opcional.
* Contexto.
* Color destacado.
* Tamaño dominante.

### Gráfico simple

Debe tener:

* Tipo de gráfico.
* Datos.
* Labels.
* Colores desde paleta.
* Leyenda opcional.
* Título.
* Conclusión.
* Responsive.
* Fallback imagen/email si aplica.

### Anillo de progreso

Debe tener:

* Valor.
* Máximo.
* Porcentaje.
* Color.
* Grosor.
* Label.
* Responsive.
* Fallback email.

### Tabla de datos

Debe tener:

* Encabezados.
* Filas.
* Columnas.
* Padding de celdas.
* Bordes.
* Alineación.
* Responsive.
* Scroll o stack en mobile.

### Comparación numérica

Debe tener:

* Métrica A.
* Métrica B.
* Diferencia.
* Variación.
* Color según resultado.
* Contexto.
* Responsive.

### Grilla de estadísticas

Debe tener:

* KPIs múltiples.
* Columnas.
* Gap.
* Cards opcionales.
* Número dominante.
* Label.
* Responsive.

### Video embed

Debe tener:

* URL.
* Thumbnail.
* Alto.
* Aspect ratio.
* Play button.
* Fallback.
* Responsive.
* Compatibilidad email como imagen + link.

### Audio / podcast

Debe tener:

* Cover.
* Título.
* Descripción.
* Duración.
* Link o embed.
* Fallback.
* Responsive.

### Galería

Debe tener:

* Imágenes múltiples.
* Aspect ratio.
* Grid.
* Gap.
* Crop.
* Alt text.
* Responsive.

### Mapa

Debe tener:

* Dirección.
* Embed o imagen.
* Alto.
* Zoom.
* Fallback.
* Link externo.
* Responsive.

### Contador

Debe tener:

* Valor inicial.
* Valor final.
* Label.
* Animación opcional.
* Fallback.
* Responsive.

### Cuenta regresiva

Debe tener:

* Fecha final.
* Días.
* Horas.
* Minutos.
* Segundos.
* Labels.
* Fallback email.
* Responsive.

### Clima

Debe tener:

* Ubicación.
* Temperatura.
* Condición.
* Ícono.
* Fuente o datos manuales.
* Fallback.
* Responsive.

### Reloj en vivo

Debe tener:

* Zona horaria.
* Formato.
* Estado en vivo.
* Fallback estático.
* Responsive.

### Redes sociales

Debe tener:

* Redes.
* URLs.
* Íconos.
* Tamaño.
* Color.
* Alineación.
* Responsive.
* Compatibilidad email.

### Badge / etiqueta

Debe tener:

* Texto.
* Color fondo.
* Color texto.
* Radio.
* Tamaño.
* Alineación.
* Responsive.

### Línea decorativa

Debe tener:

* Grosor.
* Color.
* Largo.
* Orientación.
* Margen.
* Responsive.

### Forma geométrica

Debe tener:

* Tipo.
* Tamaño.
* Color.
* Opacidad.
* Posición.
* Responsive.
* No debe tapar contenido.

### Fondo con patrón

Debe tener:

* Patrón.
* Color.
* Opacidad.
* Escala.
* Responsive.
* No debe afectar legibilidad.

### Overlay

Debe tener:

* Color.
* Opacidad.
* Blend mode si aplica.
* Posición.
* Responsive.
* No debe afectar contraste.

### Código HTML / CSS / JS

Debe tener:

* Campo de código.
* Scope aislado.
* Advertencias.
* Fallback.
* Validación básica.
* No debe modificar estilos globales sin permiso.

### Embed externo / iframe

Debe tener:

* URL o código.
* Alto.
* Ancho.
* Fallback.
* Responsive.
* Seguridad.
* No debe romper canvas.

## Panel de propiedades mínimo

Cada bloque debe tener un panel ordenado con estos grupos:

1. Contenido.
2. Layout.
3. Espaciado.
4. Tipografía.
5. Color.
6. Imagen, si aplica.
7. Bordes.
8. Sombra.
9. Responsive.
10. Estados.
11. Exportación.
12. Avanzado.

### Contenido

Debe incluir texto, imagen, link, alt text, items o datos según el bloque.

### Layout

Debe incluir ancho, alto, columnas, proporción, alineación y orden.

### Espaciado

Debe incluir padding superior, derecho, inferior e izquierdo; margen superior e inferior; gap.

### Tipografía

Debe incluir fuente, rol de texto, tamaño, peso, normal/negrita/cursiva, line-height, letter-spacing, color y alineación.

### Color

Debe incluir fondo, texto, acento, CTA, borde y overlay si aplica.

### Imagen

Debe incluir aspect ratio, object-fit, posición X, posición Y, zoom, foco y reset.

### Bordes

Debe incluir radio, borde, grosor y color.

### Sombra

Debe incluir tipo de sombra: none, soft, medium, strong.

### Responsive

Debe incluir desktop, tablet, mobile, orden y visibilidad.

### Estados

Debe incluir hover, active, focus, disabled, selected, editing, empty, error y loading cuando aplique.

### Exportación

Debe mostrar si el bloque es HTML safe, email safe y advertencias.

### Avanzado

Debe incluir ID, clase local y CSS scoped si aplica.

## Reglas de responsive

Todo componente debe definir comportamiento para:

* Desktop.
* Tablet.
* Mobile.

En mobile:

* Las columnas deben apilarse.
* El padding debe reducirse.
* Los textos deben mantenerse legibles.
* Los botones pueden pasar a ancho completo.
* Las imágenes deben permitir crop o foco independiente.
* Los grids deben simplificarse.
* Nada debe salirse del canvas.

## Reglas de exportación HTML

El HTML exportado debe ser:

* Limpio.
* Válido.
* Sin wrappers innecesarios.
* Sin estilos duplicados.
* Sin CSS global accidental.
* Sin clases ambiguas.
* Sin elementos huérfanos.
* Sin romper otros componentes.

Cada componente debe tener scope propio.

Un componente no puede introducir CSS que afecte a otro componente.

## Reglas para email marketing

Cuando el formato sea email:

* Evitar JavaScript.
* Usar CSS compatible.
* Usar imágenes con alt text.
* Botones compatibles con clientes de correo.
* Ancho seguro recomendado de 600 px.
* Fallback para fondos con imagen.
* Links válidos.
* Footer legal si aplica.
* Mobile legible.

## Antes de modificar código

Antes de generar código, dime:

1. Qué componente vas a modificar.
2. Qué problema detectaste.
3. Qué tokens globales debe usar.
4. Qué propiedades faltan.
5. Qué reglas responsive aplican.
6. Qué reglas de exportación aplican.
7. Qué riesgo hay de romper otros componentes.
8. Cómo vas a aislar el cambio.
9. Qué pruebas harás mentalmente en desktop, tablet, mobile y exportación.

No generes código hasta completar ese diagnóstico.

## Entregable que necesito primero

Antes de tocar código, entrégame una tabla con:

* Grupo.
* Componente.
* Problema probable.
* Propiedades obligatorias.
* Propiedades que probablemente faltan.
* Reglas globales que debe heredar.
* Riesgos de ruptura.
* Prioridad de corrección.

Después de aprobar esa tabla, recién pasamos a código.

## Referencias obligatorias de UX/UI, diseño y bibliotecas

Antes de proponer cambios, componentes, layouts o correcciones visuales, debes apoyarte en referencias profesionales según el tipo de pieza.

No copies diseños. Usa estas referencias para analizar patrones, buenas prácticas, estructura, jerarquía, componentes, comportamiento responsive, UX/UI, visualización de datos y calidad de ejecución.

Si tienes navegación disponible, revisa estas fuentes.
Si no tienes navegación disponible, declara que no pudiste visitar fuentes externas y trabaja con patrones profesionales conocidos.

### Para UX/UI, aplicativos, interfaces y componentes

Consultar o usar como referencia:

* Mobbin
* Pageflows
* UI Sources
* Figma Community
* shadcn/ui
* Tailwind UI
* Flowbite
* DaisyUI
* Tremor
* Vercel Templates
* GitHub repositories de dashboards, admin panels, SaaS UI, builders, editors y landing pages
* Product Hunt, solo para revisar cómo se presentan productos digitales

Qué debes observar:

* Arquitectura de navegación.
* Jerarquía de acciones.
* Estados: hover, active, focus, disabled, selected, empty, error, loading.
* Diseño de formularios.
* Diseño de paneles laterales.
* Componentes editables.
* Builders visuales.
* Dashboards.
* Tablas.
* Cards.
* Controles de imagen.
* Controles de spacing.
* Sistemas de tokens.
* Responsive.
* Accesibilidad visual básica.

Cuando trabajes en aplicativos, debes aplicar conceptos de UX/UI:

* Claridad de navegación.
* Reducción de carga cognitiva.
* Consistencia de componentes.
* Agrupación lógica.
* Feedback inmediato.
* Estados visibles.
* Acciones primarias y secundarias diferenciadas.
* Flujo simple de uso.
* Controles fáciles de entender.
* Paneles de propiedades ordenados.
* Prevención de errores.
* Reversibilidad de cambios.
* Accesibilidad básica.

### Para landings y sitios comerciales

Consultar o usar como referencia:

* Land-book
* Awwwards
* Godly
* Siteinspire
* Httpster
* Lapa Ninja
* One Page Love
* Framer templates
* Webflow templates
* Vercel Templates

Qué debes observar:

* Hero.
* Titular.
* Bajada.
* CTA.
* Secciones de problema y solución.
* Cards de beneficios.
* Bloques de prueba social.
* Pricing.
* Comparativos.
* Uso de screenshots.
* Ritmo entre secciones.
* Mobile first.
* Conversión.

### Para emails

Consultar o usar como referencia:

* Really Good Emails
* Email Love
* Milled
* Beefree templates
* Stripo templates
* Mailchimp examples

Qué debes observar:

* Estructura del email.
* Encabezado.
* Jerarquía del mensaje.
* CTA principal.
* Escaneabilidad.
* Diseño mobile.
* Bloques modulares.
* Imágenes.
* Botones.
* Footer.
* Compatibilidad con email marketing.

### Para banners, anuncios y piezas publicitarias

Consultar o usar como referencia:

* Meta Ad Library
* Google Ads Transparency Center
* Ads of the World
* Pinterest
* Behance
* Dribbble
* Landing pages SaaS y performance ads de referencia

Qué debes observar:

* Claridad del mensaje.
* Titular principal.
* Promesa.
* CTA.
* Composición.
* Imagen dominante.
* Contraste.
* Safe area.
* Lectura en pocos segundos.
* Diferencias entre awareness, consideración y conversión.

### Para presentaciones, decks y materiales comerciales

Consultar o usar como referencia:

* Behance
* Envato Elements
* Pitch.com templates
* Beautiful.ai
* Reportes anuales de empresas
* Presentaciones SaaS y pitch decks publicados
* Diseño editorial de consultoras y empresas tecnológicas

Qué debes observar:

* Una idea por lámina.
* Títulos con conclusión.
* Uso de cifras grandes.
* Grillas.
* Secciones limpias.
* Comparativos.
* Visualización de problemas y soluciones.
* Narrativa visual.
* Cómo evitar láminas saturadas.

### Para gráficas, dashboards y visualización de datos

Consultar o usar como referencia:

* Observable
* D3 Gallery
* Datawrapper
* Flourish
* Tableau Public
* Looker Studio Gallery
* Recharts examples
* Nivo
* ECharts examples
* Chart.js examples
* Tremor dashboards
* GitHub repositories de data visualization y dashboards

Qué debes observar:

* Qué dato domina.
* Qué conclusión se entiende.
* Cómo se muestran KPIs.
* Cómo se usan colores en datos.
* Cómo se ordenan ejes.
* Cómo se evitan gráficos innecesarios.
* Cómo se destaca la variación.
* Cómo se construyen dashboards legibles.
* Cómo se hace responsive una gráfica.
* Cómo se entrega fallback para email.

Regla: no uses gráficos por decoración. Toda gráfica debe comunicar una conclusión.

### Para avisos de prensa, piezas editoriales e impresos

Consultar o usar como referencia:

* Behance editorial design
* Pinterest editorial layout
* Envato editorial templates
* Issuu reports
* Reportes anuales de empresas
* Publicidad impresa premium
* Diseño editorial de revistas y consultoras

Qué debes observar:

* Titular dominante.
* Bajada editorial.
* Composición.
* Uso de imagen.
* Columnas.
* Márgenes.
* Jerarquía.
* Integración de marca.
* Equilibrio entre impacto y credibilidad.

### Criterio final de uso de referencias

Después de revisar referencias, debes extraer patrones y adaptarlos al Simple Block Builder.

Antes de proponer cambios, define:

1. Qué referencias sirven para el tipo de pieza.
2. Qué patrón visual o UX/UI conviene tomar.
3. Qué patrón no conviene copiar.
4. Cómo se adapta al sistema de componentes del builder.
5. Qué impacto tiene en canvas, tokens, responsive y exportación HTML.

No copies estilos completos.

No copies marcas.

No copies interfaces completas.

Usa las referencias para elevar el criterio, no para imitar.

## Interfaz general del Simple Block Builder

Además de los componentes, debes entender la interfaz completa del producto.

Simple Block Builder no es solo un editor de bloques. Es una herramienta visual para crear piezas comerciales, emails, banners, landings, avisos, gráficas y creatividades digitales mediante un sistema modular.

La interfaz tiene estas áreas principales:

### 1. Pantalla de proyectos

La pantalla de proyectos muestra las creatividades existentes dentro de un proyecto.

Debe permitir:

* Ver nombre del proyecto.
* Ver lista de piezas creadas.
* Distinguir tipo de pieza: email, banner, formato libre u otro.
* Ver estado: borrador, listo u otro.
* Editar una pieza.
* Previsualizar una pieza.
* Duplicar una pieza.
* Eliminar una pieza.
* Crear una nueva creatividad.

Reglas UX/UI:

* La tabla debe ser clara y escaneable.
* Las acciones deben ser consistentes.
* Los estados deben tener color o indicador visual.
* El botón de nueva creatividad debe ser visible.
* La navegación debe permitir volver a proyectos sin perder contexto.
* No debe haber acciones ambiguas.

### 2. Editor visual

El editor visual tiene:

* Barra superior.
* Panel lateral izquierdo.
* Canvas central.
* Controles de formato.
* Vista desktop, tablet y mobile.
* Vista previa.
* Enviar prueba.
* Generador con IA Char-B.
* Exportación.
* Acciones como duplicar, subir, eliminar o guardar.

Reglas UX/UI:

* El canvas debe ser el centro del trabajo.
* El panel lateral debe ordenar componentes y propiedades.
* La barra superior debe contener acciones globales.
* Los controles deben ser consistentes.
* Las acciones destructivas deben estar diferenciadas.
* No debe haber controles duplicados o contradictorios.
* La interfaz debe dejar claro si el usuario está editando diseño global, un bloque o una plantilla.

### 3. Panel lateral de bloques

El panel lateral de bloques organiza los componentes por categorías.

Categorías actuales:

* Estructura.
* Contenido.
* Acción.
* Agenda.
* Datos.
* Cards.
* Multimedia.
* Widgets.
* Decoración.
* Avanzado.

Reglas UX/UI:

* Cada bloque debe tener nombre claro.
* Cada bloque debe tener una descripción breve.
* Cada bloque debe tener ícono consistente.
* Los bloques deben agruparse por uso real, no por conveniencia técnica.
* El usuario debe entender qué hace cada bloque antes de arrastrarlo.
* No deben existir bloques duplicados con nombres distintos pero función similar.
* Los bloques avanzados deben estar separados para no confundir a usuarios comunes.

### 4. Panel de diseño global

El panel de diseño global controla la identidad visual y la configuración base de la pieza.

Debe incluir:

* Marca activa.
* Tipografía.
* Paleta.
* Color principal.
* Color de texto.
* Color de fondo.
* Color CTA.
* Fondo de página.
* Ancho del lienzo.
* Distancia entre bloques.
* Radio de bordes.
* Margen del lienzo.
* Configuración responsive.

Reglas UX/UI:

* Todo cambio global debe afectar los bloques que heredan estilos globales.
* Si un bloque tiene override local, debe indicarse visualmente.
* Debe existir opción para resetear un bloque al estilo global.
* Los controles deben estar agrupados por tema.
* No mezclar diseño global con propiedades internas de un bloque.
* El usuario debe entender qué es global y qué es local.

### 5. Panel de edición de bloque

Cuando el usuario selecciona un bloque, el panel debe mostrar solo las propiedades relevantes para ese bloque.

Debe organizarse en grupos:

* Contenido.
* Layout.
* Espaciado.
* Tipografía.
* Color.
* Imagen, si aplica.
* Bordes.
* Sombra.
* Responsive.
* Estados.
* Exportación.
* Avanzado.

Reglas UX/UI:

* No mostrar controles que no aplican al bloque seleccionado.
* Mantener el mismo orden de propiedades en todos los bloques.
* Usar nombres claros.
* Evitar controles técnicos si pueden expresarse de forma simple.
* Mostrar qué valores vienen heredados y cuáles son overrides.
* Permitir reset a global.
* Evitar que un bloque modifique estilos globales accidentalmente.

### 6. Canvas central

El canvas central representa la pieza visual.

Debe:

* Mostrar el tamaño real o proporcional del formato.
* Respetar el ancho del lienzo.
* Mostrar bloques dentro del área útil.
* Permitir arrastrar, ordenar y seleccionar bloques.
* Mostrar estado vacío cuando no hay contenido.
* Diferenciar el fondo del editor del fondo real de la pieza.
* Mantener fidelidad entre editor, vista previa y exportación.

Reglas UX/UI:

* El canvas manda.
* Ningún bloque debe exceder el área útil salvo que exista una opción explícita de full width.
* La escala de previsualización no debe alterar el HTML exportado.
* El usuario debe distinguir claramente qué es área editable y qué es fondo externo.
* Debe haber feedback visual al arrastrar bloques.
* Debe haber feedback visual al seleccionar un bloque.

### 7. Plantillas

El editor tiene plantillas para distintos formatos.

Plantillas actuales:

* Email promoción / oferta.
* Email newsletter / artículos.
* Email bienvenida / informativo.
* LinkedIn portada perfil.
* LinkedIn post cuadrado.
* LinkedIn enlace.
* Facebook post.
* Cuadrado 1080x1080.
* Story 1080x1920.
* Portada 820x312.
* Google Display set desktop.
* Ocho banners separados.

Reglas UX/UI:

* Cada plantilla debe cargar canvas, dimensiones, safe areas y estructura base.
* Las plantillas no deben crear bloques con reglas propias.
* Toda plantilla debe usar los mismos tokens globales.
* Una plantilla es una composición prearmada, no un sistema visual paralelo.
* Las plantillas deben poder editarse sin romper componentes.
* Los formatos fijos deben respetar proporciones exactas.

### 8. Biblioteca de imágenes

La biblioteca de imágenes permite seleccionar recursos visuales.

Debe permitir:

* Elegir imágenes existentes.
* Subir imágenes nuevas.
* Asociar imágenes a una marca o proyecto.
* Insertar imagen en bloques.
* Usar imágenes en el motor de IA solo si el usuario lo permite.
* Mantener alt text o descripción.
* Evitar imágenes rotas.

Reglas UX/UI:

* El usuario debe poder elegir imagen manualmente.
* La IA no debe inventar imágenes si se indicó usar solo biblioteca.
* Las imágenes deben conservar proporción.
* El editor debe permitir crop, foco, zoom y posición dentro del contenedor.
* La biblioteca debe ser clara y fácil de navegar.

### 9. Motor de IA Char-B

Char-B es el motor de IA del builder.

Sirve para generar piezas a partir de:

* Marca.
* Producto: Email Marketing o Banners Display.
* Tipo de email o pieza.
* Necesidad del usuario.
* CTA.
* Gancho u oferta.
* Destino del CTA.
* URLs de referencia.
* Fotos de biblioteca.
* Indicaciones generales.

Reglas UX/UI y funcionales:

* Char-B debe pedir información suficiente, pero no sobrecargar.
* Los campos obligatorios deben estar claramente marcados.
* Las instrucciones deben ser claras y comerciales.
* La IA debe respetar la marca seleccionada.
* La IA debe usar solo imágenes permitidas por el usuario.
* La IA no debe inventar datos, precios, ofertas, clientes ni beneficios.
* La IA debe generar una pieza editable, no una imagen cerrada.
* La pieza generada debe usar los mismos bloques, tokens y reglas del editor.
* Char-B no debe crear estilos fuera del sistema.
* Char-B no debe resolver una pieza con HTML aislado si existen componentes nativos.
* Toda salida de Char-B debe quedar lista para ajustar en el editor.

### 10. Flujo correcto de Char-B

Antes de generar una pieza, Char-B debe entender:

1. Marca seleccionada.
2. Tipo de producto: email o banner.
3. Tipo de comunicación: comercial, corporativo, informativo, newsletter u otro.
4. Necesidad principal.
5. CTA.
6. Oferta o gancho, si existe.
7. URL destino.
8. Referencias.
9. Imágenes permitidas.
10. Restricciones o indicaciones del usuario.
11. Formato final.
12. Objetivo de la pieza.

Después debe generar:

* Estructura de bloques.
* Textos.
* Jerarquía visual.
* Uso de color desde la marca.
* Imágenes desde biblioteca si aplica.
* CTA.
* Diseño editable.
* Responsive.
* Exportación compatible.

### 11. Reglas para IA y componentes

Char-B debe construir con los mismos componentes del editor.

No debe crear una pieza con reglas paralelas.

No debe generar:

* Padding arbitrario.
* Colores fuera de la marca.
* Fuentes fuera de la marca.
* Imágenes deformadas.
* Bloques fuera del canvas.
* HTML aislado si puede usar componentes nativos.
* Estilos globales que rompan otros bloques.
* Componentes imposibles de editar.

La IA debe respetar:

* Canvas.
* Tokens.
* Grid.
* Tipografía.
* Paleta.
* Responsive.
* Exportación.
* Compatibilidad email.
* Propiedades editables.

### 12. Vista previa

La vista previa debe mostrar cómo se verá la pieza fuera del editor.

Debe permitir revisar:

* Desktop.
* Tablet.
* Mobile.
* Email si aplica.
* Banner si aplica.
* Formato final.
* Links.
* Imágenes.
* CTA.
* Overflow.
* Cortes de texto.

Reglas UX/UI:

* Vista previa debe ser fiel al export.
* No debe mostrar controles del editor.
* Debe advertir si algo se sale del canvas.
* Debe advertir si falta alt text.
* Debe advertir si hay bajo contraste.
* Debe advertir si hay links vacíos.
* Debe advertir si un bloque no es compatible con email.

### 13. Exportación

La exportación debe producir HTML limpio y utilizable.

Debe respetar:

* Canvas.
* Formato.
* Marca.
* Tipografía.
* Paleta.
* Componentes.
* Responsive.
* Compatibilidad email si aplica.

Reglas:

* No exportar wrappers innecesarios.
* No exportar CSS duplicado.
* No exportar estilos globales accidentales.
* No exportar elementos huérfanos.
* No romper imágenes.
* No perder links.
* No deformar botones.
* No cambiar proporciones.
* No cambiar padding.
* No cambiar responsive.

### 14. Regla final de interfaz

Antes de corregir código, debes entender que Simple Block Builder es un producto completo, no una colección de bloques sueltos.

Cualquier cambio debe revisar impacto en:

* Pantalla de proyectos.
* Editor visual.
* Panel de bloques.
* Panel de diseño global.
* Panel de edición de bloque.
* Canvas.
* Plantillas.
* Biblioteca de imágenes.
* Char-B.
* Vista previa.
* Exportación.

No corrijas un componente sin revisar cómo afecta la experiencia completa.


