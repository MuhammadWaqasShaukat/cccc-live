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
import { FulFilledState } from "../types/Nft";
import { Nav } from "../types/Nav";

type LotteryState = {
  clamable: boolean;
  myClaimedNfts: number;
  ended: boolean;
};

interface CottonCandyContextType {
  price: number;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setPrice: (price: number) => void;
  priceChangeTimeStamp: string;
  mintSectionRef: React.RefObject<HTMLDivElement> | null;
  calculatePrice?: () => Promise<void>;
  lotteryState: LotteryState;

  currentModal: Modals | null;
  setCurrentModal: (modal: Modals | null) => void;

  collectable: any | null;
  setCollectiable: (collectiable: any | null) => void;

  nftState: NftState | undefined | null;
  setNftState: (nftState: NftState | undefined | null) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  nftMint: string | null;
  setNftMint: (nftMint: string | null) => void;

  nextCrackAvailabilty: number;
  setNextCrackAvailability: (nextCrackAvailabilty: number) => void;

  bookmark: BookMark;
  setBookmark: (bookmark: BookMark) => void;

  nftToEggMap: Record<string, string>;
  setNftToEggMap: (a: Record<string, string>) => void;

  getNftToEggMap: (nfts: any[]) => void;

  myNfts: any[];
  setMyNfts: (myNfts: any[]) => void;

  myEggs: any[];
  setMyEggs: (myEggs: any[]) => void;

  getNFTs: () => Promise<any[]>;
  getEggNFTs: () => Promise<any[]>;

  refreshNftState?: string;
  setRefreshNftState: (mintAddress: string) => void;

  crackedEggStatus: FulFilledState | null | undefined;
  setCrackedEggStatus: (state: FulFilledState | null | undefined) => void;

  activeMenu: Nav;
  setActiveMenu: (menu: Nav) => void;

  selectedNftIndex: number;
  setSeletedNftIndex: (selectedNftIndex: number) => void;
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
  const [collectable, setCollectiable] = useState<any | null>(null);
  const [nftState, setNftState] = useState<NftState | undefined | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [nftMint, setNftMint] = useState<string | null>(null);
  const [refreshNftState, setRefreshNftState] = useState<string>("");
  const [nextCrackAvailabilty, setNextCrackAvailability] = useState<number>(
    Date.now()
  );
  const [crackedEggStatus, setCrackedEggStatus] = useState<
    FulFilledState | null | undefined
  >();
  const [myNfts, setMyNfts] = useState<Metadata[]>([]);
  const [myEggs, setMyEggs] = useState<Metadata[]>([]);

  const [selectedNftIndex, setSeletedNftIndex] = useState<number>(0);

  const [nftToEggMap, setNftToEggMap] = useState<Record<string, string>>({});
  const [bookmark, setBookmark] = useState<BookMark>("mint");
  const [activeMenu, setActiveMenu] = useState<Nav>("none");

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

  const getNftToEggMap = async (nfts: any[]) => {
    const _nftToEggMap: Record<string, string> = {};

    for (let i = 0; i < nfts.length; i++) {
      try {
        const { eggMint, eggHatchedAt } = await getNftState(
          nfts[i].mintAddress
        );
        const nftMint = nfts[i].mintAddress;
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
    if (!connected) return;

    const interval = setInterval(() => {
      calculatePrice();
    }, 5000);
    calculatePrice();
    return () => clearInterval(interval);
  }, [connection, connected]);

  React.useEffect(() => {
    (async () => {
      if (!connected) return;
      setMyEggs(await getEggNFTs());
    })();

    (async () => {
      if (!connected) return;
      setMyNfts(await getNFTs());
    })();

    if (!connected) {
      setActiveMenu("none");
      setLotteryState(defaultLotteryState);
    }
  }, [connected]);

  React.useEffect(() => {
    if (myNfts.length > 0) getNftToEggMap(myNfts);
  }, [myNfts, myEggs]);

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

    refreshNftState,
    setRefreshNftState,

    crackedEggStatus,
    setCrackedEggStatus,

    activeMenu,
    setActiveMenu,

    selectedNftIndex,
    setSeletedNftIndex,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
