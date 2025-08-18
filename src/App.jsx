import { useState } from "react"
import Search from "./components/Search"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <main className="p-8 bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="pattern" />

      <div>
        <header>
          <img
            src="./movie-image.jpg"
            alt="Movie image"
            className="block mx-auto w-[300px] h-[400px] mix-blend-screen opacity-60 "
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-snug text-center">
            Find{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to=yellow-500 bg-clip-text text-transparent">
              Movies
            </span>{" "}
            You'll Enjoy Without the Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <h1 className="text-gray-100 text-center text-2xl">{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
