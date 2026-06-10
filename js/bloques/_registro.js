// Registro central de bloques. Cada bloque vive en su archivo y se suma aquí.
// Agregar un bloque = crear su archivo + una línea de import abajo.
import header from "./header.js";
import texto from "./texto.js";
import imagen from "./imagen.js";
import features from "./features.js";
import cta from "./cta.js";
import divisor from "./divisor.js";
import espaciador from "./espaciador.js";
import footer from "./footer.js";

export const bloques = [
  // Estructura
  header, divisor, espaciador, footer,
  // Contenido
  texto, imagen, features,
  // Acción
  cta,
];

// Mapa por id para acceso directo desde el render y el panel.
export const porId = Object.fromEntries(bloques.map((b) => [b.id, b]));

// Catálogo agrupado por categoría (para el sidebar).
export const porCategoria = bloques.reduce((acc, b) => {
  (acc[b.cat] ||= []).push(b);
  return acc;
}, {});
