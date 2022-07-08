import { MongoClient } from "mongodb";

let cachedDb = null;

const uri = process.env.MONGO_URI;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, { useNewUrlParser: true });

  const db = client.db("4e");

  cachedDb = db;
  return db;
}

export async function fetchCollection(collectionName: string, filters?: any) {
  try {
    if (uri === undefined) {
      throw "URI is undefined";
    }

    const database = await connectToDatabase();
    const collection = database.collection(collectionName);
    const data = await collection.find(filters ? filters : {}).toArray();

    return data;
  } catch (e) {
    throw e;
  }
}
