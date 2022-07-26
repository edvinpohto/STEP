import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  var todaysDate = new Date(Date.now()).toISOString()

  const client = await clientPromise
  const db = client.db("step")

  const events = await db.collection("events").find({
    eventDate: { $gt: todaysDate }
  }).sort({ eventDate: 1 }).toArray();

  res.status(200).json({ events });
}