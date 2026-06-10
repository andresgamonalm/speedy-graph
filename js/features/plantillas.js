// Plantillas (grupo 11 de LINEAMIENTOS). Una plantilla es una COMPOSICIÓN prearmada con
// los mismos bloques y tokens, NO un sistema visual paralelo. Solo arma instancias.
import { porId } from "../bloques/_registro.js";

// Crea una instancia de bloque con overrides sobre sus defaults.
const mk = (tipo, over = {}) => ({ tipo, datos: { ...structuredClone(porId[tipo].defaults), ...over } });
// Contenedor de columnas con hijos.
const cols = (over, ...columnas) => ({ tipo: "columnas", datos: { ...structuredClone(porId.columnas.defaults), ...over, hijos: columnas } });

export const plantillas = [
  {
    id: "email-oferta",
    nombre: "Email · Promoción / oferta",
    formato: "email",
    build: () => [
      mk("header", { mostrarEyebrow: true, eyebrow: "Oferta", titulo: "Aprovecha el lanzamiento", bajada: "Una promoción pensada para mover ventas, no para decorar." }),
      mk("oferta"),
      mk("features", { titulo: "Por qué conviene" }),
      mk("cta", { texto: "Aprovechar ahora", ancho: "full", alin: "center" }),
      mk("footer"),
    ],
  },
  {
    id: "email-newsletter",
    nombre: "Email · Newsletter / artículos",
    formato: "email",
    build: () => [
      mk("header", { titulo: "Lo que aprendimos esta semana", bajada: "Tres lecturas con bajada concreta a ejecución." }),
      mk("article"),
      mk("divisor"),
      mk("article", { categoria: "Experiencia", titulo: "Diseño que convierte, no que decora" }),
      mk("footer"),
    ],
  },
  {
    id: "email-bienvenida",
    nombre: "Email · Bienvenida / informativo",
    formato: "email",
    build: () => [
      mk("hero", { titulo: "Te damos la bienvenida", sub: "Esto es lo que puedes hacer desde hoy." }),
      mk("texto", { rol: "parrafo", contenido: "Gracias por sumarte. Aquí tienes los primeros pasos para empezar a producir piezas." }),
      cols({ cols: 2 },
        [mk("kpi", { numero: "1", label: "Crea tu primera pieza" })],
        [mk("kpi", { numero: "2", label: "Aplica tu marca" })]),
      mk("cta", { texto: "Empezar ahora", alin: "center" }),
      mk("footer"),
    ],
  },
  {
    id: "landing-producto",
    nombre: "Landing · Producto",
    formato: "libre",
    build: () => [
      mk("hero", { titulo: "Marketing que baja a ejecución", sub: "De la estrategia a piezas listas para publicar." }),
      mk("seccion", { eyebrow: "Cómo funciona", titulo: "Una idea, una campaña lista" }),
      cols({ cols: 3 },
        [mk("cardSimple", { titulo: "Define", texto: "Marca, objetivo y mensaje." })],
        [mk("cardSimple", { titulo: "Genera", texto: "Piezas con IA aplicada." })],
        [mk("cardSimple", { titulo: "Publica", texto: "Export limpio y compatible." })]),
      mk("pricing"),
      mk("cta", { texto: "Ver herramienta", alin: "center" }),
      mk("footer"),
    ],
  },
];
