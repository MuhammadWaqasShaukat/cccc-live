export type Lottery = {
  maxPlayers: number;
  totalMinted: number;
  totalValueToCollect: number;
  minPrice: number;
  eggAfterHatchCooldown: number;
  egg: string;
  nft: string;
  startTime: number;
};

export type MintStatus = {
  price: number;
  remaining: number;
  total: number;
};
