// Bloque: Urgencia / escasez. LINEAMIENTOS: mensaje, cuenta regresiva opcional, stock,
// color de alerta, CTA + fallback email. P0: el countdown depende de JS → en email se
// muestra la fecha objetivo como texto fijo (sin JS).
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

const fmtFecha = (iso) => {
  const t = Date.parse(iso);
  if (isNaN(t)) return iso || "";
  return new Date(t).toLocaleDateString("es", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
};

export default {
  id: "urgencia",
  cat: "Acción",
  nombre: "Urgencia / escasez",
  sub: "Mensaje con cuenta atrás",
  icon: "plus",

  defaults: {
    mensaje: "Últimas horas de la oferta",
    mostrarStock: true, stock: "Quedan 8 cupos",
    fechaIso: "",
    ctaTexto: "Reservar ahora", ctaUrl: "https://",
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "mensaje", tipo: "text", label: "Mensaje" },
    { k: "mostrarStock", tipo: "check", label: "Mostrar stock/cupos" },
    { k: "stock", tipo: "text", label: "Stock / cupos" },
    { k: "fechaIso", tipo: "text", label: "Fecha objetivo (ISO o texto)" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "error" },
    { k: "color", tipo: "color", label: "Color del texto", heredaFijo: "#FFFFFF" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const stock = d.mostrarStock ? `<span style="display:inline-block;background:rgba(255,255,255,.2);border-radius:999px;padding:3px 12px;font-size:13px;font-weight:600;color:${c};margin-top:8px">${esc(d.stock)}</span>` : "";
    const fecha = d.fechaIso ? `<p style="font-size:13px;color:${c};opacity:.9;margin:8px 0 0">Hasta ${esc(fmtFecha(d.fechaIso))}</p>` : "";
    return `<div style="background:${col(d.bg, p, "error")};padding:24px;border-radius:12px;text-align:center;font-family:${fuente}">
      <p data-edit="mensaje" style="font-size:20px;font-weight:600;color:${c};margin:0">${esc(d.mensaje)}</p>
      ${stock}${fecha}
      <div style="margin-top:16px"><a href="${url(d.ctaUrl)}" class="sbb-cta-prev" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "error")};background:#fff;padding:11px 24px;border-radius:6px;text-decoration:none;transition:all .3s ease">${esc(d.ctaTexto)}</a></div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const c = d.color || "#FFFFFF";
    const stock = d.mostrarStock ? `<tr><td align="center" style="padding-top:8px"><span style="display:inline-block;background:rgba(255,255,255,.2);border-radius:999px;padding:3px 12px;font-size:13px;font-weight:600;color:${c}">${esc(d.stock)}</span></td></tr>` : "";
    const fecha = d.fechaIso ? `<tr><td align="center" style="font-size:13px;color:${c};padding-top:8px">Hasta ${esc(fmtFecha(d.fechaIso))}</td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "error")}" style="border-radius:12px"><tr><td style="padding:24px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td align="center" style="font-size:20px;font-weight:600;color:${c}">${esc(d.mensaje)}</td></tr>
      ${stock}${fecha}
      <tr><td align="center" style="padding-top:16px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="#FFFFFF" style="border-radius:6px"><a href="${url(d.ctaUrl)}" target="_blank" style="display:inline-block;font-size:15px;font-weight:500;color:${col(d.bg, p, "error")};text-decoration:none;padding:11px 24px">${esc(d.ctaTexto)}</a></td></tr></table></td></tr>
    </table></td></tr></table>`;
  },
};
