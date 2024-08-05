const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./movies.db');

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
});

module.exports = db;
