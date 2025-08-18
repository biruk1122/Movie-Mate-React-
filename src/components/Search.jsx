function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className=" w-full flex justify-center mt-6">
      <div className="relative w-full max-w-md">
        <img
          src="./search.svg"
          className="w-[30px] h-[30px] absolute left-3 top-1/2 transform -translate-y-1/2 "
          alt="Search Icon"
        />
        <input
          type="text"
          placeholder="Search Movies"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="bg-gray-900 w-full pl-11 pr-4 py-2 rounded-2xl border border-gray-500 text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm"
        />
      </div>
    </div>
  )
}

export default Search
