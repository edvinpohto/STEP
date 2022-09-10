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

	// console.log(property.currentUser)

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
								<div className="absolute top-4 right-0 sm:top-4 sm:right-4">
									<button id="likeButton" onClick={onLike}>
										<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#2D2A32" className="bi bi-suit-heart" viewBox="0 0 16 16">
											<path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
										</svg>
									</button>
								</div>
							</div>
						: <div className="relative inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
								<div className="absolute top-4 right-0 sm:top-4 sm:right-4">
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
							<h3 className="text-lg leading-6 font-medium text-gray-900 mr-8">{property.eventName}</h3>

							{/* Likes */}
							{likes > 0 &&
								<div className="bg-white pt-2">
									<div className="text-tiny font-bold">{likes} people like this event!</div>
								</div>
							}
						</div>

						<div className="sm:px-6">
							{/* Date */}
							<div className="mt-2">
								<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-calendar-event inline-block mr-1 mb-1" viewBox="0 0 16 16">
									<path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z"/>
									<path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/>
								</svg>
								<span className="inline-block text-sm">{formattedDateAndTime}</span>
							</div>

							{/* Location */}
							<div className="pt-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-geo-alt inline-block mr-1 mb-1" viewBox="0 0 16 16">
									<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
									<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
								</svg>
								<span className="inline-block text-sm">{formattedLocation}</span>
							</div>

							{/* Organiser */}
							<div className="bg-white pt-1">
								<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" className="bi bi-flag inline-block mr-1 mb-1" viewBox="0 0 16 16">
									<path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
								</svg>
								<div className="inline-block text-sm">Event by {property.eventOrganiser}</div>
							</div>

							{/* Fee */}
							{property.eventAdmission > 0 &&
								<div className="bg-white pt-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin inline-block mr-1 mb-1" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
										<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
										<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
										<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
									</svg>
									<div className="text-sm inline-block">Admission: £{property.eventAdmission}</div>
								</div>	
							}
							{property.eventAdmission === 0 &&
								<div className="bg-white pt-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin inline-block mr-1 mb-1" viewBox="0 0 16 16">
										<path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
										<path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
										<path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
										<path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
									</svg>
									<div className="text-sm inline-block">Admission: Free</div>
								</div>	
							}

							{/* Duration */}
							{property.eventDuration > 0 &&
								<div className="bg-white pt-2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clock inline-block mr-1 mb-1" viewBox="0 0 16 16">
										<path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"/>
										<path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
									</svg>
									<div className="text-sm inline-block">Duration: {property.eventDuration}h</div>
								</div>	
							}

							{/* Description */}
							<div className="mt-3">
							{/* <div className="text-sm font-semibold">Description:</div> */}
								<div className="text-sm">{property.eventDescription}</div>
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