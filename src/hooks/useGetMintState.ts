import { useQuery } from "react-query";
import { MintStatus } from "../types/Lottery";
import { CottonCandyContext } from "../providers/ContextProvider";
import { useContext } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

const defaultMintStatus: MintStatus = {
  total: 0,
  remaining: 0,
  price: 0,
};

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
};

const getMintStatus = async (): Promise<MintStatus> => {
  const url = `${apiUrl}/mint-status`;
  return fetchData(url);
};

export const useGetMintState = () => {
  const ctx = useContext(CottonCandyContext);

  const shouldPoll = ctx.activeMenu === "mint" && ctx.bookmark === "mint";

  return useQuery<MintStatus, Error>(["mint-status"], getMintStatus, {
    enabled: shouldPoll,
    refetchInterval: 5000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialData: defaultMintStatus,
    placeholderData: defaultMintStatus,
  });
};
