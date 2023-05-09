import { MongoClient } from "mongodb";
const uri = `mongodb://${process.env.MONGO_DB_URI}:27017`;
const client = new MongoClient(uri);

export async function connectToMongoDB(dbName) {
  await client.connect();
  const db = client.db(dbName);
  return db;
}
export async function connectToMongoDBGetTable(dbName, tableName) {
  const db = await connectToMongoDB(dbName);
  const collection = db.collection(tableName);
  return collection;
}
export const cgtdbEnv = {
  test: "db_cgt_test",
  dev: "db_cgt_dev",
  local: "db_cgt",
};
