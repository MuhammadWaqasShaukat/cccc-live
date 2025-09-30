const MintingOverLeaf = () => {
  return (
    <div className="flex flex-col justify-around items-center  w-full h-full sm:mt-4">
      <div className="w-full flex flex-col items-center justify-center gap-2">
        <div className="bg-mint-over-heading w-[80%] bg-contain bg-no-repeat mx-auto grid place-content-center bg-center lg:h-16 h-14">
          <span className=" font-patrick-hand-sc lg:text-[28px] text-xl text-[#292726]">
            MITING IS OVER
          </span>
        </div>
        <div className="">
          <span className=" font-patrick-hand-sc text-2xl text-[#292726]">
            10k nfts were just minted
          </span>
        </div>
      </div>

      <div className=" w-[80%]">
        <img src="/images/section-mint/mint-over.webp" alt="" />
      </div>
    </div>
  );
};

const MintingOverPage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-between h-full overflow-auto md:hidden">
        <MintingOverLeaf />
      </div>

      <div className="md:flex hidden flex-col items-center justify-between h-full mx-auto sm:w-2/3 md:flex-row md:items-start md:gap-4 md:w-full ">
        <div
          data-page="left"
          className="flex flex-col items-center justify-center flex-1 h-full -ml-2"
        ></div>
        <div
          data-page="right"
          className="flex flex-col items-center justify-start flex-1 w-full h-full gap-2 lg:gap-4 md:gap-3 xl:gap-5"
        >
          <MintingOverLeaf />
        </div>
      </div>
    </>
  );
};

export default MintingOverPage;
