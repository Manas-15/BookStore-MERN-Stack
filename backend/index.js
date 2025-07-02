//index.js
//for vercel
import serverless from "serverless-http";
import app from "./app.js";

// ✅ This is what Vercel expects
export const handler = serverless(app);
