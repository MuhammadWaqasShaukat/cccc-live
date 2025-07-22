import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = ({ className }) => {
  const ctx = useContext(CottonCandyContext);

  return (
    ctx.activeMenu === "none" && (
      <nav
        className={`${className} w-full grid place-content-end gap-4 md:gap-8 z-20  pointer-events-none h-full`}
      >
        <div className="absolute top-[62%] left-1/2 -translate-x-1/2 max-w-[500px] md:w-[40%] sm:w-[45%] w-[80%] h-[60%] bg-hero-section-tombstone  bg-contain bg-center bg-no-repeat">
          <ul className="space-y-2 lg:space-y-3   flex flex-col justify-center items-center h-full mt-5">
            <li
              className={`space-y-1 bg-menu-btn hover:bg-menu-btn-hovered w-[60%] min-w-40 max-w-60 h-16 min-h-14 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto`}
            >
              <button
                onClick={() => {
                  ctx.setActiveMenu("about");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl  text-outline-0 group text-white text-fake-bold"
              >
                About
              </button>
            </li>
            <li className="space-y-1 bg-menu-btn hover:bg-menu-btn-hovered w-[60%] min-w-40 max-w-60 min-h-14 h-16 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("mint");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl group  text-outline-0 text-white text-fake-bold"
              >
                mint
              </button>
            </li>
            <li className="space-y-1 bg-menu-btn hover:bg-menu-btn-hovered w-[60%] min-w-40 max-w-60 min-h-14 h-16 max-h-20 bg-center  bg-no-repeat bg-contain  pointer-events-auto">
              <button
                disabled
                onClick={() => {
                  ctx.setActiveMenu("none");
                }}
                className="uppercase relative font-patrick-hand disabled:cursor-not-allowed text-2xl w-full h-full mx-auto md:text-3xl lg:text-4xl group text-outline-0 text-white text-fake-bold"
              >
                Collection
              </button>
            </li>
          </ul>
        </div>
      </nav>
    )
  );
};

export default Nav;
