const API_KEY = "5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZWQyNmRlNDIzYjZiZGVlZWY1Njc3MmZhYzczNjA0NyIsIm5iZiI6MTcyMjUxODE5OS41ODYxMTQsInN1YiI6IjY2YWE0ZGZlOGNkZDA0YTdmYjc1NmMwOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._9cE4eRH0KFU2pqsR1HKAcjVFg0BE8sOTRZxIlpuLGg",
  },
};

const main = document.getElementById("movies-container");

fetch(
  `${BASE_URL}/account/21415217/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
  options
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    showMovies(data.results);
  })
  .catch((err) => console.error(err));

function showMovies(movies) {
  main.innerHTML = "";
  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;
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
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
