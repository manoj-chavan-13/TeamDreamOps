// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./db/database.js";
import authRoute from "./routes/authroute.js";
import incidentRoutes from "./routes/incidentRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend to connect from any origin during development
app.use(
  cors({
    origin: process.env.NODE_ENV === "production" 
      ? process.env.FRONTEND_URL || "http://localhost:5173"
      : true, 
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For form data

// Set up static file serving for uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ===== Routes =====
app.use("/api/auth", authRoute);                
app.use("/api/reports", incidentRoutes);    

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});