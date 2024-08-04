import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
  try {
    const body = await req.json();
    // Process the uploaded file here
    const { fileKey, file_name } = body;
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "An error occurred while processing your request",
      error,
    });
  }
}
