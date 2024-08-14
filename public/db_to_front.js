document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000/api/movies";
  const moviesContainer = document.getElementById("movies-container");

  async function fetchMovies() {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (Array.isArray(data.movies) && data.movies.length > 0) {
        data.movies.forEach((movie) => {
          const movieElement = document.createElement("div");
          movieElement.classList.add("movie");

          if (typeof movie.poster_path === "string") {
            movieElement.innerHTML = `
                            <img src="https://image.tmdb.org/t/p/w500${
                              movie.poster_path
                            }" alt="${movie.title}">
                            <div class="movie-info">
                                <h3>${movie.title}</h3>
                                <p>${movie.release_date}</p>
                            </div>
                            <div class="overview">
                                <h4>Overview</h4>
                                <p>${movie.overview}</p>
                                <h4>Videos</h4>
                                ${movie.videos
                                  .map(
                                    (video) => `
                                    <p>${video.name} - 
                                    <a href="https://www.youtube.com/watch?v=${video.key}" target="_blank">Watch</a></p>
                                `
                                  )
                                  .join("")}
                            </div>
                        `;
          }

          moviesContainer.appendChild(movieElement);
        });
      } else {
        moviesContainer.innerHTML = "<p>No movies found.</p>";
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      moviesContainer.innerHTML = "<p>Failed to load movies.</p>";
    }
  }

  fetchMovies();
});
