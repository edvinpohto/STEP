// Function that makes an API call to the backend to delete an account

import signOutRedirect from "./signOutRedirect"

export default async function deleteEvent(userId: string) {
  const confirmation = confirm("Are you sure you want to delete your account?")

  if (confirmation) {
    const data = {
      userId: userId
    }
  
    // Send the data to the server in JSON format.
    const JSONdata = JSON.stringify(data)
    // API endpoint where we send form data.
    const endpoint = '/api/delete/deleteAccountAPI'
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
    console.log(`The server has received the request to delete the user ${result.data.userId}`)

    // Gimmicky for now but works
    signOutRedirect({ callbackUrl: '/'})
  }
}