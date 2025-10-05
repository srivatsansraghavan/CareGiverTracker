const uri = `mongodb://${process.env.MONGO_DB_URI}:27017`;
import mongoose from "mongoose";

export function connectToMongoDB(dbName) {
  try {
    mongoose.pluralize(null);
    return mongoose.connect(`${uri}/${dbName}`);
  } catch (err) {
    console.error(err);
  }
}
export async function connectToMongoDBGetTable(dbName, tableName) {
  const db = await connectToMongoDB(dbName);
  const collection = await db.collection(tableName);
  return collection;
}
export const cgtdbEnv = {
  test: "db_cgt_test",
  dev: "db_cgt_dev",
  local: "db_cgt",
};
