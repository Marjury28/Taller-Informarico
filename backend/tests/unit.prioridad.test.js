// tests/unit.prioridad.test.js
import { prioridadDesdeTexto } from "../backend/utils/prioridad.js";

describe("prioridadDesdeTexto", () => {
  test("detecta ALTA", () => {
    expect(prioridadDesdeTexto("tarea de prioridad alta")).toBe("ALTA");
  });
  test("detecta MEDIA", () => {
    expect(prioridadDesdeTexto("esto es media")).toBe("MEDIA");
  });
  test("detecta BAJA", () => {
    expect(prioridadDesdeTexto("revisar baja")).toBe("BAJA");
  });
  test("default MEDIA", () => {
    expect(prioridadDesdeTexto("sin palabra clave")).toBe("MEDIA");
  });
});
