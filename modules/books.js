'use strict'

const Book = require('../models/book');

async function getBooks(req, res) {
  try {
      const results = await Book.find();
      res.status(200).send(results);
  } catch (error) {
      res.status(500).send(error);
  }
}

module.exports = getBooks;