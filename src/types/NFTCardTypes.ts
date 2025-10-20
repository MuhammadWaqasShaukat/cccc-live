import { PublicKey } from "@solana/web3.js";
import { NftMetadata } from "./Nft";
import { HTMLAttributes } from "react";

export type NftState = {
  isEggClaimed: boolean;
  eggMint: PublicKey;
  eggHatchedAt: number;
};

export type NFTCardTypes = NftMetadata & HTMLAttributes<HTMLDivElement>;
