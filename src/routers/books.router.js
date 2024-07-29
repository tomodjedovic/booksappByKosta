import { Router } from "express";
import {
  books,
  createBook,
  getAllBooks,
  getBook,
  updateBook,
} from "../controllers/books.contoller.js";

import { body, param } from "express-validator";

const booksRouter = new Router();

booksRouter.get("/", getAllBooks);
booksRouter.get(
  "/:id",
  param("id").isInt().withMessage("mora biti broj"),
  getBook
);
booksRouter.post(
  "/",
  body("name")
    .exists()
    .withMessage("Ime je obavezno")
    .isString()
    .withMessage("Ime mora biti string")
    .custom((name) => {
      const book = books.find((book) => book.name === name);
      if (book) throw new Error("Book with that name already exists");
      return true;
    }),
  body("date")
    .exists()
    .withMessage("Ime je obavezno")
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Ime mora biti datum"),
  createBook
);
booksRouter.put(
  "/:id",
  body("name")
    .optional()
    .isString()
    .withMessage("Ime mora biti string")
    .custom((name) => {
      const book = books.find((book) => book.name === name);
      if (book) throw new Error("Book with that name already optional");
      return true;
    }),
  body("date")
    .optional()
    .isDate({ format: "YYYY-MM-DD" })
    .withMessage("Ime mora biti datum"),
  updateBook
);

export default booksRouter;
