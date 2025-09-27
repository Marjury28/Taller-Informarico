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

// Middlewares de error
app.use(notFound);
app.use(errorHandler);

// 👇 Cambio clave: no arrancar en entorno de pruebas
export async function start() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    // Evita cortar el runner de Jest en tests
    if (process.env.NODE_ENV !== "test") {
      process.exit(1);
    }
  }
}

// Solo inicia si NO es entorno de pruebas
if (process.env.NODE_ENV !== "test") {
  start();
}

export default app; // queda exportado para Jest/Supertest
