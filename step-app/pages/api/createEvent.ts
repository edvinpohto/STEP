import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";
import { CurrentUser } from "../../types/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

	// Get data submitted in request's body.
	const body = req.body

	// Optional logging to see the responses
	// in the command line where next.js app is running.
	console.log('body: ', body)

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
		Submission by user: ${body.currentUser.name}
		User's id: ${body.currentUser.id}` 
	})

	try {
		const client = await clientPromise
  	const db = client.db("step")

		const events = db.collection("events")
		const result = await events.insertOne(body);
		console.log(`A document was inserted with the _id: ${result.insertedId}`);

		// If the client is closed then there will be an error if someone tries to submit many events
		// But is there a problem if the client is not closed?
		// await client.close();
	} catch(error) {
		throw(error)
	}
}