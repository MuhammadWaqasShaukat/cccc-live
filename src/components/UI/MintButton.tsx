import { useContext } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";

const MintButton = () => {
  const ctx = useContext(CottonCandyContext);
  const { BuyNFT } = useProgramInstructions();

  const { connected } = useWallet();
  const { setVisible } = useWalletModal();

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
      ctx.setIsPortalOpen(true);
      await BuyNFT(ctx.count);
      ctx.calculatePrice!();
    } catch (error: any) {
      console.error("Error: ", error.message);
      ctx.setIsPortalOpen(false);
    } finally {
      ctx.setIsPortalOpen(false);
    }

    const newNft = await getNewBoughtNft();

    if (newNft.length > 0) {
      ctx.setCollectiable(newNft[0]);
      ctx.setCurrentModal("claim-egg");
      ctx.setBookmark("nfts");

      ctx.setMyNfts([]);
    }
  };

  return (
    <button
      className="bg-mint-btn h-[90px] w-[350px]  relative bg-center bg-contain bg-no-repeat group z-10"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleNFTMintClick();
      }}
    >
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20 "></span>
      <span className=" absolute uppercase inset-0 w-full h-full grid place-content-center font-heavitas text-xl  leading-none text-white z-30">
        {connected ? "Mint now" : "Connect"}
      </span>
    </button>
  );
};

export default MintButton;
