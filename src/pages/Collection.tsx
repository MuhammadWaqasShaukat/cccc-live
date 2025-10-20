import { useEffect, useState } from "react";
import Sidebar from "../components/Collection/Sidebar";
import { NftMetadata } from "../types/Nft";
import NftCard from "../components/Collection/NftCard";
import AppliedFilters from "../components/Collection/AppliedFilters";
import SingleNft from "../components/Collection/SingleNft";

const Collection = () => {
  const [nftsMetadata, setNftsMetadata] = useState<NftMetadata[]>([]);

  const [selectedNFT, setSelectedNFT] = useState<NftMetadata | null>(null);

  const fetchMetaData = async () => {
    try {
      const res = await fetch(
        "https://api.cottoncandycrusaderclub.com/metadata/2.json"
      );
      if (!res.ok) {
        throw new Error(`Failed to fetch metadata: ${res.statusText}`);
      }
      const singleItem: NftMetadata = await res.json();

      // Fill array with 100 copies of the fetched item
      const data: NftMetadata[] = Array(100).fill(singleItem);
      setNftsMetadata(data);
    } catch (error) {
      console.error("Error fetching metadata:", error);
    }
  };

  useEffect(() => {
    fetchMetaData();
  }, []);

  const handleNftSelection = (nft: NftMetadata) => {
    setSelectedNFT(nft);
  };

  const handleBackgorundClk = () => {
    setSelectedNFT(null);
  };

  return (
    <>
      {selectedNFT && (
        <SingleNft
          {...(selectedNFT as NftMetadata)}
          onClick={handleBackgorundClk}
        />
      )}

      <div className="h-screen w-screen bg-collection bg-cover bg-repeat-y releative overflow-hidden flex flex-row justify-start items-stretch">
        <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-keys max-h-[200px] max-w-[175px] h-full w-full top-[7%] -right-[40px]"></div>
        <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-coins max-h-[154px] max-w-[195px] h-full w-full top-[20%] -right-[90px]"></div>
        <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-ipods max-w-[216px] max-h-[164px] h-full w-full top-[40%] rotate-[270deg] -right-[80px]"></div>
        <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-chips max-h-[327px] max-w-[320px] h-full w-full top-[60%] -right-[180px]"></div>
        <Sidebar />
        <div className="flex-1 pl-24 py-10 pr-40 flex flex-col justify-start items-start gap-6">
          <div className="w-full flex-row flex justify-start items-end gap-1">
            <h1 className=" font-patrick-hand-sc text-2xl uppercase text-black">
              1992 cards
            </h1>
            <div className=" flex-1 h-[1px] bg-[#7F7260] mb-2"></div>
          </div>

          {/* Applied Filters */}

          <AppliedFilters />

          {/* NFTS */}

          <div className="grid grid-cols-5 grid-rows-auto gap-4 overflow-scroll flex-1 filter-list scroll-m-3 pr-2">
            {nftsMetadata.map((nft: NftMetadata) => (
              <NftCard {...nft} onClick={() => handleNftSelection(nft)} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Collection;
