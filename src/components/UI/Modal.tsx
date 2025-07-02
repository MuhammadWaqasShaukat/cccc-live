import { ReactNode, useContext } from "react";
import { useEffect } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

const Modal = ({
  children,
  onBackgroundClick,
}: {
  children: ReactNode;
  onBackgroundClick: () => void;
}) => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div
      onClick={() => onBackgroundClick() ?? ctx.setCurrentModal(null)}
      className=" w-full h-full bg-black/40 flex flex-col justify-center items-center fixed top-0 left-0 right-0 z-40"
    >
      {children}
    </div>
  );
};

export default Modal;
