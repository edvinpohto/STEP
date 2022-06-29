// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { Db, MongoClient, MongoClientOptions } from "mongodb"

const MONGODB_URI: any = process.env.MONGODB_URI
const MONGODB_DB = process.env.MONGODB_DB

let cachedClient: MongoClient;
let cachedDb: Db;

let client
let clientPromise: Promise<MongoClient>

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

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local")
}

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(MONGODB_URI, options)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise

// Got help to fix type errors from: https://github.com/nextauthjs/next-auth/discussions/4165

///////////////////////////////////////////////////////////////////////////
/////////////// connectToDatabase Functio //////////////////////////////////
///////////////////////////////////////////////////////////////////////////

export async function connectToDatabase() {
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
    client: cachedClient,
    db: cachedDb,
  };
}