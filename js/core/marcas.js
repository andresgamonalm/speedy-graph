// Kits de marca para la paleta activa (Capa B). Gamonal es el kit por defecto, pero
// NO se fuerza a las piezas: el usuario elige la marca del proyecto.
export const kits = {
  gamonal: {
    nombre: "Gamonal",
    paleta: {
      principal: "#040764", secundario: "#1C73CB", acento: "#20B6B6", cta: "#1C73CB",
      textoPrincipal: "#3B3B3B", textoSecundario: "#6B6B6B",
      fondoPrincipal: "#FFFFFF", fondoSecundario: "#F5F5F5", borde: "#E3E3E3",
      link: "#1C73CB", error: "#C0392B", warning: "#E67E22", success: "#1E8E5A", info: "#1C73CB",
    },
  },
  esmeralda: {
    nombre: "Esmeralda",
    paleta: {
      principal: "#0B3D2E", secundario: "#1E8E5A", acento: "#E8B500", cta: "#1E8E5A",
      textoPrincipal: "#1A2B24", textoSecundario: "#5A6B63",
      fondoPrincipal: "#FFFFFF", fondoSecundario: "#F1F6F3", borde: "#DCE7E1",
      link: "#1E8E5A", error: "#C0392B", warning: "#E67E22", success: "#1E8E5A", info: "#1E8E5A",
    },
  },
  carbon: {
    nombre: "Carbón",
    paleta: {
      principal: "#111418", secundario: "#3A4250", acento: "#F25F4C", cta: "#F25F4C",
      textoPrincipal: "#1A1D21", textoSecundario: "#6B7280",
      fondoPrincipal: "#FFFFFF", fondoSecundario: "#F3F4F6", borde: "#E5E7EB",
      link: "#F25F4C", error: "#C0392B", warning: "#E67E22", success: "#1E8E5A", info: "#3A4250",
    },
  },
};

// Etiquetas legibles para cada rol de la paleta (panel de diseño global).
export const rolesPaleta = [
  ["principal", "Principal"], ["secundario", "Secundario"], ["acento", "Acento"], ["cta", "CTA"],
  ["textoPrincipal", "Texto principal"], ["textoSecundario", "Texto secundario"],
  ["fondoPrincipal", "Fondo principal"], ["fondoSecundario", "Fondo secundario"],
  ["borde", "Borde"], ["link", "Enlace"],
  ["success", "Éxito"], ["error", "Error"], ["warning", "Alerta"], ["info", "Info"],
];
