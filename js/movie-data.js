export const WATCHLIST_KEY = "cinefind_watchlist";

export const curatedSections = [
  {
    id: "trending",
    label: "Trending",
    title: "Trending Movies",
    movies: [
      { Title: "Dune: Part Two", Year: "2024", Poster: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt15239678", imdbRating: "8.4" },
      { Title: "Oppenheimer", Year: "2023", Poster: "https://m.media-amazon.com/images/M/MV5BN2JkMDc5MGQtZjg3YS00NmFiLWIyZmQtZTJmNTM5MjVmYTQ4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt15398776", imdbRating: "8.2" },
      { Title: "John Wick: Chapter 4", Year: "2023", Poster: "https://m.media-amazon.com/images/M/MV5BY2Q2ZmI5ZjUtNWVhMC00YzJkLTlmYjMtY2RmZDhkNzEzYjZhXkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt10366206", imdbRating: "7.6" },
      { Title: "The Batman", Year: "2022", Poster: "https://m.media-amazon.com/images/M/MV5BMmU5NGJlMzAtMGNmOC00YjJjLTgyMzUtNjAyYmE4Njg5YWMyXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt1877830", imdbRating: "7.8" },
    ],
  },
  {
    id: "top-rated",
    label: "Top Rated",
    title: "Top Rated",
    movies: [
      { Title: "The Godfather", Year: "1972", Poster: "https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_QL75_UY562_CR8,0,380,562_.jpg", Type: "movie", imdbID: "tt0068646", imdbRating: "9.2" },
      { Title: "The Dark Knight", Year: "2008", Poster: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt0468569", imdbRating: "9.1" },
      { Title: "The Shawshank Redemption", Year: "1994", Poster: "https://m.media-amazon.com/images/M/MV5BMDAyY2FhYjctNDc5OS00MDNlLThiMGUtY2UxYWVkNGY2ZjljXkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg", Type: "movie", imdbID: "tt0111161", imdbRating: "9.3" },
      { Title: "Pulp Fiction", Year: "1994", Poster: "https://m.media-amazon.com/images/M/MV5BYTViYTE3ZGQtNDBlMC00ZTAyLTkyODMtZGRiZDg0MjA2YThkXkEyXkFqcGc@._V1_QL75_UY562_CR3,0,380,562_.jpg", Type: "movie", imdbID: "tt0110912", imdbRating: "8.8" },
    ],
  },
  {
    id: "now-playing",
    label: "Now Playing",
    title: "Now Playing",
    movies: [
      { Title: "Inside Out 2", Year: "2024", Poster: "https://m.media-amazon.com/images/M/MV5BYWY3MDE2Y2UtOTE3Zi00MGUzLTg2MTItZjE1ZWVkMGVlODRmXkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt22022452", imdbRating: "7.5" },
      { Title: "Furiosa: A Mad Max Saga", Year: "2024", Poster: "https://m.media-amazon.com/images/M/MV5BNTcwYWE1NTYtOWNiYy00NzY3LWIwY2MtNjJmZDkxNDNmOWE1XkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt12037194", imdbRating: "7.5" },
      { Title: "Kingdom of the Planet of the Apes", Year: "2024", Poster: "https://m.media-amazon.com/images/M/MV5BZDRlZTc3YTItOTk3Yi00NmU4LWFiOGUtNjgwMDZjNjIzNTU1XkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt11389872", imdbRating: "6.8" },
      { Title: "Godzilla x Kong: The New Empire", Year: "2024", Poster: "https://m.media-amazon.com/images/M/MV5BMTY0N2MzODctY2ExYy00OWYxLTkyNDItMTVhZGIxZjliZjU5XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg", Type: "movie", imdbID: "tt14539740", imdbRating: "6.0" },
    ],
  },
  {
    id: "popular",
    label: "Popular",
    title: "Popular Picks",
    movies: [
      { Title: "Interstellar", Year: "2014", Poster: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt0816692", imdbRating: "8.7" },
      { Title: "Inception", Year: "2010", Poster: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt1375666", imdbRating: "8.8" },
      { Title: "Spider-Man: No Way Home", Year: "2021", Poster: "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_QL75_UX380_CR0,4,380,562_.jpg", Type: "movie", imdbID: "tt10872600", imdbRating: "8.1" },
      { Title: "Avatar: The Way of Water", Year: "2022", Poster: "https://m.media-amazon.com/images/M/MV5BNWI0Y2NkOWEtMmM2OC00MjQ3LWI1YzItZGQxYzQ3NzI4NWZmXkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt1630029", imdbRating: "7.5" },
    ],
  },
  {
    id: "upcoming",
    label: "Upcoming",
    title: "Coming Soon",
    movies: [
      { Title: "Superman", Year: "2025", Poster: "https://m.media-amazon.com/images/M/MV5BOGMwZGJiM2EtMzEwZC00YTYzLWIxNzYtMmJmZWNlZjgxZTMwXkEyXkFqcGc@._V1_QL75_UY562_CR35,0,380,562_.jpg", Type: "movie", imdbID: "tt5950044", imdbRating: "7.0" },
      { Title: "The Fantastic Four: First Steps", Year: "2025", Poster: "https://m.media-amazon.com/images/M/MV5BOGM5MzA3MDAtYmEwMi00ZDNiLTg4MDgtMTZjOTc0ZGMyNTIwXkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt10676052", imdbRating: "6.8" },
      { Title: "Avatar: Fire and Ash", Year: "2025", Poster: "https://m.media-amazon.com/images/M/MV5BZDYxY2I1OGMtN2Y4MS00ZmU1LTgyNDAtODA0MzAyYjI0N2Y2XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg", Type: "movie", imdbID: "tt1757678", imdbRating: "7.3" },
      { Title: "The Batman: Part II", Year: "2027", Poster: "https://m.media-amazon.com/images/M/MV5BMTU2NzhiYWUtYThlZi00OWIyLTk3YWEtZjY3NmJjOTZiZDAyXkEyXkFqcGc@._V1_SX300.jpg", Type: "movie", imdbID: "tt19850008", imdbRating: "N/A" },
    ],
  },
];

export const curatedCatalog = curatedSections.flatMap(({ movies }) => movies);

export const normalizeMovie = (movie) => ({
  Title: movie.Title,
  Year: movie.Year,
  Poster: movie.Poster,
  Type: movie.Type,
  imdbID: movie.imdbID,
  imdbRating: movie.imdbRating || "N/A",
});

export const loadWatchlist = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(WATCHLIST_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];

    return parsed.map((movie) => {
      const curatedMovie = curatedCatalog.find(({ imdbID }) => imdbID === movie.imdbID);
      return curatedMovie ? { ...movie, Poster: curatedMovie.Poster, imdbRating: movie.imdbRating || curatedMovie.imdbRating } : movie;
    });
  } catch (error) {
    return [];
  }
};

export const saveWatchlist = (movies) => {
  localStorage.setItem(WATCHLIST_KEY, JSON.stringify(movies));
};

export const isInWatchlist = (imdbID) => loadWatchlist().some((movie) => movie.imdbID === imdbID);

export const toggleWatchlistMovie = (movie) => {
  const normalized = normalizeMovie(movie);
  const current = loadWatchlist();
  const exists = current.some(({ imdbID }) => imdbID === normalized.imdbID);

  if (exists) {
    const next = current.filter(({ imdbID }) => imdbID !== normalized.imdbID);
    saveWatchlist(next);
    return { added: false, items: next };
  }

  const next = [normalized, ...current];
  saveWatchlist(next);
  return { added: true, items: next };
};
