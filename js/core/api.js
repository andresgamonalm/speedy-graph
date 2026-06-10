// Cliente de API (contrato Cloudflare Workers). Las funciones llaman a los endpoints del
// Worker; si el backend aún no está desplegado, fallan de forma controlada (devuelven
// { ok:false }) para que la interfaz no se rompa. El despliegue vive en speedy-graph.gamonal.app.
const BASE = "";

async function req(metodo, ruta, cuerpo) {
  try {
    const r = await fetch(`${BASE}${ruta}`, {
      method: metodo,
      headers: cuerpo ? { "Content-Type": "application/json" } : undefined,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    });
    if (!r.ok) return { ok: false, status: r.status };
    const data = await r.json().catch(() => ({}));
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// Contrato (de NOTAS-v2): se mantiene estable para no romper el back existente.
export const api = {
  whoami: () => req("GET", "/api/whoami"),
  listarProyectos: () => req("GET", "/api/proyectos"),
  guardarProyecto: (proyecto) => req("POST", "/api/proyectos", proyecto),
  enviarPrueba: ({ destinatarios, asunto, html }) => req("POST", "/api/test-send", { destinatarios, asunto, html }),
  subirImagen: async (file) => {
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch(`${BASE}/api/upload`, { method: "POST", body: fd });
      if (!r.ok) return { ok: false, status: r.status };
      return { ok: true, data: await r.json() };
    } catch (e) {
      return { ok: false, error: String(e) };
    }
  },
  generarIA: (brief) => req("POST", "/api/ia", brief),
};
