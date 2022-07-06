

export default function EventForm2() {
  return (
    <>
      <div>
        <div className="px-4 sm:px-0 mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Create a new event</h3>
          <p className="mt-1 text-sm text-gray-600">
            The fields marked with an asterisk (*) are mandatory.
          </p>
        </div>
          
        <div className="mt-5">
          <form action="#" method="POST">
            <div className="shadow">
              <div className="px-4 py-5 bg-white space-y-6">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                      Event name*
                    </label>
                    <input
                      type="text"
                      name="eventName"
                      id="eventName"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                      Date and time*
                    </label>
                    <input
                      type="datetime-local"
                      name="eventDate"
                      id="eventDate"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventLocation" className="block text-sm font-medium text-red-900">
                      Location*
                    </label>
                    <input
                      type="text"
                      name="eventLocation"
                      id="eventLocation"
                      // autoComplete="location"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventOrganiser" className="block text-sm font-medium text-gray-700">
                      Organiser*
                    </label>
                    <input
                      type="text"
                      name="eventOrganiser"
                      id="eventOrganiser"
                      autoComplete="organiser"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventTags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      type="text"
                      name="eventTags"
                      id="eventTags"
                      autoComplete="tags"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6">
                    <label htmlFor="eventPrivacy" className="block text-sm font-medium text-gray-700">
                      Privacy
                    </label>
                    <input
                      type="checkbox"
                      name="eventPrivacy"
                      id="eventPrivacy"
                      autoComplete="privacy"
                      className="mt-2 w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Tick the checkbox if your event is private.
                    </p>
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventAdmission" className="block text-sm font-medium text-gray-700">
                      Admission fee (£)
                    </label>
                    <input
                      type="number"
                      name="eventAdmission"
                      id="eventAdmission"
                      autoComplete="number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventDuration" className="block text-sm font-medium text-gray-700">
                      Duration (h)
                    </label>
                    <input
                      type="number"
                      name="eventDuration"
                      id="eventDuration"
                      autoComplete="number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              
                <div>
                  <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="eventDescription"
                      name="eventDescription"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Write a description here."
                      defaultValue={''}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your event. URLs are hyperlinked.
                  </p>
                </div>
          
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="eventImage"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="eventImage" name="eventImage" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>    
    </>
  )
}
