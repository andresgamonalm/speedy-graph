// Bloque: Footer. LINEAMIENTOS: texto, links, redes opcionales, legal, fondo, padding,
// alineación, compatibilidad email. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "footer",
  cat: "Estructura",
  nombre: "Footer",
  sub: "Pie con legal y baja",
  icon: "layers",

  defaults: {
    empresa: "Gamonal",
    texto: "Marketing que baja a ejecución.",
    direccion: "Santiago, Chile",
    copyright: "© 2026 Todos los derechos reservados.",
    mostrarUnsub: true, unsubTexto: "Cancelar suscripción", unsubUrl: "#",
    alin: "center", padV: 32, padH: 24,
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "empresa", tipo: "text", label: "Empresa" },
    { k: "texto", tipo: "textarea", label: "Texto" },
    { k: "direccion", tipo: "text", label: "Dirección" },
    { k: "copyright", tipo: "text", label: "Copyright" },
    { k: "mostrarUnsub", tipo: "check", label: "Mostrar baja" },
    { k: "unsubTexto", tipo: "text", label: "Texto de baja" },
    { k: "unsubUrl", tipo: "text", label: "URL de baja" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { grupo: "Espaciado" },
    { k: "padV", tipo: "range", label: "Padding vertical", min: 0, max: 64, paso: 4, suf: "px" },
    { k: "padH", tipo: "range", label: "Padding horizontal", min: 0, max: 64, paso: 4, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "color", tipo: "color", label: "Color de texto", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = col(d.color, p, "textoSecundario");
    const unsub = d.mostrarUnsub ? `<p style="margin:8px 0 0"><a href="${url(d.unsubUrl)}" style="font-family:${fuente};font-size:12px;color:${col(null, p, "link")};text-decoration:underline">${esc(d.unsubTexto)}</a></p>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:${d.padV}px ${d.padH}px;text-align:${d.alin};box-sizing:border-box;border-radius:8px;font-family:${fuente}">
      <p data-edit="empresa" style="font-size:15px;font-weight:600;color:${c};margin:0 0 6px">${esc(d.empresa)}</p>
      <p data-edit="texto" style="font-size:13px;color:${c};margin:0 0 6px">${esc(d.texto)}</p>
      <p data-edit="direccion" style="font-size:12px;color:${c};margin:0 0 6px">${esc(d.direccion)}</p>
      <p data-edit="copyright" style="font-size:12px;color:${c};margin:0">${esc(d.copyright)}</p>
      ${unsub}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = col(d.color, p, "textoSecundario");
    const fila = (txt, css) => `<tr><td align="${d.alin}" style="font-family:${fuente};color:${c};${css}">${esc(txt)}</td></tr>`;
    const unsub = d.mostrarUnsub ? `<tr><td align="${d.alin}" style="padding:8px 0 0"><a href="${url(d.unsubUrl)}" target="_blank" style="font-family:${fuente};font-size:12px;color:${col(null, p, "link")};text-decoration:underline">${esc(d.unsubTexto)}</a></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}"><tr><td style="padding:${d.padV}px ${d.padH}px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      ${fila(d.empresa, "font-size:15px;font-weight:600;padding:0 0 6px")}
      ${fila(d.texto, "font-size:13px;padding:0 0 6px")}
      ${fila(d.direccion, "font-size:12px;padding:0 0 6px")}
      ${fila(d.copyright, "font-size:12px")}
      ${unsub}</table></td></tr></table>`;
  },
};
