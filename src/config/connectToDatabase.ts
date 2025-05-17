import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_CNN || "mongodb://localhost:27017";

let db: Db;
let client: MongoClient;

export async function connectToDatabase() {
  if (db && client) return { db, client };

  client = new MongoClient(uri);
  await client.connect();
  db = client.db("fonoaud");
  return { db, client };
}
