export function prioridadDesdeTexto(txt) {
  const t = (txt || "").toLowerCase();
  if (t.includes("alta")) return "ALTA";
  if (t.includes("media")) return "MEDIA";
  if (t.includes("baja")) return "BAJA";
  return "MEDIA";
}
