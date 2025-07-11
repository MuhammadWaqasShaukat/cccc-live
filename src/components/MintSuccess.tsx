import { Link } from "wouter";

const MintSuccess = ({handleClose}:{handleClose: (stata:boolean)=>void}) => {
  return (
    <div className="border-11 border border-black flex flex-row justify-between items-center bg-white max-w-[880px] relative ">
      <button className=" size-11 absolute top-4 right-4" onClick={()=>handleClose(false)}>
        <span className="font-patrick-hand text-4xl uppercase">x</span>
      </button>

      <div>
        <img src="./images/section-mint/egg-nft.png" alt="" />
      </div>
      <div className="font-patrick-hand  uppercase text-center w-1/2 leading-relaxed space-y-6 py-16 px-6">
        <h1 className="text-4xl">Congratulations!</h1>
        <p className="text-3xl">
          You've received an Egg NFT. Burn it to enter the lottery and win 5% of
          the total fund!"
        </p>

        <Link
          href="/burn-nft"
          className=" bg-[#51C947] block max-w-fit px-12 py-4 mx-auto"
        >
          <span className="font-patrick-hand text-3xl uppercase text-white">
            Go to lottery
          </span>
        </Link>
      </div>
    </div>
  );
};

export default MintSuccess;
