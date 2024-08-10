import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { TextEncoder } from "util";
import { getEmbeddings } from "./embeddings";
import md5 from "md5";
import { convertToAscii } from "./utils";

let pinecone : Pinecone | null = null;

export const getPineconeClient = () => {
  return new Pinecone({
    // environment : process.env.PINECONE_ENVIRONMENT!,
    apiKey: process.env.PINECONE_API_KEY!,
  });
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export async function loadS3intoPinecone(fileKey: string) {
  // Loading the PDF from S3 into Pinecone ::
  console.log("Loading S3 into Pinecone :: " + fileKey);
  const file_name = await downloadFromS3(fileKey);
  if (!file_name) {
    throw new Error("Could not load S3 into pinecone");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];

  // Splitting the file into chunks ::
  // return pages;
  const documents = await Promise.all(pages.map(prepareDocuments));

  // Vectorize and Embed the documents ::
  const vectors = await Promise.all(documents.flat().map(embedDocument));

  const client = await getPineconeClient();
  const pineconeIndex = await client.Index("chat-with-pdf");
  const namespace = pineconeIndex.namespace(convertToAscii(fileKey));
  console.log("<------Upsert to Pinecone Index------>");
  await namespace.upsert(vectors);
  console.log("<------Done Upserting to Pinecone Index------>");
  return documents[0];  //return first document;
}

//async function embedDocument

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embeddings,
      metadata: {
        pageNumber: doc.metadata.pageNumber,
        text: doc.metadata.text,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding the Docs", error);
    throw error;
  }
}


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
