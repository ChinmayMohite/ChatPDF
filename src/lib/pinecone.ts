import { Pinecone } from "@pinecone-database/pinecone";
import { downloadFromS3 } from "./s3-server";
// import {} from 'langchain/'

let pinecone : Pinecone | null = null;

export const getPineconeClient = () =>{
  return new Pinecone({
    apiKey : process.env.PINCONE_API_KEY!,
    // environment : process.env.PINCONE_ENVIRONMENT!,
  })
}

export async function loadS3intoPinecone(file_key : string){
  // Loading the PDF from S3 into Pinecone ::
  console.log('Loading S3 into Pinecone :: '+file_key);
  const file_name = await downloadFromS3(file_key);

}
