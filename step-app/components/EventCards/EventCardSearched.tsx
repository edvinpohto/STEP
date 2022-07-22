import { useState } from 'react'
import { Card } from '../../types/models'
import formatDateAndTime from "../../utils/formatDateAndTime"
import formatLocation from '../../utils/formatLocation'

export default function EventCardSignedIn(property: Card) {
	// Parse date & time into desired form
	let formattedDateAndTime: string = formatDateAndTime(property.eventDate)
	// Parse location into desired form for card
	let formattedLocation: string = formatLocation(property.eventLocation[0])

	return(
		<div className="grid mt-4 sm:w-96">
			<div className="flex rounded-sm shadow-lg h-32 w-full hover:shadow-xl">
				{/* <!-- media container --> */}
				<div className="relative flex-none bg-none float-left h-full w-1/4">
						<img 
						// src="https://source.unsplash.com/random/" 
						src={property.eventImage} 
						alt="img" 
						className="aspect-auto object-cover h-full w-full"/>
				</div>
				{/* <!-- body container --> */}
				<div className="relative grow bg-white float-left h-full px-3 w-3/5">
					{/* Heart Button */}
					{/* Text */}
					<div className="block pt-2">
						{/* <span className="text-slate-500 text-xs">Mon, APR 09, 7:00 PM</span> */}
						<span className="text-slate-500 text-xs">{formattedDateAndTime}</span>
					</div>
					<span className="block mt-2 text-sm mr-4">{property.eventName}</span>
					<span className="block text-xs">Organiser: {property.eventOrganiser}</span>
					<div className="absolute bottom-2 opacity-100 pr-1 w-full text-xs">
						{/* <span className="inline-block">{property.eventLocation}</span> */}
						<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-geo-alt inline-block mr-1 mb-1" viewBox="0 0 16 16">
							<path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
							<path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
						</svg>
						<span className="inline-block">{formattedLocation}</span>
						<span className="inline-block float-right mr-5">Free &ndash; £{property.eventAdmission}</span>
					</div>
				</div>
			</div>
		</div>
	)
}