import Link from 'next/link';
import { Card } from '../../types/models'
import formatDateAndTime from "../../utils/formatDateAndTime";
import formatLocation from '../../utils/formatLocation';

export default function YourEventCards(property: Card) {
	 // Parse date & time into desired form
	 let formattedDateAndTime: string = formatDateAndTime(property.eventDate)
	 // Parse location into desired form for card
	 let formattedLocation: string = formatLocation(property.eventLocation[0])

	return(
		<div className="grid m-3 sm:w-96">
				<div className="flex rounded-lg shadow-lg h-32 w-full hover:shadow-xl">
					{/* <!-- media container --> */}
					<div className="relative flex-none bg-none float-left h-full w-1/4">
							<img 
							// src="https://source.unsplash.com/random/" 
							src={property.eventImage} 
							alt="img" 
							className="aspect-auto rounded-l-lg object-cover h-full w-full"/>
					</div>
					{/* <!-- body container --> */}
					<div className="relative grow rounded-lg bg-white float-left h-full px-3 w-3/5">
						{/* Edit event */}
						<div className="absolute pt-3 opacity-100 pr-1 w-full text-xs">
								<a 
									href='events/editEvent'
									className="inline-block float-right mr-5 text-indigo-700"
									onClick={() => test()}>
									Edit event
								</a>
							</div>
						{/* Text */}
						<Link href={`/events/${property.eventId}`}>
							<div>
								<div className="block pt-2">
									{/* <span className="text-slate-500 text-xs">Mon, APR 09, 7:00 PM</span> */}
									<span className="text-slate-500 text-xs">{formattedDateAndTime}</span>
								</div>
								<span className="block mt-2 text-sm mr-4">{property.eventName}</span>
								<span className="block text-xs">Organiser: {property.eventOrganiser}</span>
								<div className="absolute bottom-2 opacity-100 pr-1 w-full text-xs">
									{/* <span className="inline-block">{property.eventLocation}</span> */}
									<span className="inline-block">{formattedLocation}</span>
									<span className="inline-block float-right mr-5">Free &ndash; £{property.eventAdmission}</span>
								</div>
							</div>
						</Link>
					</div>
				</div>
			</div>
	)
}


function test() {
  console.log("It works")
}