//bookRoute.js
import { Book } from "../models/bookModel.js";
import express from "express";

const router = express.Router();

//Route for save book data
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author) {
      return res.status(400).send({ message: "Title and Author are required" });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
    };
    const book = await Book.create(newBook);
    res.status(200).send(book);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//Route for get all book data
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({}).exec();
    if (books.length === 0) {
      return res.status(404).json({ message: "No books found in database" });
    }
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for get book detail
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for update book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author) {
      return res.status(400).send({ message: "Title and Author are required" });
    }

    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

//Route for delete book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

export default router;
