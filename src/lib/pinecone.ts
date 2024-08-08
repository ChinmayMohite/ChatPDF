import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { TextEncoder } from "util";

let pinecone: Pinecone | null = null;

export const getPineconeClient = () => {
  return new Pinecone({
    apiKey: process.env.PINCONE_API_KEY!,
    // environment : process.env.PINCONE_ENVIRONMENT!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3intoPinecone(file_key: string) {
  // Loading the PDF from S3 into Pinecone ::
  console.log("Loading S3 into Pinecone :: " + file_key);
  const file_name = await downloadFromS3(file_key);
  if (!file_name) {
    throw new Error("Could not load S3 into pinecone");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  // Splitting the file into chunks ::
  // return pages;
  const documents = await Promise.all(pages.map(prepareDocuments));

  // Vectorize and Embed the documents ::

}

//async function embedDocument

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8 ").decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocuments(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  //Doc Splitting ::
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 36000),
      },
    }),
  ]);
  return docs;
}
