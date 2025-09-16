import { useContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { Token } from "../../types/Nft";
import { useGetAllNfts } from "../../hooks/useGetAllNFTs";

const MintButton = () => {
  const ctx = useContext(CottonCandyContext);
  const { BuyNFT } = useProgramInstructions();

  const [isMinting, setisMinting] = useState<boolean>(false);
  const { data: nfts, refetch: fetchNfts } = useGetAllNfts();

  const { connected, connecting } = useWallet();
  const { setVisible, visible } = useWalletModal();

  const getNewBoughtNft = async () => {
    if (!nfts) {
      const { data: latestNfts } = await fetchNfts();
      return latestNfts ?? [];
    } else {
      // check

      const currentMap = new Map(
        nfts.map((nft: Token) => [nft.metadata.mintAddress, nft])
      );

      const { data: latestNfts } = await fetchNfts();

      if (!latestNfts) return [];

      if (latestNfts?.length > nfts.length) {
        ctx.setNfts(latestNfts);
      }

      const latestMap = new Map(
        latestNfts.map((nft) => [nft.metadata.mintAddress, nft])
      );

      const newNfts = [];

      for (const [mintAddr, nft] of latestMap) {
        if (!currentMap.has(mintAddr)) {
          newNfts.push(nft);
        }
      }
      return newNfts;
    }
  };

  const handleNFTMintClick = async () => {
    if (!connected) {
      setVisible(true);
      return;
    }
    try {
      setisMinting(true);
      await BuyNFT(ctx.count);
      const newNft = await getNewBoughtNft();
      if (newNft.length > 0) {
        ctx.setCollectiable(newNft[0]);
        ctx.setRevealNFT(true);
        ctx.setBookmark("nfts");
      }
    } catch (error: any) {
      console.error("Error: ", error.message);
      setisMinting(false);
    } finally {
      setisMinting(false);
    }
  };

  return (
    <button
      disabled={isMinting}
      className={`bg-mint-btn  max-h-[90px] max-w-[350px] min-w-64 min-h-14 relative bg-center bg-contain bg-no-repeat group z-10 ${
        isMinting ? " cursor-not-allowed opacity-75" : " opacity-100"
      }`}
      onClick={handleNFTMintClick}
    >
      {(isMinting || visible || connecting) && (
        <div className="grid w-full h-full place-content-center">
          <img src="./images/loading-dots.svg" className="ml-6" alt="" />
        </div>
      )}

      {!isMinting && (
        <span className="absolute inset-0 z-20 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
      )}
      {!(isMinting || visible || connecting) && (
        <span className="absolute inset-0 z-30 grid w-full h-full text-3xl leading-none text-white uppercase md:text-4xl place-content-center font-patrick-hand-sc">
          {connected ? "Mint now" : "Connect"}
        </span>
      )}
    </button>
  );
};

export default MintButton;
