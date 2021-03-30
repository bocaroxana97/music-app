const express = require('express');
const cors = require('cors');
const knex = require('knex');

const app = express();

app.use(cors());

require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all genres from the database
app.get('/genres', (req, res) => {
    db.select('*')
        .from('genres')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch all songs from the database
app.get('/songs', (req, res) => {
    db.select('*')
        .from('songs')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));
