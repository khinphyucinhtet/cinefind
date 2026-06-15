import { curatedCatalog, curatedSections, isInWatchlist, toggleWatchlistMovie } from "./movie-data.js";
import { t } from "./i18n.js";

const appState = {
  apiKey: "",
  activeTag: "trending",
  activeCategory: curatedSections[0].id,
  placeholderPoster: "assets/placeholder-poster.png",
  browseTags: [
    { id: "action", labelKey: "action", type: "search", value: "Action" },
    { id: "romance", labelKey: "romance", type: "search", value: "Romance" },
    { id: "thriller", labelKey: "thriller", type: "search", value: "Thriller" },
    { id: "horror", labelKey: "horror", type: "search", value: "Horror" },
    { id: "trending", labelKey: "trending", type: "category", value: "trending" },
    { id: "popular", labelKey: "popular", type: "category", value: "popular" },
  ],
};

const elements = {
  searchForm: document.querySelector("[data-search-form]"),
  searchInput: document.querySelector("[data-search-input]"),
  browseTags: document.querySelector("[data-browse-tags]"),
  resultsPanel: document.querySelector(".search-results-panel"),
  resultsGrid: document.querySelector("[data-results-grid]"),
  feedbackBox: document.querySelector("[data-feedback]"),
  resultsCount: document.querySelector("[data-result-count]"),
  sectionTitle: document.querySelector("[data-section-title]"),
  featuredSections: document.querySelector("[data-featured-sections]"),
};

const delay = (time = 350) => new Promise((resolve) => window.setTimeout(resolve, time));

const loadConfig = async () => {
  try {
    const configModule = await import("./config.js");
    appState.apiKey = configModule.API_KEY || "";
  } catch (error) {
    appState.apiKey = "";
  }
};

const hasRealApiKey = (value = "") =>
  Boolean(value) && !value.includes("YOUR_API_KEY") && !value.includes("PASTE_YOUR_OMDB_API_KEY");

const buildDirectUrl = (query) =>
  `https://www.omdbapi.com/?apikey=${appState.apiKey}&s=${encodeURIComponent(query)}`;

const buildProxyUrl = (query) => `/api/omdb?query=${encodeURIComponent(query)}`;

const setFeedbackState = ({ icon, title, message, stateClass = "is-empty" }) => {
  const { feedbackBox, resultsGrid, resultsCount, resultsPanel } = elements;

  resultsPanel.classList.add("is-visible");
  feedbackBox.className = `feedback-box ${stateClass}`;
  feedbackBox.innerHTML = `
    <div class="feedback-icon">${icon}</div>
    <h3>${title}</h3>
    <p>${message}</p>
  `;

  resultsGrid.classList.remove("is-visible");
  resultsGrid.innerHTML = "";
  resultsCount.textContent = "";
};

const renderBrowseTags = () => {
  elements.browseTags.innerHTML = appState.browseTags
    .map(
      ({ id, labelKey }, index) => `
        <button type="button" class="browse-tag ${index === 4 ? "is-active" : ""}" data-browse-tag="${id}">
          ${t(labelKey)}
        </button>
      `
    )
    .join("");
};

const updateActiveCategory = (selectedCategory = curatedSections[0].id) => {
  appState.activeCategory = selectedCategory;
};

const updateActiveBrowseTag = (selectedTag = "trending") => {
  appState.activeTag = selectedTag;

  document.querySelectorAll("[data-browse-tag]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.browseTag === selectedTag);
  });
};

const applySavedPreferences = () => {
  if (localStorage.getItem("cinefind_auto_suggestions") === "false") {
    elements.browseTags.style.display = "none";
  }

  if (localStorage.getItem("cinefind_poster_animation") === "false") {
    document.body.classList.add("no-poster-animation");
  }
};

const requestJson = async (url) => {
  const response = await fetch(url);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : null;

  if (!response.ok) {
    throw new Error(data?.Error || "The movie service is unavailable right now.");
  }

  if (!isJson) {
    throw new Error("The movie service returned an unexpected response.");
  }

  return data;
};

