import { Metadata } from "@metaplex-foundation/js";

export const getNewBoughtNftEgg = async (
  stale: Metadata[],
  lts: Metadata[]
) => {
  const currentMap = new Map(
    stale.map((nft) => [nft.mintAddress.toBase58(), nft])
  );

  const latestMap = new Map(
    lts.map((nft) => [nft.mintAddress.toBase58(), nft])
  );

  const newNfts = [];

  for (const [mintAddr, nft] of latestMap) {
    if (!currentMap.has(mintAddr)) {
      newNfts.push(nft);
    }
  }

  return newNfts;
};
