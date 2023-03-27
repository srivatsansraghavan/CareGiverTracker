const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb://${process.env.MONGO_DB_URI}:27017`;
const client = new MongoClient(uri);

module.exports = {
  connectToMongoDB: async (dbName) => {
    await client.connect();
    const db = await client.db(dbName);
    return db;
  },
  connectToMongoDBGetTable: async function (dbName, tableName) {
    const db = await this.connectToMongoDB(dbName);
    const collection = await db.collection(tableName);
    return collection;
  },
  cgtdbEnv: {
    test: "db_cgt_test",
    dev: "db_cgt_dev",
    local: "db_cgt",
  },
};
