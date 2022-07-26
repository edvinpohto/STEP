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

  // DO NOT ACTIVATE OR YOU WILL DROP THE ENTIRE INDEX (SAFETY CHECK DONE BY ADDING A $$$ AT THE END OF THE NAME STRING)
  // db.collection("events").dropIndex("eventName_text_eventDate_text_eventLocation_text_eventDescription_text_eventOrganiser_text_eventTags_text_eventType_text$$$")

  db.collection("events").createIndex({ 
    eventName: "text", 
    eventDate: "text", 
    eventLocation: "text", 
    eventDescription: "text",
    eventOrganiser: "text",
    eventTags: "text",
    eventType: "text"
  });

  // const query = { $text: { $search: searchAPI } };
  var todaysDate = new Date(Date.now()).toISOString()

  const events = await db.collection("events").find({ eventDate: { $gt: todaysDate }, $text: { $search: searchAPI } }).sort({ eventDate: 1 }).toArray();

  res.status(200).json({ events });
}