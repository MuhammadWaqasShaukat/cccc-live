import React, { createContext, useState, ReactNode, useRef } from "react";
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
import { FulFilledState } from "../types/Nft";
import { Nav } from "../types/Nav";

type LotteryState = {
  clamable: boolean;
  myClaimedNfts: number;
  ended: boolean;
};

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

interface CottonCandyContextType {
  price: number;
  count: number;
  gasFee: number;
  setGasFee: StateSetter<number>;
  setCount: StateSetter<number>;
  setPrice: StateSetter<number>;
  priceChangeTimeStamp: string;
  mintSectionRef: React.RefObject<HTMLDivElement> | null;
  calculatePrice: () => Promise<void>;
  lotteryState: LotteryState;

  currentModal: Modals | null;
  setCurrentModal: StateSetter<Modals | null>;

  estimate: number | null;
  setEstimate: StateSetter<number | null>;

  collectable: any;
  setCollectiable: StateSetter<any>;

  nftState: NftState | undefined | null;
  setNftState: StateSetter<NftState | undefined | null>;

  isPortalOpen: boolean;
  setIsPortalOpen: StateSetter<boolean>;

  nftMint: string | null;
  setNftMint: StateSetter<string | null>;

  nextCrackAvailabilty: number;
  setNextCrackAvailability: StateSetter<number>;

  bookmark: BookMark;
  setBookmark: StateSetter<BookMark>;

  nftToEggMap: Record<string, string>;
  setNftToEggMap: StateSetter<Record<string, string>>;

  getNftToEggMap: (nfts: any[]) => void;

  myNfts: any[];
  setMyNfts: StateSetter<any[]>;

  myEggs: any[];
  setMyEggs: StateSetter<any[]>;

  getNFTs: () => Promise<any[]>;
  getEggNFTs: () => Promise<any[]>;

  refreshNftState?: string;
  setRefreshNftState: StateSetter<string>;

  crackedEggStatus: FulFilledState | null | undefined;
  setCrackedEggStatus: React.Dispatch<
    React.SetStateAction<FulFilledState | null | undefined>
  >;

  activeMenu: Nav;
  setActiveMenu: StateSetter<Nav>;

  selectedNftIndex: number;
  setSeletedNftIndex: StateSetter<number>;

  revealNFT: boolean;
  setRevealNFT: StateSetter<boolean>;

  assestsPreloaded: boolean;
  setAssestsPreloaded: StateSetter<boolean>;

  nftStates: Record<string, NftState>;
  setNftStates: StateSetter<Record<string, NftState>>;
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
  const [price, setPrice] = useState<number>(0);
  const [priceChangeTimeStamp] = useState<string>("");
  const mintSectionRef = useRef<HTMLDivElement | null>(null);
  const [currentModal, setCurrentModal] = useState<Modals | null>(null);
  const [collectable, setCollectiable] = useState<any | null>(null);
  const [nftState, setNftState] = useState<NftState | undefined | null>(null);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [nftMint, setNftMint] = useState<string | null>(null);
  const [refreshNftState, setRefreshNftState] = useState<string>("");
  const [nextCrackAvailabilty, setNextCrackAvailability] = useState<number>(
    Date.now()
  );
  const [crackedEggStatus, setCrackedEggStatus] = useState<
    FulFilledState | null | undefined
  >();
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

  const [lotteryState, setLotteryState] =
    useState<LotteryState>(defaultLotteryState);

  const {
    getProvider,
    connection,
    getConnectedWallet,
    getLotteryState,
    getNftState,
    getNftByType,
    getVaultState,
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
    console.log("Fetching Vault State...");
    (async () => {
      await getVaultState();
    })();
  }, []);

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
    isPortalOpen,
    setIsPortalOpen,
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
  };

  return (
    <CottonCandyContext.Provider value={value}>
      {children}
    </CottonCandyContext.Provider>
  );
};