const searchLocalCatalog = (query) => {
  const normalizedQuery = query.trim().toLowerCase();
  return curatedCatalog.filter(({ Title }) => Title.toLowerCase().includes(normalizedQuery));
};

const getMovies = async (query) => {
  try {
    if (window.location.protocol.startsWith("http")) {
      return await requestJson(buildProxyUrl(query));
    }
  } catch (error) {
    if (!hasRealApiKey(appState.apiKey)) {
      return { Response: "True", Search: searchLocalCatalog(query), fallback: true };
    }
  }

  if (hasRealApiKey(appState.apiKey)) {
    try {
      return await requestJson(buildDirectUrl(query));
    } catch (error) {
      return { Response: "True", Search: searchLocalCatalog(query), fallback: true };
    }
  }

  return { Response: "True", Search: searchLocalCatalog(query), fallback: true };
};

const createWatchlistButton = (movie, compact = false) => {
  const inWatchlist = isInWatchlist(movie.imdbID);

  return `
    <button
      type="button"
      class="watchlist-btn ${compact ? "watchlist-btn-compact" : ""} ${inWatchlist ? "is-saved" : ""}"
      data-watchlist-toggle
      data-imdb-id="${movie.imdbID}"
      data-title="${movie.Title.replaceAll('"', "&quot;")}"
      data-year="${movie.Year}"
      data-poster="${movie.Poster}"
      data-type="${movie.Type}"
      data-rating="${movie.imdbRating || "N/A"}"
    >
      ${inWatchlist ? t("saved") : t("watchlist")}
    </button>
  `;
};

const createFeaturedCard = (movie) => {
  const safePoster = movie.Poster === "N/A" ? appState.placeholderPoster : movie.Poster;

  return `
    <article class="featured-card">
      <a class="featured-poster" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" rel="noreferrer">
        <img src="${safePoster}" alt="${movie.Title} poster" loading="lazy" onerror="this.src='assets/placeholder-poster.png'" />
      </a>
      <div class="featured-meta">
        <h3 class="featured-name">${movie.Title}</h3>
        <div class="featured-info">
          <span class="featured-rating">${movie.imdbRating || "N/A"}</span>
          <span>${movie.Year}</span>
        </div>
        ${createWatchlistButton(movie, true)}
      </div>
    </article>
  `;
};

const renderFeaturedSections = () => {
  const orderedSections = [
    curatedSections.find(({ id }) => id === appState.activeCategory),
    ...curatedSections.filter(({ id }) => id !== appState.activeCategory),
  ].filter(Boolean);

  elements.featuredSections.innerHTML = orderedSections
    .map(
      ({ id, title, movies }) => `
        <section class="featured-section" id="${id}">
          <div class="featured-header">
            <div class="featured-title-wrap">
              <span class="featured-accent"></span>
              <h2 class="featured-title">${t(title)}</h2>
            </div>
            <a class="featured-link" href="trending.html#${id}">${t("viewAll")}</a>
          </div>
          <div class="featured-grid">
            ${movies.map((movie) => createFeaturedCard(movie)).join("")}
          </div>
        </section>
      `
    )
    .join("");
};

const createMovieCard = (movie) => {
  const safePoster = movie.Poster === "N/A" ? appState.placeholderPoster : movie.Poster;
  const movieType = movie.Type ? movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1) : "Movie";

  return `
    <article class="movie-card">
      <div class="poster-frame">
        <img src="${safePoster}" alt="${movie.Title} poster" loading="lazy" onerror="this.src='assets/placeholder-poster.png'" />
      </div>
      <div class="movie-meta">
        <h3 class="movie-title">${movie.Title}</h3>
        <div class="movie-detail-row">
          <span class="movie-badge">${movie.imdbRating || "N/A"}</span>
          <span>${movie.Year}</span>
          <span class="movie-type">${movieType}</span>
        </div>
        <div class="movie-card-actions">
          <a class="movie-link" href="https://www.imdb.com/title/${movie.imdbID}/" target="_blank" rel="noreferrer">
            ${t("viewOnImdb")}
          </a>
          ${createWatchlistButton(movie)}
        </div>
      </div>
    </article>
  `;
};

