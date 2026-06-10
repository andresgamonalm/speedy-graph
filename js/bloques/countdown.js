// Bloque: Cuenta regresiva. LINEAMIENTOS: fecha final, d/h/m/s, labels + fallback email.
// P0: el email no ejecuta JS → muestra los valores calculados al exportar como texto fijo
// y la fecha objetivo. En pantalla puede animar (lo hace el core del lienzo más adelante).
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

function restante(iso) {
  const t = Date.parse(iso) - Date.now();
  if (isNaN(t) || t < 0) return { d: 0, h: 0, m: 0, s: 0 };
  const s = Math.floor(t / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}
const fmtObjetivo = (iso) => {
  const t = Date.parse(iso);
  return isNaN(t) ? "" : new Date(t).toLocaleDateString("es", { day: "numeric", month: "long", year: "numeric" });
};

export default {
  id: "countdown",
  cat: "Widgets",
  nombre: "Cuenta regresiva",
  sub: "Tiempo hasta una fecha",
  icon: "down",

  defaults: {
    label: "La oferta termina en",
    fechaIso: "2026-07-30T23:59",
    mostrarSegundos: true, mostrarObjetivo: true,
    bg: null, colorNumero: null, colorLabel: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "label", tipo: "text", label: "Label" },
    { k: "fechaIso", tipo: "text", label: "Fecha objetivo (ISO)" },
    { k: "mostrarSegundos", tipo: "check", label: "Mostrar segundos" },
    { k: "mostrarObjetivo", tipo: "check", label: "Mostrar fecha objetivo" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "principal" },
    { k: "colorNumero", tipo: "color", label: "Color del número", heredaFijo: "#FFFFFF" },
    { k: "colorLabel", tipo: "color", label: "Color del label", heredaFijo: "#E6E8EF" },
  ],

  _celdas(d, ctx) {
    const p = ctx?.paleta;
    const r = restante(d.fechaIso);
    const cn = d.colorNumero || "#FFFFFF", cl = d.colorLabel || "#E6E8EF";
    const partes = [["d", "días"], ["h", "hrs"], ["m", "min"]];
    if (d.mostrarSegundos) partes.push(["s", "seg"]);
    return partes.map(([k, lab]) => ({ num: String(r[k]).padStart(2, "0"), lab, cn, cl }));
  },

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const cels = this._celdas(d, ctx).map((c) => `<div style="text-align:center"><div style="font-size:34px;font-weight:600;color:${c.cn};line-height:1">${c.num}</div><div style="font-size:12px;color:${c.cl};margin-top:4px">${c.lab}</div></div>`).join("");
    const obj = d.mostrarObjetivo ? `<p style="font-size:12px;color:${d.colorLabel || "#E6E8EF"};margin:12px 0 0;opacity:.9">${esc(fmtObjetivo(d.fechaIso))}</p>` : "";
    return `<div style="background:${col(d.bg, p, "principal")};border-radius:12px;padding:24px;text-align:center;font-family:${fuente}">
      <p style="font-size:15px;font-weight:500;color:${d.colorLabel || "#E6E8EF"};margin:0 0 16px">${esc(d.label)}</p>
      <div style="display:flex;gap:20px;justify-content:center">${cels}</div>${obj}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const cels = this._celdas(d, ctx).map((c) => `<td align="center" style="padding:0 10px;font-family:${fuente}"><div style="font-size:34px;font-weight:600;color:${c.cn};line-height:1">${c.num}</div><div style="font-size:12px;color:${c.cl};padding-top:4px">${c.lab}</div></td>`).join("");
    const obj = d.mostrarObjetivo ? `<tr><td align="center" style="font-size:12px;color:${d.colorLabel || "#E6E8EF"};padding-top:12px">${esc(fmtObjetivo(d.fechaIso))}</td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "principal")}" style="border-radius:12px"><tr><td align="center" style="padding:24px;font-family:${fuente}"><table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
      <tr><td colspan="4" align="center" style="font-size:15px;font-weight:500;color:${d.colorLabel || "#E6E8EF"};padding-bottom:16px">${esc(d.label)}</td></tr>
      <tr>${cels}</tr>${obj}</table></td></tr></table>`;
  },
};
