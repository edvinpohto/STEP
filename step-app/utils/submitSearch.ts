import axios from "axios";

export default async function handleSearch(e: any) {
  // Stop the form from submitting and refreshing the page.
  e.preventDefault()

  // const axios = require('axios')

  axios
    .get('/api/events/getSearchedEvents')
    .then((res: { status: any; }) => {
      console.log(`statusCode: ${res.status}`)
      console.log(res)
    })
    .catch((error: any) => {
      console.error(error)
    })
  
  
  
    location.href = '/about';
  
  
  
  
  
  // // Get data from the form.
  // // No _id field. MongoDB makes one automatically?
  // const data = {
  //   searchParameter: ""
  // }

  // // Send the data to the server in JSON format.
  // const JSONdata = JSON.stringify(data)

  // // API endpoint where we send form data.
  // const endpoint = '/api/createEvent'

  // // Form the request for sending data to the server.
  // const options = {
  //   // The method is POST because we are sending data.
  //   method: 'GET',
  //   // Tell the server we're sending JSON.
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   // Body of the request is the JSON data we created above.
  //   body: JSONdata,
  // }

  // // Send the form data to our forms API on Vercel and get a response.
  // const response = await fetch(endpoint, options)

  // // Get the response data from server as JSON.
  // // If server returns the name submitted, that means the form works.
  // const result = await response.json()
  // console.log(`The server has received ${result.data}`)
}