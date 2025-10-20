import { MultiSpriteConfig } from "./animations";
import { Modals } from "./modalProps";
import { Nav } from "./Nav";
import { Token } from "./Nft";
import { LotteryPhase } from "./NotifyMe";

export type LotteryState = {
  status: "in-progress" | "ended" | "not-started";
};

export interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface CottonCandyContextType {
  price: number;
  setPrice: StateSetter<number>;

  count: number;
  setCount: StateSetter<number>;

  gasFee: number;
  setGasFee: StateSetter<number>;

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

  viewSupperOffer: boolean;
  setViewSuperOffer: StateSetter<boolean>;

  nftToEggMap: Record<string, string>;
  setNftToEggMap: StateSetter<Record<string, string>>;

  getNftToEggMap: (nfts: any[]) => void;

  activeMenu: Nav;
  setActiveMenu: StateSetter<Nav>;

  selectedNftIndex: number;
  setSeletedNftIndex: StateSetter<number>;

  revealNFT: boolean;
  setRevealNFT: StateSetter<boolean>;

  isEggSummoned: boolean;
  setIsEggSummoned: StateSetter<boolean>;

  currentSummonedEggAnimationConfig: MultiSpriteConfig | null;
  setCurrentSummonedEggAnimationConfig: StateSetter<MultiSpriteConfig | null>;

  revealReward: "bad" | "good" | null;
  setRevealReward: StateSetter<"bad" | "good" | null>;

  isEggCracked: boolean;
  setIsEggCracked: StateSetter<boolean>;

  assestsPreloaded: boolean;
  setAssestsPreloaded: StateSetter<boolean>;

  sprites: Record<string, HTMLImageElement[]>;
  setSprites: StateSetter<Record<string, HTMLImageElement[]>>;

  lottery: Lottery;
  setLottery: StateSetter<Lottery>;

  nfts: Token[] | null;
  eggs: Token[] | null;

  setNfts: StateSetter<Token[] | null>;
  setEggs: StateSetter<Token[] | null>;

  nftImageToReveal: HTMLImageElement | null;
  setNftImageToReveal: StateSetter<HTMLImageElement | null>;

  whitelistCountdown: number;
  setWhitelistCountdown: StateSetter<number>;

  whitelistingCDOver: boolean;
  setWhiteListingCDOver: StateSetter<boolean>;

  isWhitelisted: boolean;
  setIsWhitelisted: StateSetter<boolean>;

  saleCountdown: number;
  setSaleCountdown: StateSetter<number>;

  saleCDOver: boolean;
  setSaleCDOver: StateSetter<boolean>;

  shallBeNotified: boolean;
  setShallBeNotified: StateSetter<boolean>;

  mintBtnTxt: string;
  setMintBtnTxt: stateSetter<string>;

  lotteryPhase: LotteryPhase;
  setLotteryPhase: StateSetter<LotteryPhase>;

  timeRemaining: TimeParts;

  onExpire: (callback: () => void) => void;

  selectedOptions: Record<string, Set<string>>;
  setSelectedOptions: StateSetter<Record<string, Set<string>>>;
}
