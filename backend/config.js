//config.js
import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 5555;

export const MONGO_URL = process.env.MONGO_URL;
