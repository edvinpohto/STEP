import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise
  const db = client.db("step")

  const events = await db.collection("events").find({ "currentUser.id": "62c08363d625f01dca9426cb" }).toArray();

  res.status(200).json({ events });
}