import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import fs from "fs";
import ytdl from "ytdl-core";

export async function GET() {
  return NextResponse.json({ download: "siu" });
}

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const topGURL = "https://www.youtube.com/watch?v=jOTeBVtlnXU";

  ytdl(topGURL).pipe(fs.createWriteStream("topG.mp4"));

  return NextResponse.json({ download: "siu" });
}
