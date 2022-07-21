import { useSession, signIn, signOut } from "next-auth/react"

export default function SearchBar() {
	return (
		<div className="m-2">
			<form>   
				<label htmlFor="eventSearch" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
				<div className="relative">
						<div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
								<svg aria-hidden="true" className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						</div>
						<input type="search" id="eventSearch" className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-md border border-gray-300 focus:ring-gray-800 focus:border-gray-800" placeholder="Search events..." required/>
						<button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2">Search</button>
				</div>
			</form>
		</div>
	)
}