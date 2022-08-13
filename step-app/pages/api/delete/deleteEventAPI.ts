// API endpoint for deleting an event

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // ObjectId needed to be imported, dont know why but solution from here https://stackoverflow.com/questions/25467750/node-js-mongodb-update-over-objectid
  var ObjectId = require('mongodb').ObjectId;

	// Get data submitted in request's body.
	const body = req.body

	if (!body) {
		// Sends a HTTP bad request error code
		return res.status(400).json({ data: 'Something went wrong.' })
	}

	// Sends a HTTP success code on success
	res.status(200).json({data: 
		`Event id: ${body.eventId} 
		User Id: ${body.userId}` 
	})

	try {
		const client = await clientPromise
  	const db = client.db("step")
    
    const events = db.collection("events");
		// Query for an event that has the id "eventId"
    const eventQuery = { _id: new ObjectId(body.eventId) };
    const eventResult = await events.deleteOne(eventQuery);
    if (eventResult.deletedCount === 1) {
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }

    const users = db.collection("users")
    const userResult = await users.updateOne(
      { _id: ObjectId(`${body.userId}`) },
      { $pull: { likedEvents: body.eventId } }
    );

  } finally {
    // await client.close();
  }
}