// Component for a specific event's own page (signed in users)

import { useState } from "react"
import { Event } from "../../types/models"
import checkIfLiked from "../../utils/checkIfLiked"
import dislikeEvent from "../../utils/dislikeEvent"
import likeEvent from "../../utils/likeEvent"
import formatDateAndTime from "../../utils/formatDateAndTime"
import formatLocation from "../../utils/formatLocation"

export default function EventPage(property: Event) {
	// Parse date & time into desired form
	let formattedDateAndTime: string = formatDateAndTime(property.eventDate)
	// Parse location into desired form for card
	let formattedLocation: string = formatLocation(property.eventLocation[0])

	const [liked, setLiked] = useState(checkIfLiked(property))
	const [likes, setLikes] = useState(property.eventLikes.length)

	console.log(property.currentUser)

	function onLike() {
		setLiked(true)
		setLikes(likes + 1)
		// add currentUser to eventLikes array and evenId to likedEvents array
		likeEvent(property.currentUser, property.eventId)
	}

	function onDislike() {
		const answer = confirm("Are you sure you want to dislike the event?")
		if (answer) {
			setLiked(false)
			setLikes(likes - 1)
			// remove currentUser from eventLikes array and evenId from likedEvents array
			dislikeEvent(property.currentUser, property.eventId)
		}
		else {
			return
		}
	}
	
	return (
		<>
			<div className="grid grid-cols-1 w-full place-items-center">
				<div className="grid w-5/6 m-5 rounded-b-lg shadow-lg hover:shadow-xl sm:w-128">
					{/* <!-- media container --> */}
					<div className=" flex-none bg-none rounded-t-lg float-left w-full h-56 overflow-hidden">
						{/* <div className=""> */}
								<img 
								// src="https://source.unsplash.com/random/" 
								src={property.eventImage} 
								alt="img" 
								className="aspect-auto object-cover object-bottom h-full w-full"/>
						{/* </div> */}
					</div>

					<div className="relative rounded-b-lg bg-white px-4 pb-4 shadow sm:rounded-lg">

						{/* Heart Button */}
						{liked === false 
						? <div className="relative inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="absolute top-3 right-0 sm:top-4 sm:right-4">
									<button id="likeButton" onClick={onLike}>
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2D2A32" className="bi bi-suit-heart" viewBox="0 0 16 16">
											<path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
										</svg>
									</button>
								</div>
							</div>
						: <div className="relative inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="absolute top-3 right-0 sm:top-4 sm:right-4">
									<button id="likeButton" onClick={onDislike}>
									<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#EE6C4D" className="bi bi-suit-heart-fill" viewBox="0 0 16 16">
										<path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
									</svg>
									</button>
								</div>
							</div>
						}

						{/* Event name */}
						<div className="pt-4 sm:px-6">
							<h3 className="text-lg leading-6 font-medium text-gray-900">{property.eventName}</h3>

							{/* Likes */}
							{likes > 0 &&
								<div className="bg-white pt-2">
									<div className="text-tiny font-bold">{likes} people like this event!</div>
								</div>
							}

							<div className="mt-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-calendar-event inline-block mr-1 mb-1" viewBox="0 0 16 16">
									<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
									<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
								</svg>
								<span className="inline-block text-sm">{formattedDateAndTime}</span>
							</div>
						</div>

						<div className="sm:px-6">
							{/* Location */}
							<div className="pt-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-geo-alt inline-block mr-1 mb-1" viewBox="0 0 16 16">
									<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
									<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
								</svg>
								<span className="inline-block text-sm">{formattedLocation}</span>
							</div>

							{/* Organiser */}
							<div className="bg-white pt-2">
								<div className="text-sm">By: {property.eventOrganiser}</div>
							</div>

							{/* Fee */}
							{property.eventAdmission > 0 &&
								<div className="bg-white pt-2">
									<div className="text-sm">Admission: £{property.eventAdmission}</div>
								</div>	
							}
							{property.eventAdmission === 0 &&
								<div className="bg-white pt-2">
									<div className="text-sm">Admission: Free</div>
								</div>	
							}

							{/* Duration */}
							{property.eventDuration > 0 &&
								<div className="bg-white pt-2">
									<div className="text-sm">Duration: {property.eventDuration}h</div>
								</div>	
							}

							{/* Description */}
							<div className="rounded-md mt-3 border border-dashed">
							<div className="text-sm font-semibold pt-2 px-2">Description:</div>
								<div className="text-sm px-2 pb-2">{property.eventDescription}</div>
							</div>
					
							{/* Privacy */}
							{property.eventPrivacy !== false &&
								<div className="absolute bottom-4 right-2 z-5">
									<div className="rounded-full bg-red-700 text-tiny text-white px-2 py-1 mr-2 inline-block">Private</div>
								</div>
							}

							{/* Tags */}
							{property.eventTags[0] !== "" &&
								<div className="mt-5">
									{property.eventTags.map((tag) => (
										<div key={tag.toString()} className="rounded-full bg-amber-300 text-tiny px-2 py-1 mr-2 inline-block">{tag}</div>
									))}
								</div>
							}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}