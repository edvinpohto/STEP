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

  db.collection("events").createIndex({ 
    eventName: "text", 
    eventDate: "text", 
    eventLocation: "text", 
    eventDescription: "text",
    eventOrganiser: "text",
    eventTags: "text",
  });

  // const query = { $text: { $search: searchAPI } };

  const events = await db.collection("events").find({ $text: { $search: searchAPI } }).toArray();

  res.status(200).json({ events });
}