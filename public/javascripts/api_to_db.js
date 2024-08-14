const axios = require("axios");
<<<<<<< HEAD
const zlib = require("zlib"); //librairie qui sert a travailler avec des fichiers compreses
const fs = require("fs");// Cette librarie sert a la gestion des documents
=======
const zlib = require("zlib");
const fs = require("fs");
>>>>>>> development
const readline = require("readline");
const db = require("./db");

const API_KEY = "5ed26de423b6bdeeef56772fac736047";
const BASE_URL = "https://api.themoviedb.org/3";
<<<<<<< HEAD
const EXPORT_URL =
  "http://files.tmdb.org/p/exports/movie_ids_07_28_2024.json.gz"; 


//Fonction qui va telecharger le fichier comprese se trouvant dans EXPORT_URL
=======
const EXPORT_URL = "http://files.tmdb.org/p/exports/movie_ids_07_28_2024.json.gz";

// Descargar el archivo comprimido
>>>>>>> development
async function downloadExportFile(url) {
  const writer = fs.createWriteStream("movie_ids.json.gz");
  const response = await axios.get(url, { responseType: "stream" });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
}
<<<<<<< HEAD
//fonction qui va decompreser le fichier
=======

// Descomprimir el archivo
>>>>>>> development
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
<<<<<<< HEAD
//Fonction qui va traiter le fichier decompresé
=======

// Procesar el archivo descomprimido
>>>>>>> development
async function processFile() {
  const fileStream = fs.createReadStream("movie_ids.json");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
<<<<<<< HEAD
    const movie = JSON.parse(line);//Convertit chaque ligne (au format JSON) en un objet JavaScript
=======
    const movie = JSON.parse(line);
>>>>>>> development
    if (!movie.adult) {
      await getMovieDetails(movie.id);
    }
  }
}
<<<<<<< HEAD
//Fonction pour obtenir les détails d'un film et les stocker dans la base de données

async function getMovieDetails(id){
=======

// Obtener los detalles de la película y los videos asociados
async function getMovieDetails(id) {
>>>>>>> development
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
<<<<<<< HEAD
=======
      videos,  // Videos asociados a la película
>>>>>>> development
    } = movie;

    const genreIdsStr = genres.map((g) => g.id).join(",");

<<<<<<< HEAD
//Insère ou remplace les détails du film dans la base de données SQLite.
=======
    // Insertar los detalles de la película en la base de datos
>>>>>>> development
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
<<<<<<< HEAD
=======

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

>>>>>>> development
  } catch (error) {
    console.error(`Error fetching details for movie ID ${id}:`, error.message);
  }
}

(async () => {
  await downloadExportFile(EXPORT_URL);
  await extractGzipFile();
  await processFile();
})();
<<<<<<< HEAD

/*Résumé du flux

1) Téléchargement : Le fichier compressé est téléchargé à partir de l'URL spécifiée.

2) Décompression : Le fichier téléchargé est décompressé.

3) Traitement : Le fichier décompressé est lu, et pour chaque ID de film, ses détails sont obtenus et stockés dans la base de données.*/
=======
>>>>>>> development
