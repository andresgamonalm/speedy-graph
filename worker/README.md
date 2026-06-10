# Backend — Cloudflare Worker (speedy-graph.gamonal.app)

El editor (front) es estático y funciona solo abriendo `index.html`. Este Worker añade:
persistencia de proyectos (D1), subida de imágenes (R2), envío de prueba y **Char-B**
(generación con IA sobre la API de Claude). Sirve además el front estático.

> No se puede desplegar desde el contenedor del editor (red restringida y sin tus
> credenciales). Estos pasos se corren en tu máquina o CI con acceso a tu cuenta Cloudflare.

## Requisitos

- Cuenta de Cloudflare con el proyecto `speedy-graph` y el dominio `speedy-graph.gamonal.app`.
- `wrangler` instalado (`npm i -g wrangler`) y `wrangler login`.
- Una API key de Anthropic (para Char-B).

## Pasos

```bash
# 1. Crear recursos
wrangler d1 create speedy-graph                 # copia el database_id al wrangler.toml
wrangler r2 bucket create speedy-graph-img

# 2. Esquema de la base
wrangler d1 execute speedy-graph --file=worker/schema.sql

# 3. Secreto de Char-B (no va en el wrangler.toml)
wrangler secret put ANTHROPIC_API_KEY

# 4. Desplegar (desde la carpeta worker/)
cd worker && wrangler deploy
```

## Contrato de API

- `GET  /api/whoami` — usuario/sesión.
- `GET  /api/proyectos` — lista de proyectos del usuario (D1).
- `POST /api/proyectos` — guarda `{ id, nombre, datos:{paleta,formato,piezas} }`.
- `POST /api/upload` — sube una imagen (multipart `file`) a R2, devuelve `{ url }`.
- `POST /api/test-send` — envío de prueba `{ destinatarios, asunto, html }` (conectar ESP).
- `POST /api/ia` — Char-B: recibe el brief, devuelve `{ piezas:[{tipo,datos}] }`.

## Char-B (modelo de IA)

Usa `claude-opus-4-8` con thinking adaptive. El system prompt obliga a:
construir solo con los bloques nativos del editor, heredar la paleta (colores en `null`),
no inventar datos y **jamás usar emojis**. La salida es un arreglo de instancias de bloque
que el editor carga tal cual — editable, no una imagen cerrada.

Pendiente de tu lado (necesitan decisiones/credenciales): proveedor de email para
`/api/test-send` y la auth real en `/api/whoami`.
