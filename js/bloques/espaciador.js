// Bloque: Espaciador. LINEAMIENTOS: alto. Snap a la escala de spacing.
export default {
  id: "espaciador",
  cat: "Estructura",
  nombre: "Espaciador",
  sub: "Espacio vertical",
  icon: "down",

  defaults: { alto: 24 },

  campos: [
    { grupo: "Espaciado" },
    { k: "alto", tipo: "range", label: "Alto", min: 0, max: 80, paso: 4, suf: "px" },
  ],

  renderPantalla(d) {
    return `<div style="height:${d.alto}px"></div>`;
  },

  renderEmail(d) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="height:${d.alto}px;line-height:${d.alto}px;font-size:0">&nbsp;</td></tr></table>`;
  },
};
