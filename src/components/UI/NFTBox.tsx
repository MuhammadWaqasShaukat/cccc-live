import { Metadata } from "@metaplex-foundation/js";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { useContext, useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { NftState } from "../../types/NFTCardTypes";

const NFTBox: React.FC<Metadata> = (nft) => {
  const { setCollectiable, setCurrentModal } = useContext(CottonCandyContext);
  const { getNftState } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);

  const { uri } = nft;

  const handleNFTClicked = () => {
    setCollectiable(nft);
    setCurrentModal("claim-egg");
  };

  useEffect(() => {
    (async () => {
      if (!nft) return;
      const { isEggClaimed, eggMint, eggHatchedAt } = await getNftState(
        nft.mintAddress
      );
      setNftState({ isEggClaimed, eggHatchedAt, eggMint });
    })();
  }, []);

  const imageSrc =
    uri === "https://example.com/nft.json"
      ? "./images/section-mint/nfts/nft1.jpg"
      : uri;

  return (
    <div
      onClick={handleNFTClicked}
      className={`bg-transparent rounded-xl shadow-md flex flex-col items-center relative h-fit ${
        nftState && !nftState.isEggClaimed ? "card-shadow-0" : ""
      } `}
    >
      <img src={imageSrc} alt={`NFT`} className="rounded-md " />
      <h3 className="absolute top-2 right-2 rounded text-white font-patrick-hand-sc tracking-wide text-4xl text-outline-0">
        #{1613 + 1}
      </h3>
      {nftState && !nftState.isEggClaimed && (
        <div className="absolute bottom-2 flex flex-row justify-center items-center w-full">
          <img
            src={`./images/section-mint/nfts/unbroken.png`}
            alt="claimable egg"
            className="w-8"
          />
        </div>
      )}
    </div>
  );
};

export default NFTBox;
