import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useMemo } from "react";
import { Buffer } from "buffer";

import IDL from "../constants/solana_lottery.json";
import { FulFilledState } from "../types/Nft";
import { Lottery } from "../types/Lottery";
import { Metadata } from "../types/Metadata";

const useWeb3Utils = () => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const { publicKey, connected, wallet } = useWallet();

  const connection = useMemo(() => {
    return new Connection(endpoint, "confirmed");
  }, [endpoint]);

  const getConnectedWallet = async (wallet: Wallet) => {
    if (wallet.adapter.name == "Solflare") {
      if (!window.solflare) {
        throw new Error(
          "Wallet not found. Please install the appropriate Solana wallet."
        );
      }
      const solflare = window.solflare;
      if (!solflare) {
        throw new Error(
          "Wallet not found. Please install the approprite solana wallet."
        );
      }
      await solflare.connect();
      return solflare;
    }
    if (wallet.adapter.name == "Phantom") {
      const phantom = window.phantom.solana;
      if (!phantom) {
        throw new Error(
          "Wallet not found. Please install the approprite solana wallet."
        );
      }
      await phantom.connect();
      return phantom;
    }
  };

  const getProvider = async (connection: Connection) => {
    const connectedWallet = await getConnectedWallet(wallet!);

    const provider = new AnchorProvider(connection, connectedWallet, {});
    return provider;
  };

  const getNftByType = async (
    type: "Nft" | "Egg",
    collection: string
  ): Promise<Metadata[]> => {
    if (!connected || !publicKey) return [];
    let nfts: any[] = [];
    const apiUrl = import.meta.env.VITE_API_URL;

    const url = `${apiUrl}?owner=${publicKey}&type=${type}&collection=${collection}`;
    nfts = await fetchNFTs(url);

    let sorted = nfts.sort((a, b) => a.address.localeCompare(b.address));
    return sorted;
  };

  const fetchNFTs = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      const nfts = data;
      return nfts;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return [];
    }
  };

  const getNftState = async (mintAddress: string) => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const [nftStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("nft-state"), new PublicKey(mintAddress).toBuffer()],
      program.programId
    );
    //@ts-ignore
    const nftState = await program.account.nftState.fetch(nftStatePda);

    return {
      isEggClaimed: nftState.isEggClaimed,
      eggMint: nftState.eggMint,
      eggHatchedAt: nftState.eggHatchedAt.toNumber(),
    };
  };

  const getLotteryState = async (): Promise<Lottery> => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const [lottery] = PublicKey.findProgramAddressSync(
      [Buffer.from("lottery")],
      program.programId
    );

    //@ts-ignore
    const state = await program.account.state.fetch(lottery);

    return {
      maxPlayers: state.maxPlayers.toNumber(),
      totalMinted: state.totalMinted.toNumber(),
      totalValueToCollect: state.totalValueToCollect.toNumber(),
      minPrice: state.minPrice.toNumber(),
      eggAfterHatchCooldown: state.eggAfterHatchCooldown.toNumber(),
      egg: state.egg.toBase58(),
      nft: state.nft.toBase58(),
    };
  };

  const getVaultState = async () => {
    getVaultState;
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const [vault] = PublicKey.findProgramAddressSync(
      [Buffer.from("vault")],
      program.programId
    );

    const balanceLamports = await connection.getBalance(vault);
    const balanceSol = balanceLamports / 1e9;

    return balanceSol;
  };

  const getEggFulFilledState = async (
    eggMintAddress: string
  ): Promise<FulFilledState> => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    if (!publicKey) return {} as FulFilledState;

    const [eggStatePda] = PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), new PublicKey(eggMintAddress).toBuffer()],
      program.programId
    );

    //@ts-ignore
    const eggState = await program.account.fulFilledState.fetch(eggStatePda);

    const status = Object.keys(eggState.status)[0],
      lotteryStatus = Object.keys(eggState.lotteryStatus)[0];

    return {
      status,
      lotteryStatus,
    } as FulFilledState;
  };

  return {
    getProvider,
    connection,
    getConnectedWallet,
    network,
    endpoint,
    getNftByType,
    getNftState,
    getLotteryState,
    getEggFulFilledState,
    getVaultState,
  };
};

export default useWeb3Utils;
