const sqlite3 = require("sqlite3").verbose();
const db2 = new sqlite3.Database("./db2.db");

db2.serialize(() => {
  db2.run(`CREATE TABLE IF NOT EXISTS movies (
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
    )`, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
      } else {
        console.log("Table created successfully in db2");
      }
    });
});

db2.close();