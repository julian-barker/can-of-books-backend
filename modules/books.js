'use strict'

const Book = require('../models/book');

async function getBook(req, res) {
  try {
    const results = await Book.find();
    res.status(200).send(results);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function getOneBook(req, res) {
  try {
    const id = req.params.id;
    const result = await Book.findById(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
}

async function addBook(req, res, next) {
  try {
    const result = await Book.create(req.body); // equivalent to new Book(req.body).save()
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

async function deleteBook(req, res, next) {
  try {
    const id = req.params.id;
    const result = await Book.findByIdAndDelete(id);
    res.status(204).send(result);
  } catch (error) {
    next(error);
  }
}

async function updateBook(req, res, next) {
  try {
    const id = req.params.id;
    const data = req.body
    const options = {
      new: true,
      overwrite: true,
    }
    const result = await Book.findByIdAndUpdate(id, data, options);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
}

module.exports = { getBook, getOneBook, addBook, deleteBook, updateBook };