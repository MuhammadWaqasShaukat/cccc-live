import { CottonCandyContext } from "../../providers/ContextProvider";
import { useContext, useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";
import { NftState } from "../../types/NFTCardTypes";

const NFTBox: React.FC<{ nft: any; nftIndex: number }> = ({
  nft,
  nftIndex,
}) => {
  const {
    setCollectiable,
    setCurrentModal,
    refreshNftState,
    setSeletedNftIndex,
  } = useContext(CottonCandyContext);
  const { getNftState } = useWeb3Utils();

  const [nftState, setNftState] = useState<NftState | null>(null);

  const { uri } = nft;

  const handleNFTClicked = () => {
    setCollectiable(nft);
    setSeletedNftIndex(nftIndex);
    setCurrentModal("nfts");
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

  useEffect(() => {
    (async () => {
      if (nft.mintAddress !== refreshNftState) return;
      const { isEggClaimed, eggMint, eggHatchedAt } = await getNftState(
        nft.mintAddress
      );
      setNftState({ isEggClaimed, eggHatchedAt, eggMint });
    })();
  }, [refreshNftState]);

  const imageSrc =
    uri === "https://example.com/nft.json"
      ? "./images/section-mint/nfts/nft1.jpg"
      : uri;

  return (
    <div
      onClick={handleNFTClicked}
      className={`bg-transparent custom-pointer rounded-xl shadow-md flex flex-col items-center relative h-fit`}
    >
      <img src={imageSrc} alt={`NFT`} className="rounded-md " />
      <h3 className="absolute top-2 right-2 rounded text-white font-patrick-hand-sc tracking-wide text-4xl text-outline-0">
        #{1613 + 1}
      </h3>
      {nftState && !nftState.isEggClaimed && (
        <div className="absolute bottom-2 size-16 group custom-pointer">
          <div className="bg-egg-glow group-hover:bg-egg-glow-1 bg-contain bg-center bg-no-repeat size-16 transition-all duration-100"></div>
        </div>
      )}
    </div>
  );
};

export default NFTBox;