const renderMovies = (query, movies = [], isFallback = false) => {
  const { resultsGrid, feedbackBox, resultsCount, sectionTitle, resultsPanel } = elements;
  const validMovies = movies.filter(({ Title, imdbID }) => Title && imdbID);

  if (!validMovies.length) {
    throw new Error(`${t("noUsableResults")} "${query}".`);
  }

  const movieCount = validMovies.reduce((count) => count + 1, 0);

  resultsPanel.classList.add("is-visible");
  resultsGrid.innerHTML = validMovies.map((movie) => createMovieCard(movie)).join("");
  resultsGrid.classList.add("is-visible");
  feedbackBox.classList.add("is-hidden");

  sectionTitle.textContent = `${t("searchResultsFor")} "${query}"`;
  resultsCount.textContent = isFallback
    ? t("showingCatalog", { count: movieCount })
    : t("showingMovies", { count: movieCount });
};

const searchMovies = async (query) => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    elements.resultsPanel.classList.remove("is-visible");
    return;
  }

  updateActiveBrowseTag(trimmedQuery.toLowerCase());
  elements.sectionTitle.textContent = t("searching");

  setFeedbackState({
    icon: "",
    title: t("loadingTitle"),
    message: t("loadingMessage"),
    stateClass: "is-loading",
  });

  try {
    const [data] = await Promise.all([getMovies(trimmedQuery), delay()]);

    if (data.Response === "False" || !data.Search?.length) {
      throw new Error(data.Error || `${t("noMoviesFound")} "${trimmedQuery}".`);
    }

    renderMovies(trimmedQuery, data.Search, Boolean(data.fallback));
  } catch (error) {
    setFeedbackState({
      icon: "!",
      title: t("failedTitle"),
      message: error.message,
      stateClass: "is-error",
    });
  }
};

const handleBrowseTagClick = (event) => {
  const browseButton = event.target.closest("[data-browse-tag]");
  if (!browseButton) return;

  const selectedTag = appState.browseTags.find(({ id }) => id === browseButton.dataset.browseTag);
  if (!selectedTag) return;

  updateActiveBrowseTag(selectedTag.id);

  if (selectedTag.type === "search") {
    elements.searchInput.value = selectedTag.value;
    searchMovies(selectedTag.value);
    return;
  }

  updateActiveCategory(selectedTag.value);
  elements.resultsPanel.classList.remove("is-visible");
  renderFeaturedSections();
};

const handleWatchlistToggle = (event) => {
  const toggleButton = event.target.closest("[data-watchlist-toggle]");
  if (!toggleButton) return;

  const movie = {
    imdbID: toggleButton.dataset.imdbId,
    Title: toggleButton.dataset.title,
    Year: toggleButton.dataset.year,
    Poster: toggleButton.dataset.poster,
    Type: toggleButton.dataset.type,
    imdbRating: toggleButton.dataset.rating,
  };

  toggleWatchlistMovie(movie);
  renderFeaturedSections();

  if (elements.resultsGrid.classList.contains("is-visible")) {
    const currentQuery = elements.searchInput.value.trim();
    if (currentQuery) {
      searchMovies(currentQuery);
    }
  }
};

const initApp = async () => {
  await loadConfig();
  elements.searchInput.placeholder = t("searchPlaceholder");
  renderBrowseTags();
  renderFeaturedSections();
  applySavedPreferences();

  elements.searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    searchMovies(elements.searchInput.value);
  });
  elements.searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchMovies(elements.searchInput.value);
    }
  });
  elements.browseTags.addEventListener("click", handleBrowseTagClick);
  document.addEventListener("click", handleWatchlistToggle);
};

document.addEventListener("DOMContentLoaded", initApp);
