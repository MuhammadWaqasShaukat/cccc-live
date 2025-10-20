import { NFTCardTypes } from "../../types/NFTCardTypes";

const NftCard: React.FC<NFTCardTypes> = ({ name, external_url, onClick }) => {
  return (
    <div
      className="border-4 border-white rounded-lg nfts-card-shadow relative"
      onClick={onClick}
    >
      <img src={external_url} alt="" className=" rounded-md" />
      <div className="bg-white w-max px-2 py-1  absolute bottom-2 left-2 rounded-md">
        <span className=" font-patrick-hand-sc text-xl text-[#8F8473">
          #{name}
        </span>
      </div>
    </div>
  );
};

export default NftCard;
