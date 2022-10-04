'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL); // DB url in our .env goes here
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));
db.once('open', function() {
    console.log('Mongoose is connected to mongo');
});


const books = require('./modules/books')
const getBooks = books.getBook;
// const getOneBook = books.getOneBook;
const addBook = books.addBook;
const deleteBook = books.deleteBook;


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

app.get('/', (req, res) => res.status(200).send('Welcome!'));

app.get('/test', (req, res) => {
  res.send('test request received')
});

app.get('/books', getBooks);

// app.get('/books/:id', getOneBook)

app.post('/books', addBook);

app.delete('/books/:id', deleteBook);

app.use((error, req, res) =>{
  res.status(500).send(error.message);
})
