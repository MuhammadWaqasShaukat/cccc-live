import { useWallet } from "@solana/wallet-adapter-react";
import { FulFilledState, Token } from "../types/Nft";
import { NftState } from "../types/NFTCardTypes";
import { useContext } from "react";
import { CottonCandyContext } from "../providers/ContextProvider";

const apiUrl = import.meta.env.VITE_API_URL;

const useGetUpdatedTokenByMintAddress = () => {
  const { publicKey } = useWallet();
  const { lottery } = useContext(CottonCandyContext);

  const fetchData = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
    return res.json();
  };

  const getUpdatedNft = async (nft: Token): Promise<Token | null> => {
    if (!nft) return null;

    const url = `${apiUrl}/nfts/state/${nft.metadata.mintAddress}`;
    const updatedState: NftState = await fetchData(url);
    const updatedNft: Token = {
      metadata: nft.metadata,
      state: updatedState as NftState,
    };
    return updatedNft;
  };
  const getUpdatedEgg = async (egg: Token): Promise<Token | null> => {
    if (!publicKey || !egg) return null;

    const url = `${apiUrl}/eggs/state/${publicKey}/${egg.metadata.mintAddress}`;
    const updatedState: FulFilledState = await fetchData(url);

    const updatedEgg: Token = {
      metadata: egg.metadata,
      state: updatedState as FulFilledState,
    };
    return updatedEgg;
  };

  const getEggByMintAddress = async (
    mintAddress: string
  ): Promise<Token | null> => {
    if (!publicKey || !mintAddress) return null;

    const url = `${apiUrl}/eggs/${publicKey}/${lottery.egg}/${mintAddress}`;
    const egg: Token = await fetchData(url);
    return egg;
  };

  return {
    getUpdatedNft,
    getUpdatedEgg,
    getEggByMintAddress,
  };
};

export default useGetUpdatedTokenByMintAddress;
