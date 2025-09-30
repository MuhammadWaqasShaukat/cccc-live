import { CottonCandyContext } from "../../providers/ContextProvider";
import { useContext, useEffect, useState } from "react";
import { NftMetadata, Token } from "../../types/Nft";
import { NftState } from "../../types/NFTCardTypes";

const NFTBox: React.FC<{ nft: Token; nftIndex: number }> = ({
  nft,
  nftIndex,
}) => {
  const { setCollectiable, setCurrentModal, setSeletedNftIndex } =
    useContext(CottonCandyContext);

  const [metadata, setMetadata] = useState<NftMetadata | null>(null);

  const { uri } = nft.metadata;

  const handleNFTClicked = () => {
    setCollectiable(nft);
    setSeletedNftIndex(nftIndex);
    setCurrentModal("nfts");
  };

  useEffect(() => {
    if (!uri) return;

    (async () => {
      try {
        const res = await fetch(uri, { mode: "cors" });
        const data = await res.json();
        if (data) {
          setMetadata(data);
        }
      } catch (err) {
        console.error("Failed to fetch NFT metadata", err);
      }
    })();
  }, [uri]);

  return (
    <div
      onClick={handleNFTClicked}
      className={`bg-transparent rounded-xl md:shadow-md flex flex-col items-center overflow-hidden relative md:h-fit lg:min-h-[130px] md:min-h-[100px] min-w-[33%] md:p-0 aspect-[1000/1400] border-black border-2`}
    >
      <img
        src={metadata?.external_url ?? "./images/section-mint/nfts/nft1.jpg"}
        alt={`NFT`}
        className="rounded-md w-[-webkit-fill-available]"
      />
      <h3 className="absolute text-2xl tracking-wide text-white rounded top-2 right-4 md:right-1 md:top-0 font-patrick-hand-sc md:text-lg lg:text-xl xl:text-2xl outlined-text-sm">
        #{metadata?.name}
      </h3>
      {nft.state &&
        (!(nft.state as NftState).isEggClaimed ||
          (nft.state as NftState).eggHatchedAt == 0) && (
          <div className="absolute bottom-2 md:size-12 lg:size-14 xl:size-16 group">
            <div className="transition-all duration-100 bg-center bg-no-repeat bg-contain bg-egg-glow group-hover:bg-egg-glow-1 size-16 md:size-12 lg:size-14 xl:size-16"></div>
          </div>
        )}
    </div>
  );
};

export default NFTBox;
