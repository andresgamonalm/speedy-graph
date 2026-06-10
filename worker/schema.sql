-- Esquema D1 para Simple Block Builder.
-- Aplicar con: wrangler d1 execute speedy-graph --file=worker/schema.sql

CREATE TABLE IF NOT EXISTS proyectos (
  id          TEXT PRIMARY KEY,
  nombre      TEXT NOT NULL,
  datos       TEXT NOT NULL,        -- JSON: { paleta, formato, piezas }
  actualizado INTEGER NOT NULL      -- epoch ms
);

CREATE INDEX IF NOT EXISTS idx_proyectos_actualizado ON proyectos (actualizado DESC);
