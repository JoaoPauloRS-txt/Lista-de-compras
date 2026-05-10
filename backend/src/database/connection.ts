import mongoose from "mongoose";

export async function connectDatabase() {
  const uri = process.env.MONGODB_DATABASE;
  if (!uri) {
    throw new Error(
      "MONGODB_DATABASE não definida. Configure no .env ou use o globalSetup dos testes."
    );
  }

  try {
    await mongoose.connect(uri);
    // eslint-disable-next-line no-console
    console.log("✅ MongoDB conectado com sucesso");
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Erro ao conectar no MongoDB", error);
    process.exit(1);
  }
}
