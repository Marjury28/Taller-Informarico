import { prioridadDesdeTexto, calcularPrioridad } from "../utils/prioridad.js";

describe("prioridadDesdeTexto", () => {
  it("detecta ALTA", () => {
    expect(prioridadDesdeTexto("Prioridad ALTA")).toBe("ALTA");
  });
  it("detecta MEDIA", () => {
    expect(prioridadDesdeTexto("nivel media por defecto")).toBe("MEDIA");
  });
  it("detecta BAJA", () => {
    expect(prioridadDesdeTexto("tarea baja importancia")).toBe("BAJA");
  });
  it("MEDIA por defecto si no coincide", () => {
    expect(prioridadDesdeTexto("sin palabra clave")).toBe("MEDIA");
    expect(prioridadDesdeTexto(null)).toBe("MEDIA");
  });
});

describe("calcularPrioridad", () => {
  it("ALTA si urgente", () => {
    expect(calcularPrioridad({ urgente: true, importancia: 1 })).toBe("ALTA");
  });
  it("ALTA si importancia >= 8", () => {
    expect(calcularPrioridad({ importancia: 8 })).toBe("ALTA");
  });
  it("MEDIA si 4–7", () => {
    expect(calcularPrioridad({ importancia: 5 })).toBe("MEDIA");
  });
  it("BAJA si < 4 y no urgente", () => {
    expect(calcularPrioridad({ importancia: 2 })).toBe("BAJA");
  });
});
