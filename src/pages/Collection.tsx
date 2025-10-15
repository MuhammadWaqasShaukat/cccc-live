import Sidebar from "../components/Collection/Sidebar";

const Collection = () => {
  return (
    <div className="h-screen w-screen bg-collection bg-cover bg-repeat-y releative overflow-hidden flex flex-row justify-start items-stretch">
      {/* <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-keys max-h-[200px] max-w-[175px] h-full w-full top-[7%] -right-[40px]"></div>
      <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-coins max-h-[154px] max-w-[195px] h-full w-full top-[20%] -right-[90px]"></div>
      <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-ipods max-w-[216px] max-h-[164px] h-full w-full top-[40%] rotate-[270deg] -right-[80px]"></div>
      <div className="bg-no-repeat overflow-clip  bg-contain absolute bg-collection-chips max-h-[327px] max-w-[320px] h-full w-full top-[60%] -right-[180px]"></div> */}
      <Sidebar />
      <div className=""></div>
    </div>
  );
};

export default Collection;
