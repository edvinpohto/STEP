// API endpoint for deleting an account

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
		`User Id: ${body.userId}` 
	})

	try {
		const client = await clientPromise
  	const db = client.db("step")

    const users = db.collection("users")
		// Query for a user that has the id "userId"
    const userQuery = { _id: new ObjectId(body.userId) };
    const userResult = await users.deleteOne(userQuery);
    if (userResult.deletedCount === 1) {
      console.log("Successfully deleted one user.");
    } else {
      console.log("No documents matched the query. Deleted 0 users.");
    }

    const accounts = db.collection("accounts")
		// Query for a user that has the id "userId"
    const accountQuery = { userId: new ObjectId(body.userId) };
    const accountResult = await accounts.deleteOne(accountQuery);
    if (accountResult.deletedCount === 1) {
      console.log("Successfully deleted one user.");
    } else {
      console.log("No documents matched the query. Deleted 0 users.");
    }

  } finally {
    // await client.close();
  }
}