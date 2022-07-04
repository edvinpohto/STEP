import React from "react"
import { getSession } from "next-auth/react"
import { tagsToArray } from "../utils/tagsToArray"

interface CurrentUser {
  name: string;
  email: string;
	image: string;
	id: string;
}

export default function EventForm() {
  // Handles the submit event on form submit.
  const handleSubmit = async (e: any) => {
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

		// Get data from the form.
		// No _id field. MongoDB makes one automatically?
		// The location field does not work yet?
		const data = {
			eventName: e.target.eventName.value,
			eventDate: e.target.eventDate.value,
			//   eventLocation: e.target.eventLocation.value,
			eventDescription: e.target.eventDescription.value,
			eventOrganiser: e.target.eventOrganiser.value,
			//   eventTags: e.target.eventTags.value,
			eventTags: formattedTags,
			eventPrivacy: e.target.eventPrivacy.checked,
			eventAdmission: +e.target.eventAdmission.value,
			eventDuration: +e.target.eventDuration.value,
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

  return(
		<div className='grid grid-cols-1 place-content-center place-items-center p-5'>
			<div>
				<h1 className="text-lg font-bold">Create New Event</h1>
			</div>

			{/* Basic HTML Form */}
			<div className="py-4 p-5 border-4 rounded-md border-grey mt-3 w-1/5">
				{/* We pass the event to the handleSubmit() function on submit. */}
				<form onSubmit={handleSubmit}>
					<div className="grid place-content-around mb-2">
						<label htmlFor="eventName">Event name:* </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						required
						type="text" 
						id="eventName" 
						name="eventName" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventDate">Date and time:* </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						required
						type="date" 
						id="eventDate" 
						name="eventDate" 
						/>
					</div>

					{/* HOW DO I MAKE THE LOCATION WORK? */}
					{/* <div>
						<label htmlFor="eventLocation">Location:* </label>
						<div className="grid grid-cols-2 gap-3 py-2">
							<input type="street" 
										id="autocomplete" 
										placeholder="Street"
										className="form-input px-4 py-3 rounded-full h-1" />
							
							<input type="city" 
										id="inputCity" 
										placeholder="City"
										className="form-input px-4 py-3 rounded-full h-1" />
							
							<input type="zip" 
										id="inputZip" 
										placeholder="Zip"
										className="form-input px-4 py-3 rounded-full h-1" />
							
							<input type="country" 
										id="inputCountry" 
										placeholder="Country"
										className="form-input px-4 py-3 rounded-full h-1" />
						</div>
					</div>
					<br /> */}

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventDescription">Description:* </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						required
						type="text" 
						id="eventDescription" 
						name="eventDescription" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventOrganiser">Organiser:* </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						required
						type="text" 
						id="eventOrganiser" 
						name="eventOrganiser" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventTags">Tags: </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						type="text" 
						id="eventTags" 
						name="eventTags" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventPrivacy">Private event: </label>
						<input 
						className="form-checkbox px-2 py-2 rounded-sm"
						type="checkbox" 
						id="eventPrivacy" 
						name="eventPrivacy" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventAdmission">Admission fee (£): </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						type="number" 
						id="eventAdmission" 
						name="eventAdmission" 
						/>
					</div>

					<div className="grid place-content-around mb-2">
						<label htmlFor="eventDuration">Duration (h): </label>
						<input 
						className="form-input px-4 py-3 rounded-full h-1"
						type="number" 
						id="eventDuration" 
						name="eventDuration" 
						/>
					</div>

					<div className="grid place-content-around pt-2">
						<button type="submit" className="px-4 py-1 text-sm text-sky-600 font-semibold rounded-full border border-sky-200 hover:text-white hover:bg-sky-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2">Submit</button>
					</div>
				</form>
			</div>
			<p className="text-xs">Fields denoted with an asterisk (*) are mandatory.</p>
		</div>   
  )
}