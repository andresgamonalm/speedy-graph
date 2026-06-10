// Bloque: Formulario / lead. LINEAMIENTOS: campos, labels, placeholders, CTA, éxito,
// legal + fallback email. P0: el email no ejecuta formularios ni iframes → en email se
// muestra como CTA que lleva a la landing del formulario.
import { roles, fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "formulario",
  cat: "Acción",
  nombre: "Formulario / lead",
  sub: "Captura de datos",
  icon: "plus",

  defaults: {
    titulo: "Pide tu propuesta",
    descripcion: "Déjanos tus datos y te contactamos en 24 horas.",
    campos: [{ label: "Nombre", ph: "Tu nombre" }, { label: "Email", ph: "tucorreo@empresa.com" }],
    ctaTexto: "Enviar", ctaUrl: "https://",
    legal: "Al enviar aceptas la política de privacidad.",
    bg: null, colorTitulo: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "descripcion", tipo: "textarea", label: "Descripción" },
    { k: "campos", tipo: "lista", label: "Campo", nuevo: { label: "Campo", ph: "" }, sub: [{ k: "label", tipo: "text", label: "Label" }, { k: "ph", tipo: "text", label: "Placeholder" }] },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL destino (landing)" },
    { k: "legal", tipo: "text", label: "Legal" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    const campos = d.campos.map((c) => `<div style="margin-bottom:10px"><label style="display:block;font-size:13px;font-weight:500;color:${col(d.colorTitulo, p, "textoPrincipal")};margin-bottom:4px">${esc(c.label)}</label><input type="text" placeholder="${esc(c.ph)}" style="width:100%;padding:10px 12px;border:1px solid ${col(null, p, "borde")};border-radius:6px;font-family:${fuente};font-size:14px;box-sizing:border-box" disabled></div>`).join("");
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};padding:24px;border-radius:14px;font-family:${fuente}">
      <h2 data-edit="titulo" style="font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0 0 6px">${esc(d.titulo)}</h2>
      <p data-edit="descripcion" style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};margin:0 0 16px">${esc(d.descripcion)}</p>
      ${campos}
      <button style="width:100%;font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:12px;border:none;border-radius:6px;cursor:pointer;margin-top:6px">${esc(d.ctaTexto)}</button>
      <p style="font-size:11px;color:${col(d.colorTexto, p, "textoSecundario")};margin:10px 0 0;text-align:center">${esc(d.legal)}</p></div>`;
  },

  // Email: sin formulario funcional. CTA que lleva a la landing.
  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const h2 = roles.h2;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:14px"><tr><td align="center" style="padding:32px 24px;font-family:${fuente}">
      <div style="font-size:${h2.size}px;font-weight:${h2.weight};line-height:${h2.lh};color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</div>
      <div style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};padding:6px 0 18px">${esc(d.descripcion)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:12px 28px">${esc(d.ctaTexto)}</a></td></tr></table>
      <div style="font-size:11px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:10px">${esc(d.legal)}</div>
    </td></tr></table>`;
  },
};
