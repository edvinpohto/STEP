import React, { useState } from "react"
import { getSession } from "next-auth/react"
import { tagsToArray } from "../utils/tagsToArray"
import useInput from "../hooks/useInput";
import addressToCoordinates from '../utils/geocode'

interface CurrentUser {
  name: string;
  email: string;
	image: string;
	id: string;
}

const BUCKET_URL = "https://step-event-images.s3.eu-west-2.amazonaws.com/"

// Handles the submit event on form submit.
export default async function handleSubmit(e: any) {
  // Stop the form from submitting and refreshing the page.
  e.preventDefault()

  const session = await getSession();
  // console.log(session?.user)
  let userData: CurrentUser = session?.user

  // Parse the tags from the form into an array of tags
  let tags: string = e.target.eventTags.value
  // console.log("Tags:", tags)
  let formattedTags: string[] = tagsToArray(tags)
  // console.log("Array of tags:", formattedTags)

  // Get image name and build address for image retrieval
  const imageName = e.target.eventImage.title;
  const imageURL = BUCKET_URL + imageName;

  // Get coordinates from address and parse into right form.
  const address: string = e.target.eventLocation.value
  const addressCoordinates = await addressToCoordinates(address)
  const eventLocationArray = [address, addressCoordinates]

  // Get data from the form.
  // No _id field. MongoDB makes one automatically?
  // The location field does not work yet?
  const data = {
    eventName: e.target.eventName.value,
    eventDate: e.target.eventDate.value,
    eventLocation: eventLocationArray,
    eventDescription: e.target.eventDescription.value,
    eventImage: imageURL,
    eventOrganiser: e.target.eventOrganiser.value,
    eventTags: formattedTags,
    eventPrivacy: e.target.eventPrivacy.checked,
    eventAdmission: +e.target.eventAdmission.value,
    eventDuration: +e.target.eventDuration.value,
    eventLikes: [],
    currentUser: userData
  }

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data)

  // API endpoint where we send form data.
  const endpoint = '/api/createEvent'

  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'POST',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }

  // Send the form data to our forms API on Vercel and get a response.
  const response = await fetch(endpoint, options)

  // Get the response data from server as JSON.
  // If server returns the name submitted, that means the form works.
  const result = await response.json()
  console.log(`The server has received ${result.data}`)
}