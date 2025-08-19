export default function SearchingBar(){
    return(
        <div>
       <form  className="flex gap-2 mb-4">
      <input
        type="text"
        placeholder="Encuentra libros usando menciones, por ejemplo: @depresion"
      //   value={query}
      //   onChange={(e) => setQuery(e.target.value)}
        className="flex-grow border border-gray-300 rounded px-3 py-1"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-1 rounded cursor-pointer hover:bg-orange-700"
      >
        Buscar
      </button>
      </form>

</div>
    )
}