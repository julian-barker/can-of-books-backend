'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());

mongoose.connect(process.env.DB_URL); // DB url in our .env goes here
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.once('open', function() {
    console.log('Mongoose is connected to mongo');
});

const getBooks = require('./modules/books');

const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => res.status(200).send('Welcome!'));

app.get('/test', (req, res) => {
  res.send('test request received')
});

app.get('/books', getBooks);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
