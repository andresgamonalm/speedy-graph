// Bloque: Galería. LINEAMIENTOS: imágenes múltiples, aspect ratio, grid, gap, crop, alt.
// Sistema de imagen único por ítem. Email en grilla de tablas.
import { esc, col } from "../core/utils.js";
import { renderImagenPantalla, renderImagenEmail, proporciones } from "../core/imagen.js";

export default {
  id: "galeria",
  cat: "Multimedia",
  nombre: "Galería",
  sub: "Cuadrícula de fotos",
  icon: "layers",

  defaults: {
    columnas: 3, gap: 8, aspecto: "1:1", radio: 8,
    imagenes: [{ url: "", alt: "" }, { url: "", alt: "" }, { url: "", alt: "" }],
  },

  campos: [
    { grupo: "Contenido" },
    { k: "imagenes", tipo: "lista", label: "Imagen", nuevo: { url: "", alt: "" }, sub: [{ k: "url", tipo: "imgurl", label: "Imagen" }, { k: "alt", tipo: "text", label: "Alt" }] },
    { grupo: "Layout" },
    { k: "columnas", tipo: "range", label: "Columnas", min: 2, max: 4 },
    { k: "aspecto", tipo: "select", label: "Proporción", opciones: Object.keys(proporciones).map((v) => ({ v, t: v })) },
    { grupo: "Espaciado" },
    { k: "gap", tipo: "range", label: "Separación", min: 0, max: 24, paso: 2, suf: "px" },
    { grupo: "Bordes" },
    { k: "radio", tipo: "range", label: "Radio", min: 0, max: 24, paso: 2, suf: "px" },
  ],

  renderPantalla(d) {
    const cels = d.imagenes.map((im) => `<div>${renderImagenPantalla({ ...im, aspecto: d.aspecto, fit: "cover", zoom: 100, focoX: 50, focoY: 50, radio: d.radio })}</div>`).join("");
    return `<div style="display:grid;grid-template-columns:repeat(${d.columnas},1fr);gap:${d.gap}px">${cels}</div>`;
  },

  renderEmail(d, ctx) {
    const ancho = ctx?.ancho || 552;
    const celW = Math.floor((ancho - d.gap * (d.columnas - 1)) / d.columnas);
    const celda = (im) => `<td valign="top" style="padding:${d.gap / 2}px">${renderImagenEmail({ ...im, radio: d.radio }, { ancho: celW })}</td>`;
    let filas = "";
    for (let i = 0; i < d.imagenes.length; i += d.columnas) {
      filas += `<tr>${d.imagenes.slice(i, i + d.columnas).map(celda).join("")}</tr>`;
    }
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${filas}</table>`;
  },
};
