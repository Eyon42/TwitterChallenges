import { type NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState<number>(0);

  const fullPrompt = `Una persona tiene planeado hacer un viaje a ${place} por ${
    days || 0
  } días.
  ¿Qué recomendarías que hiciera? Ten en cuenta que la persona quiere ${prompt}}. 
  Listar 1-3 actividades por día usando el formato: "Día 1: Actividad 1, Actividad 2, Actividad 3".`;

  const aiQuery = api.openai.hello.useQuery(
    { text: fullPrompt },
    {
      enabled: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(aiQuery.isFetching);

  return (
    <>
      <Head>
        <title>AI Travel Reccomender</title>
        <meta name="description" content="Ai Travel Recommender" />
      </Head>
      <main>
        <div className="h-full min-h-screen bg-neutral-800">
          <div className="mx-auto flex max-w-min flex-col items-center gap-8 px-4 py-12 font-sans text-white">
            <Image
              src="/TextLogo.png"
              alt="CheCityBot"
              height={96}
              width={256}
            />
            <h1 className="text-xl font-light">
              Planificá tu próxima <b className="font-semibold">escapada</b>:
            </h1>
            <div className="flex flex-row flex-wrap items-center justify-center gap-6 rounded-2xl bg-neutral-700 px-4 py-4 transition-all md:flex-nowrap md:gap-0 md:px-8 md:py-2">
              <input
                className="w-40 border-b-2 border-b-transparent bg-transparent text-center outline-none transition-colors
                duration-500 ease-in-out placeholder:font-light focus:border-b-2 focus:border-b-green-400 focus:placeholder-transparent md:w-32"
                value={place}
                placeholder="Lugar"
                onChange={(e) => setPlace(e.target.value)}
              ></input>
              <span className="mx-1 h-8 border-l border-neutral-500 md:mx-6" />
              <input
                type="number"
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
                min={1}
                max={10}
                className="w-10 border-b-2 border-b-transparent bg-transparent text-center outline-none transition-colors duration-500 ease-in-out placeholder:font-light focus:border-b-2 focus:border-b-green-400 focus:placeholder-transparent"
                value={days || ""}
                placeholder="Días"
                onChange={(e) => {
                  console.log(e.target.value);
                  console.log(parseInt(e.target.value));
                  setDays(parseInt(e.target.value));
                }}
              ></input>
              <span className=" mx-6 hidden h-8 border-l border-neutral-500 md:block" />
              <input
                type="text"
                className="w-80 border-b-2 border-b-transparent bg-transparent text-center outline-none transition-colors duration-500 ease-in-out placeholder:font-light  focus:border-b-2 focus:border-b-green-400 focus:placeholder-transparent"
                value={prompt}
                placeholder="Me gustaria hacer estas actividades..."
                onChange={(e) => setPrompt(e.target.value)}
              ></input>
              <button
                className="flex h-10 w-full items-center justify-center rounded-full border-none bg-gradient-to-tr from-blue-300 to-green-300 p-3 text-white shadow-lg outline-none ring-green-500/50 transition-all ease-in-out focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50 md:ml-8 md:w-10"
                disabled={!place || !days || !prompt}
                onClick={() => {
                  aiQuery.refetch().catch((e) => console.log(e));
                }}
              >
                {aiQuery.isFetching ? (
                  <Spinner />
                ) : (
                  <>
                    <span className="mx-4 text-black md:hidden">
                      Recomendar
                    </span>
                    <Image
                      src="/search.svg"
                      height={20}
                      width={20}
                      alt="search"
                    />
                  </>
                )}
              </button>
            </div>
            {aiQuery.data ? (
              <>
                <h2 className="text-xl font-light">Recomendaciones:</h2>
                <div className="w-full rounded-xl bg-neutral-700 py-6 px-8 transition-all">
                  <p className="whitespace-pre-wrap">
                    {aiQuery.data?.response?.replace(/^\s+|\s+$/g, "")}
                  </p>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

const Spinner = () => {
  return (
    <div className="flex items-center gap-2">
      <span className="block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-green-500"></span>
    </div>
  );
};

export default Home;
