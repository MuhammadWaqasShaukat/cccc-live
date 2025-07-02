export type FulFilledState = {
  status: "done" | "none" | "pending";
  lotteryStatus: "none" | "won" | "lost";
};
