import { getSession } from "next-auth/react";
import { CurrentUser } from "../types/models";

export default async function deleteEvent(eventId: string, userId: string) {
  const confirmation = confirm("Are you sure you want to delete the event?")

  if (confirmation) {
    const data = {
      eventId: eventId,
      userId: userId
    }
  
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
    // API endpoint where we send form data.
    const endpoint = '/api/delete/deleteEventAPI'
    // Form the request for sending data to the server.
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
  
    // Send the form data to our forms API on Vercel and get a response.
    const response = await fetch(endpoint, options)
  
    // Get the response data from server as JSON.
    // If server returns the what was submitted, that means the form works.
    const result = await response.json()
    console.log(`The server has received the request to delete ${result.data.eventId}`)

    // Gimmicky for now but works
    location.reload()
  }
}