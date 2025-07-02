import { PublicKey } from "@solana/web3.js";

export type NFTCardProps = {
  color?: string;
  cardImage: string;
  description: string;
  title: string;
  thumbnail: string;
};

export type NftState = {
  isEggClaimed: boolean;
  eggMint: PublicKey;
  eggHatchedAt: string;
};

type FulfillmentStatus = "None" | "Pending" | "Done";
type LotteryStatus = "None" | "Won" | "Lost";

export type NftFullFillmentState = {
  status: FulfillmentStatus;
  lottery_status: LotteryStatus;
};
