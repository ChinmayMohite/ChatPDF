//   /api/create-chat
import { loadS3intoPinecone } from "@/lib/pinecone";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    // Process the uploaded file here
    const { file_key, file_name } = body;
    const pages = await loadS3intoPinecone(file_key);
    return NextResponse.json({ pages: pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error,
    });
  }
}
