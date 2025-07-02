const Expiration = () => {
  return (
    <div className="md:!w-[246px] w-full rounded-[7px] p-2 flex flex-row md:flex-col gap-2">
      <div className=" flex-row flex justify-start gap-2 items-center">
        <img src="./images/icon-refresh.svg" alt="" />
        <span className=" font-patrick-hand-sc text-md md:text-[28px] uppercase whitespace-nowrap">
          price changes in
        </span>
      </div>

      <div className="bg-white md:w-full flex-1 rounded-[5px] flex-row flex justify-center items-center">
        <span className="font-patrick-hand text-md md:text-[28px] text-[#0A0A0A]">
          3D : 7H : 23M : 14S
        </span>
      </div>
    </div>
  );
};

export default Expiration;
