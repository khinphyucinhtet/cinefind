import { curatedSections, isInWatchlist, toggleWatchlistMovie } from "./movie-data.js";
import { t } from "./i18n.js";

const state = {
  activeCategory: window.location.hash.replace("#", "") || curatedSections[0].id,
};

const elements = {
  tabs: document.querySelector("[data-trending-tabs]"),
  sections: document.querySelector("[data-trending-sections]"),
};

const createWatchlistButton = (movie) => `
  <button
    type="button"
    class="watchlist-btn watchlist-btn-compact ${isInWatchlist(movie.imdbID) ? "is-saved" : ""}"
    data-trending-watchlist
    data-imdb-id="${movie.imdbID}"
    data-title="${movie.Title.replaceAll('"', "&quot;")}"
    data-year="${movie.Year}"
    data-poster="${movie.Poster}"
    data-type="${movie.Type}"
    data-rating="${movie.imdbRating || "N/A"}"
  >
    ${isInWatchlist(movie.imdbID) ? t("saved") : t("watchlist")}
  </button>
`;

const renderTabs = () => {
  elements.tabs.innerHTML = curatedSections
    .map(
      ({ id, label }) => `
        <button type="button" class="category-tab ${state.activeCategory === id ? "is-active" : ""}" data-trending-tab="${id}">
          ${t(label)}
        </button>
      `
    )
    .join("");
};

const renderSections = () => {
  const ordered = [
    curatedSections.find(({ id }) => id === state.activeCategory),
    ...curatedSections.filter(({ id }) => id !== state.activeCategory),
  ].filter(Boolean);

  elements.sections.innerHTML = ordered
    .map(
      ({ id, title, movies }) => `
        <section class="featured-section" id="${id}">
          <div class="featured-header">
            <div class="featured-title-wrap">
              <span class="featured-accent"></span>
          <h2 class="featured-title">${t(title)}</h2>
            </div>
          </div>
          <div class="featured-grid">
            ${movies
              .map(
                (movie) => `
                  <article class="featured-card">
                    <a class="featured-poster" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" rel="noreferrer">
                      <img src="${movie.Poster}" alt="${movie.Title} poster" loading="lazy" onerror="this.src='assets/placeholder-poster.png'" />
                    </a>
                    <div class="featured-meta">
                      <h3 class="featured-name">${movie.Title}</h3>
                      <div class="featured-info">
                        <span class="featured-rating">${movie.imdbRating || "N/A"}</span>
                        <span>${movie.Year}</span>
                      </div>
                      ${createWatchlistButton(movie)}
                    </div>
                  </article>
                `
              )
              .join("")}
          </div>
        </section>
      `
    )
    .join("");
};

const handleClick = (event) => {
  const tab = event.target.closest("[data-trending-tab]");
  if (tab) {
    state.activeCategory = tab.dataset.trendingTab;
    window.location.hash = state.activeCategory;
    renderTabs();
    renderSections();
    return;
  }

  const toggle = event.target.closest("[data-trending-watchlist]");
  if (!toggle) return;

  toggleWatchlistMovie({
    imdbID: toggle.dataset.imdbId,
    Title: toggle.dataset.title,
    Year: toggle.dataset.year,
    Poster: toggle.dataset.poster,
    Type: toggle.dataset.type,
    imdbRating: toggle.dataset.rating,
  });

  renderSections();
};

const initTrending = () => {
  renderTabs();
  renderSections();
  document.addEventListener("click", handleClick);
};

document.addEventListener("DOMContentLoaded", initTrending);
