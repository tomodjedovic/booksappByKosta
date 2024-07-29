import express from "express";
import booksRouter from "../routers/books.router.js";

export default function createApp() {
  const app = express();

  app.use(express.json());
  app.use("/api/books", booksRouter);

  return app;
}
