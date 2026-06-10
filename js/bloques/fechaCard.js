// Bloque: Fecha destacada. LINEAMIENTOS: día, mes, año, descripción, estilo. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, col } from "../core/utils.js";

export default {
  id: "fechaCard",
  cat: "Agenda",
  nombre: "Fecha destacada",
  sub: "Día, mes y contexto",
  icon: "type",

  defaults: {
    dia: "30", mes: "JUN", anio: "2026",
    titulo: "Lanzamiento de campaña",
    descripcion: "Salida a producción de la nueva pieza.",
    bg: null, colorDia: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "dia", tipo: "text", label: "Día" },
    { k: "mes", tipo: "text", label: "Mes" },
    { k: "anio", tipo: "text", label: "Año" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "descripcion", tipo: "textarea", label: "Descripción" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo del día", hereda: "principal" },
    { k: "colorDia", tipo: "color", label: "Color del día", heredaFijo: "#FFFFFF" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoPrincipal" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const cd = d.colorDia || "#FFFFFF";
    return `<div style="display:flex;gap:16px;align-items:center;font-family:${fuente}">
      <div style="flex:none;width:72px;text-align:center;background:${col(d.bg, p, "principal")};color:${cd};border-radius:12px;padding:10px 0">
        <div style="font-size:28px;font-weight:600;line-height:1">${esc(d.dia)}</div>
        <div style="font-size:12px;font-weight:500;letter-spacing:1px">${esc(d.mes)}</div>
        <div style="font-size:11px;opacity:.85">${esc(d.anio)}</div></div>
      <div><p data-edit="titulo" style="font-size:18px;font-weight:600;color:${col(d.colorTexto, p, "textoPrincipal")};margin:0">${esc(d.titulo)}</p>
      <p data-edit="descripcion" style="font-size:14px;color:${col(null, p, "textoSecundario")};margin:4px 0 0">${esc(d.descripcion)}</p></div></div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const cd = d.colorDia || "#FFFFFF";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td valign="middle" width="72" style="padding-right:16px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="72" bgcolor="${col(d.bg, p, "principal")}" style="border-radius:12px"><tr><td align="center" style="padding:10px 0;font-family:${fuente};color:${cd}">
        <div style="font-size:28px;font-weight:600;line-height:1">${esc(d.dia)}</div>
        <div style="font-size:12px;font-weight:500;letter-spacing:1px">${esc(d.mes)}</div>
        <div style="font-size:11px">${esc(d.anio)}</div></td></tr></table></td>
      <td valign="middle" style="font-family:${fuente}">
        <div style="font-size:18px;font-weight:600;color:${col(d.colorTexto, p, "textoPrincipal")}">${esc(d.titulo)}</div>
        <div style="font-size:14px;color:${col(null, p, "textoSecundario")};padding-top:4px">${esc(d.descripcion)}</div></td>
    </tr></table>`;
  },
};
