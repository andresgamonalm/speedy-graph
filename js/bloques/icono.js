// Bloque: Ícono. LINEAMIENTOS: icono/imagen, tamaño, color, texto al lado, URL.
// Pantalla usa SVG (set propio, nunca emojis). Email: imagen PNG si se indica, o solo
// texto (los SVG no van en Outlook).
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";
import { icono as svg } from "../core/iconos.js";

export default {
  id: "icono",
  cat: "Decoración",
  nombre: "Ícono",
  sub: "Símbolo con texto",
  icon: "plus",

  defaults: {
    nombre: "layers", imagenUrl: "", tamano: 32,
    texto: "", link: "", alin: "center",
    color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "nombre", tipo: "select", label: "Ícono", opciones: ["layers", "type", "plus", "eye", "up", "down", "copy"].map((v) => ({ v, t: v })) },
    { k: "imagenUrl", tipo: "imgurl", label: "Imagen PNG (para email)" },
    { k: "texto", tipo: "text", label: "Texto al lado" },
    { k: "link", tipo: "text", label: "Enlace" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "tamano", tipo: "range", label: "Tamaño", min: 16, max: 72, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "color", tipo: "color", label: "Color", hereda: "principal" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = col(d.color, p, "principal");
    const glifo = d.imagenUrl
      ? `<img src="${esc(d.imagenUrl)}" alt="" style="width:${d.tamano}px;height:${d.tamano}px;display:inline-block">`
      : `<span style="display:inline-flex;color:${c}">${svg(d.nombre, d.tamano)}</span>`;
    const txt = d.texto ? `<span style="font-family:${fuente};font-size:15px;color:${c}">${esc(d.texto)}</span>` : "";
    const inner = `<span style="display:inline-flex;align-items:center;gap:10px">${glifo}${txt}</span>`;
    const wrapped = d.link ? `<a href="${url(d.link)}" style="text-decoration:none">${inner}</a>` : inner;
    return `<div style="text-align:${d.alin}">${wrapped}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = col(d.color, p, "principal");
    // Sin SVG en email: imagen PNG si existe; si no, solo el texto.
    const glifo = d.imagenUrl ? `<img src="${esc(d.imagenUrl)}" width="${d.tamano}" alt="" style="display:inline-block;vertical-align:middle;border:0">` : "";
    const txt = d.texto ? `<span style="font-family:${fuente};font-size:15px;color:${c};vertical-align:middle">${d.imagenUrl ? "&nbsp;" : ""}${esc(d.texto)}</span>` : "";
    const inner = d.link ? `<a href="${url(d.link)}" target="_blank" style="text-decoration:none">${glifo}${txt}</a>` : `${glifo}${txt}`;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="${d.alin}">${inner || "&nbsp;"}</td></tr></table>`;
  },
};
