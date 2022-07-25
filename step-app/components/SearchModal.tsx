// Component from https://tailwindui.com/components/application-ui/navigation/navbars
// Search bar from https://headlessui.com/react/dialog
// Search box from https://flowbite.com/docs/forms/search-input/ 

import { Dialog, Transition } from "@headlessui/react"
import { SearchIcon } from "@heroicons/react/outline"
import { Fragment, useState } from "react"
import SearchBar from "./SearchBar"

export default function SearchModal() {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }
  
	return (
		// {/* Search bar */}

    // {/* <Link href='/searchPage'>
    //   <button
    //     type="button"
    //     // onClick={}
    //     className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
    //   >
    //     <span className="sr-only">Search events</span>
    //     <SearchIcon className="h-6 w-6" aria-hidden="true" />
    //   </button>
    // </Link> */}

    <div>
      <button
        type="button"
        onClick={openModal}
        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">Search events</span>
        <SearchIcon className="h-6 w-6" aria-hidden="true" />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>


          <div className="">
            <div className="fixed h-full inset-0">
              <div className="grid fixed w-full h-full sm:place-content-center p-5 pt-16 pb-16 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="h-full w-full sm:h-128 sm:w-128 max-w-md overflow-y-auto transform rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900"
                    >
                      Search for events
                    </Dialog.Title>

                    <div className="fixed bottom-4 right-4 mt-4 z-20 sm:right-4 sm:bottom-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Close search
                      </button>
                    </div> 

                    {/* <div className="mt-2">
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
                    </div> */}
                    
                    <div className="">
                      <SearchBar />
                    </div>


                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
	)
}