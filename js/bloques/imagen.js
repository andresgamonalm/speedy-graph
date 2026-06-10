// Bloque: Imagen. Usa el sistema de imagen único (core/imagen.js).
import { fuente } from "../core/tokens.js";
import { camposImagen, defaultsImagen, renderImagenPantalla, renderImagenEmail } from "../core/imagen.js";

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export default {
  id: "imagen",
  cat: "Contenido",
  nombre: "Imagen",
  sub: "Foto con proporción y foco",
  icon: "layers",

  defaults: {
    ...defaultsImagen,
    aspecto: "16:9",
    caption: "",
    link: "",
    margenInf: 16,
  },

  campos: [
    { grupo: "Contenido" },
    ...camposImagen(),
    { k: "caption", tipo: "text", label: "Pie de foto" },
    { k: "link", tipo: "text", label: "Enlace (opcional)" },
    { grupo: "Espaciado" },
    { k: "margenInf", tipo: "range", label: "Margen inferior", min: 0, max: 80, paso: 4, suf: "px" },
  ],

  renderPantalla(d) {
    const img = renderImagenPantalla(d);
    const cap = d.caption
      ? `<p data-edit="caption" style="font-family:${fuente};font-size:13px;color:#8a8f9e;margin:8px 0 0;text-align:center">${esc(d.caption)}</p>`
      : "";
    return `<div style="margin:0 0 ${d.margenInf}px;box-sizing:border-box">${img}${cap}</div>`;
  },

  renderEmail(d, ctx = {}) {
    const ancho = ctx.ancho || 600;
    let img = renderImagenEmail(d, { ancho });
    if (d.link && img) img = `<a href="${esc(d.link)}" target="_blank">${img}</a>`;
    const cap = d.caption
      ? `<tr><td align="center" style="font-family:${fuente};font-size:13px;color:#8a8f9e;padding:8px 0 0">${esc(d.caption)}</td></tr>`
      : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding:0 0 ${d.margenInf}px">${img}</td></tr>${cap}</table>`;
  },
};
