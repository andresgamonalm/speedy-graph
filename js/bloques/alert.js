// Bloque: Banner / Alerta. LINEAMIENTOS: tipo, título, mensaje, color de alerta.
// El color sale del rol semántico de la paleta según el tipo. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

const ROL = { info: "info", success: "success", warning: "warning", error: "error" };

export default {
  id: "alert",
  cat: "Estructura",
  nombre: "Banner / Alerta",
  sub: "Aviso destacado",
  icon: "layers",

  defaults: {
    tipo: "info", titulo: "Aviso importante",
    mensaje: "Información relevante para quien lee la pieza.",
    alin: "left",
  },

  campos: [
    { grupo: "Contenido" },
    { k: "tipo", tipo: "select", label: "Tipo", opciones: [{ v: "info", t: "Info" }, { v: "success", t: "Éxito" }, { v: "warning", t: "Alerta" }, { v: "error", t: "Error" }] },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "mensaje", tipo: "textarea", label: "Mensaje" },
    { grupo: "Layout" },
    { k: "alin", tipo: "alignH", label: "Alineación" },
  ],

  _tono(d, ctx) {
    const p = ctx?.paleta;
    const base = col(null, p, ROL[d.tipo] || "info");
    return { base };
  },

  renderPantalla(d, ctx) {
    const { base } = this._tono(d, ctx);
    return `<div style="border-left:4px solid ${base};background:${base}14;border-radius:8px;padding:16px 18px;text-align:${d.alin};font-family:${fuente}">
      <p data-edit="titulo" style="font-size:15px;font-weight:600;color:${base};margin:0 0 4px">${esc(d.titulo)}</p>
      <p data-edit="mensaje" style="font-size:14px;color:${col(null, ctx?.paleta, "textoPrincipal")};margin:0">${esc(d.mensaje)}</p></div>`;
  },

  renderEmail(d, ctx) {
    const { base } = this._tono(d, ctx);
    const bg = col(null, ctx?.paleta, "fondoSecundario");
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${bg}" style="border-left:4px solid ${base};border-radius:8px"><tr><td align="${d.alin}" style="padding:16px 18px;font-family:${fuente}">
      <div style="font-size:15px;font-weight:600;color:${base};padding-bottom:4px">${esc(d.titulo)}</div>
      <div style="font-size:14px;color:${col(null, ctx?.paleta, "textoPrincipal")}">${esc(d.mensaje)}</div></td></tr></table>`;
  },
};
