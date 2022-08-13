// API endpoint for getting events

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Todays date is used for only retrieving events after today
  var todaysDate = new Date(Date.now()).toISOString()

  const client = await clientPromise
  const db = client.db("step")

  // events today or later fetched and sorted by date
  const events = await db.collection("events").find({
    eventDate: { $gte: todaysDate }
  }).sort({ eventDate: 1 }).toArray();

  res.status(200).json({ events });
}