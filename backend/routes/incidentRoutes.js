// routes/hazardReportRoutes.js
import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createReport, getReports } from "../controllers/incidentController.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads/incidents");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// setup multer for file uploads (local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

// File filter to allow only images and videos
const fileFilter = (req, file, cb) => {
  // Accept images and videos
  if (file.mimetype.startsWith('image/') || file.mimetype.startsWith('video/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image and video files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// POST create report (with media upload)
router.post("/upload", upload.single("media"), createReport);

// GET all reports
router.get("/get", getReports);

// GET a single report by ID
router.get("/get/:id", (req, res) => {
  const id = req.params.id;
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

// PUT update an existing report
router.put("/update/:id", upload.single("media"), (req, res) => {
  const id = req.params.id;
  res.status(501).json({ success: false, message: "Not implemented yet" });
});

export default router;
