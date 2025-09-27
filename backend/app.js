// backend/app.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/error.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Healthcheck
app.get("/health", (_req, res) => res.json({ ok: true, service: "taskmaster-backend" }));

// Rutas de la app
app.use("/api/tasks", tasksRoutes);

// Middlewares de error
app.use(notFound);
app.use(errorHandler);

export default app;
