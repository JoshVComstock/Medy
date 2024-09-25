import IconSearch from "@assets/icons/iconSearch"

const Search = () => {
  return (
    <div className="h-9 relative">
      <label htmlFor="search" className="top-0 left-0 h-full p-[10px] px-[14px] text-gray-500 absolute text-base">
        <IconSearch />
      </label>
      <input id="search" className="border h-full rounded-full pl-11 text-sm outline-none text-gray-800" />
    </div>
  )
}

export default Search