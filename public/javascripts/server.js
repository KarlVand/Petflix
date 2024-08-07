const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

// Connect to the database
const db = new sqlite3.Database('./movies.db');

// Configure endpoint to get movies
app.get('/api/movies', (req, res) => {
    db.all('SELECT * FROM movies', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        res.json(rows);
    });
});

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Route to render movies in Pug
app.get('/movies', (req, res) => {
    db.all('SELECT * FROM movies', [], (err, movies) => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred');
            return;
        }
        res.render('movies', { movies: movies });
    });
});

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


