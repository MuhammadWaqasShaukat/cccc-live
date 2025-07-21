import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = ({ className }) => {
  const ctx = useContext(CottonCandyContext);

  return (
    ctx.activeMenu === "none" && (
      <nav
        className={`${className} w-full grid place-content-center gap-4 md:gap-8 z-30  pointer-events-none h-full`}
      >
        <div className="absolute sm:top-[60%] top-[50%] left-1/2 -translate-x-1/2  sm:w-[40.26vw] w-[90%] h-[550px] bg-hero-section-tombstone  bg-contain bg-center bg-no-repeat">
          <ul className="md:space-y-4 space-y-2  flex flex-col justify-center items-center h-full mt-5">
            <li className="space-y-1 bg-menu-btn sm:w-[260px] w-[210px] h-[72px] bg-center bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("about");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl  text-outline-0 group text-white text-fake-bold"
              >
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
                About
              </button>
            </li>
            <li className="space-y-1 bg-menu-btn sm:w-[260px] w-[210px] h-[72px] bg-center  bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("mint");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl group  text-outline-0 text-white text-fake-bold"
              >
                <span className="absolute  inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
                mint
              </button>
            </li>
            <li className="space-y-1 bg-menu-btn sm:w-[260px] w-[210px] h-[72px] bg-center  bg-no-repeat bg-contain  pointer-events-auto">
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
