import { AnchorProvider, Program } from "@coral-xyz/anchor";
import { Metadata, Metaplex } from "@metaplex-foundation/js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import { useMemo } from "react";

import IDL from "../constants/solana_lottery.json";
import { FulFilledState } from "../types/Nft";

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
    const walletAddress = new PublicKey(publicKey);
    const metaplex = new Metaplex(connection);

    nfts = await metaplex.nfts().findAllByOwner({ owner: walletAddress });

    const filtered = nfts.filter(
      (nft) =>
        nft.name === type && nft.collection?.address.toBase58?.() === collection
    );

    return filtered;
  };

  const getNftState = async (mintAddress: PublicKey) => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const [nftStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("nft-state"), mintAddress.toBuffer()],
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

  const getLotteryState = async () => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const [lottery] = PublicKey.findProgramAddressSync(
      [Buffer.from("lottery")],
      program.programId
    );

    // const [vault] = PublicKey.findProgramAddressSync(
    //   [Buffer.from("vault")],
    //   program.programId
    // );

    // console.log("vultadd", vault.toBase58());
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

  const getEggFulFilledState = async (
    eggMintAddress: PublicKey
  ): Promise<FulFilledState> => {
    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    if (!publicKey) return {} as FulFilledState;

    const [eggStatePda] = PublicKey.findProgramAddressSync(
      [publicKey.toBuffer(), eggMintAddress.toBuffer()],
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
  };
};

export default useWeb3Utils;
