import { useQuery } from "react-query";
import { Lottery } from "../types/Lottery";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
};

const fetchLotteryState = async (): Promise<Lottery> => {
  const url = `${apiUrl}/lottery-status`;
  const status = await fetchData(url);
  return status;
};

export const useGetLotteryState = () => {
  return useQuery<Lottery, Error>(
    ["lottery-status"],
    () => fetchLotteryState(),
    {
      refetchInterval: 10_000,
      staleTime: 30_000,
    }
  );
};
