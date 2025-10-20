import React from "react";
import { NftAttribute } from "../../types/Nft";
import Icon from "../UI/Icon";
import Modal from "../UI/Modal";
import { NFTCardTypes } from "../../types/NFTCardTypes";

const AttributeRow: React.FC<NftAttribute> = ({ trait_type, value }) => {
  return (
    <div className="flex flex-row justify-start items-center w-full gap-1 bg-[#D9CBB7]">
      <Icon name="type" className=" size-12 p-1" />

      <div className=" flex flex-col justify-start items-start font-patrick-hand-sc uppercase">
        <p className="text-[#8F8473] text-md leading-none">{trait_type}</p>
        <span className="text-black text-lg leading-none">{value}</span>
      </div>
    </div>
  );
};

const SingleNft: React.FC<NFTCardTypes> = ({
  name,
  attributes,
  external_url,
  onClick,
}) => {
  return (
    <Modal onBackgroundClick={onClick as any}>
      <div className=" flex flex-row justify-center items-center">
        <div className="w-[411px] h-[563px] rounded-xl border-4 border-white overflow-hidden">
          <img src={external_url} alt="" className="overflow-hidden" />
        </div>
        <div className=" bg-[#F4E1C5] min-w-[300px] px-4 py-6 rounded-r-sm space-y-4">
          <h1 className=" font-patrick-hand-sc text-black text-5xl leading-none">
            #{name}
          </h1>
          <div className=" flex flex-col justify-start items-start gap-2">
            {attributes.map((attr) => (
              <AttributeRow {...attr} />
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SingleNft;
