"use client";

import { Add } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { useState } from "react";

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [urlList, setUrlList] = useState<string[]>([]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Hajde Babi instaloj kenget&nbsp;
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By Izzy
          </a>
        </div>
      </div>
      <div className="relative flex flex-col place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        <h1 className=" text-3xl">{"Let's Go"}</h1>
        <section>
          <h2 className=" font-thin text-center">Fute Linkun URL ktu</h2>

          <div className="mt-6 ">
            <div className="flex gap-2">
              <label htmlFor="url" className="relative">
                <IconButton
                  className=" absolute right-[-1ch] bottom-[-8px] z-50 bg-white hover:bg-slate-400"
                  onClick={() => {
                    if (
                      urlInput != "" &&
                      isUrl(urlInput) &&
                      !urlList.includes(urlInput)
                    ) {
                      const newUrlList = [...urlList, urlInput];
                      setUrlList(newUrlList);
                    }
                    setUrlInput("");
                  }}
                >
                  <Add className="text-black "></Add>
                </IconButton>
                <input
                  className=" text-black opacity-70"
                  type="text"
                  name="url"
                  id="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
        </section>
        <section className="pt-5">
          <h3>të zgjedhura</h3>
          <ul>
            {urlList.map((url) => (
              <li key={url}>{url}</li>
            ))}
          </ul>
          <Button
            className="text-black bg-white hover:text-white mt-4"
            variant="contained"
            onClick={async () => {
              const response = await (await fetch("/api/downloadmp3")).json();

              console.log(response);
            }}
          >
            Contained
          </Button>
        </section>
      </div>
      <p className="font-extralight">YouTube URL to MP3 Converter</p>
    </main>
  );
}

const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
