//server.js
import express from "express";
import app from "./app.js";
import { PORT } from "./config.js";

const server = express();

server.use(app);

server.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
