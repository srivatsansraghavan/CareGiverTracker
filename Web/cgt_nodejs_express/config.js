import mongoose from "mongoose";

export async function connectToMongoDB(dbName) {
  try {
    mongoose.pluralize(null);
    return mongoose.connect(`${process.env.MONGO_URL}/${dbName}?authMechanism=DEFAULT&authSource=admin`);
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
  local: "db_cgt_local",
  production: "db_cgt"
};
