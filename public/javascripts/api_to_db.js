const axios = require("axios");
const zlib = require("zlib");
const fs = require("fs");
const readline = require("readline");
const db = require("./db");

const API_KEY = "5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
const EXPORT_URL = "http://files.tmdb.org/p/exports/movie_ids_07_28_2024.json.gz";

// Descargar el archivo comprimido
async function downloadExportFile(url) {
  const writer = fs.createWriteStream("movie_ids.json.gz");
  const response = await axios.get(url, { responseType: "stream" });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

// Descomprimir el archivo
async function extractGzipFile() {
  const fileContents = fs.createReadStream("movie_ids.json.gz");
  const writeStream = fs.createWriteStream("movie_ids.json");
  const unzip = zlib.createGunzip();

  fileContents.pipe(unzip).pipe(writeStream);

  return new Promise((resolve, reject) => {
    writeStream.on("finish", resolve);
    writeStream.on("error", reject);
  });
}

// Procesar el archivo descomprimido
async function processFile() {
  const fileStream = fs.createReadStream("movie_ids.json");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const movie = JSON.parse(line);
    if (!movie.adult) {
      await getMovieDetails(movie.id);
    }
  }
}

// Obtener los detalles de la película y los videos asociados
async function getMovieDetails(id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    );
    const movie = response.data;

    const {
      title,
      original_title,
      overview,
      release_date,
      poster_path,
      backdrop_path,
      popularity,
      vote_average,
      vote_count,
      adult,
      original_language,
      genres,
      videos,  // Videos asociados a la película
    } = movie;

    const genreIdsStr = genres.map((g) => g.id).join(",");

    // Insertar los detalles de la película en la base de datos
    db.run(
      `INSERT OR REPLACE INTO movies (id, title, original_title, overview, release_date, poster_path, backdrop_path, popularity, vote_average, vote_count, adult, original_language, genre_ids)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        title,
        original_title,
        overview,
        release_date,
        poster_path,
        backdrop_path,
        popularity,
        vote_average,
        vote_count,
        adult,
        original_language,
        genreIdsStr,
      ],
      (err) => {
        if (err) {
          console.error("Error inserting data into movies table:", err.message);
        } else {
          console.log(`Movie ${title} inserted successfully.`);
        }
      }
    );

    // Insertar los videos asociados a la película en la base de datos
    if (videos && videos.results.length > 0) {
      videos.results.forEach((video) => {
        const {
          id: video_id,
          iso_639_1,
          iso_3166_1,
          name,
          key,
          site,
          size,
          type,
          official,
          published_at,
        } = video;

        db.run(
          `INSERT OR REPLACE INTO videos (id, movie_id, iso_639_1, iso_3166_1, name, key, site, size, type, official, published_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            video_id,
            id,
            iso_639_1,
            iso_3166_1,
            name,
            key,
            site,
            size,
            type,
            official,
            published_at,
          ],
          (err) => {
            if (err) {
              console.error("Error inserting data into videos table:", err.message);
            } else {
              console.log(`Video ${name} for movie ${title} inserted successfully.`);
            }
          }
        );
      });
    }

  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error.message);
  }
}

(async () => {
  await downloadExportFile(EXPORT_URL);
  await extractGzipFile();
  await processFile();
})();
