// // THIS PAGE IS NOT USED ANYMORE

// import { NextApiRequest, NextApiResponse } from "next";
// import clientPromise from "../../../lib/mongodb";
// import { useRouter } from 'next/router'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {

//   const { eventID } = req.query
//   console.log(eventID)

//   const client = await clientPromise
//   const db = client.db("step")

//   const events = await db.collection("events").find({ _id: `${eventID}` }).toArray();

//   res.status(200).json({ events });
// }