import request from "supertest";
import app from "../server.js"; // usa la app in-process

const api = request(app);
const TASKS_PATH = process.env.TASKS_PATH || "/api/tasks";

let createdId;

describe("Integración (in-process): /api/tasks", () => {
  it("GET /health → 200", async () => {
    const r = await api.get("/health").expect(200);
    expect(r.body?.ok).toBe(true);
  });

  it(`GET ${TASKS_PATH} → 200 y array`, async () => {
    const r = await api.get(TASKS_PATH).expect(200);
    const data = r.body?.data ?? r.body;
    expect(Array.isArray(data)).toBe(true);
  });

  it(`POST ${TASKS_PATH} crea → 201`, async () => {
    const payload = {
      title: "Tarea de prueba (jest)",
      description: "Creada por test de integración",
      priority: "ALTA",
    };
    const r = await api.post(TASKS_PATH).send(payload).expect(201);
    const b = r.body?.data ?? r.body ?? {};
    createdId = b._id || b.id;
    expect(createdId).toBeTruthy();
    expect(b.title).toBe(payload.title);
  });

  it(`GET ${TASKS_PATH}/:id → 200`, async () => {
    expect(createdId).toBeTruthy();
    const r = await api.get(`${TASKS_PATH}/${createdId}`).expect(200);
    const b = r.body?.data ?? r.body ?? {};
    expect(b._id || b.id).toBeTruthy();
  });

  it(`DELETE ${TASKS_PATH}/:id → 200 o 204`, async () => {
    expect(createdId).toBeTruthy();
    const r = await api.delete(`${TASKS_PATH}/${createdId}`).send();
    expect([200, 204]).toContain(r.status);
  });
});
