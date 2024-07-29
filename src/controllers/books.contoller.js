import { validationResult } from "express-validator";

export const books = [];

export function getAllBooks(req, res) {
  return res.status(200).json(books);
}

export function getBook(req, res) {
  const { id } = req.params;
  const book = books.find((book) => book.id === parseInt(id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  return res.status(200).json(book);
}

export function createBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  const { name, date } = req.body;
  const book = {
    name,
    date,
    id: getRandomInt(),
  };

  books.push(book);
  return res.status(201).json(book);
}

export function updateBook(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.send({ errors: result.array() });
  }
  const { id } = req.params;

  const book = books.find((book) => book.id === parseInt(id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { name, date } = req.body;

  if (name) book.name = name;
  if (date) book.date = date;
  return res.status(200).json(book);
}

function getRandomInt() {
  return Math.ceil(Math.floor(Math.random() * 1000));
}
