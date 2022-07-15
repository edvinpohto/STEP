import { useSession, signOut } from "next-auth/react"

export default function Account() {
	const { data: session, status } = useSession();

	return(
		<div className="bg-white shadow overflow-hidden sm:rounded-lg">
			<div className="px-4 py-5 sm:px-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">Account information</h3>
				<p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and account data.</p>
			</div>
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Name</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session?.user.name}</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">Email address</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{session?.user.email}</dd>
					</div>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<button 
							onClick={() => signOut()}
							className="text-sm font-medium text-indigo-700">
							Sign out
						</button>
					</div>
					{/* HERE WE NEED TO IMPLEMENT A DELETE ACCOUNT FUNCTION */}
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
						<button
							onClick={() => deleteAccount()}
							className="text-sm font-medium text-rose-700">
							Delete account
						</button>
					</div>
				</dl>
			</div>
		</div>
	)
}

function deleteAccount() {
	console.log("Account deletetion has not been created. Need to delete user and also the events by that user.")
}