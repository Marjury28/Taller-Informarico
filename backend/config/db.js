import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("Falta MONGO_URI en .env");

  try {
    await mongoose.connect(uri, {
      dbName: process.env.MONGO_DB || undefined,
      serverSelectionTimeoutMS: 10000,
    });

    const { host, port, name } = mongoose.connection;
    console.log(
      `✅ MongoDB conectado → ${host}${port ? ":" + port : ""}/${name}`
    );
  } catch (err) {
    // Mensaje claro si quedó <cluster> literal
    if (
      String(err?.message || "").includes("querySrv") ||
      err?.code === "ENOTFOUND"
    ) {
      console.error(
        "❌ Error DNS/SRV. Revisa que MONGO_URI use un hostname válido (p. ej. cluster0.xxxxxx.mongodb.net) y NO <cluster>."
      );
    }
    throw err;
  }
}
