// Bloque: Reloj en vivo. LINEAMIENTOS: zona, formato, estado en vivo, fallback estático.
// P0: el email no ejecuta JS → muestra la hora fija del momento de exportación.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

const hora = (f24, seg) => {
  const o = { hour: "2-digit", minute: "2-digit", hour12: !f24 };
  if (seg) o.second = "2-digit";
  return new Date().toLocaleTimeString("es", o);
};
const fecha = () => new Date().toLocaleDateString("es", { weekday: "long", day: "numeric", month: "long" });

export default {
  id: "reloj",
  cat: "Widgets",
  nombre: "Reloj en vivo",
  sub: "Hora local",
  icon: "down",

  defaults: {
    label: "Hora local", formato24: true, mostrarSegundos: false, mostrarFecha: true,
    bg: null, color: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "label", tipo: "text", label: "Label" },
    { k: "formato24", tipo: "check", label: "Formato 24h" },
    { k: "mostrarSegundos", tipo: "check", label: "Mostrar segundos" },
    { k: "mostrarFecha", tipo: "check", label: "Mostrar fecha" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "color", tipo: "color", label: "Color del texto", hereda: "textoPrincipal" },
  ],

  _cuerpo(d, ctx, live) {
    const p = ctx?.paleta;
    const c = col(d.color, p, "textoPrincipal");
    const f = d.mostrarFecha ? `<div style="font-size:13px;color:${col(null, p, "textoSecundario")};padding-top:6px">${esc(fecha())}</div>` : "";
    return `<div style="font-size:13px;font-weight:500;color:${col(null, p, "textoSecundario")}">${esc(d.label)}</div>
      <div${live ? ` data-reloj="${d.formato24 ? 1 : 0}${d.mostrarSegundos ? 1 : 0}"` : ""} style="font-size:40px;font-weight:600;color:${c};line-height:1;padding-top:6px">${hora(d.formato24, d.mostrarSegundos)}</div>${f}`;
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};border-radius:12px;padding:24px;text-align:center;font-family:${fuente}">${this._cuerpo(d, ctx, true)}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-radius:12px"><tr><td align="center" style="padding:24px;font-family:${fuente}">${this._cuerpo(d, ctx, false)}</td></tr></table>`;
  },
};
