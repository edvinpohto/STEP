// Component for the search bar
// Includes the search field itself and fetches results cards component
// Uses the useFetch custom hook for fetching data based on the slug

import Link from "next/link";
import useFetch from "../hooks/useFetch";
import EventCardSearched from "./EventCards/EventCardSearched";

export default function SearchBar( {closeModalForChild}: any ) {
	const modalData = false;
	const { data, setData } = useFetch();
	// console.log(data)
	
	return (
		<div className="mt-2">
			{/* <form> */}
				<label htmlFor="eventSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
				<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						</div>
						<input 
							value={data.slug}
							onChange={(e) => setData({ ...data, slug: e.target.value })}
							type="search" 
							id="eventSearch" 
							className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-gray-800 focus:border-gray-800" 
							placeholder="Search events..."
							autoComplete="off"
							required/>
				</div>
			{/* </form> */}

			{/* Results */}
			<div className="">
				{data.results.events.length > 0 
					? 
					<div className='grid sm:justify-center'>
						{data.results.events && data.results.events.map((data: any) => (
							<Link key={data.eventName.toString()} href={`/events/${data._id}/`}>
								<div 
								onClick={() => closeModalForChild(modalData)}
								key={data._id} 
								id="searchedEvent"
								className='w-full'>
									<EventCardSearched 
										eventName={data.eventName}
										eventDate={data.eventDate}
										eventImage={data.eventImage}
										eventOrganiser={data.eventOrganiser}
										eventLocation={data.eventLocation}
										eventAdmission={data.eventAdmission}
										eventLikes={data.eventLikes}
										currentUser={''} 
										eventId={""}/>
								</div>
							</Link>
						))}
					</div>
					: 
					<div className=''>
						<p className='pt-2 text-sm'>Search for an event to update the list</p>
					</div>
					}
			</div>
		</div>
	)
}