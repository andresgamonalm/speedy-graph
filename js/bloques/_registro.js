// Registro central de bloques. Cada bloque vive en su archivo y se suma aquí.
// Agregar un bloque = crear su archivo + una línea de import abajo.
import texto from "./texto.js";
import cta from "./cta.js";
import imagen from "./imagen.js";

export const bloques = [
  texto,
  imagen,
  cta,
];

// Mapa por id para acceso directo desde el render y el panel.
export const porId = Object.fromEntries(bloques.map((b) => [b.id, b]));

// Catálogo agrupado por categoría (para el sidebar).
export const porCategoria = bloques.reduce((acc, b) => {
  (acc[b.cat] ||= []).push(b);
  return acc;
}, {});
