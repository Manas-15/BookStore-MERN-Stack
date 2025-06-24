//index.js
import express from "express";
import { PORT, MONGO_URL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to the Book Store Mern Stack server!");
});

app.use("/api/books", bookRoute);

//Database connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.error("Failed to connect to MongoDB");
    process.exit(1);
  });
