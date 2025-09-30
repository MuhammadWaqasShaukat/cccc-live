import { PublicKey } from "@solana/web3.js";

export type NftState = {
  isEggClaimed: boolean;
  eggMint: PublicKey;
  eggHatchedAt: number;
};
