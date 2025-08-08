export type LotteryState = {
  clamable: boolean;
  myClaimedNfts: number;
  ended: boolean;
};

type StateSetter<T> = React.Dispatch<React.SetStateAction<T>>;

export interface CottonCandyContextType {
  price: number;
  count: number;
  gasFee: number;
  setGasFee: StateSetter<number>;
  setCount: StateSetter<number>;
  setPrice: StateSetter<number>;
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
