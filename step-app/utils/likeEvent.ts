// Util function to like an event
// makes an api call to the backend 

export default async function likeEvent(currentUser: string, eventId: string) {

  const data = {
    currentUser: currentUser,
    eventId: eventId,
  }

  // Send the data to the server in JSON format.
  const JSONdata = JSON.stringify(data)

  // API endpoint where we send form data.
  const endpoint = '/api/likeEvent/likeEvent'

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
  // If server returns the what was submitted, that means the form works.
  const result = await response.json()
  console.log(`The server has added ${result.data} to the likes array`)
}