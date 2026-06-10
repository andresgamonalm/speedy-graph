// Bloque: Hero con overlay. LINEAMIENTOS: imagen, título, sub, CTA, overlay.
// P0 (auditoría): el overlay con position:absolute NO va en email → pantalla usa imagen
// de fondo con velo y texto encima; email apila imagen arriba y banda de color con el
// texto debajo (sin texto sobre imagen, bulletproof).
import { roles, fuente } from "../core/tokens.js";
import { esc, url, attr, col } from "../core/utils.js";
import { renderImagenEmail } from "../core/imagen.js";

export default {
  id: "hero",
  cat: "Estructura",
  nombre: "Hero",
  sub: "Portada con imagen y CTA",
  icon: "eye",

  defaults: {
    imagenUrl: "", titulo: "Marketing que baja a ejecución",
    sub: "De la estrategia a piezas listas para publicar.",
    mostrarCta: true, ctaTexto: "Ver herramienta", ctaUrl: "https://",
    alto: 320, oscurecer: 45, alin: "center", radio: 14,
    bg: null, colorTitulo: null, colorSub: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "imagenUrl", tipo: "imgurl", label: "Imagen de fondo" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "sub", tipo: "textarea", label: "Subtítulo" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
    { k: "alto", tipo: "range", label: "Alto (pantalla)", min: 200, max: 480, paso: 20, suf: "px" },
    { k: "oscurecer", tipo: "range", label: "Oscurecer fondo", min: 0, max: 80, suf: "%" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Color de banda", hereda: "principal" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", heredaFijo: "#FFFFFF" },
    { k: "colorSub", tipo: "color", label: "Color del subtítulo", heredaFijo: "#E6E8EF" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const dsp = roles.display;
    const tit = d.colorTitulo || "#FFFFFF", sub = d.colorSub || "#E6E8EF";
    const just = d.alin === "left" ? "flex-start" : d.alin === "right" ? "flex-end" : "center";
    const fondo = d.imagenUrl
      ? `background-image:linear-gradient(rgba(4,7,100,${d.oscurecer / 100}),rgba(4,7,100,${d.oscurecer / 100})),url('${attr(d.imagenUrl)}');background-size:cover;background-position:center`
      : `background:${col(d.bg, p, "principal")}`;
    const cta = d.mostrarCta ? `<a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "principal")};background:#fff;padding:12px 26px;border-radius:6px;text-decoration:none;margin-top:18px;transition:all .3s ease">${esc(d.ctaTexto)}</a>` : "";
    return `<div style="${fondo};min-height:${d.alto}px;border-radius:${d.radio}px;display:flex;flex-direction:column;align-items:${just};justify-content:center;text-align:${d.alin};padding:40px;box-sizing:border-box;font-family:${fuente}">
      <h1 data-edit="titulo" style="font-size:${dsp.size}px;font-weight:${dsp.weight};line-height:${dsp.lh};color:${tit};margin:0;max-width:600px">${esc(d.titulo)}</h1>
      <p data-edit="sub" style="font-size:18px;line-height:1.4;color:${sub};margin:14px 0 0;max-width:520px">${esc(d.sub)}</p>${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const dsp = roles.display;
    const tit = d.colorTitulo || "#FFFFFF", sub = d.colorSub || "#E6E8EF";
    const ancho = ctx?.ancho || 552;
    const img = d.imagenUrl ? `<tr><td>${renderImagenEmail({ url: d.imagenUrl, alt: "", radio: 0 }, { ancho })}</td></tr>` : "";
    const cta = d.mostrarCta ? `<tr><td align="${d.alin}" style="padding-top:18px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${d.alin}"><tr><td bgcolor="#FFFFFF" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "principal")};text-decoration:none;padding:12px 26px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${img}
      <tr><td bgcolor="${col(d.bg, p, "principal")}" style="padding:36px 28px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td align="${d.alin}" style="font-size:${dsp.size}px;font-weight:${dsp.weight};line-height:${dsp.lh};color:${tit}">${esc(d.titulo)}</td></tr>
        <tr><td align="${d.alin}" style="font-size:18px;line-height:1.4;color:${sub};padding-top:14px">${esc(d.sub)}</td></tr>
        ${cta}</table></td></tr></table>`;
  },
};
