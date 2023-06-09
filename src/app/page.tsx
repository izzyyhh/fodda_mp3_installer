"use client";

import { Add, Done, Download } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Fab,
  IconButton,
  Input,
  TextField,
  styled,
} from "@mui/material";
import { useRef, useState } from "react";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
    },
  },
});

export default function Home() {
  const [urlInput, setUrlInput] = useState("");
  const [infoList, setInfoList] = useState<string[]>([]);
  const urlList = useRef<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Hajde Babi downloadoj kenget&nbsp;
        </p>
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
                  onClick={async () => {
                    if (
                      urlInput != "" &&
                      isUrl(urlInput) &&
                      !urlList.current.includes(urlInput)
                    ) {
                      setIsLoading(true);
                      const newUrlList = [...urlList.current, urlInput];
                      console.log("new url list", newUrlList);
                      urlList.current = newUrlList;
                      setUrlInput("");

                      try {
                        const res = await fetch("/api/getinfo", {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify({ urls: newUrlList }),
                        });
                        const result = (await res.json()) as { info: string[] };
                        console.log(result);
                        setInfoList(result.info);
                      } catch (e) {
                        console.log(e);
                      }
                      setIsLoading(false);
                    }
                  }}
                >
                  <Add className="text-black "></Add>
                </IconButton>
                <CssTextField
                  autoComplete="off"
                  label="YouTube URL"
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
        <section className=" pt-12 flex flex-col items-start min-w-[300px]">
          <h3 className=" underline">të zgjedhura:</h3>
          <ul
            className="flex flex-col items-center min-w-[100px] min-h-[100px]"
            id="infolist"
          >
            {infoList.map((info) => (
              <li className=" w-full" key={info} datatype={info}>
                <span>- </span>
                {info}

                <Done
                  style={{ opacity: "0" }}
                  className="fill-lime-100 ease-in-out duration-500 transition-all"
                ></Done>
              </li>
            ))}
            {isLoading && <CircularProgress color="inherit"></CircularProgress>}
          </ul>
          <Fab
            variant="extended"
            className="text-black bg-white hover:text-black mt-4 self-center hover:cursor-pointer"
            onClick={async () => {
              console.log(`downloading: ${urlList.current}`);
              const response = await fetch("/api/downloadmp3", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ urls: urlList.current }),
              });

              console.log(await response.json());
              markAsChecked();
            }}
          >
            <Download sx={{ mr: 1 }}></Download>
            Download
          </Fab>
        </section>
      </div>
      <p className="font-extralight">YouTube URL to MP3 Converter</p>
    </main>
  );
}

const markAsChecked = () => {
  const ul = document.getElementById("infolist");

  if (ul) {
    for (let i = 0; i < ul.children.length; i++) {
      const child = ul.children.item(i);
      const doneIcon = child?.querySelector("svg");
      if (doneIcon) {
        doneIcon.style.opacity = "100";
      }
    }
  }
};

const isUrl = (str: string): boolean => {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
};
