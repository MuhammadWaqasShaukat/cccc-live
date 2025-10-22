import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";
import { Nav as NavType } from "../../types/Nav";
import EmailForm from "../whitelist/EmailForm";
import WhitelistingOpen from "../whitelist/WhitelistingOpen";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = ({ className }) => {
  const ctx = useContext(CottonCandyContext);

  const handleMenuClick = (menu: NavType) => {
    const isWhiteListCountdownOver =
      Date.now() - ctx.whitelistCountdown > 0 ? true : false;

    const isSaleCountdownOver =
      Date.now() - ctx.saleCountdown > 0 ? true : false;

    if (menu === "mint") {
      if (!isWhiteListCountdownOver) {
        ctx.shallBeNotified ? null : ctx.setCurrentModal("email-form");
      } else if (!ctx.isWhitelisted && !isSaleCountdownOver) {
        ctx.setCurrentModal("whitelisting");
      } else if (!isSaleCountdownOver && ctx.isWhitelisted) {
        ctx.shallBeNotified ? null : ctx.setCurrentModal("email-form");
      } else if (!ctx.isWhitelisted) {
        return;
      } else {
        ctx.setActiveMenu(menu);
      }
    } else {
      ctx.setActiveMenu(menu);
    }
  };

  return (
    <>
      {ctx.currentModal === "email-form" && <EmailForm />}

      {ctx.currentModal === "whitelisting" && <WhitelistingOpen />}
      <div
        id="tombstone"
        className={`${className} w-[45%] max-w-[420px] left-1/2 -translate-x-1/2 max-h-[450px] sm:z-30 z-90 h-full`}
      >
        <nav
          className={`relative grid place-content-end gap-4 md:gap-8 pointer-events-none w-full h-full`}
        >
          <div className="absolute   md:bg-hero-section-tombstone h-full w-full bg-contain bg-center bg-no-repeat">
            <ul className="flex flex-col items-center justify-center h-full space-y-2 sm:mt-5 lg:space-y-3 ">
              <li
                className={`${
                  ctx.shallBeNotified ? "bg-menu-btn-disabled" : "bg-menu-btn"
                }  hover:bg-menu-btn-hovered space-y-1  w-[60%] min-w-40 max-w-60 min-h-14 h-16 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto`}
              >
                <button
                  onClick={() => handleMenuClick("mint")}
                  className="relative w-full h-full mx-auto text-2xl text-white uppercase font-patrick-hand md:text-3xl lg:text-3xl group text-outline-0 text-fake-bold"
                >
                  {ctx.mintBtnTxt}
                </button>
              </li>
              <li
                className={`space-y-1 bg-menu-btn hover:bg-menu-btn-hovered w-[60%] min-w-40 max-w-60 h-16 min-h-14 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto`}
              >
                <button
                  onClick={() => handleMenuClick("about")}
                  className="relative w-full h-full mx-auto text-2xl text-white uppercase font-patrick-hand md:text-3xl lg:text-4xl text-outline-0 group text-fake-bold"
                >
                  About
                </button>
              </li>
              <li className="space-y-1  bg-menu-btn-disabled  w-[60%] min-w-40 max-w-60 min-h-14 h-16 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto">
                <button
                  disabled
                  onClick={() => handleMenuClick("collection")}
                  className="relative w-full h-full mx-auto text-2xl text-white uppercase font-patrick-hand disabled:cursor-not-allowed md:text-3xl lg:text-4xl group text-outline-0 text-fake-bold"
                >
                  Collection
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Nav;
