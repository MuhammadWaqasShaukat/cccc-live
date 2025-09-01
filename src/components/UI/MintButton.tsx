import { useContext, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";

const MintButton = () => {
  const ctx = useContext(CottonCandyContext);
  const { BuyNFT } = useProgramInstructions();

  const [isMinting, setisMinting] = useState<boolean>(false);

  const { connected, connecting } = useWallet();
  const { setVisible, visible } = useWalletModal();

  const getNewBoughtNft = async () => {
    const currentMap = new Map(ctx.myNfts.map((nft) => [nft.mintAddress, nft]));

    const latestNfts = await ctx.getNFTs();

    const latestMap = new Map(latestNfts.map((nft) => [nft.mintAddress, nft]));

    const newNfts = [];

    for (const [mintAddr, nft] of latestMap) {
      if (!currentMap.has(mintAddr)) {
        newNfts.push(nft);
      }
    }

    return newNfts;
  };

  const handleNFTMintClick = async () => {
    if (!connected) {
      setVisible(true);
      return;
    }

    try {
      // ctx.setIsPortalOpen(true);
      setisMinting(true);
      await BuyNFT(ctx.count);
      ctx.calculatePrice();
    } catch (error: any) {
      console.error("Error: ", error.message);
      // ctx.setIsPortalOpen(false);
      setisMinting(false);
    } finally {
      setisMinting(false);
    }

    const newNft = await getNewBoughtNft();

    if (newNft.length > 0) {
      ctx.setCollectiable(newNft[0]);
      ctx.setRevealNFT(true);
      // ctx.setCurrentModal("claim-egg");
      ctx.setBookmark("nfts");
      ctx.setMyNfts([]);
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
