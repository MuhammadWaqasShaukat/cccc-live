import { NFTCardProps } from "../../types/NFTCardTypes";

// obsolete : not using

const NFTCard: React.FC<NFTCardProps & { index: number }> = ({
  cardImage,
  color,
  description,
  title,
  thumbnail,
  index,
}) => {
  const getMobieClasses = (index: number) => {
    let classes =
      "absolute sm:relative sm:rotate-0 sm:left-0 sm:right-0 sm:translate-x-0 ";
    if (index === 0) classes += "-left-[1%] rotate-[13.65deg]";
    if (index === 1) classes += "left-[18%] rotate-[6.85deg]";
    if (index === 2) classes += "right-[50%] left-[50%] translate-x-[-50%]";
    if (index === 3) classes += "right-[1%] rotate-[-5.43deg]";
    if (index === 4) classes += "right-[18%] rotate-[-7.57deg]";
    return classes;
  };

  return (
    <div
      className={`card hover:flipped lg:h-[311.24px] lg:w-[222.09px] w-[100px] h-[143px] ${getMobieClasses(
        index
      )}`}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={cardImage} alt="card-nft" />
        </div>
        <div className={`card-back ${color}`}>
          <div className="flex flex-col items-start justify-start gap-1 p-2 md:p-6 -rotate-3">
            <div className="flex flex-row items-center justify-start gap-1 md:gap-2">
              <img src={thumbnail} alt="" className="w-6 md:w-auto" />
              <h3 className="font-patrick-hand text-[10px] md:text-3xl font-normal capitalize">
                {title}
              </h3>
            </div>
            <p className=" font-patrick-hand text-[8px] md:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
