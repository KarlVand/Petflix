const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./movies.db");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY,
        title TEXT,
        original_title TEXT,
        overview TEXT,
        release_date TEXT,
        poster_path TEXT,
        backdrop_path TEXT,
        popularity REAL,
        vote_average REAL,
        vote_count INTEGER,
        adult BOOLEAN,
        original_language TEXT,
        genre_ids TEXT
    )`);

  
  db.run(
    `CREATE TABLE IF NOT EXISTS videos (
        id TEXT PRIMARY KEY,
        movie_id INTEGER,
        iso_639_1 TEXT,
        iso_3166_1 TEXT,
        name TEXT,
        key TEXT,
        site TEXT,
        size INTEGER,
        type TEXT,
        official BOOLEAN,
        published_at TEXT,
        FOREIGN KEY(movie_id) REFERENCES movies(id)
    )`,
    (err) => {
      if (err) {
        console.error("Error creating videos table:", err.message);
      } else {
        console.log("Table 'videos' created or already exists.");
      }
    }
  );
});

module.exports = db;
