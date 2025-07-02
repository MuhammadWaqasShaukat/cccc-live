import React, { createContext, useState, ReactNode, useRef } from "react";
import { calculatePayment } from "../utils/calculatePayment";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import IDL from "../constants/solana_lottery.json";
import useWeb3Utils from "../hooks/useWeb3Utils";
import { Buffer } from "buffer";
import { useWallet } from "@solana/wallet-adapter-react";
import { Modals } from "../types/modalProps";
import { Metadata } from "@metaplex-foundation/js";
import { NftState } from "../types/NFTCardTypes";
import { BookMark } from "../types/BookMarks";

type LotteryState = {
  clamable: boolean;
  myClaimedNfts: number;
  ended: boolean;
};

interface CottonCandyContextType {
  price: number;
  count: number;
  setCount: (count: number) => void;
  setPrice: (price: number) => void;
  priceChangeTimeStamp: string;
  mintSectionRef: React.RefObject<HTMLDivElement> | null;
  calculatePrice?: () => Promise<void>;
  lotteryState: LotteryState;

  currentModal: Modals | null;
  setCurrentModal: (modal: Modals | null) => void;

  collectable: Metadata | null;
  setCollectiable: (collectiable: Metadata | null) => void;

  nftState: NftState | undefined | null;
  setNftState: (nftState: NftState | undefined | null) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  nftMint: PublicKey | null;
  setNftMint: (nftMint: PublicKey | null) => void;

  nextCrackAvailabilty: number;
  setNextCrackAvailability: (nextCrackAvailabilty: number) => void;

  shouldRefersh: boolean;
  setShouldRefresh: (shouldRefresh: boolean) => void;

  bookmark: BookMark;
  setBookmark: (bookmark: BookMark) => void;

  nftToEggMap: Record<string, string>;
  setNftToEggMap: (a: Record<string, string>) => void;

  getNftToEggMap: (nfts: Metadata[]) => void;

  myNfts: Metadata[];
  setMyNfts: (myNfts: Metadata[]) => void;

  myEggs: Metadata[];
  setMyEggs: (myEggs: Metadata[]) => void;

  getNFTs: () => Promise<Metadata[]>;
  getEggNFTs: () => Promise<Metadata[]>;
}

const defaultLotteryState: LotteryState = {
  clamable: false,
  myClaimedNfts: 0,
  ended: false,
};

const defaultContextValue: CottonCandyContextType =
  {} as CottonCandyContextType;

export const CottonCandyContext =
  createContext<CottonCandyContextType>(defaultContextValue);

interface CottonCandyContextProviderProps {
  children: ReactNode;
}

export const CottonCandyContextProvider: React.FC<
  CottonCandyContextProviderProps
> = ({ children }) => {
  const [count, setCount] = useState<number>(1);
  const [price, setPrice] = useState<number>(1);
  const [priceChangeTimeStamp] = useState<string>("");
  const mintSectionRef = useRef<HTMLDivElement | null>(null);
  const [currentModal, setCurrentModal] = useState<Modals | null>(null);
  const [collectable, setCollectiable] = useState<Metadata | null>(null);
  const [nftState, setNftState] = useState<NftState | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nftMint, setNftMint] = useState<PublicKey | null>(null);
  const [nextCrackAvailabilty, setNextCrackAvailability] = useState<number>(
    Date.now()
  );

  const [myNfts, setMyNfts] = useState<Metadata[]>([]);
  const [myEggs, setMyEggs] = useState<Metadata[]>([]);

  const [nftToEggMap, setNftToEggMap] = useState<Record<string, string>>({});
  const [bookmark, setBookmark] = useState<BookMark>("mint");

  const [shouldRefersh, setShouldRefresh] = useState(false);

  const [lotteryState, setLotteryState] =
    useState<LotteryState>(defaultLotteryState);

  const {
    getProvider,
    connection,
    getConnectedWallet,
    getLotteryState,
    getNftState,
    getNftByType,
  } = useWeb3Utils();

  const { wallet, connected } = useWallet();

  const getNftToEggMap = async (nfts: Metadata[]) => {
    const _nftToEggMap: Record<string, string> = {};

    for (let i = 0; i < nfts.length; i++) {
      try {
        const { eggMint, eggHatchedAt } = await getNftState(
          nfts[i].mintAddress
        );
        const nftMint = nfts[i].mintAddress.toBase58();

        if (nextCrackAvailabilty && nextCrackAvailabilty > eggHatchedAt) {
          setNextCrackAvailability(eggHatchedAt);
        }

        _nftToEggMap[eggMint?.toBase58()] = nftMint;
      } catch (error: any) {
        console.log("NFT State", error.message);
      }
    }

    if (_nftToEggMap) {
      setNftToEggMap(_nftToEggMap);
    }

    return _nftToEggMap;
  };

  const calculatePrice = async () => {
    // if (!wallet) return;
    const connectedWallet = await getConnectedWallet(wallet!);

    if (!connectedWallet) {
      console.error("Connected Wallet is not supported.");
      return;
    }

    const { maxPlayers, totalMinted, totalValueToCollect, minPrice } =
      await getLotteryState();

    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    let _userMintCount = 0;

    const _price = calculatePayment(
      totalMinted,
      maxPlayers,
      totalValueToCollect,
      minPrice
    );

    setPrice(_price / 1e9);

    const [userStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user-state"), connectedWallet.publicKey.toBuffer()],
      program.programId
    );

    if (userStatePda) {
      try {
        //@ts-ignore
        const userState = await program.account.userState?.fetch(userStatePda);
        if (userState) {
          _userMintCount = userState.userMintCount.toNumber();
        }
      } catch (error) {}
    }
    if (totalMinted >= maxPlayers) {
      const _lotteryState: LotteryState = {} as LotteryState;
      _lotteryState.ended = true;

      if (_userMintCount) {
        _lotteryState.clamable = true;
        _lotteryState.myClaimedNfts = _userMintCount;
      }

      setLotteryState(_lotteryState);
      return;
    }
  };

  async function getNFTs() {
    const { nft: NFT_COLLECTION } = await getLotteryState();
    return await getNftByType("Nft", NFT_COLLECTION);
  }

  async function getEggNFTs() {
    const { egg: EGG_COLLECTION } = await getLotteryState();
    return await getNftByType("Egg", EGG_COLLECTION);
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      calculatePrice();
    }, 5000);
    calculatePrice();

    return () => clearInterval(interval);
  }, [connection]);

  React.useEffect(() => {
    (async () => {
      setMyNfts(await getNFTs());
      setMyEggs(await getEggNFTs());
    })();
  }, [connected]);

  const value: CottonCandyContextType = {
    price,
    count,
    setCount,
    setPrice,
    priceChangeTimeStamp,
    mintSectionRef,
    calculatePrice,
    lotteryState,
    currentModal,
    setCurrentModal,
    collectable,
    setCollectiable,
    nftState,
    setNftState,
    isLoading,
    setIsLoading,
    nftMint,
    setNftMint,
    setNextCrackAvailability,
    nextCrackAvailabilty,
    shouldRefersh,
    setShouldRefresh,
    bookmark,
    setBookmark,
    nftToEggMap,
    setNftToEggMap,
    getNftToEggMap,
    myNfts,
    setMyNfts,
    getNFTs,

    setMyEggs,
    myEggs,
    getEggNFTs,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
