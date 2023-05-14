import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import fs, { createWriteStream } from "fs";
import ytdl from "ytdl-core";
import ffmpeg from "fluent-ffmpeg";

export async function GET() {
  return NextResponse.json({ download: "siu" });
}

export async function POST(request: Request, response: NextApiResponse) {
  const body: { urls: string[] } = await request.json();
  const downloadDir = "./downloads";

  if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
  }

  const ytdlOptions: ytdl.downloadOptions = {
    quality: "highestaudio",
    filter: "audioonly",
  };

  if (body.urls && body.urls.length > 0) {
    body.urls.forEach(async (url) => {
      const info = await ytdl.getInfo(url);
      const ytStream = ytdl(url, ytdlOptions);

      console.log("downloading:", info.videoDetails.title);

      const ffmpegConvert = ffmpeg(ytStream)
        .format("mp3")
        .pipe(
          createWriteStream(`${downloadDir}/${info.videoDetails.title}.mp3`)
        );

      ffmpegConvert.on("finish", () => {
        console.log("finished downloading " + info.videoDetails.title);
      });

      ffmpegConvert.on("error", (e) => {
        console.log(e);
        response.status(500).json({ error: e });
      });
    });
  } else {
    return NextResponse.json({ error: "urls empty" });
  }

  return NextResponse.json({ download: "siu", pending: true });
}
