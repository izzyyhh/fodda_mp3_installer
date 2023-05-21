import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { buffer } from "node:stream/consumers";
import ytdl from "ytdl-core";

export async function GET() {
  return NextResponse.json({ info: "siu" });
}

export async function POST(req: Request, res: NextApiResponse) {
  try {
    if (req.body) {
      const rawBody = await buffer(req.body as any);
      const body: { urls: string[] } = JSON.parse(rawBody.toString());
      const promises = body.urls.map((url: string) => ytdl.getInfo(url));
      const infos = (await Promise.all(promises)).map(
        (info: ytdl.videoInfo) => info.videoDetails.title
      );
      return NextResponse.json({ info: infos });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: e });
  }
}

// TODO, spinner while getting info and feedback when downloaded
