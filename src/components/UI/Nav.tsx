import { useContext } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {}

const Nav: React.FC<NavProps> = ({ className }) => {
  const ctx = useContext(CottonCandyContext);

  return (
    ctx.activeMenu === "none" && (
      <nav
        className={`${className} w-full grid place-content-center gap-4 md:gap-8 z-30  pointer-events-none`}
      >
        {/* Responsive text size for buttons using Tailwind classes */}
        <ul className="md:space-y-10 space-y-8 lg:space-y-12 flex flex-col justify-center items-center">
          <li className="space-y-1 w-max group pointer-events-auto">
            <button
              onClick={() => {
                ctx.setActiveMenu("none");
              }}
              className="uppercase font-patrick-hand text-3xl md:text-4xl lg:text-5xl  text-outline-0 text-white text-fake-bold"
            >
              About
            </button>
            <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full  bg-white border border-black opacity-0 group-hover:opacity-100  transition-opacity duration-300"></div>
          </li>
          <li className="space-y-1 w-max group pointer-events-auto">
            <button
              onClick={() => {
                ctx.setActiveMenu("mint");
              }}
              className="uppercase font-patrick-hand text-3xl md:text-4xl lg:text-5xl  text-outline-0 text-white text-fake-bold"
            >
              mint
            </button>
            <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full bg-white border border-black opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
          </li>
          <li className="space-y-1 w-max group pointer-events-auto">
            <button
              onClick={() => {
                ctx.setActiveMenu("none");
              }}
              className="uppercase font-patrick-hand text-3xl md:text-4xl lg:text-5xl  text-outline-0 text-white text-fake-bold"
            >
              Collection
            </button>
            <div className="h-1 md:h-[1.25px] lg:h-1.5 rounded-full bg-white border border-black opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </li>
        </ul>
      </nav>
    )
  );
};

export default Nav;
