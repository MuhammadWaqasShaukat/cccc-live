import Modal from "../UI/Modal";

const SupperOffer: React.FC<{
  setViewOffer: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setViewOffer }) => {
  return (
    <Modal
      className="justify-start bg-transparent "
      onBackgroundClick={() => {
        setViewOffer(false);
      }}
    >
      <div className="md:hidden flex bg-super-offer-sm  bg-contain bg-no-repeat w-[242px] h-[422px]">
        <div className=" w-full flex flex-col items-center gap-6 py-10 px-4">
          <div className=" bg-super-offer-title bg-center w-56 h-20  bg-contain bg-no-repeat"></div>

          <div className="w-full flex flex-col gap-[25px] items-center">
            <div className="flex flex-row w-2/3 ml-auto justify-center">
              <p className=" text-white lg:text-2xl md:text-base uppercase text-center font-patrick-hand-sc  tracking-widest px-4">
                <span className="lg:text-3xl md:text-lg">9 NFT</span>s for the
                price <br /> of
                <span className="lg:text-3xl md:text-lg"> 10 NFT</span>s!
              </p>
            </div>
            <button className="bg-supper-offer-mint-btn w-28 h-10  bg-contain bg-no-repeat relative">
              <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
              <span className="absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] md:text-4xl leading-none uppercase text-white z-60">
                Mint
              </span>
            </button>
            <p className="text-white lg:text-lg text-sm justify-center items-center uppercase font-patrick-hand-sc tracking-wide text-center">
              <span className="lg:text-xl text-base">No</span>, thanks! <br />
              <span className="lg:text-xl text-base">Mama</span> raised no fool
            </p>
          </div>
        </div>
      </div>

      {/* for lg screens  */}
      <div className=" hidden md:flex bg-super-offer-lg bg-contain bg-no-repeat aspect-[714/409] md:w-[500px] lg:w-[600px]  xl:w-[714px]  flex-row justify-end">
        <div className=" w-2/3 flex flex-col justify-center items-center lg:gap-4  md:gap-2 gap-0">
          <div className=" bg-super-offer-title xl:w-80 xl:h-32 bg-center lg:w-64 lg:h-24 md:w-56 md:h-20  bg-contain bg-no-repeat"></div>
          <div className=" flex flex-col justify-center items-center gap-2">
            <p className=" text-white lg:text-2xl md:text-base uppercase text-center font-patrick-hand-sc px-10 tracking-widest">
              <span className="lg:text-3xl md:text-lg">9 NFT</span>s for the
              price <br /> of
              <span className="lg:text-3xl md:text-lg"> 10 NFT</span>s!
            </p>
            <button className="bg-supper-offer-mint-btn lg:w-56 lg:h-[4.5rem] md:w-40 md:h-[3.25rem]  bg-contain bg-no-repeat relative">
              <span className="absolute inset-0 z-50 transition duration-200 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20"></span>
              <span className="absolute inset-0 w-full h-full grid place-content-center font-patrick-hand text-[22px] md:text-4xl leading-none uppercase text-white z-60">
                Mint
              </span>
            </button>
            <p className="text-white lg:text-lg text-sm justify-center items-center uppercase font-patrick-hand-sc tracking-wide">
              <span className="lg:text-xl text-base">No</span>, thanks!{" "}
              <span className="lg:text-xl text-base">Mama</span> raised no fool
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SupperOffer;
