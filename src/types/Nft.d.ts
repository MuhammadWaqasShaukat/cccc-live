import { Metadata } from "./Metadata";
import { NftState } from "./NFTCardTypes";

export type FulFilledState = {
  status: "done" | "none" | "pending";
  lotteryStatus: "none" | "won" | "lost";
};

export type Token = {
  metadata: Metadata;
  state: NftState | FulFilledState;
};

export interface NftAttribute {
  trait_type: string;
  value: string | number;
}

export interface NftMetadata {
  name: string;
  description: string;
  image: string;
  external_url?: string;
  attributes: NftAttribute[];
  seller_fee_basis_points?: number;
}
