import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINCONE_API_KEY!,
    // environment : process.env.PINCONE_ENVIRONMENT!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata : {
    loc : {pageNumber : number}
  }
}

export async function loadS3intoPinecone(file_key: string) {
  // Loading the PDF from S3 into Pinecone ::
  console.log("Loading S3 into Pinecone :: " + file_key);
  const file_name = await downloadFromS3(file_key);
  if (!file_name) {
    throw new Error("Could not load S3 into pinecone");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  

  return pages;
}
