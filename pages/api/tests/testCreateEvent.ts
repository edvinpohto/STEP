// API endpoint for testing creating an event

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

	// Get data submitted in request's body.
	const body = req.body

	// Optional logging to see the responses
	// in the command line where next.js app is running.
	// console.log('body: ', body)

	// Guard clause checks for first and last name,
	// and returns early if they are not found
	if (!body) {
		// Sends a HTTP bad request error code
		return res.status(400).json({ data: 'Something went wrong.' })
	}

	// Found the name.
	// Sends a HTTP success code
	res.status(200).json({data: 
		`Event name: ${body.eventName} 
		Event date: ${body.eventDate} 
		Event location: ${body.eventLocation}
		Event description: ${body.eventDescription} 
		Event organiser: ${body.eventOrganiser} 
		Event tags: ${body.eventTags} 
		Event privacy: ${body.eventPrivacy} 
		Event admission: ${body.eventAdmission} 
		Event duration: ${body.eventDuration}
		Event image: ${body.eventImage}
		Event likes: ${body.eventLikes}
		Event type: ${body.eventType}` 
	})

	try {
		const client = await clientPromise
  	const db = client.db("step")

		const events = db.collection("events")
		const result = await events.insertOne(body);
		console.log(`A document was inserted with the _id: ${result.insertedId}`);

	} catch(error) {
		throw(error)
	}
}