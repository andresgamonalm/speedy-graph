// Bloque: Evento / cita. LINEAMIENTOS: hora, título, descripción, ubicación, CTA, link
// calendario. Hereda paleta.
import { fuente } from "../core/tokens.js";
import { esc, url, col } from "../core/utils.js";

export default {
  id: "evento",
  cat: "Agenda",
  nombre: "Evento / cita",
  sub: "Hora, título y acción",
  icon: "type",

  defaults: {
    hora: "10:00 – 11:30", titulo: "Reunión de estrategia",
    descripcion: "Revisión del plan de campañas del trimestre.",
    mostrarUbic: true, ubicacion: "Sala 4 / Google Meet",
    mostrarCta: true, ctaTexto: "Agregar al calendario", ctaUrl: "https://",
    bg: null, colorHora: null, colorTitulo: null, colorTexto: null,
  },

  campos: [
    { grupo: "Contenido" },
    { k: "hora", tipo: "text", label: "Hora" },
    { k: "titulo", tipo: "text", label: "Título" },
    { k: "descripcion", tipo: "textarea", label: "Descripción" },
    { k: "mostrarUbic", tipo: "check", label: "Mostrar ubicación" },
    { k: "ubicacion", tipo: "text", label: "Ubicación" },
    { k: "mostrarCta", tipo: "check", label: "Mostrar botón" },
    { k: "ctaTexto", tipo: "text", label: "Texto del botón" },
    { k: "ctaUrl", tipo: "text", label: "URL del botón" },
    { grupo: "Color" },
    { k: "bg", tipo: "color", label: "Fondo", hereda: "fondoSecundario" },
    { k: "colorHora", tipo: "color", label: "Color de la hora", hereda: "acento" },
    { k: "colorTitulo", tipo: "color", label: "Color del título", hereda: "textoPrincipal" },
    { k: "colorTexto", tipo: "color", label: "Color del texto", hereda: "textoSecundario" },
  ],

  renderPantalla(d, ctx) {
    const p = ctx?.paleta;
    const ubic = d.mostrarUbic ? `<p style="font-size:13px;color:${col(d.colorTexto, p, "textoSecundario")};margin:8px 0 0">${esc(d.ubicacion)}</p>` : "";
    const cta = d.mostrarCta ? `<div style="margin-top:14px"><a href="${url(d.ctaUrl)}" style="font-size:14px;font-weight:500;color:${col(null, p, "link")};text-decoration:none">${esc(d.ctaTexto)} →</a></div>` : "";
    return `<div style="background:${col(d.bg, p, "fondoSecundario")};border-left:4px solid ${col(d.colorHora, p, "acento")};border-radius:8px;padding:18px 20px;font-family:${fuente}">
      <p data-edit="hora" style="font-size:13px;font-weight:600;color:${col(d.colorHora, p, "acento")};margin:0 0 4px">${esc(d.hora)}</p>
      <p data-edit="titulo" style="font-size:18px;font-weight:600;color:${col(d.colorTitulo, p, "textoPrincipal")};margin:0">${esc(d.titulo)}</p>
      <p data-edit="descripcion" style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};margin:6px 0 0">${esc(d.descripcion)}</p>
      ${ubic}${cta}</div>`;
  },

  renderEmail(d, ctx) {
    const p = ctx?.paleta;
    const ubic = d.mostrarUbic ? `<tr><td style="font-size:13px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:8px">${esc(d.ubicacion)}</td></tr>` : "";
    const cta = d.mostrarCta ? `<tr><td style="padding-top:14px"><a href="${url(d.ctaUrl)}" target="_blank" style="font-size:14px;font-weight:500;color:${col(null, p, "link")};text-decoration:none">${esc(d.ctaTexto)} &rarr;</a></td></tr>` : "";
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${col(d.bg, p, "fondoSecundario")}" style="border-left:4px solid ${col(d.colorHora, p, "acento")};border-radius:8px"><tr><td style="padding:18px 20px;font-family:${fuente}"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="font-size:13px;font-weight:600;color:${col(d.colorHora, p, "acento")};padding-bottom:4px">${esc(d.hora)}</td></tr>
      <tr><td style="font-size:18px;font-weight:600;color:${col(d.colorTitulo, p, "textoPrincipal")}">${esc(d.titulo)}</td></tr>
      <tr><td style="font-size:14px;color:${col(d.colorTexto, p, "textoSecundario")};padding-top:6px">${esc(d.descripcion)}</td></tr>
      ${ubic}${cta}</table></td></tr></table>`;
  },
};
