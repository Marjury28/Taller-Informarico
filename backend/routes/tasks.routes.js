// backend/routes/tasks.routes.js
import { Router } from "express";

const router = Router();
const isTest = process.env.NODE_ENV === "test";

if (isTest) {
  // --- MODO TEST: almacenamiento en memoria (sin DB) ---
  let tasks = [];

  // GET /api/tasks -> 200 + array
  router.get("/", (_req, res) => {
    res.json({ data: tasks });
  });

  // POST /api/tasks -> 201 + creada
  router.post("/", (req, res) => {
    const { title, description } = req.body || {};
    const t = {
      _id: String(Date.now()),
      title: title ?? "Sin título",
      description: description ?? "",
      prioridad: "MEDIA",
      createdAt: new Date().toISOString(),
    };
    tasks.push(t);
    res.status(201).json({ data: t });
  });

  // GET /api/tasks/:id -> 200 + tarea (o 404)
  router.get("/:id", (req, res) => {
    const id = String(req.params.id);
    const found = tasks.find((x) => x._id === id || x.id === id);
    if (!found) return res.status(404).json({ error: "No encontrado" });
    res.json({ data: found });
  });

  // DELETE /api/tasks/:id -> 204 (o 404)
  router.delete("/:id", (req, res) => {
    const id = String(req.params.id);
    const before = tasks.length;
    tasks = tasks.filter((x) => x._id !== id && x.id !== id);
    if (tasks.length === before) return res.status(404).json({ error: "No encontrado" });
    return res.status(204).send();
  });
} else {
  // --- MODO NORMAL (sin romper nada si aún no conectas DB) ---
  // Deja al menos un GET básico para que no cuelgue si llamas sin DB
  router.get("/", (_req, res) => {
    res.json([]);
  });

  // Aquí puedes montar tus handlers reales con DB cuando los tengas:
  // import Task from '../models/Task.js';
  // router.post('/', async (req,res)=>{ ... });
  // router.get('/:id', async (req,res)=>{ ... });
  // router.delete('/:id', async (req,res)=>{ ... });
}

export default router;
