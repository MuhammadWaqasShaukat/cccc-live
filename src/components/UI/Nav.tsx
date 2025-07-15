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
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2  w-[40.26vw] h-[550px] bg-hero-section-tombstone bg-contain bg-center bg-no-repeat">
          {/* Responsive text size for buttons using Tailwind classes */}
          <ul className="md:space-y-4 space-y-2  flex flex-col justify-center items-center h-full mt-5">
            <li className="space-y-1 bg-menu-btn w-[260px] h-[72px] bg-center bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("about");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl  text-outline-0 group text-white text-fake-bold"
              >
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
                About
              </button>
              {/* <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full  bg-white border border-black opacity-0 group-hover:opacity-100  transition-opacity duration-300"></div> */}
            </li>
            <li className="space-y-1 bg-menu-btn w-[260px] h-[72px] bg-center  bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("mint");
                }}
                className="uppercase relative font-patrick-hand text-2xl h-full w-full mx-auto md:text-3xl lg:text-4xl group  text-outline-0 text-white text-fake-bold"
              >
                <span className="absolute  inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
                mint
              </button>
              {/* <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full bg-white border border-black opacity-0 group-hover:opacity-100 transition-all duration-300"></div> */}
            </li>
            <li className="space-y-1 bg-menu-btn w-[260px] h-[72px] bg-center  bg-no-repeat bg-contain  pointer-events-auto">
              <button
                onClick={() => {
                  ctx.setActiveMenu("none");
                }}
                className="uppercase relative font-patrick-hand text-2xl w-full h-full mx-auto md:text-3xl lg:text-4xl group text-outline-0 text-white text-fake-bold"
              >
                <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 group-active:bg-black/20 transition duration-200 z-20"></span>
                Collection
              </button>
              {/* <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full bg-white border border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
            </li>
          </ul>
        </div>
      </nav>
    )
  );
};

export default Nav;
