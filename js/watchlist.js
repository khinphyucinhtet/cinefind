import { loadWatchlist, toggleWatchlistMovie } from "./movie-data.js";
import { t } from "./i18n.js";

const elements = {
  emptyState: document.querySelector("[data-watchlist-empty]"),
  grid: document.querySelector("[data-watchlist-grid]"),
};

const createCard = (movie) => `
  <article class="movie-card">
    <div class="poster-frame">
      <img src="${movie.Poster}" alt="${movie.Title} poster" loading="lazy" onerror="this.src='assets/placeholder-poster.png'" />
    </div>
    <div class="movie-meta">
      <h3 class="movie-title">${movie.Title}</h3>
      <div class="movie-detail-row">
        <span class="movie-badge">${movie.imdbRating || "N/A"}</span>
        <span>${movie.Year}</span>
        <span>${movie.Type}</span>
      </div>
      <div class="movie-card-actions">
        <a class="movie-link" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" rel="noreferrer">
          ${t("viewOnImdb")}
        </a>
        <button
          type="button"
          class="watchlist-btn is-saved"
          data-watchlist-remove
          data-imdb-id="${movie.imdbID}"
          data-title="${movie.Title.replaceAll('"', "&quot;")}"
          data-year="${movie.Year}"
          data-poster="${movie.Poster}"
          data-type="${movie.Type}"
          data-rating="${movie.imdbRating || "N/A"}"
        >
          ${t("remove")}
        </button>
      </div>
    </div>
  </article>
`;

const renderWatchlist = () => {
  const movies = loadWatchlist();
  const hasMovies = movies.length > 0;

  elements.emptyState.classList.toggle("is-hidden", hasMovies);
  elements.grid.classList.toggle("is-visible", hasMovies);
  elements.grid.innerHTML = hasMovies ? movies.map((movie) => createCard(movie)).join("") : "";
};

const handleRemove = (event) => {
  const button = event.target.closest("[data-watchlist-remove]");
  if (!button) return;

  toggleWatchlistMovie({
    imdbID: button.dataset.imdbId,
    Title: button.dataset.title,
    Year: button.dataset.year,
    Poster: button.dataset.poster,
    Type: button.dataset.type,
    imdbRating: button.dataset.rating,
  });

  renderWatchlist();
};

document.addEventListener("DOMContentLoaded", () => {
  renderWatchlist();
  document.addEventListener("click", handleRemove);
});
