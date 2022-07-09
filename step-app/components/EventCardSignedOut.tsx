import { Card } from '../types/models'
import signInRedirect from "../utils/signInRedirect"
import formatDateAndTime from "../utils/formatDateAndTime";
import formatLocation from '../utils/formatLocation';

export default function EventCardSignedOut(property: Card) {
	// Parse date & time into desired form
	let formattedDateAndTime: string = formatDateAndTime(property.eventDate)
	// Parse location into desired form
	let formattedLocation: string = formatLocation(property.eventLocation)
	
	console.log(property.eventImage)

	return(
		<div className="grid m-3 sm:w-96">
			<div className="flex rounded-sm shadow-lg h-32 w-full hover:shadow-xl">
				{/* <!-- media container --> */}
				<div className="relative flex-none bg-none float-left h-full w-1/4">
						<img 
						// src="https://source.unsplash.com/random/" 
						src={property.eventImage} 
						alt="img" 
						className="aspect-auto bg-center object-none h-full w-full"/>
				</div>
				{/* <!-- body container --> */}
				<div className="relative grow bg-white float-left h-full px-3 w-3/5">
					{/* Heart Button */}
					<div className="relative inset-y-0 right-0 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
        		<div className="absolute top-3 right-0 sm:top-2 sm:right-2">
          		<button onClick={signInRedirect}>
          			<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
            			<path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
          			</svg>
          		</button>
        		</div>
      		</div>
					{/* Text */}
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
			</div>
		</div>
	)
}