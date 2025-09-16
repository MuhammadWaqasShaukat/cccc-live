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
