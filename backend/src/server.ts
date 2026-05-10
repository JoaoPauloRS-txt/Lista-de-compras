import "dotenv/config";

import app from "./app.js";
import { connectDatabase } from "./database/connection.js";

const port = Number(process.env.PORT);

async function start() {
  await connectDatabase();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server rodando na porta ${port}`);
  });
}
start();
