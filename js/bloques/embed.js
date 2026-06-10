// Bloque: Embed externo / iframe. LINEAMIENTOS: URL, alto, ancho, fallback, seguridad,
// no romper canvas. P0: el iframe no va en email → pantalla embebe; email cae a un botón.
import { fuente } from "../core/tokens.js";
import { esc, url, attr, col } from "../core/utils.js";

export default {
  id: "embed",
  cat: "Avanzado",
  nombre: "Embed / iframe",
  sub: "Contenido externo",
  icon: "eye",

  defaults: {
    embedUrl: "https://", alto: 320,
    titulo: "Contenido externo", textoBoton: "Abrir contenido",
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "embedUrl", tipo: "text", label: "URL del embed" },
    { k: "titulo", tipo: "text", label: "Título (fallback email)" },
    { k: "textoBoton", tipo: "text", label: "Texto del botón (email)" },
    { grupo: "Layout" },
    { k: "alto", tipo: "range", label: "Alto (pantalla)", min: 160, max: 600, paso: 20, suf: "px" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo (fallback)", hereda: "fondoSecundario" },
    { k: "color", tipo: "color", label: "Color del texto", hereda: "textoPrincipal" },
  ],

  renderPantalla(d) {
    return `<iframe src="${attr(d.embedUrl)}" width="100%" height="${d.alto}" style="border:0;border-radius:12px;display:block" loading="lazy" sandbox="allow-scripts allow-same-origin allow-popups" title="Embed"></iframe>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td align="center" style="padding:28px 24px;font-family:${fuente}">
      <div style="font-size:16px;font-weight:600;color:${col(d.color, p, "textoPrincipal")};padding-bottom:14px">${esc(d.titulo)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.embedUrl)}" target="_blank" style="display:inline-block;font-size:14px;font-weight:500;color:#fff;text-decoration:none;padding:11px 22px">${esc(d.textoBoton)}</a></td></tr></table>
    </td></tr></table>`;
  },
};
