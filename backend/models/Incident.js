// models/HazardReport.js
import mongoose from "mongoose";

const hazardReportSchema = new mongoose.Schema({
  hazardType: {
    type: String,
    required: true,
    enum: [
      "Tsunami",
      "Storm Surge",
      "High Waves",
      "Rip Current",
      "Algal Bloom",
      "Oil Spill",
      "Marine Debris",
      "Coastal Erosion",
      "Other Hazard"
    ]
  },
  severity: {
    type: String,
    default: "Low",
    enum: ["Low", "Medium", "High", "Extreme/Emergency"]
  },
  description: {
    type: String,
    required: true
  },
  locationDescription: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  timeOfObservation: {
    type: Date,
    required: true
  },
  mediaUrl: {
    type: String, 
    default: null
  },
  mediaType: {
    type: String,
    enum: ["image", "video", null],
    default: null
  },
  status: {
    type: String,
    enum: ["pending", "verified", "resolved", "rejected"],
    default: "pending"
  }
}, { timestamps: true });

const Incident = mongoose.model('Incident' ,hazardReportSchema);

export default Incident;

