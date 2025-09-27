import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/error.js";
import tasksRoutes from "./routes/tasks.routes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rutas
app.get("/health", (_req, res) => res.json({ ok: true }));
app.use("/api/tasks", tasksRoutes);

// Errores
app.use(notFound);
app.use(errorHandler);

async function start() {
  try {
    const PORT = process.env.PORT || 5000;

    if (process.env.NODE_ENV === "test") {
      // ⚠️ En pruebas NO conectamos a DB (router usa memoria)
      app.listen(PORT, () => console.log(`🚀 Servidor TEST en puerto ${PORT}`));
      return;
    }

    // Dev/Prod: conectar a DB
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    if (process.env.NODE_ENV !== "test") process.exit(1);
  }
}

start();

export default app;
