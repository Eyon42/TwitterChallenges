import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const [prompt, setPrompt] = useState("");
  const [place, setPlace] = useState("");
  const [days, setDays] = useState(2);

  const fullPrompt = `Una persona tiene planeado hacer un viaje a ${place} por ${days} días.
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="h-full min-h-screen bg-gradient-to-b from-blue-300 to-green-300">
          <div className="mx-auto flex max-w-screen-sm flex-col items-center gap-8 px-4">
            <h1 className="py-5 text-2xl font-bold text-gray-900">
              ¿GPT, Que hago en mis vacaciones?
            </h1>
            <div className="flex flex-row items-center gap-2">
              <span>Voy a ir a </span>
              <input
                className="w-32 border-b-2 border-black bg-transparent text-center outline-none"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              ></input>
              <span>Me quedo</span>
              <input
                type="number"
                min={1}
                max={10}
                className=" appearance-textfield w-10 border-b-2 border-black bg-transparent text-center outline-none"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
              ></input>
              <span>días</span>
            </div>

            <div className="flex w-full flex-col text-center">
              <span>Me gustaría:</span>

              <textarea
                className="shadow-slg w-full rounded-lg border border-gray-500 bg-black/20 p-2 text-center text-black focus:border-transparent focus:outline-none focus:ring-2 focus:ring-green-400/20"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
              ></textarea>
            </div>

            <button
              className="rounded-xl border-none bg-black p-2 text-white shadow-lg "
              onClick={() => {
                aiQuery.refetch().catch((e) => console.log(e));
              }}
            >
              {aiQuery.isFetching ? <Spinner /> : "Obtener recomendaciones"}
            </button>
            <p className="whitespace-pre-wrap text-black">
              {aiQuery.data?.response}
            </p>
          </div>
        </div>
      </main>
    </>
  );
};

const Spinner = () => {
  return (
    <div className="flex items-center gap-2 text-gray-200">
      <span className="block  h-6 w-6 animate-spin rounded-full border-4 border-green-400/30 border-t-green-400"></span>
    </div>
  );
};

export default Home;
