// Source: https://betterprogramming.pub/how-to-upload-files-to-amazon-s3-from-nextjs-app-b7ef1909976b
// https://github.com/kolberszymon/NextJS-AWSS3

import { useState } from "react";
import axios from "axios";

const BUCKET_URL = "https://step-event-images.s3.eu-west-2.amazonaws.com/";

export default function S3Test() {
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

  return (
    <div className="container flex items-center p-4 mx-auto min-h-screen justify-center">
      <main>
        <p>Please select a file to upload</p>
        <input type="file" onChange={(e) => selectFile(e)} />
        {file && (
          <>
            <p>Selected file: {file.name}</p>
            <button
              onClick={uploadFile}
              className=" bg-purple-500 text-white p-2 rounded-sm shadow-md hover:bg-purple-700 transition-all"
            >
              Upload a File!
            </button>
          </>
        )}
        {uploadingStatus && <p>{uploadingStatus}</p>}
        {uploadedFile && <img src={uploadedFile} />}
      </main>
    </div>
  );
}