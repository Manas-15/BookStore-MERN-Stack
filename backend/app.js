// app.js
import express from "express";
import { connectDB } from "./db.js";
import cors from "cors";
import bookRoute from "./routes/bookRoute.js";
import userRoute from "./routes/userRoute.js";

const app = express();

app.use(express.json());

// ✅ Configure CORS properly
app.use(
  cors({
    origin: "https://bookstore-frontend-web.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("🚀 API is working. Welcome to the Book Store server!");
});

// Your API routes
app.use("/api/books", bookRoute);
app.use("/api", userRoute);

// Connect to DB
connectDB();

export default app;
