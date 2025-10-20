const Search = () => {
  return (
    <div className=" w-full mt-5 flex flex-row justify-start items-center gap-2 bg-[#D9CBB7] p-2  border border-[#8B806F]">
      <div className=" bg-sidebar-search-icon bg-contain bg-no-repeat size-6 aspect-square "></div>
      <input
        type="search"
        placeholder="sort by serial"
        className=" bg-transparent text-xl text-[#8B806F] placeholder:uppercase placeholder:text-[#8B806F]  flex-1 focus:outline-none focus:border-none"
      />
    </div>
  );
};

export default Search;
