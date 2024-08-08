//TMDB
const API_KEY = "api_key=5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const main = document.getElementById("jumbo");

// Fonction qui permet d'extraire les films et les posters a partir du backend
fetch('/api/movies')
    .then(response => response.json())
    .then(movies => {
        movies.forEach(movie => {
            getMoviePoster(movie);
        });
    })
    .catch(error => {
        console.error('Error fetching movies from backend:', error);
    });

// Fonction pour obtenir les posters depuis l'API
function getMoviePoster(movie) {
    const url = `${BASE_URL}/movie/${movie.id}?${API_KEY}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showMovie(data, movie);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
        });
}

// Ffontion pour afficher les films sur HTML
function showMovie(tmdbMovie, dbMovie) {
    const { title, poster_path, vote_average, overview } = tmdbMovie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `  
        <img src="${IMG_URL + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            ${overview}
        </div>
    `;

    main.appendChild(movieEl);
}

// Fontion qui va determiner la couleur  celon la notoriete du film
function getColor(vote) {
    if (vote >= 8) {
        return "green";
    } else if (vote >= 5) {
        return "orange";
    } else {
        return "red";
    }
}
