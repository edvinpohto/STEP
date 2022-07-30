import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

	var ObjectId = require('mongodb').ObjectId;

	// Get data submitted in request's body.
	const body = req.body

	// Guard clause checks for first and last name,
	// and returns early if they are not found
	if (!body) {
		// Sends a HTTP bad request error code
		return res.status(400).json({ data: 'Something went wrong.' })
	}

	// Found the name.
	// Sends a HTTP success code
	res.status(200).json({data: 
		`Event received with name: ${body.eventName}` 
	})

	const { updateEventId } = req.query

	try {
		const client = await clientPromise
  	const db = client.db("step")

		const events = db.collection("events")
		const result = await events.updateOne(

      { _id: ObjectId(updateEventId) },
      {
        $set: {
					eventName: `${body.eventName}`,
					eventDate: body.eventDate,
					eventLocation: body.eventLocation,
					eventDescription: body.eventDescription,
					eventImage: body.eventImage,
					eventOrganiser: body.eventOrganiser,
					eventTags: body.eventTags,
					eventPrivacy: body.eventPrivacy,
					eventAdmission: +body.eventAdmission,
					eventDuration: +body.eventDuration,
					eventType: body.eventType,
        },
      },
      { upsert: true }
    );
    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`
    );

		// If the client is closed then there will be an error if someone tries to submit many events
		// But is there a problem if the client is not closed?
		// await client.close();
	} catch(error) {
		throw(error)
	}
}