// THIS PAGE IS NOT USED ANYMORE

import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongodb";
import { useRouter } from 'next/router'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { userID } = req.query
  console.log(userID)

  const client = await clientPromise
  const db = client.db("step")

  const events = await db.collection("events").find({ "currentUser.id": `${userID}` }).sort({ eventDate: 1 }).toArray();

  res.status(200).json({ events });
}