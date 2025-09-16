import { Token } from "./Nft";

export type LotteryState = {
  status: "in-progress" | "ended" | "not-started";
};

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface CottonCandyContextType {
  price: number;
  count: number;
  gasFee: number;
  setGasFee: StateSetter<number>;
  setCount: StateSetter<number>;
  setPrice: StateSetter<number>;
  lotteryState: LotteryState;
  setLotteryState: StateSetter<LotteryState>;

  currentModal: Modals | null;
  setCurrentModal: StateSetter<Modals | null>;

  estimate: number | null;
  setEstimate: StateSetter<number | null>;

  collectable: Token | null;
  setCollectiable: StateSetter<Token | null>;

  isPortalOpen: boolean;
  setIsPortalOpen: StateSetter<boolean>;

  bookmark: BookMark;
  setBookmark: StateSetter<BookMark>;

  nftToEggMap: Record<string, string>;
  setNftToEggMap: StateSetter<Record<string, string>>;

  getNftToEggMap: (nfts: any[]) => void;

  activeMenu: Nav;
  setActiveMenu: StateSetter<Nav>;

  selectedNftIndex: number;
  setSeletedNftIndex: StateSetter<number>;

  revealNFT: boolean;
  setRevealNFT: StateSetter<boolean>;

  revealReward: "bad" | "good" | null;
  setRevealReward: StateSetter<"bad" | "good" | null>;

  isEggCracked: boolean;
  setIsEggCracked: StateSetter<boolean>;

  assestsPreloaded: boolean;
  setAssestsPreloaded: StateSetter<boolean>;

  sprites: Record<string, HTMLImageElement[]>;
  setSprites: StateSetter<Record<string, HTMLImageElement[]>>;

  refreshEggs: boolean;
  setRefreshEggs: StateSetter<boolean>;

  refreshNFTS: boolean;
  setRefreshNFTS: StateSetter<boolean>;

  lottery: Lottery;
  setLottery: StateSetter<Lottery>;

  nfts: Token[] | null;
  eggs: Token[] | null;

  setNfts: StateSetter<Token[] | null>;
  setEggs: StateSetter<Token[] | null>;
}
