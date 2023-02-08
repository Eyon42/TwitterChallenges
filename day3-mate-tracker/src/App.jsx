import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useState } from "react";
import reactLogo from "./assets/react.svg";

const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-[url('/mate-background.avif')] bg-cover bg-fixed flex flex-col align-center items-center gap-8 py-8 px-4 w-full m-0 h-full min-h-screen">
        <MateApp />
      </div>
    </QueryClientProvider>
  );
}

const MateApp = () => {
  const tokenDataQuery = useQuery({
    queryKey: ["holder"],
    queryFn: async () => {
      const query = `query getCurrentOwner {
          token(id: "9561") {
            id
            owner {
              id
            }
            transfers {
              from {
                id
              }
            }
          }
        }
      `;
      const res = await fetch(
        "https://api.thegraph.com/subgraphs/name/agustindemarco/bnfts-protocol",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query,
          }),
        }
      );
      const { data } = await res.json();

      const history = data.token.transfers.map((t) => t.from.id);
      history.reverse();

      return {
        holder: data.token.owner.id,
        history: history.slice(0, history.length - 1),
      };
    },
  });

  return (
    <>
      <div className="flex gap-8 items-center justify-center flex-col align-middle">
        <img src="/mate.avif" alt="Mate" className="h-64 rounded-full w-64" />
        <CurrentMateHolder holderAddress={tokenDataQuery.data?.holder} />
        <HistoricBoard holderHistory={tokenDataQuery.data?.history} />
      </div>
    </>
  );
};

const CurrentMateHolder = (props) => {
  const holder = {
    address: props.holderAddress || "",
    ens: "",
  };

  return (
    <div className="flex flex-col items-center text-gray-900 bg-gray-200/90 rounded-3xl p-5 gap-4">
      <h1 className="text-4xl font-bold text-center">
        Quién tiene el mate ahora?
      </h1>
      <MateHolder holder={holder} />
    </div>
  );
};

const MateHolder = ({ holder }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {holder.ens && (
        <h1 className="text-4xl font-bold text-center">{holder.ens}</h1>
      )}
      <p className="text-center">
        <a
          href={"https://polygonscan.com/address/" + holder.address}
          className="hover:text-blue-400 hover:underline"
        >
          {holder.address}
        </a>
      </p>
    </div>
  );
};

const HistoricBoard = (props) => {
  const holders = props.holderHistory?.map((address) => ({
    address,
    ens: "",
  }));
  console.log(holders);
  return (
    <div className="w-full flex flex-col items-center text-gray-900 bg-gray-200/90 rounded-3xl p-5 gap-4">
      <h1 className="text-4xl font-bold text-center">Quién ya tomó mate?</h1>
      {holders?.map((holder) => (
        <MateHolder holder={holder} />
      ))}
    </div>
  );
};

export default App;
