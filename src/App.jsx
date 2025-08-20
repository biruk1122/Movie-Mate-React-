import { useEffect, useState } from "react"
import Search from "./components/Search"
import Spinner from "./components/Spinner"
import MovieCards from "./components/MovieCards"
import { useDebounce } from "react-use"
import { updateSearchCount, getTrendingMovies } from "./appwrite"

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
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("")
  const [trendingMovies, setTrendingMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null) // ✅ for modal

  // Debounce search input
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm])

  // Fetch movies from TMDB
  const fetchMovies = async (query = "") => {
    setIsLoading(true)
    setErrorMessage("")
    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`

      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error("Failed to fetch movies")
      }

      const data = await response.json()
      setMovieList(data.results || [])

      if (query && data.results.length > 0) {
        await updateSearchCount(query, data.results[0])
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`)
      setErrorMessage("Error fetching movies. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  // Fetch trending movies
  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies()
      setTrendingMovies(movies || [])
    } catch (error) {
      console.error(`Error fetching trending movies: ${error}`)
    }
  }

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm])

  useEffect(() => {
    loadTrendingMovies()
  }, [])

  return (
    <main className="p-8 bg-gray-950 min-h-screen flex items-center justify-center">
      <div className="pattern" />

      <div>
        {/* Header */}
        <header>
          <img
            src="./movie-image.jpg"
            alt="Movie image"
            className="block mx-auto w-[300px] h-[400px] mix-blend-screen opacity-60 "
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-snug text-center">
            Find{" "}
            <span className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              Movies
            </span>{" "}
            You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className="text-gray-100 text-center text-2xl">{searchTerm}</h1>
        </header>

        {/* Trending Movies */}
        {trendingMovies.length > 0 && (
          <section>
            <h2 className="text-green-100 text-2xl mt-10 mb-4">
              Trending Movies
            </h2>
            <ul className="text-white grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id || movie.id || index}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                  {/* <MovieCards
                    movie={movie}
                    onClick={() => setSelectedMovie(movie)}
                  /> */}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* All Movies */}
        <section>
          <h2 className="text-green-100 text-3xl mb-4 mt-10">All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {movieList.map((movie) => (
                <li key={movie.id}>
                  <MovieCards
                    movie={movie}
                    onClick={() => setSelectedMovie(movie)}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {/* ✅ Modal for movie details */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-6 rounded-xl max-w-lg w-full text-white relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-3 right-3 text-white text-2xl font-bold hover:text-red-400"
            >
              ✕
            </button>

            {/* Poster image */}
            <img
              src={
                selectedMovie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${selectedMovie.poster_path}`
                  : "./Poster_not_available.jpg"
              }
              alt={selectedMovie.title}
              className="rounded-lg mb-4 w-full max-h-[300px] object-cover"
            />

            {/* Movie Info */}
            <h2 className="text-2xl font-bold">{selectedMovie.title}</h2>
            <p className="mt-2 text-gray-300 text-sm leading-relaxed">
              {selectedMovie.overview || "No description available."}
            </p>

            <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-400">
              <span>⭐ {selectedMovie.vote_average?.toFixed(1)}</span>
              <span>🌐 {selectedMovie.original_language?.toUpperCase()}</span>
              <span>📅 {selectedMovie.release_date}</span>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App
