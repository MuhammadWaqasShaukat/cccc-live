import { useContext } from "react";
import { useEffect } from "react";
import { CottonCandyContext } from "../../providers/ContextProvider";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  onBackgroundClick: () => void;
}

const Modal: React.FC<ModalProps> = ({
  onBackgroundClick,
  className,
  children,
}) => {
  const ctx = useContext(CottonCandyContext);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const handleBackDropClicked = () => {
    if (typeof onBackgroundClick === "function") {
      onBackgroundClick();
    } else {
      ctx.setCurrentModal(null);
    }
  };

  return (
    <div
      className={`w-full h-full  flex flex-col justify-center items-center  absolute top-0 left-0 right-0`}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          handleBackDropClicked();
        }}
        className={`z-50 w-full bg-black/70 h-full absolute top-0 left-0 ${className}`}
      ></div>
      <div className="z-[50] flex flex-col justify-center items-center md:h-auto md:w-auto h-full w-full">
        {children}
      </div>
    </div>
  );
};

export default Modal;
