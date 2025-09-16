import { CottonCandyContext } from "../../providers/ContextProvider";
import { useContext } from "react";
import { Token } from "../../types/Nft";
import { NftState } from "../../types/NFTCardTypes";

const NFTBox: React.FC<{ nft: Token; nftIndex: number }> = ({
  nft,
  nftIndex,
}) => {
  const { setCollectiable, setCurrentModal, setSeletedNftIndex } =
    useContext(CottonCandyContext);

  const { uri } = nft.metadata;

  const handleNFTClicked = () => {
    setCollectiable(nft);
    setSeletedNftIndex(nftIndex);
    setCurrentModal("nfts");
  };

  const imageSrc =
    uri === "https://example.com/nft.json"
      ? "./images/section-mint/nfts/nft1.jpg"
      : uri;

  return (
    <div
      onClick={handleNFTClicked}
      className={`bg-transparent rounded-xl md:shadow-md flex flex-col items-center relative md:h-fit min-w-[29%] md:p-0`}
    >
      <img
        src={imageSrc}
        alt={`NFT`}
        className="rounded-md w-[-webkit-fill-available]"
      />
      <h3 className="absolute text-2xl tracking-wide text-white rounded top-2 right-4 md:right-1 md:top-0 font-patrick-hand-sc md:text-lg lg:text-xl xl:text-2xl outlined-text-sm">
        #{1613 + 1}
      </h3>
      {nft.state && !(nft.state as NftState).isEggClaimed && (
        <div className="absolute bottom-2 md:size-12 lg:size-14 xl:size-16 group">
          <div className="transition-all duration-100 bg-center bg-no-repeat bg-contain bg-egg-glow group-hover:bg-egg-glow-1 size-16 md:size-12 lg:size-14 xl:size-16"></div>
        </div>
      )}
    </div>
  );
};

export default NFTBox;
