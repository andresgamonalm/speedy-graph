// Worker de Cloudflare para Simple Block Builder (speedy-graph.gamonal.app).
// Implementa el contrato de API y sirve el front estático. Char-B usa la API de Claude.
// Requiere bindings: ASSETS (estáticos), DB (D1), BUCKET (R2) y el secreto ANTHROPIC_API_KEY.

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json", ...CORS } });

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (request.method === "OPTIONS") return new Response(null, { headers: CORS });

    if (url.pathname.startsWith("/api/")) {
      try {
        return await api(url.pathname, request, env);
      } catch (e) {
        return json({ ok: false, error: String(e) }, 500);
      }
    }
    // Estáticos (el editor). Requiere el binding [assets] en wrangler.toml.
    return env.ASSETS.fetch(request);
  },
};

async function api(path, request, env) {
  // Sesión/usuario. Conecta tu auth real aquí (Cloudflare Access, etc.).
  if (path === "/api/whoami") return json({ ok: true, usuario: "demo@gamonal.app" });

  // Proyectos (persistencia en D1).
  if (path === "/api/proyectos" && request.method === "GET") {
    const r = await env.DB.prepare("SELECT id, nombre, datos, actualizado FROM proyectos ORDER BY actualizado DESC").all();
    return json({ ok: true, proyectos: r.results || [] });
  }
  if (path === "/api/proyectos" && request.method === "POST") {
    const p = await request.json();
    await env.DB.prepare(
      "INSERT INTO proyectos (id, nombre, datos, actualizado) VALUES (?1, ?2, ?3, ?4) " +
      "ON CONFLICT(id) DO UPDATE SET nombre=?2, datos=?3, actualizado=?4"
    ).bind(p.id, p.nombre || "Sin título", JSON.stringify(p.datos || {}), Date.now()).run();
    return json({ ok: true });
  }

  // Subida de imágenes (R2).
  if (path === "/api/upload" && request.method === "POST") {
    const form = await request.formData();
    const file = form.get("file");
    if (!file) return json({ ok: false, error: "sin archivo" }, 400);
    const key = `img/${Date.now()}-${(file.name || "img").replace(/[^a-zA-Z0-9._-]/g, "")}`;
    await env.BUCKET.put(key, file.stream(), { httpMetadata: { contentType: file.type } });
    return json({ ok: true, url: `/r2/${key}` });
  }

  // Envío de prueba. Conecta tu proveedor de email (Resend, SES, etc.).
  if (path === "/api/test-send" && request.method === "POST") {
    const { destinatarios, asunto } = await request.json();
    // TODO: integrar ESP. Por ahora confirma recepción del payload.
    return json({ ok: true, enviadoA: destinatarios || [], asunto: asunto || "" });
  }

  // Char-B: generación con IA (API de Claude).
  if (path === "/api/ia" && request.method === "POST") {
    return charB(await request.json(), env);
  }

  return json({ ok: false, error: "ruta no encontrada" }, 404);
}

// ── Char-B: arma una pieza con los bloques del editor usando Claude ──
async function charB(brief, env) {
  if (!env.ANTHROPIC_API_KEY) return json({ ok: false, error: "falta ANTHROPIC_API_KEY" }, 500);

  // Catálogo de bloques disponibles (ids). Char-B debe usar SOLO estos.
  const BLOQUES = [
    "header", "hero", "seccion", "columnas", "alert", "divisor", "espaciador", "footer",
    "texto", "imagen", "imgtext", "features", "cta", "oferta", "pricing", "cupon", "urgencia",
    "formulario", "diadivisor", "evento", "fechaCard", "kpi", "statGrid", "comparacionNum",
    "tabla", "ring", "spark", "cardSimple", "product", "article", "profileCard", "testimonial",
    "countdown", "reloj", "contador", "clima", "social", "video", "audio", "galeria", "mapa",
    "badge", "icono", "forma", "fondoPatron", "codigo", "embed",
  ];

  const system = [
    "Eres Char-B, el motor de IA del editor Simple Block Builder (marca Gamonal).",
    "Construyes piezas comerciales usando SOLO los bloques nativos del editor.",
    "Reglas duras:",
    "- Devuelve únicamente JSON válido: { \"piezas\": [ { \"tipo\": <id>, \"datos\": {...} }, ... ] }.",
    "- Usa solo estos tipos de bloque: " + BLOQUES.join(", ") + ".",
    "- No inventes datos, precios ni ofertas que el usuario no haya dado.",
    "- Hereda la paleta activa: no fijes colores salvo que el usuario lo pida (déjalos en null).",
    "- JAMÁS uses emojis. Íconos sí, emojis no.",
    "- Tono comercial, directo, orientado a resultados. Titulares que venden o explican.",
    "- Si el formato es email, prefiere bloques compatibles (header, hero, texto, imagen, cta, features, footer).",
  ].join("\n");

  const userMsg = "Brief del usuario:\n" + JSON.stringify(brief, null, 2) +
    "\n\nDevuelve la pieza como JSON { piezas: [...] } y nada más.";

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": env.ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-opus-4-8",
      max_tokens: 16000,
      thinking: { type: "adaptive" },
      system,
      messages: [{ role: "user", content: userMsg }],
    }),
  });
  if (!r.ok) return json({ ok: false, error: "IA " + r.status, detalle: await r.text() }, 502);

  const data = await r.json();
  const texto = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("");
  let piezas = [];
  try {
    const m = texto.match(/\{[\s\S]*\}/);
    piezas = JSON.parse(m ? m[0] : texto).piezas || [];
  } catch (e) {
    return json({ ok: false, error: "respuesta IA no parseable", crudo: texto }, 502);
  }
  // Filtra a tipos conocidos por seguridad.
  piezas = piezas.filter((p) => BLOQUES.includes(p.tipo));
  return json({ ok: true, piezas });
}
