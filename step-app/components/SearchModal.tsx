// Component for the modal housing the search bar and the search dropdown components.

// Component from https://tailwindui.com/components/application-ui/navigation/navbars
// Search bar from https://headlessui.com/react/dialog
// Search box from https://flowbite.com/docs/forms/search-input/ 

import { Dialog, Transition } from "@headlessui/react"
import { SearchIcon } from "@heroicons/react/outline"
import { Fragment, useState } from "react"
import SearchBar from "./SearchBar"
import SearchDropdown from "./SearchDropdown"

export default function SearchModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [typeSearchState, setTypeSearchState] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  const closeModalForChild = (childdata: boolean) => {
    setIsOpen(childdata)
  }

  function openModal() {
    setIsOpen(true)
  }

  function openTypeSearch() {
    setTypeSearchState(true)
  }

  function closeTypeSearch() {
    setTypeSearchState(false)
  }
  
	return (
    <div>
      <button
        type="button"
        id="searchButton"
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

            <div className="fixed bottom-20 right-9 mt-4 z-20 sm:right-4 sm:bottom-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-1 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={closeModal}
              >
                Close search
              </button>
            </div> 

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

                    <div className="fixed top-3 right-4 z-20 sm:right-4 sm:bottom-4">
                      {typeSearchState === false 
                      ? <button
                          type="button"
                          className="inline-flex justify-center rounded-full border border-transparent bg-gray-800 px-3 py-1 text-tiny font-medium text-white hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                          onClick={openTypeSearch}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-sliders" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                          </svg>
                        </button>
                      : <button
                          type="button"
                          className="inline-flex justify-center rounded-full border border-transparent bg-gray-800 px-3 py-1 text-tiny font-medium text-white hover:bg-gray-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2"
                          onClick={closeTypeSearch}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                          </svg>
                        </button>
                      }
                    </div> 
                    
                    <div className="">
                      {typeSearchState === false 
                      ? <div className="">
                          <SearchBar closeModalForChild={closeModalForChild}/>
                        </div>
                      : <div className="">
                          <SearchDropdown closeModalForChild={closeModalForChild}/>
                        </div>  
                      }
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