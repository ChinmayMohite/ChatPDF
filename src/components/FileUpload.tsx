"use client";
import { uploadToS3 } from "@/lib/s3";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
type Props = {};

const FileUpload = (props: Props) => {
  // TODO: Implement file upload functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": ["pdf"] },
    multiple: false,
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      console.log("File uploaded: ", acceptedFiles[0]);
      const file = acceptedFiles[0];
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB");
        return;
      }
      // TODO: Upload file to S3 and handle response
      try {
        const data = await uploadToS3(file);
        console.log("File uploaded to S3: ", data);
      } catch (error) {
        console.error("Error uploading file to S3: ", error);
      }
    },
  });
  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()}></input>
        <>
          <Inbox className="w-10 h-10 text-blue-500"></Inbox>
          <p className="text-sm text-gray-600">
            Drag and drop a PDF file here, or click to select a file.
          </p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
