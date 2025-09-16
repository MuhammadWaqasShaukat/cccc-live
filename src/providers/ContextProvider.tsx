import React, { createContext, useState, ReactNode } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Modals } from "../types/modalProps";
import { BookMark } from "../types/BookMarks";
import { Nav } from "../types/Nav";
import {
  CottonCandyContextType,
  LotteryState,
} from "../types/CottonCandyContext";
import { useGetLotteryState } from "../hooks/useGetLotteryState";
import { Token } from "../types/Nft";
import { Lottery } from "../types/Lottery";
import { useGetAllEggs } from "../hooks/useGetAllEggs";
import { useGetAllNfts } from "../hooks/useGetAllNFTs";
import { NftState } from "../types/NFTCardTypes";

const defaultLotteryState: LotteryState = {
  status: "not-started",
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
  const [price, setPrice] = useState<number>(0);
  const [currentModal, setCurrentModal] = useState<Modals | null>(null);
  const [collectable, setCollectiable] = useState<Token | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);

  const [revealNFT, setRevealNFT] = useState<boolean>(false);

  const [selectedNftIndex, setSeletedNftIndex] = useState<number>(0);

  const [nftToEggMap, setNftToEggMap] = useState<Record<string, string>>({});
  const [bookmark, setBookmark] = useState<BookMark>("mint");
  const [activeMenu, setActiveMenu] = useState<Nav>("none");
  const [gasFee, setGasFee] = useState<number>(0);

  const [estimate, setEstimate] = useState<number | null>(null);

  const [assestsPreloaded, setAssestsPreloaded] = useState(false);
  const [revealReward, setRevealReward] = useState<"bad" | "good" | null>(null);
  const [isEggCracked, setIsEggCracked] = useState(false);

  const [refreshEggs, setRefreshEggs] = useState<boolean>(false);
  const [refreshNFTS, setRefreshNFTS] = useState<boolean>(false);

  const [lottery, setLottery] = useState<Lottery | null>(null);

  const [nfts, setNfts] = useState<Token[] | null>([]);
  const [eggs, setEggs] = useState<Token[] | null>([]);

  const { data: currentLottery } = useGetLotteryState();
  const { refetch: fetchNfts } = useGetAllNfts();
  const { refetch: fetchEggs } = useGetAllEggs();

  const [sprites, setSprites] = useState<Record<string, HTMLImageElement[]>>(
    {}
  );

  const [lotteryState, setLotteryState] =
    useState<LotteryState>(defaultLotteryState);

  const { connected } = useWallet();

  const getNftToEggMap = (nfts: Token[]) => {
    const map: Record<string, string> = {};
    for (const nft of nfts) {
      try {
        const eggMint = (nft.state as NftState).eggMint;
        const nftMint = nft.metadata.mintAddress;
        map[eggMint as any] = nftMint as any;
      } catch (error: any) {
        console.error("NFT State error:", error.message);
      }
    }
    setNftToEggMap(map);
    return map;
  };

  React.useEffect(() => {
    if (!connected) {
      setActiveMenu("none");
      setLotteryState(defaultLotteryState);
    }
  }, [connected]);

  React.useEffect(() => {
    if (!connected || !lottery) return;

    if (eggs?.length === 0 || refreshEggs) {
      (async () => {
        const { data: eggs } = await fetchEggs();
        if (eggs && eggs.length > 0) {
          setEggs(eggs);
        }

        if (refreshEggs) {
          setRefreshEggs(false);
        }
      })();
    }
  }, [connected, lottery, eggs, refreshEggs]);

  React.useEffect(() => {
    if (!connected || !lottery) return;

    if (nfts?.length === 0) {
      (async () => {
        const { data: nfts } = await fetchNfts();
        if (nfts && nfts.length > 0) {
          setNfts(nfts);
          getNftToEggMap(nfts);
        }
      })();
    }
  }, [connected, lottery, nfts]);

  React.useEffect(() => {
    if (!currentLottery) return;

    setLottery(currentLottery);

    const { maxPlayers, totalMinted, startTime } = currentLottery;

    const remaining = maxPlayers - totalMinted;
    if (remaining <= 0) {
      setLotteryState({ status: "ended" });
    } else {
      const ts = startTime;
      const now = Date.now();
      if (ts <= now) {
        setLotteryState({ status: "in-progress" });
      } else if (ts > now) {
        setLotteryState({ status: "not-started" });
      }
    }
  }, [currentLottery]);

  const value: CottonCandyContextType = {
    price,
    count,
    setCount,
    setPrice,
    lotteryState,
    setLotteryState,
    currentModal,
    setCurrentModal,
    collectable,
    setCollectiable,
    isPortalOpen,
    setIsPortalOpen,
    bookmark,
    setBookmark,
    nftToEggMap,
    setNftToEggMap,
    getNftToEggMap,
    activeMenu,
    setActiveMenu,
    selectedNftIndex,
    setSeletedNftIndex,

    gasFee,
    setGasFee,

    revealNFT,
    setRevealNFT,

    estimate,
    setEstimate,

    assestsPreloaded,
    setAssestsPreloaded,

    revealReward,
    setRevealReward,

    setIsEggCracked,
    isEggCracked,

    sprites,
    setSprites,

    refreshEggs,
    setRefreshEggs,

    refreshNFTS,
    setRefreshNFTS,

    lottery,
    setLottery,

    nfts,
    setNfts,

    eggs,
    setEggs,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
