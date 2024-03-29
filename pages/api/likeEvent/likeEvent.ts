// API endpoint for liking an event

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
		`Event id: ${body.eventId} 
		User Id: ${body.currentUser}` 
	})

	try {
		const client = await clientPromise
  	const db = client.db("step")

		const events = db.collection("events")
		const eventResult = await events.updateOne(
      { _id: ObjectId(`${body.eventId}`) },
      { $push: { eventLikes: body.currentUser } }
    );

    const users = db.collection("users")
    const userResult = await users.updateOne(
      { _id: ObjectId(`${body.currentUser}`) },
      { $push: { likedEvents: body.eventId } }
    );

		console.log(`eventLikes and likedEvents arrays were updated with event and user ids`);

	} catch(error) {
		throw(error)
	}
}