// Component for the user type filtering in the search menu

import Link from "next/link";
import useFetch from "../hooks/useFetch";
import EventCardSearched from "./EventCards/EventCardSearched";
import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/solid'

export default function SearchBar() {
	const { data, setData } = useFetch();
	
	return (
		<div className="mt-2">
      {/* Dropdown */}
      <div className="w-full text-right">
        <Menu as="div" className="">
          <div>
            <Menu.Button className="inline-flex w-full justify-center rounded-md bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              Event target group
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => setData({ ...data, slug: "resident" })}
                      className={`${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      } group flex w-full place-content-center font-semibold rounded-md px-2 py-2 text-sm`}
                    >
                      Resident
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => setData({ ...data, slug: "student" })}
                      className={`${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      } group flex w-full place-content-center font-semibold rounded-md px-2 py-2 text-sm`}
                    >
                      Student
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={(e) => setData({ ...data, slug: "visitor" })}
                      className={`${
                        active ? 'bg-gray-100' : 'text-gray-900'
                      } group flex w-full place-content-center font-semibold rounded-md px-2 py-2 text-sm`}
                    >
                      Visitor
                    </button>
                  )}
                </Menu.Item>
              </div>
            
            </Menu.Items>
          </Transition>
        </Menu>
      </div>



      {/* Results */}
			<div className="">
				{data.results.events.length > 0 
					? 
					<div className='grid sm:justify-center'>
						{data.results.events && data.results.events.map((data: any) => (
							<Link key={data.eventName.toString()} href={`/events/${data._id}`}>
								<div 
								key={data._id} 
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