import Link from 'next/link';
import { Card } from '../../types/models'
import deleteEvent from '../../utils/deleteEvent';
import formatDateAndTime from "../../utils/formatDateAndTime";
import formatLocation from '../../utils/formatLocation';

export default function YourEventCards(property: Card) {
	 // Parse date & time into desired form
	 let formattedDateAndTime: string = formatDateAndTime(property.eventDate)

	return(
		<div className="grid  p-1 border-b sm:w-96">
			<div className="relative rounded-md h-full px-3 w-full">
				
				<Link href={`/events/${property.eventId}`}>
					<div className='hover:cursor-pointer inline-block'>
						<div>
							<span className="block text-sm font-semibold mr-4">{property.eventName}</span>
						</div>
						<div className="block">
							{/* <span className="text-slate-500 text-xs">Mon, APR 09, 7:00 PM</span> */}
							<span className="text-slate-500 text-xs">{formattedDateAndTime}</span>
						</div>
					</div>
				</Link>

				<div className='inline-block float-right mt-1'>
					{/* Edit event */}
						<button 
						className="inline-block mr-3 hover:cursor-pointer">
							<Link href={`/events/editEvent/${property.eventId}`}>
								<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
									<path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
								</svg>
							</Link>
						</button>

					{/* Delete event */}
						<button 
						className='inline-block hover:cursor-pointer'
						onClick={() => deleteEvent(property.eventId, property.currentUser)}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-trash3" viewBox="0 0 16 16">
								<path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
							</svg>
						</button>
				</div>

			</div>
		</div>
	)
}


function test() {
  console.log("It works")
}