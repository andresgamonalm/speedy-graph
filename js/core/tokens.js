// Design tokens: la única fuente de verdad visual.
// Canvas manda → Bloque hereda → Componente adapta → Contenido se ajusta.
// Capa A (interfaz Gamonal) y Capa B (paleta activa por proyecto) viven aquí, separadas.

// ── Espaciado: escala única (px). Nada de medidas arbitrarias si existe token. ──
export const spacing = [0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80];

// ── Tipografía: Roboto. Pesos permitidos 300–600. Jamás >600. ──
export const fuente = "Roboto, system-ui, -apple-system, Segoe UI, sans-serif";
export const pesos = [300, 400, 500, 600];

// Roles tipográficos: tamaño base (px), peso, line-height.
export const roles = {
  display:  { size: 48, weight: 600, lh: 1.1,  label: "Display" },
  h1:       { size: 32, weight: 600, lh: 1.15, label: "Título H1" },
  h2:       { size: 24, weight: 600, lh: 1.2,  label: "Subtítulo H2" },
  h3:       { size: 20, weight: 500, lh: 1.25, label: "Encabezado H3" },
  bajada:   { size: 18, weight: 400, lh: 1.4,  label: "Bajada" },
  parrafo:  { size: 16, weight: 400, lh: 1.55, label: "Párrafo" },
  caption:  { size: 13, weight: 400, lh: 1.4,  label: "Caption" },
  label:    { size: 13, weight: 500, lh: 1.2,  label: "Label" },
  boton:    { size: 15, weight: 500, lh: 1,    label: "Botón" },
  cita:     { size: 20, weight: 400, lh: 1.4,  label: "Cita", italic: true },
};

// ── Capa A: paleta fija de la interfaz Gamonal. NO se aplica a las piezas. ──
export const gamonal = {
  azul:     "#040764",
  azul2:    "#1C73CB",
  turquesa: "#20B6B6",
  amarillo: "#FCE865",
  magenta:  "#B318A3",
  grisOsc:  "#3B3B3B",
  grisClr:  "#F5F5F5",
  blanco:   "#FFFFFF",
};

// ── Capa B: paleta activa por proyecto (semántica, intercambiable). ──
// El kit "Gamonal" es solo uno de los rellenos por defecto, no es forzado.
export const paletaGamonal = {
  principal:       "#040764",
  secundario:      "#1C73CB",
  acento:          "#20B6B6",
  cta:             "#1C73CB",
  textoPrincipal:  "#3B3B3B",
  textoSecundario: "#6B6B6B",
  fondoPrincipal:  "#FFFFFF",
  fondoSecundario: "#F5F5F5",
  borde:           "#E3E3E3",
  link:            "#1C73CB",
  error:           "#C0392B",
  warning:         "#E67E22",
  success:         "#1E8E5A",
  info:            "#1C73CB",
};

// Radios y sombras (tokens globales).
export const radios = { none: 0, sm: 4, md: 8, lg: 12, xl: 16, full: 9999 };
export const sombras = {
  none:   "none",
  soft:   "0 1px 3px rgba(4,7,100,.08)",
  medium: "0 4px 12px rgba(4,7,100,.10)",
  strong: "0 12px 28px rgba(4,7,100,.14)",
};

// Ancho útil por formato de canvas.
export const canvas = {
  email:   600,
  libre:   720,
};

// Helper de contraste: rechaza combinaciones ilegibles (Capa B).
// Devuelve true si el contraste es suficiente para leer al instante.
export function contrasteOk(hexTexto, hexFondo) {
  const lum = (hex) => {
    const c = hex.replace("#", "");
    const n = c.length === 3 ? c.split("").map((x) => x + x).join("") : c;
    const [r, g, b] = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255);
    const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
  };
  const a = lum(hexTexto), b = lum(hexFondo);
  const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  return ratio >= 4.5; // AA para texto normal
}
