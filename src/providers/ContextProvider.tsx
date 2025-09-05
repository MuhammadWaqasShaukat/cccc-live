import React, { createContext, useState, ReactNode } from "react";
import { calculatePayment } from "../utils/calculatePayment";
import { Program } from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import IDL from "../constants/solana_lottery.json";
import useWeb3Utils from "../hooks/useWeb3Utils";
import { Buffer } from "buffer";
import { useWallet } from "@solana/wallet-adapter-react";
import { Modals } from "../types/modalProps";
import { NftState } from "../types/NFTCardTypes";
import { BookMark } from "../types/BookMarks";
import { Nav } from "../types/Nav";
import {
  CottonCandyContextType,
  LotteryState,
} from "../types/CottonCandyContext";

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
  const [collectable, setCollectiable] = useState<any | null>(null);
  const [nftState, setNftState] = useState<NftState | undefined | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [nftMint, setNftMint] = useState<string | null>(null);
  const [refreshNftState, setRefreshNftState] = useState<string>("");

  const [myNfts, setMyNfts] = useState<any[]>([]);
  const [nftStates, setNftStates] = useState<Record<string, NftState>>({});
  const [myEggs, setMyEggs] = useState<any[]>([]);
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

  const [sprites, setSprites] = useState<Record<string, HTMLImageElement[]>>(
    {}
  );

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
        const { eggMint } = await getNftState(nfts[i].mintAddress);
        const nftMint = nfts[i].mintAddress;
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
    const connectedWallet = await getConnectedWallet(wallet!);

    if (!connectedWallet) {
      console.error("Connected Wallet is not supported.");
      return;
    }

    const { maxPlayers, totalMinted, totalValueToCollect, minPrice } =
      await getLotteryState();

    const provider = await getProvider(connection);
    const program = new Program(IDL as any, provider);

    const remaining = maxPlayers - totalMinted;

    if (remaining > 0) {
      const _price = calculatePayment(
        totalMinted + 1,
        count,
        maxPlayers,
        totalValueToCollect,
        minPrice
      );
      setPrice(_price);
    }

    const [userStatePda] = PublicKey.findProgramAddressSync(
      [Buffer.from("user-state"), connectedWallet.publicKey.toBuffer()],
      program.programId
    );

    if (userStatePda) {
      try {
        //@ts-ignore
        const userState = await program.account.userState?.fetch(userStatePda);
        // if (userState) {
        //   _userMintCount = userState.userMintCount.toNumber();
        // }
      } catch (error) {}
    }

    if (totalMinted >= maxPlayers) {
      const _lotteryState: LotteryState = {} as LotteryState;
      _lotteryState.status = "ended";

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

  // React.useEffect(() => {
  //   if (!connected) return;
  //   const interval = setInterval(() => {
  //     calculatePrice();
  //   }, 5000);
  //   calculatePrice();
  //   return () => clearInterval(interval);
  // }, [connection, connected]);

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

  React.useEffect(() => {
    (async () => {
      const { maxPlayers, totalMinted, startTime } = await getLotteryState();

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
    })();
  }, []);

  const value: CottonCandyContextType = {
    price,
    count,
    setCount,
    setPrice,
    calculatePrice,
    lotteryState,
    setLotteryState,
    currentModal,
    setCurrentModal,
    collectable,
    setCollectiable,
    nftState,
    setNftState,
    isPortalOpen,
    setIsPortalOpen,
    nftMint,
    setNftMint,
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

    nftStates,
    setNftStates,

    revealReward,
    setRevealReward,

    setIsEggCracked,
    isEggCracked,

    sprites,
    setSprites,
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
