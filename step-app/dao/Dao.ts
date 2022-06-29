import { Db, MongoClient, MongoClientOptions } from "mongodb"

const MONGODB_URI: any = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let cachedClient: MongoClient;
let cachedDb: Db;

//Added this interface to remove typscript error
interface myMongoOptions extends MongoClientOptions {
    useUnifiedTopology: boolean;
    useNewUrlParser: boolean;
  }
  
  // set the connection options
  const options: myMongoOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  };

export default async function db() {
  // check the cached.
  if (cachedClient && cachedDb) {
    // load from cache
    return {
      client: cachedClient,
      db: cachedDb,
    };
  }

  // check the MongoDB URI
  if (!MONGODB_URI) {
    throw new Error("Define the MONGODB_URI environmental variable");
  }
  // check the MongoDB DB
  if (!MONGODB_DB) {
    throw new Error("Define the MONGODB_DB environmental variable");
  }

  // Connect to cluster
  let client = new MongoClient(MONGODB_URI);
  await client.connect();
  let db = client.db(MONGODB_DB);

  // set cache
  cachedClient = client;
  cachedDb = db;

  return {
    client: client,
    db: db,
  }
}