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

async function main() {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Servidor en puerto ${PORT}`));
  } catch (error) {
    console.error("❌ Error al iniciar el servidor:", error);
    process.exit(1);
  }
}

main();

export default app; // Exportar para tests
