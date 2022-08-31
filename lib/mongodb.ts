// Global mongodb connection setup

// This approach is taken from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb
import { MongoClient, MongoClientOptions } from "mongodb"

//Interface of types for the below options
interface myMongoOptions extends MongoClientOptions {
  useUnifiedTopology: boolean;
  useNewUrlParser: boolean;
}

const MONGODB_URI = process.env.MONGODB_URI

// set the connection options
const options: myMongoOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client
let clientPromise: Promise<MongoClient>

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

export const connectToDatabase = async () => {
  const client = await clientPromise;
  return { client, db: client.db() };
}

// Got help to fix type errors from: https://github.com/nextauthjs/next-auth/discussions/4165