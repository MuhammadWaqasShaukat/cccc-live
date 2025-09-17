import { useMemo } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useQuery, useQueryClient } from "react-query";
import { Token } from "../types/Nft";

import { useGetLotteryState } from "./useGetLotteryState";

const apiUrl = import.meta.env.VITE_API_URL;

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
};

export const useGetAllNfts = () => {
  const { connected, publicKey } = useWallet();

  const { data: lottery } = useGetLotteryState();
  const queryClient = useQueryClient();

  const collection = useMemo(() => {
    return lottery?.nft;
  }, [lottery?.nft]);

  const getNftByType = async (
    collection: string,
    owner: string
  ): Promise<Token[]> => {
    const url = `${apiUrl}/nfts/${owner}/${collection}`;
    const nfts: Token[] = await fetchData(url);
    return nfts ?? [];
  };
  const queryKey = ["nfts"];

  const query = useQuery<Token[], Error>(
    queryKey,
    () =>
      connected && publicKey && collection
        ? getNftByType(collection, publicKey.toBase58())
        : Promise.resolve([]),
    {
      enabled: false, //connected && !!publicKey && !!collection,
      // refetchInterval: 10_000,
      // staleTime: 60 * 1000,
    }
  );

  return {
    ...query,
    data: query.data ?? [],
    invalidate: () => {
      queryClient.removeQueries(queryKey);
      queryClient.invalidateQueries(queryKey);
    },

    refetch: () => {
      // queryClient.removeQueries(queryKey);
      return query.refetch();
    },

    updateNftInCache: (updated: Token) => {
      queryClient.setQueryData<Token[]>(queryKey, (old) => {
        if (!old) return [updated];

        const exists = old.some(
          (token) =>
            token?.metadata?.mintAddress === updated.metadata.mintAddress
        );

        if (!exists) {
          return [...old, updated];
        }

        return old.map((token) =>
          token?.metadata?.mintAddress === updated.metadata.mintAddress
            ? { ...token, ...updated }
            : token
        );
      });
    },
  };
};
