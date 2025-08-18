function MovieCards({
  movie: { title, vote_average, poster_path, release_date, original_language },
}) {
  return (
    <div className="bg-gray-900 p-5 rounded-2xl shadow-lg">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w400/${poster_path}`
            : "./Poster_not_available.jpg"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3 className="text-white font-semibold text-lg truncate">{title}</h3>
        <div className="text-white flex items-center gap-2 mt-2 text-sm">
          <div className="flex items-center gap-2">
            <img className="w-4 h-4" src="./star-rating.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>

          <span>•</span>
          <p className="uppercase">{original_language}</p>

          <span>•</span>
          <p>{release_date ? release_date.split("_")[0] : "N/A"}</p>
        </div>
      </div>
    </div>
  )
}

export default MovieCards
