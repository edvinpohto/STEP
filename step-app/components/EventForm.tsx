import React, { useState } from "react"
import useInput from "../hooks/useInput";
import handleSubmit from "../utils/submitForm";
import axios from "axios";
import addressToCoordinates from '../utils/geocode'

interface CurrentUser {
  name: string;
  email: string;
	image: string;
	id: string;
}

interface Result {
  center: number[];
  place_name: string;
  place_type: string[];
  relevance: number;
  text: string;
}

const BUCKET_URL = "https://step-event-images.s3.eu-west-2.amazonaws.com/";

export default function EventForm() {
  // For location picker
  const address: any = useInput("");

  // For image uploader
  const [file, setFile] = useState<any>();
  const [uploadingStatus, setUploadingStatus] = useState<any>();
  const [uploadedFile, setUploadedFile] = useState<any>();

  const selectFile = (e: any) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = async () => {
    setUploadingStatus("Uploading the file to AWS S3");

    let { data } = await axios.post("/api/s3/uploadFile", {
      name: file.name,
      type: file.type,
    });

    console.log(data);

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
				<div className="px-4 sm:px-0 mt-3">
					<h3 className="text-lg font-medium leading-6 text-gray-900">Create a new event</h3>
					<p className="mt-1 text-sm text-gray-600">
						The fields marked with an asterisk (*) are mandatory.
					</p>
				</div>

				{/* Basic HTML Form */}
				<div className="mt-5">
          {/* <form action="#" method="POST"> */}
          <form onSubmit={handleSubmit}>
            <div className="shadow">
              <div className="px-4 py-5 bg-white space-y-6">
                <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="eventName" className="block text-sm font-medium text-gray-700">
                      Event name*
                    </label>
                    <input
                      required
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
                      required
                      type="datetime-local"
                      name="eventDate"
                      id="eventDate"
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>

                  {/* Mapbox: https://designcode.io/react-hooks-handbook-geocoding-mapbox */}
                  {/* To get the location as coordinates: https://docs.mapbox.com/api/search/geocoding/ */}
                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventLocation" className="block text-sm font-medium text-red-900">
                      Location*
                    </label>
                    <input
                      required 
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                      type="text"
                      name="eventLocation"
                      id="eventLocation"
                      // autoComplete="location"
                      placeholder="Address"
                      {...address}
                      // isTyping={address.value !== ""}
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

                  <div className="col-span-6 sm:col-span-4">
                    <label htmlFor="eventOrganiser" className="block text-sm font-medium text-gray-700">
                      Organiser*
                    </label>
                    <input
                      required
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
                  <label className="block text-sm font-medium text-gray-700">Cover photo*</label>
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
                              {/* <button
                                onClick={uploadFile}
                                className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
                              >
                                Upload a File!
                              </button> */}
                            </>
                          )}
                        </label>
                        {uploadedFile && <img src={uploadedFile} />}
                      </div>
                      {/* Note */}
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      <p className="text-xs text-gray-500">Images are cropped to a 2x3 aspect ratio.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button
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