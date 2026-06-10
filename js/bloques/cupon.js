// Bloque: Cupón. LINEAMIENTOS: código, beneficio, condición, CTA, vencimiento, recorte
// visual. Hereda paleta. En email no hay JS → se muestra el código (sin botón copiar).
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "cupon",
  cat: "Acción",
  nombre: "Cupón",
  sub: "Código con beneficio",
  icon: "plus",

  defaults: {
    beneficio: "30% de descuento", codigo: "GAMONAL30",
    condicion: "Válido en tu primera compra.",
    ctaTexto: "Usar cupón", ctaUrl: "https://",
    vencimiento: "Vence el 30 de junio",
    bg: null, colorBeneficio: null, colorCodigo: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "beneficio", tipo: "text", label: "Beneficio" },
    { k: "codigo", tipo: "text", label: "Código" },
    { k: "condicion", tipo: "text", label: "Condición" },
    { k: "vencimiento", tipo: "text", label: "Vencimiento" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorBeneficio", tipo: "color", label: "Color del beneficio", hereda: "principal" },
    { k: "colorCodigo", tipo: "color", label: "Color del código", hereda: "acento" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};border:2px dashed ${col(d.colorCodigo, p, "acento")};border-radius:14px;padding:24px;text-align:center;font-family:${fuente}">
      <p data-edit="beneficio" style="font-size:24px;font-weight:600;color:${col(d.colorBeneficio, p, "principal")};margin:0 0 12px">${esc(d.beneficio)}</p>
      <div style="display:inline-block;background:#fff;border:1px solid ${col(null, p, "borde")};border-radius:8px;padding:10px 20px;font-size:18px;font-weight:600;letter-spacing:1px;color:${col(d.colorCodigo, p, "acento")}">${esc(d.codigo)}</div>
      <p data-edit="condicion" style="font-size:13px;color:${col(null, p, "textoSecundario")};margin:12px 0 0">${esc(d.condicion)}</p>
      <p style="font-size:12px;color:${col(null, p, "textoSecundario")};margin:4px 0 16px">${esc(d.vencimiento)}</p>
      <a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;background:${col(null, p, "cta")};padding:11px 24px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border:2px dashed ${col(d.colorCodigo, p, "acento")};border-radius:14px"><tr><td align="center" style="padding:24px;font-family:${fuente}">
      <div style="font-size:24px;font-weight:600;color:${col(d.colorBeneficio, p, "principal")};padding-bottom:12px">${esc(d.beneficio)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="#FFFFFF" style="border:1px solid ${col(null, p, "borde")};border-radius:8px;padding:10px 20px;font-size:18px;font-weight:600;letter-spacing:1px;color:${col(d.colorCodigo, p, "acento")}">${esc(d.codigo)}</td></tr></table>
      <div style="font-size:13px;color:${col(null, p, "textoSecundario")};padding-top:12px">${esc(d.condicion)}</div>
      <div style="font-size:12px;color:${col(null, p, "textoSecundario")};padding:4px 0 16px">${esc(d.vencimiento)}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="${col(null, p, "cta")}" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:#fff;text-decoration:none;padding:11px 24px">${esc(d.ctaTexto)}</a></td></tr></table>
    </td></tr></table>`;
  },
};
