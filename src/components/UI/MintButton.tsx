import { useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { CottonCandyContext } from "../../providers/ContextProvider";
import useProgramInstructions from "../../hooks/useProgramInstructions";
import { Token } from "../../types/Nft";
import { useGetAllNfts } from "../../hooks/useGetAllNFTs";

interface MintButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  mintCount?: number;
}

const MintButton: React.FC<MintButtonProps> = ({ className, mintCount }) => {
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

  const preloadNftImage = async (
    uri: string
  ): Promise<HTMLImageElement | null> => {
    try {
      const res = await fetch(uri, { mode: "cors" });
      const data = await res.json();
      if (data && data.external_url) {
        return new Promise((resolve) => {
          const imgReveal = new Image();
          imgReveal.crossOrigin = "anonymous";
          imgReveal.src = data.external_url;

          imgReveal.onload = () => resolve(imgReveal);
          imgReveal.onerror = (err) => {
            console.error("Failed to load NFT image", err);
            resolve(null);
          };
        });
      }

      return null;
    } catch (err) {
      console.error("Failed to fetch NFT metadata", err);
      return null;
    }
  };

  const handleNFTMintClick = async () => {
    if (!connected) {
      setVisible(true);
      return;
    }
    try {
      setisMinting(true);
      await BuyNFT(mintCount ?? ctx.count);
      const newNft = await getNewBoughtNft();
      if (newNft.length > 0) {
        ctx.setCollectiable(newNft[0]);
        const prloadedImage = await preloadNftImage(newNft[0].metadata.uri);
        ctx.setNftImageToReveal(prloadedImage);
      }
    } catch (error: any) {
      console.error("Error: ", error.message);
      setisMinting(false);
    } finally {
      setisMinting(false);
    }
  };
  useEffect(() => {
    if (!ctx.nftImageToReveal) return;

    ctx.setRevealNFT(true);
    ctx.setBookmark("nfts");
  }, [ctx.nftImageToReveal]);

  return (
    <button
      disabled={isMinting}
      className={`${className} bg-mint-btn  max-h-[90px] max-w-[350px] min-w-64 min-h-14 relative bg-center bg-contain bg-no-repeat group z-10 ${
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
