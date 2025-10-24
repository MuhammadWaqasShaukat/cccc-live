import React, { createContext, useState, ReactNode, useEffect } from "react";
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

const apiUrl = import.meta.env.VITE_API_URL;
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

const fetchData = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
  return res.json();
};

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

  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, Set<string>>
  >({});

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
    useState<LotteryPhase>("pre-whitelisting");

  const [isWhitelisted, setIsWhitelisted] = useState<boolean>(false);

  const [shallBeNotified, setShallBeNotified] = useState<boolean>(false);

  const [whitelistingCDOver, setWhiteListingCDOver] = useState<boolean>(false);

  const [saleCDOver, setSaleCDOver] = useState<boolean>(false);

  const [whitelistCountdown, setWhitelistCountdown] = useState<number>(0);

  const [saleCountdown, setSaleCountdown] = useState<number>(0);

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

  const fetchLotteryInfo = async () => {
    const url = `${apiUrl}/lottery/lottery-info`;
    const status = await fetchData(url);
    if (status) {
      setWhitelistCountdown(1761280679000);
      // setWhitelistCountdown(status.whitelistDeadline);

      setSaleCountdown(status.saleStartDate);
    }
  };

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);

    fetchLotteryInfo();

    return () => clearInterval(id);
  }, []);

  const { connected, publicKey } = useWallet();

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

    if (connected && publicKey) {
      checkWhiteLisingStatus();
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

  const checkWhiteLisingStatus = async () => {
    const url = `${apiUrl}/whitelist/whitelist-status/${publicKey}`;
    const status = await fetchData(url);
    if (status) {
      setIsWhitelisted(status.isWhitelisted);
    }
  };

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

  // const timersRef = useRef<boolean>();

  // useEffect(() => {
  //   if (!timersRef.current) {
  //     setSaleCountdown(Date.now() + 30000);
  //     setWhitelistCountdown(Date.now());
  //     timersRef.current = true;
  //   }
  // }, []);

  //

  const [expireCallback, setExpireCallback] = useState<(() => void) | null>(
    null
  );

  console.log("Sales", saleCountdown, whitelistCountdown, lotteryPhase);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();

      if (lotteryPhase === "pre-whitelisting") {
        if (now >= Number(whitelistCountdown)) {
          setLotteryPhase("whitelisting");
          setShallBeNotified(false);
          expireCallback?.();
        } else {
          setTimeRemaining(calculateRemaining(whitelistCountdown));
        }
      } else if (lotteryPhase === "whitelisting") {
        if (now >= Number(saleCountdown)) {
          setLotteryPhase("minting-start");
        } else if (isWhitelisted) {
          setTimeRemaining(calculateRemaining(saleCountdown));
        }
      } else if (lotteryPhase === "minting-start") {
        if (now >= Number(saleCountdown)) {
          expireCallback?.(); // notify sale end
          clearInterval(interval);
        } else {
          setTimeRemaining(calculateRemaining(saleCountdown));
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [
    lotteryPhase,
    whitelistCountdown,
    saleCountdown,
    expireCallback,
    isWhitelisted,
  ]);

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

    if (lotteryPhase === "pre-whitelisting") {
      text = shallBeNotified ? "you'll be notified" : "Notify Me";
    } else if (lotteryPhase === "whitelisting") {
      if (!connected) text = "connect";
      if (!isWhitelisted && connected) text = "Whitelist Me";
      else if (isWhitelisted && !shallBeNotified && connected)
        text = "Notify Me";
      else if (isWhitelisted && shallBeNotified && connected)
        text = "you'll be notified";
    } else if (lotteryPhase === "minting-start") {
      if (isSaleOver && isWhitelisted) text = "Mint Now";
      else if (isSaleOver && !isWhitelisted) text = "Not Whitelisted";
    } else {
      text = "";
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

    selectedOptions,
    setSelectedOptions,

    calculateRemaining,

    setTimeRemaining,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
