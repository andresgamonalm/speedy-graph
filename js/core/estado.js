// Estado del documento + deshacer/rehacer. Única fuente de verdad de la pieza.
// El resto de la app observa este estado y se re-renderiza ante cambios.

import { paletaGamonal } from "./tokens.js";

let id = 0;
const nuevoId = () => `b${Date.now().toString(36)}${(id++).toString(36)}`;

const estado = {
  formato: "libre",            // libre | email | banner…
  paleta: { ...paletaGamonal },// paleta activa del proyecto (Capa B)
  piezas: [],                  // [{ tipo, id, datos }]
  seleccion: null,             // id del bloque seleccionado
};

const undo = [];
const redo = [];
const oyentes = new Set();

function snapshot() {
  return JSON.stringify({ piezas: estado.piezas, paleta: estado.paleta, formato: estado.formato });
}
function restaurar(s) {
  const o = JSON.parse(s);
  estado.piezas = o.piezas; estado.paleta = o.paleta; estado.formato = o.formato;
}
function guardarHistorial() { undo.push(snapshot()); if (undo.length > 100) undo.shift(); redo.length = 0; }

function notificar() { oyentes.forEach((fn) => fn(estado)); }

// ── API pública ──
export function suscribir(fn) { oyentes.add(fn); fn(estado); return () => oyentes.delete(fn); }
export function getEstado() { return estado; }
export function getSeleccionada() { return estado.piezas.find((p) => p.id === estado.seleccion) || null; }

export function agregar(tipo, datos) {
  guardarHistorial();
  const inst = { tipo, id: nuevoId(), datos: structuredClone(datos) };
  estado.piezas.push(inst);
  estado.seleccion = inst.id;
  notificar();
  return inst.id;
}

export function seleccionar(idSel) { estado.seleccion = idSel; notificar(); }

// Actualiza un campo (admite rutas anidadas "items.0.t") de la pieza indicada.
export function actualizar(idPieza, ruta, valor) {
  const p = estado.piezas.find((x) => x.id === idPieza);
  if (!p) return;
  guardarHistorial();
  const partes = ruta.split(".");
  let obj = p.datos;
  for (let i = 0; i < partes.length - 1; i++) obj = obj[partes[i]];
  obj[partes[partes.length - 1]] = valor;
  notificar();
}

export function eliminar(idPieza) {
  guardarHistorial();
  estado.piezas = estado.piezas.filter((p) => p.id !== idPieza);
  if (estado.seleccion === idPieza) estado.seleccion = null;
  notificar();
}

export function duplicar(idPieza) {
  const p = estado.piezas.find((x) => x.id === idPieza);
  if (!p) return;
  guardarHistorial();
  const i = estado.piezas.indexOf(p);
  const copia = { tipo: p.tipo, id: nuevoId(), datos: structuredClone(p.datos) };
  estado.piezas.splice(i + 1, 0, copia);
  estado.seleccion = copia.id;
  notificar();
}

export function mover(idPieza, delta) {
  const i = estado.piezas.findIndex((p) => p.id === idPieza);
  const j = i + delta;
  if (i < 0 || j < 0 || j >= estado.piezas.length) return;
  guardarHistorial();
  const [p] = estado.piezas.splice(i, 1);
  estado.piezas.splice(j, 0, p);
  notificar();
}

// ── Operaciones sobre listas de ítems dentro de un bloque (features, pricing…) ──
export function agregarItem(idPieza, k, item) {
  const p = estado.piezas.find((x) => x.id === idPieza);
  if (!p || !Array.isArray(p.datos[k])) return;
  guardarHistorial();
  p.datos[k].push(structuredClone(item));
  notificar();
}
export function quitarItem(idPieza, k, idx) {
  const p = estado.piezas.find((x) => x.id === idPieza);
  if (!p || !Array.isArray(p.datos[k])) return;
  guardarHistorial();
  p.datos[k].splice(idx, 1);
  notificar();
}

export function deshacer() { if (!undo.length) return; redo.push(snapshot()); restaurar(undo.pop()); notificar(); }
export function rehacer() { if (!redo.length) return; undo.push(snapshot()); restaurar(redo.pop()); notificar(); }
