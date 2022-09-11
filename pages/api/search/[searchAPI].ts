// API endpoint for searching the database with the search functionality

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

  // searchable data in documents/collections
  db.collection("events").createIndex(
    { 
    eventName: "text", 
    eventDate: "text", 
    eventLocation: "text", 
    eventDescription: "text",
    eventOrganiser: "text",
    eventTags: "text",
    eventType: "text"
    },
    {
      name: "search"
    }
  );

  // const query = { $text: { $search: searchAPI } };
  var todaysDate = new Date(Date.now()).toISOString()

  const events = await db.collection("events").find({ eventDate: { $gte: todaysDate }, $text: { $search: searchAPI } }).sort({ eventDate: 1 }).toArray();

  res.status(200).json({ events });
}