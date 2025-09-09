import { useEffect, useState } from "react";
import useWeb3Utils from "../../hooks/useWeb3Utils";

const PublicMint = () => {
  const { getLotteryState } = useWeb3Utils();
  const [countdown, setCountdown] = useState<{
    d: number;
    h: number;
    m: number;
  }>({ d: 0, h: 0, m: 0 });

  const getCountDown = async () => {
    const { startTime } = await getLotteryState();

    const diff = startTime - Date.now();

    if (diff <= 0) return "already passed";

    const minutes = Math.floor(diff / 60000) % 60 || 0;
    const hours = Math.floor(diff / 3600000) % 24 || 0;
    const days = Math.floor(diff / 86400000) || 0;
    setCountdown({ d: days, h: hours, m: minutes });
  };

  useEffect(() => {
    getCountDown();
  }, []);
  return (
    <>
      <div className="flex flex-col items-center gap-4 w-full justify-normal md:hidden overflow-auto">
        <div className="relative grid gap-2 mt-2 place-content-center w-[324px] ">
          <div className="absolute top-0 right-0 w-20 h-20 bg-no-repeat bg-contain bg-mint-section-book-tr"></div>
          <div className="absolute top-0 left-0 w-20 h-20 -rotate-90 bg-no-repeat bg-contain bg-mint-section-book-tr"></div>

          <div className="flex flex-row items-end justify-center w-full p-2">
            <img
              src="./images/letter-p-public.png"
              alt=""
              className="h-[60%]"
            />
            <h3 className="text-2xl uppercase lg:text-3xl font-patrick-hand-sc">
              ublic Mint
            </h3>
          </div>

          <span className="text-2xl text-center font-patrick-hand-sc">
            starts in
          </span>

          <div className="grid w-48 h-16 mx-auto bg-center bg-no-repeat bg-contain bg-mint-section-time place-content-center">
            <div className=" flex flex-row justify-between items-end gap-0.5">
              <div>
                <span className="text-3xl">{countdown.d.toString()}</span>
                <span className="text-2xl">d</span>
              </div>
              <span className="text-2xl">:</span>
              <div>
                <span className="text-3xl">{countdown.h.toString()}</span>
                <span className="text-2xl">h</span>
              </div>
              <span className="text-2xl">:</span>
              <div>
                <span className="text-3xl">{countdown.m.toString()}</span>
                <span className="text-2xl">m</span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid w-full h-full px-5 place-content-center ">
          <div className="relative flex flex-col items-center justify-center flex-1 w-full h-full p-8 ">
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-bottom bg-no-repeat bg-contain bg-mint-section-book-lg lg:w-52 lg:h-52"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-top bg-no-repeat bg-contain bg-mint-section-book-lg-1 lg:w-52 lg:h-52"></div>
            <img
              src="./images/section-mint/minting-image.png"
              alt=""
              className=" border-[3px] border-white max-h-[366px] rounded-xl h-full card-shadow-1 w-full"
            />
          </div>
        </div>
      </div>

      <div className="flex-row items-center justify-between hidden h-full gap-16 md:flex">
        {/*left page*/}
        <div className="relative flex flex-col items-center justify-start flex-1 w-full h-full -ml-3 ">
          <img
            src="./images/section-mint/minting-image.png"
            alt=""
            className="h-[95%]"
          />
        </div>

        {/*right page  */}
        <div className="flex flex-col items-center flex-1 w-full h-full sm:justify-between md:justify-start sm:gap-7 lg:gap-4 md:gap-3">
          <div className="relative w-full h-full ">
            <div className="absolute bottom-0 right-0 w-20 h-20 rotate-90 bg-no-repeat bg-contain lg:w-28 lg:h-28 bg-mint-section-book-tr"></div>
            <div className="absolute top-0 left-0 w-20 h-20 -rotate-90 bg-no-repeat bg-contain lg:w-28 lg:h-28 bg-mint-section-book-tr"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-top bg-no-repeat bg-contain bg-mint-section-book-lg-1 lg:w-52 lg:h-52"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-bottom bg-no-repeat bg-contain bg-mint-section-book-lg lg:w-52 lg:h-52"></div>

            <div className="grid h-full gap-2 -mt-5 place-content-center">
              <div className="flex flex-row items-end justify-center w-full p-2">
                <img
                  src="./images/letter-p-public.png"
                  alt=""
                  className="h-[60%]"
                />
                <h3 className="text-2xl uppercase lg:text-3xl font-patrick-hand-sc">
                  ublic Mint
                </h3>
              </div>

              <span className="text-2xl text-center font-patrick-hand-sc">
                starts in
              </span>

              <div className="grid mx-auto bg-center bg-no-repeat bg-contain md:h-12 md:w-40 lg:h-16 lg:w-48 bg-mint-section-time place-content-center">
                <span className="block w-full text-2xl text-center lg:text-2xl font-patrick-hand-sc">
                  <div className=" flex flex-row justify-between items-end gap-0.5">
                    <div>
                      <span className="text-3xl">{countdown.d.toString()}</span>
                      <span className="text-2xl">d</span>
                    </div>
                    <span className="text-2xl">:</span>
                    <div>
                      <span className="text-3xl">{countdown.h.toString()}</span>
                      <span className="text-2xl">h</span>
                    </div>
                    <span className="text-2xl">:</span>
                    <div>
                      <span className="text-3xl">{countdown.m.toString()}</span>
                      <span className="text-2xl">m</span>
                    </div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PublicMint;
