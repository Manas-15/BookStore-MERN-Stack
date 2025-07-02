//app.js
import express from "express";
import { connectDB } from "./db.js";
import cors from "cors";

import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cors());

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to the Book Store Mern Stack server!");
});

app.use("/api", userRoute);
app.use("/api/books", bookRoute);

connectDB();

export default app;
