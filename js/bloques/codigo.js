// Bloque: Código HTML custom. LINEAMIENTOS: campo de código, scope, advertencias,
// fallback, validación básica, no tocar estilos globales.
// P0 export (auditoría): NO incrustar HTML crudo en comentarios de metadatos; sanear
// `-->` para no romper el correo. Aquí el saneo se aplica al serializar metadatos.
import { fuente } from "../core/tokens.js";

// Saneo de cierre de comentario para metadatos (evita romper <!--SBB:...-->).
export const sanearComentario = (s = "") => String(s).replace(/--+>/g, "-->".replace(">", "&gt;"));

export default {
  id: "codigo",
  cat: "Avanzado",
  nombre: "Código HTML",
  sub: "HTML personalizado",
  icon: "layers",

  defaults: {
    codigo: "<div style=\"padding:16px;text-align:center;font-family:Roboto\">HTML personalizado</div>",
  },

  campos: [
    { grupo: "Avanzado" },
    { k: "codigo", tipo: "textarea", label: "Código HTML (se inserta tal cual)" },
  ],

  // El código del usuario se inserta tal cual en ambos renders. Es su responsabilidad
  // que sea email-safe; el editor avisa pero no reescribe su HTML.
  renderPantalla(d) {
    return `<div style="font-family:${fuente}">${d.codigo || ""}</div>`;
  },

  renderEmail(d) {
    return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td>${d.codigo || ""}</td></tr></table>`;
  },
};
