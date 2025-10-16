import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useRef,
} from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Modals } from "../types/modalProps";
import { BookMark } from "../types/BookMarks";
import { Nav } from "../types/Nav";
import {
  CottonCandyContextType,
  LotteryState,
  TimeParts,
} from "../types/CottonCandyContext";
import { useGetLotteryState } from "../hooks/useGetLotteryState";
import { Token } from "../types/Nft";
import { Lottery } from "../types/Lottery";
import { useGetAllEggs } from "../hooks/useGetAllEggs";
import { useGetAllNfts } from "../hooks/useGetAllNFTs";
import { NftState } from "../types/NFTCardTypes";
import { MultiSpriteConfig } from "../types/animations";
import { LotteryPhase } from "../types/NotifyMe";

// Date.now() + minutes * 60 * 1000;

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
  const [mintBtnTxt, setMintBtnTxt] = useState<string>("mint now");

  const [nftImageToReveal, setNftImageToReveal] =
    useState<HTMLImageElement | null>(null);

  const [revealNFT, setRevealNFT] = useState<boolean>(false);

  const [selectedNftIndex, setSeletedNftIndex] = useState<number>(0);

  const [nftToEggMap, setNftToEggMap] = useState<Record<string, string>>({});
  const [bookmark, setBookmark] = useState<BookMark>("mint");
  const [activeMenu, setActiveMenu] = useState<Nav>("none");
  const [gasFee, setGasFee] = useState<number>(0);

  const [estimate, setEstimate] = useState<number | null>(null);

  const [
    currentSummonedEggAnimationConfig,
    setCurrentSummonedEggAnimationConfig,
  ] = useState<MultiSpriteConfig | null>(null);

  const [assestsPreloaded, setAssestsPreloaded] = useState(false);
  const [revealReward, setRevealReward] = useState<"bad" | "good" | null>(null);
  const [isEggCracked, setIsEggCracked] = useState(false);

  const [isEggSummoned, setIsEggSummoned] = useState(false);

  const [lottery, setLottery] = useState<Lottery | null>(null);

  const [nfts, setNfts] = useState<Token[] | null>([]);
  const [eggs, setEggs] = useState<Token[] | null>([]);

  const [viewSupperOffer, setViewSuperOffer] = useState(false);

  const { data: currentLottery } = useGetLotteryState();
  const { refetch: fetchNfts } = useGetAllNfts();
  const { refetch: fetchEggs } = useGetAllEggs();

  const [lotteryPhase, setLotteryPhase] =
    useState<LotteryPhase>("white-listing");

  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);

  const [shallBeNotified, setShallBeNotified] = useState<boolean>(false);

  const [whitelistingCDOver, setWhiteListingCDOver] = useState<boolean>(false);

  const [saleCDOver, setSaleCDOver] = useState<boolean>(false);

  const [whitelistCountdown, setWhitelistCountdown] =
    useState<number>(1760424979148);

  const [saleCountdown, setSaleCountdown] = useState<number>(1760082461791);

  const [timeRemaining, setTimeRemaining] = useState<TimeParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [sprites, setSprites] = useState<Record<string, HTMLImageElement[]>>(
    {}
  );

  const [lotteryState, setLotteryState] =
    useState<LotteryState>(defaultLotteryState);

  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

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

    if (eggs?.length === 0) {
      (async () => {
        const { data: eggs } = await fetchEggs();
        if (eggs && eggs.length > 0) {
          setEggs(eggs);
        }
      })();
    }
  }, [connected, lottery, eggs]);

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

  // temporray

  const timersRef = useRef<boolean>();

  useEffect(() => {
    if (!timersRef.current) {
      setSaleCountdown(Date.now() + 60000);
      setWhitelistCountdown(Date.now() + +30000);
      timersRef.current = true;
    }
    
  }, []);

  //

  const [expireCallback, setExpireCallback] = useState<(() => void) | null>(
    null
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      if (lotteryPhase === "white-listing") {
        if (now >= whitelistCountdown) {
          setLotteryPhase("minting-start");
          setShallBeNotified(false);
          expireCallback?.(); // notify whitelist end
        } else {
          setTimeRemaining(calculateRemaining(whitelistCountdown));
        }
      } else if (lotteryPhase === "minting-start") {
        if (now >= saleCountdown) {
          expireCallback?.(); // notify sale end
          clearInterval(interval);
        } else {
          setTimeRemaining(calculateRemaining(saleCountdown));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lotteryPhase, whitelistCountdown, saleCountdown, expireCallback]);

  // ---- Remaining Time ----
  const calculateRemaining = (target: number): TimeParts => {
    const now = Date.now();
    const diff = Math.max(target - now, 0);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  };
  // ---- Register expiry callback ----
  const onExpire = (callback: () => void) => {
    setExpireCallback(() => callback);
  };

  useEffect(() => {
    const nowVal = now;
    const isSaleOver = nowVal >= saleCountdown;

    let text = "";

    if (lotteryPhase === "white-listing") {
      text = shallBeNotified ? "You are on the list" : "Notify Me";
    } else if (lotteryPhase === "minting-start") {
      if (!isWhitelisted && !isSaleOver) text = "Sign Me Up";
      else if (isWhitelisted && !shallBeNotified && !isSaleOver)
        text = "Notify Me";
      else if (isWhitelisted && shallBeNotified && !isSaleOver)
        text = "You are on the list";
      else if (isSaleOver && isWhitelisted) text = "Mint Now";
      else if (isSaleOver && !isWhitelisted) text = "Not Whitelisted";
    } else {
      text = "Coming Soon";
    }

    setMintBtnTxt(text);
  }, [
    lotteryPhase,
    isWhitelisted,
    shallBeNotified,
    saleCountdown,
    timeRemaining,
    now,
  ]);

  const value: CottonCandyContextType = {
    price,
    setPrice,

    count,
    setCount,

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

    lottery,
    setLottery,

    nfts,
    setNfts,

    eggs,
    setEggs,

    viewSupperOffer,
    setViewSuperOffer,

    isEggSummoned,
    setIsEggSummoned,

    currentSummonedEggAnimationConfig,
    setCurrentSummonedEggAnimationConfig,

    nftImageToReveal,
    setNftImageToReveal,

    whitelistCountdown,
    setWhitelistCountdown,

    isWhitelisted,
    setIsWhitelisted,

    saleCountdown,
    setSaleCountdown,

    shallBeNotified,
    setShallBeNotified,

    whitelistingCDOver,
    setWhiteListingCDOver,

    saleCDOver,
    setSaleCDOver,

    mintBtnTxt,
    setMintBtnTxt,

    lotteryPhase,
    setLotteryPhase,

    timeRemaining,
    onExpire,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
