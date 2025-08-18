import { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"

const API_BASE_URL = "https://api.themoviedb.org/3"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
}

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchMovies = async () => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Faild to fetch movies")
      }

      const data = await response.json()

      // if (data.Response === "False") {
      //   setErrorMessage(data.Error || "Failed to fetch movies")
      //   setMovieList([])
      //   return
      // }
      setMovieList(data.results || [])
    } catch (error) {
      console.error(`Error fetching movies:${error}`)
      setErrorMessage("Error fetching movies. please try it again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMovies()
  }, [])

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
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className="text-gray-100 text-center text-2xl">{searchTerm}</h1>
        </header>
        <section>
          <h2 className="text-green-100 text-3xl mt-[40px]">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default App
