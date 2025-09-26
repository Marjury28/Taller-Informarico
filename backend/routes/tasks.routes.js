import { Router } from "express";
import mongoose from "mongoose";
import Task from "../models/Task.js";
import { asyncHandler } from "../middleware/error.js";

const router = Router();

// GET lista
router.get(
  "/",
  asyncHandler(async (_req, res) => {
    const tasks = await Task.find({ isDeleted: false }).lean();
    res.json(tasks);
    res.json({ data: tasks });
  })
);

// POST crear
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { title, description, priority } = req.body || {};
    if (!title) return res.status(400).json({ error: "title es obligatorio" });
    const doc = await Task.create({ title, description, priority });
    res.status(201).json(doc);
    res.status(201).json({ data: doc });
  })
);

// GET detalle
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "id inválido" });
    const task = await Task.findOne({ _id: id, isDeleted: false }).lean();
    if (!task) return res.status(404).json({ error: "No encontrada" });
    res.json(task);
    res.json({ data: task });
  })
);

// DELETE (soft)
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(400).json({ error: "id inválido" });
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "No encontrada" });
    task.isDeleted = true;
    await task.save();
    res.status(204).end();
  })
);

export default router;
