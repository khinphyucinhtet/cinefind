# CineFind

CineFind is a Vanilla JavaScript movie search and browsing web app. It uses the OMDb API to find movie data, shows featured movie sections, lets users save movies to a watchlist, and includes a cinematic neon-red mobile app style.

## Project Purpose

This project is for personal use, learning, exploring, and testing the OMDb API in a movie search app. It is not a commercial product and is not meant for production business use.

## Links

- GitHub repository: [https://github.com/khinphyucinhtet/cinefind](https://github.com/khinphyucinhtet/cinefind)
- Vercel deploy page: [https://vercel.com/new](https://vercel.com/new)
- Live Vercel link: Add your Vercel app URL here after deployment.

## Project Summary

The app starts with a splash screen, then opens the home page. The home page shows movie sections immediately, so the app does not feel empty. Users can search for a movie, view real OMDb results, save movies, open the Trending page, and manage saved movies in the Watchlist page.

The layout is made to look like a cozy YouTube-style movie app:

- Black cinematic background
- Neon red highlights
- Dark movie cards
- Real movie poster images
- Fixed header and footer
- Scrollable body content
- Responsive layout for laptop and phone screens

## API Used

This project uses the OMDb API.

OMDb stands for Open Movie Database. It gives movie information such as:

- Movie title
- Release year
- Poster image
- Movie type
- IMDb ID
- IMDb rating

Search API format:

```text
https://www.omdbapi.com/?apikey=YOUR_API_KEY&s=movieName
```

Movie details API format:

```text
https://www.omdbapi.com/?apikey=YOUR_API_KEY&i=imdbID
```

In this project:

- Local development reads the API key from `js/config.js`
- Vercel hosting uses the secure `OMDB_API_KEY` environment variable
- `api/omdb.js` protects the API key when deployed on Vercel

## Programming Languages And Technologies

Languages:

- HTML
- CSS
- JavaScript

Technologies and browser features:

- OMDb API
- Fetch API
- ES6 modules
- Async / await
- Promises
- Try / catch
- Template literals
- Destructuring
- `map()`
- `filter()`
- `reduce()`
- Local Storage
- Vercel Serverless Function

## Main Features

- 4-second splash screen with animated loading bar
- Home page with search and featured movies
- Real OMDb movie search
- Trending page with movie sections
- Watchlist page with saved movies
- Menu page
- Profile page with local profile saving
- Settings page with saved preferences
- Language page with English, Malay, and Simplified Chinese
- About and Help pages
- Fixed header and footer navigation
- Scrollable body area
- Responsive movie cards
- Real movie poster images with fallback placeholder
- Vercel-ready deployment setup

## What Makes This App Stand Out

CineFind is more than a basic search form. It feels like a real movie browsing app because it includes:

- A branded splash screen before the app opens
- Featured movie sections before the user searches
- A watchlist that remembers saved movies
- Multi-language UI support
- A mobile-app style layout that also works on laptop screens
- Neon visual styling that matches the movie theme
- Safe API key handling for GitHub and Vercel
- Fallback movie data, so the app still looks useful if the API is unavailable

## How The App Works

1. `index.html` redirects users to `splash.html`
2. `splash.html` shows the CineFind splash screen for 4 seconds
3. `js/splash.js` redirects to `home.html`
4. `home.html` shows search, category buttons, and featured movie sections
5. `js/app.js` loads the OMDb API key and handles searching
6. Movie results are displayed as cards with posters, title, year, type, and buttons
7. Users can save movies to the watchlist
8. Saved movies are stored in Local Storage
9. `watchlist.html` reads Local Storage and displays saved movies
10. `language.html` saves the selected language and the app UI updates from `js/i18n.js`

## OMDb API Key Setup

OMDb sends an email after you request a key.

Example email text:

```text
Here is your key: YOUR_KEY
Click the following URL to activate your key:
http://www.omdbapi.com/apikey.aspx?VERIFYKEY=YOUR_VERIFY_TOKEN
```

Important:

- `YOUR_KEY` is the real API key
- `YOUR_VERIFY_TOKEN` is only the activation token
- The short 8-character key is the one used in API requests

Example working API request:

```text
http://www.omdbapi.com/?i=tt3896198&apikey=YOUR_KEY
```

## How To Get An OMDb API Key

1. Go to [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
2. Choose the free API key option
3. Enter your email address
4. Open the email from OMDb
5. Click the activation link
6. Copy the short API key from the email
7. Put the key in `js/config.js` for local testing
8. Put the key in Vercel as `OMDB_API_KEY` for hosting

## How To Run Locally

Open a terminal in the project folder and run:

```bash
python -m http.server 5500
```

Then open:

```text
http://localhost:5500
```

Do not open the HTML files directly by double-clicking if the API import does not work. A local server is better because JavaScript modules and API requests work correctly.

## How To Host On Vercel

1. Push the project to GitHub
2. Go to Vercel
3. Import the GitHub repository
4. Add this Environment Variable:

```text
OMDB_API_KEY=your_real_omdb_api_key
```

5. Deploy the project

Vercel will use `api/omdb.js` to call OMDb safely without exposing the API key in frontend code.

## File Guide

### HTML Files

| File | Purpose |
| --- | --- |
| `index.html` | Entry file for hosting. It redirects the user to the splash screen. |
| `splash.html` | Shows the cinematic CineFind splash screen, logo background, and loading progress. |
| `home.html` | Main app screen. Includes header, search bar, six browse buttons, featured movies, search results, and footer navigation. |
| `trending.html` | Shows larger movie sections such as Trending, Top Rated, Now Playing, Popular, and Upcoming. |
| `watchlist.html` | Shows movies saved by the user. Includes an empty state when nothing is saved. |
| `menu.html` | Main menu page. Links to Profile, Settings, Language, About App, and Help & Support. |
| `profile.html` | Profile page with name, email, avatar upload, save, and reset controls. |
| `setting.html` | Settings page with toggles for notifications, suggestions, and poster animation. |
| `language.html` | Language selector page. Includes English, Malay, and Chinese only. |
| `about.html` | Explains what CineFind is and what technologies it uses. |
| `help.html` | Simple help and support contact page. |
| `header.html` | Reference/shared header markup for the app design. |
| `footer.html` | Reference/shared footer navigation markup for the app design. |

### CSS File

| File | Purpose |
| --- | --- |
| `css/style.css` | Contains all styling for splash, home, trending, watchlist, menu, profile, settings, language, about, help, cards, buttons, responsiveness, fixed header, fixed footer, and animations. |

Important things inside `style.css`:

- CSS variables for colors and sizes
- Black and neon red theme
- Responsive app shell
- Fixed bottom navigation
- Scrollable page body
- Movie card grid layout
- Poster image sizing
- Hover effects
- Splash screen background and loading animation
- Mobile breakpoints

### JavaScript Files

| File | Purpose |
| --- | --- |
| `js/config.js` | Stores the real OMDb API key for local development. This file is ignored by Git. |
| `js/config.example.js` | Example config file showing where the API key should go. Safe to push to GitHub. |
| `js/splash.js` | Waits 4 seconds, then redirects from `splash.html` to `home.html`. |
| `js/app.js` | Main home page logic. Handles API loading, search, loading state, error state, movie cards, featured sections, browse buttons, watchlist saving, and OMDb fallback behavior. |
| `js/movie-data.js` | Stores curated movie sections, real poster URLs, watchlist Local Storage helpers, movie normalization, and old saved-poster migration. |
| `js/trending.js` | Builds the Trending page sections, category tabs, movie cards, and watchlist buttons. |
| `js/watchlist.js` | Reads saved movies from Local Storage and displays or removes them from the Watchlist page. |
| `js/profile.js` | Saves profile name, email, and avatar image in Local Storage. Also validates profile input. |
| `js/settings.js` | Saves settings toggle values in Local Storage and applies toggle state. |
| `js/language.js` | Handles language selection and saves the selected language in Local Storage. |
| `js/i18n.js` | Shared translation file for English, Malay, and Simplified Chinese UI labels. |

Important JavaScript concepts included:

- `const` and `let`
- Arrow functions
- Template literals
- Destructuring
- `map()`
- `filter()`
- `reduce()`
- Promises
- Async / await
- Fetch API
- Try / catch
- ES modules
- Local Storage

### API File

| File | Purpose |
| --- | --- |
| `api/omdb.js` | Vercel serverless API route. It receives the search query, reads `OMDB_API_KEY`, calls OMDb, and returns movie results securely. |

### Asset Files

| File or Folder | Purpose |
| --- | --- |
| `assets/logo.png` | CineFind logo image used by the app. |
| `assets/placeholder-poster.png` | Fallback image used when a movie has no poster or a poster fails to load. |
| `assets/splash-reference.png` | Splash screen background image based on the provided reference design. |
| `assets/posters/` | Older local poster assets kept in the project folder. The app now uses real OMDb poster URLs for featured cards. |

## Project Structure

```text
CineFind/
|
|-- index.html
|-- splash.html
|-- home.html
|-- trending.html
|-- watchlist.html
|-- menu.html
|-- profile.html
|-- setting.html
|-- language.html
|-- about.html
|-- help.html
|-- header.html
|-- footer.html
|-- README.md
|-- .gitignore
|
|-- api/
|   `-- omdb.js
|
|-- assets/
|   |-- logo.png
|   |-- placeholder-poster.png
|   |-- splash-reference.png
|   `-- posters/
|
|-- css/
|   `-- style.css
|
`-- js/
    |-- app.js
    |-- config.example.js
    |-- config.js
    |-- i18n.js
    |-- language.js
    |-- movie-data.js
    |-- profile.js
    |-- settings.js
    |-- splash.js
    |-- trending.js
    `-- watchlist.js
```

## GitHub Push Commands

```bash
git init
git add .
git commit -m "Initial commit - CineFind movie search app"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

## Notes

- `js/config.js` should not be pushed to GitHub because it contains the real API key.
- `.gitignore` includes `js/config.js`.
- For Vercel, use `OMDB_API_KEY` instead of uploading `js/config.js`.
- Movie titles are kept in their original official names, even when the UI language changes.
