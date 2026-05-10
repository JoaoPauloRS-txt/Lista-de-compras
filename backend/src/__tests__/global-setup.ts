import { MongoMemoryServer } from "mongodb-memory-server";

export default async function globalSetup(): Promise<() => Promise<void>> {
  const mongo = await MongoMemoryServer.create();
  process.env.MONGODB_DATABASE = mongo.getUri();

  return async () => {
    await mongo.stop();
  };
}
