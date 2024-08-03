"use client";
import { Inbox } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
type Props = {};

const FileUpload = (props: Props) => {
  // TODO: Implement file upload functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": ["pdf"] },
    multiple: false,
    maxFiles : 1,
    onDrop: (acceptedFiles) => {
      console.log("File uploaded: ", acceptedFiles[0]);
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
