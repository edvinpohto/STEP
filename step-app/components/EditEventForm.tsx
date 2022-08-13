// Component for the edit event form
// Populates the form with info from the given event

import React, { useState } from "react"
import useInput from "../hooks/useInput";
import handleUpdate from "../utils/updateForm";
import axios from "axios";

interface Result {
  center: number[];
  place_name: string;
  place_type: string[];
  relevance: number;
  text: string;
}

// Amazon S3 bucket URL
const BUCKET_URL = "https://step-event-images.s3.eu-west-2.amazonaws.com/";

export default function EventForm(property: any) {

  // For location picker
  const address: any = useInput("");

  // States for image uploader
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  // Uploads image to S3
  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    const url = data.url;
    let { data: newData } = await axios.put(url, file, {
      headers: {
        "Content-type": file.type,
        "Access-Control-Allow-Origin": "*",
      },
    });

    setUploadedFile(BUCKET_URL + file.name);
    setFile(null);
  };

  return(
		<>
			<div>
        <div className="flex justify-center">
          <div className="max-w-3xl w-full bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Updating event: {property.eventName}</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">The fields marked with an asterisk (*) are mandatory.</p>
            </div>
          </div>
        </div>

				{/* Basic HTML Form */}
				<div className="sm:flex sm:justify-center">
          <form onSubmit={handleUpdate}>
            <div className="">
              <div className="px-4 py-5 space-y-6">
                <div className="">

                  <div className="hidden col-span-6 sm:col-span-3">
                    <label htmlFor="eventId" className="block text-sm font-medium text-gray-700">
                      Event id*
                    </label>
                    <input
                      defaultValue={`${property.eventId}`}
                      disabled
                      type="text"
                      id="eventId"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                      Event name*
                    </label>
                    <input
                      required
                      defaultValue={`${property.eventName}`}
                      type="text"
                      id="eventName"
                      autoComplete="given-name"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-2 col-span-6 sm:col-span-3">
                    <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                      Date and time*
                    </label>
                    <input
                      required
                      defaultValue={`${property.eventDate}`}
                      type="datetime-local"
                      name="eventDate"
                      id="eventDate"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Mapbox: https://designcode.io/react-hooks-handbook-geocoding-mapbox */}
                  <div className="mt-2 col-span-6 sm:col-span-4">
                    <label htmlFor="eventLocation" className="block text-sm font-medium text-gray-700">
                      Location*
                    </label>
                    <p className="text-sm text-rose-700">Please re-enter or change the event location</p>
                    <input
                      required 
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      type="text"
                      name="eventLocation"
                      id="eventLocation"
                      placeholder="Address"
                      {...address}
                    />
                    {address.suggestions?.length > 0 && (
                      <div className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {address.suggestions.map((suggestion: Result, index: any) => {
                          return (
                            <div
                              key={index}
                              className="border-t-2"
                              onClick={() => {
                                address.setvalue(suggestion.place_name);
                                address.setsuggestions([]);
                              }}
                            >
                              {suggestion.place_name}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div className="mt-2 col-span-6 sm:col-span-4">
                    <label htmlFor="eventOrganiser" className="block text-sm font-medium text-gray-700">
                      Organiser*
                    </label>
                    <input
                      required
                      defaultValue={`${property.eventOrganiser}`}
                      type="text"
                      name="eventOrganiser"
                      id="eventOrganiser"
                      autoComplete="organiser"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="mt-2 col-span-6 sm:col-span-4">
                    <label htmlFor="eventTags" className="block text-sm font-medium text-gray-700">
                      Tags
                    </label>
                    <input
                      defaultValue={`${property.eventTags}`}
                      type="text"
                      name="eventTags"
                      id="eventTags"
                      autoComplete="tags"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-2 col-span-6">
                    <label htmlFor="eventPrivacy" className="text-sm font-medium text-gray-700">
                      Privacy
                    </label>
                    <p className="text-sm text-rose-700">Please re-communicate or change your privacy preference</p>
                    <p className="text-sm text-gray-500">
                      Tick the checkbox if your event is private.
                    </p>
                    
                    <input
                      type="checkbox"
                      name="eventPrivacy"
                      id="eventPrivacy"
                      autoComplete="privacy"
                      className="mt-2 w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-2 col-span-6">
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">
                      Event target group (user type)
                    </label>
                    <p className="text-sm text-rose-700">Please re-enter or change your target group</p>

                    <div className="mt-1">
                      <input
                        type="radio"
                        name="eventType"
                        id="noType"
                        value={""}
                        autoComplete="type"
                        className="inline-block w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <label htmlFor="noType" className="inline-block ml-2 text-sm text-gray-700">
                        None
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="eventType"
                        id="resident"
                        value={"resident"}
                        autoComplete="type"
                        className="inline-block w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <label htmlFor="resident" className="inline-block ml-2 text-sm text-gray-700">
                        Resident
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="eventType"
                        id="student"
                        value={"student"}
                        autoComplete="type"
                        className="inline-block w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <label htmlFor="student" className="inline-block ml-2 text-sm text-gray-700">
                        Student
                      </label>
                    </div>
                    <div className="mt-1">
                      <input
                        type="radio"
                        name="eventType"
                        id="visitor"
                        value={"visitor"}
                        autoComplete="type"
                        className="inline-block w-5 h-5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                      />
                      <label htmlFor="visitor" className="inline-block ml-2 text-sm text-gray-700">
                        Visitor
                      </label>
                    </div>
                  </div>

                  <div className="mt-2 col-span-6 sm:col-span-4">
                    <label htmlFor="eventAdmission" className="block text-sm font-medium text-gray-700">
                      Admission fee (£)
                    </label>
                    <input
                      defaultValue={`${property.eventAdmission}`}
                      type="number"
                      name="eventAdmission"
                      id="eventAdmission"
                      autoComplete="number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-2 col-span-6 sm:col-span-4">
                    <label htmlFor="eventDuration" className="block text-sm font-medium text-gray-700">
                      Duration (h)
                    </label>
                    <input
                      defaultValue={`${property.eventDuration}`}
                      type="number"
                      name="eventDuration"
                      id="eventDuration"
                      autoComplete="number"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              
                <div>
                  <label htmlFor="eventDescription" className="mt-2 block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      defaultValue={`${property.eventDescription}`}
                      id="eventDescription"
                      name="eventDescription"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                      placeholder="Write a description here."
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your event. URLs are hyperlinked.
                  </p>
                </div>
          
                <div className="mt-2 ">
                  <label className="block text-sm font-medium text-gray-700">Cover photo*</label>
                  <p className="text-sm text-rose-700">Please re-submit or change your cover photo</p>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {/* Image */}
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
                      {/* Input */}
                      <div className="grid content-center text-sm text-gray-600">
                        <label
                          htmlFor="eventImage"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <input 
                            required
                            id="eventImage"   
                            name="eventImage" 
                            type="file" 
                            onChange={(e) => selectFile(e)}
                            // className="sr-only" 
                            title={file && file.name}
                          />
                          {file && (
                            <>
                              <p>Selected file: {file.name}</p>
                            </>
                          )}
                        </label>
                        {uploadedFile && <img src={uploadedFile} />}
                      </div>
                      {/* Note */}
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, and more, up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
                  id="submit"
                  type="submit"
                  onClick={uploadFile}
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