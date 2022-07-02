import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default function handler(
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
	res.status(200).json({ data: 
		`${body.eventName} 
		${body.eventDate} 
		${body.eventLocation}
		${body.eventDescription} 
		${body.eventOrganiser} 
		${body.eventTags} 
		${body.eventPrivacy} 
		${body.eventAdmission} 
		${body.eventDuration}` 
	})
  }