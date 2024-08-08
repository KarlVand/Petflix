//TMDB
const API_KEY = "api_key=5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// Sélectionner les éléments HTML
const titleEl = document.getElementById("title");
const yearEl = document.getElementById("year");
const durationEl = document.getElementById("duration");
const realEl = document.getElementById("real");
const actorsEl = document.getElementById("actors");
const synopsisEl = document.getElementById("synopsis");
const genreEl = document.getElementById("genreT");
const posterEl = document.querySelector(".moviePoster img");

// Fonction qui permet d'extraire les films et les posters a partir du backend
fetch("/api/movies")
  .then((response) => response.json())
  .then((movies) => {
    if (movies.length > 0) {
      // Afficher le premier film (ou adapter pour afficher plusieurs films)
      const movie = movies[0];
      getMovieDetails(movie.id);
    }
  })
  .catch((error) => {
    console.error("Error fetching movies from backend:", error);
  });

// Fonction pour obtenir les détails d'un film depuis l'API
function getMovieDetails(id) {
  const url = `${BASE_URL}/movie/${id}?${API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovieDetails(data);
    })
    .catch((error) => {
      console.error("Error fetching movie details:", error);
    });
}

// Fonction pour afficher les détails du film sur HTML
function showMovieDetails(movie) {
  const { title, poster_path, release_date, runtime, overview, genres } = movie;

  titleEl.textContent = title;
  yearEl.textContent = release_date.split("-")[0];
  durationEl.textContent = `${Math.floor(runtime / 60)}h${runtime % 60}m`;
  realEl.textContent = "Spielberg"; // Remplacer par le bon réalisateur si l'info est disponible
  actorsEl.textContent = "Walberg, Iceberg, Cyberg"; // Remplacer par le bon casting si l'info est disponible
  synopsisEl.textContent = overview;
  genreEl.textContent = genres.map((genre) => genre.name).join(", ");
  posterEl.src = `${IMG_URL + poster_path}`;
  posterEl.alt = title;
}

// Fonction qui va déterminer la couleur selon la popularité du film
function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
