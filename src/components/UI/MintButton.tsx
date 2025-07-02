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
    const currentMap = new Map(
      ctx.myNfts.map((nft) => [nft.mintAddress.toBase58(), nft])
    );

    const latestNfts = await ctx.getNFTs();

    const latestMap = new Map(
      latestNfts.map((nft) => [nft.mintAddress.toBase58(), nft])
    );

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
      ctx.setIsLoading(true);
      await BuyNFT(ctx.count);
      ctx.calculatePrice!();
    } catch (error: any) {
      console.error("Error: ", error.message);
      ctx.setIsLoading(false);
    } finally {
      ctx.setIsLoading(false);
    }

    const newNft = await getNewBoughtNft();

    if (newNft) {
      // setNewlyBought(newNft[0]);
      ctx.setCollectiable(newNft[0]);
      ctx.setCurrentModal("claim-egg");
      ctx.setBookmark("nfts");
    }
  };

  return (
    <>
      <button
        className="bg-mint-section-btn w-full h-full md:h-[86px] md:w-[191px] relative bg-contain bg-no-repeat group z-10"
        onClick={handleNFTMintClick}
      >
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
        <span className=" absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-3xl md:text-[48px] leading-none text-white z-30">
          {connected ? "Mint" : "Connect"}
        </span>
      </button>
    </>
  );
};

export default MintButton;
