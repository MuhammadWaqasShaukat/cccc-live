const PublicMint = () => {
  return (
    <div className=" flex flex-row justify-between items-start gap-20 h-full ">
      {/*left page*/}
      <div className=" md:h-[530px] flex-1 flex flex-col h-full w-full justify-center items-center gap-7">
        <img
          src="./images/section-mint/minting-image.png"
          alt=""
          className="h-[70%] md:h-auto -ml-10"
        />
      </div>

      {/*right page  */}
      <div className=" md:h-[530px]  flex-1 flex flex-col h-full w-full justify-between items-center">
        <div className=" h-full w-full relative">
          <div className="bg-mint-section-book-tr rotate-90 bg-contain w-32 h-32 bg-no-repeat  absolute bottom-0 right-0"></div>
          <div className="bg-mint-section-book-tr -rotate-90 bg-contain w-32 h-32 bg-no-repeat absolute top-0 left-0"></div>
          <div className="bg-mint-section-book-lg-1  bg-contain w-60 h-60 bg-no-repeat bg-top  absolute top-0 right-0"></div>
          <div className="bg-mint-section-book-lg bg-contain w-60 h-60 bg-no-repeat  absolute bg-bottom bottom-0 left-0"></div>

          <div className=" grid place-content-center h-full gap-4">
            <div className="flex flex-row md:justify-start justify-end w-[90%] md:w-full items-end md:bg-none   bg-cover bg-bottom md:p-0 p-2 ">
              <img
                src="./images/letter-p-public.png"
                alt=""
                className="h-[70%] md:h-auto"
              />
              <h3 className=" font-patrick-hand-sc text-4xl uppercase ">
                ublic Mint
              </h3>
            </div>

            <span className="text-center font-patrick-hand-sc text-3xl">
              starts in
            </span>

            <div className=" bg-mint-section-time bg-no-repeat bg-contain w-56 h-[74px] mx-auto grid place-content-center mt-">
              <span className="block font-patrick-hand-sc text-4xl w-full text-center">
                2d:17h:32m
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicMint;
