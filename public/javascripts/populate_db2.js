const axios = require("axios");
const sqlite3 = require("sqlite3").verbose();
const db2 = new sqlite3.Database("./db2.db");

const API_KEY = "5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
const EXPORT_URL =
  "http://files.tmdb.org/p/exports/movie_ids_07_28_2024.json.gz";
const zlib = require("zlib");
const fs = require("fs");
const readline = require("readline");

// Función para descargar el archivo comprimido
async function downloadExportFile(url) {
  const writer = fs.createWriteStream("movie_ids.json.gz");
  const response = await axios.get(url, { responseType: "stream" });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}

// Función para descomprimir el archivo
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

// Función para procesar el archivo descomprimido
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

// Función para obtener detalles de un filme y almacenarlos en la base de datos
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
    } = movie;

    const genreIdsStr = genres.map((g) => g.id).join(",");

    db2.run(
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
          console.error(
            "Error inserting data into movies table in db2:",
            err.message
          );
        } else {
          console.log(`Movie ${title} inserted successfully into db2.`);
        }
      }
    );
  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error.message);
  }
}

(async () => {
  await downloadExportFile(EXPORT_URL);
  await extractGzipFile();
  await processFile();
  db2.close();
})();
