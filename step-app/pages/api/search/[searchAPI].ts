import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { searchAPI } = req.query
  console.log(searchAPI)
  const client = await clientPromise
  const db = client.db("step")

  const events = await db.collection("events").find({ "eventDate": `${searchAPI}` }).toArray();

  res.status(200).json({ events });
}