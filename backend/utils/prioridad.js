export function prioridadDesdeTexto(txt) {
  const t = (txt ?? '').toLowerCase();
  if (t.includes('alta')) return 'ALTA';
  if (t.includes('media')) return 'MEDIA';
  if (t.includes('baja')) return 'BAJA';
  return 'MEDIA';
}

export function calcularPrioridad({ urgente = false, importancia = 0 } = {}) {
  if (urgente || importancia >= 8) return 'ALTA';
  if (importancia >= 4) return 'MEDIA';
  return 'BAJA';
}
