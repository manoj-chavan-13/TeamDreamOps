import React from "react";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Note: In a real implementation, you would need to install and import these:
// npm install leaflet react-leaflet
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

function IncidentForm() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [language, setLanguage] = useState('en');
    const [isOfflineMode, setIsOfflineMode] = useState(false);
    const [pendingReports, setPendingReports] = useState([]);
    const mapRef = useRef(null);

    // Form state - aligned with backend model fields
    const [formData, setFormData] = useState({
        hazardType: '',
        hazardSeverity: 'Medium', // Capitalized to match backend enum values
        description: '',
        locationDescription: '',
        latitude: '',
        longitude: '',
        observationTime: new Date().toISOString().slice(0, 10), // Just date format for backend compatibility
        mediaFiles: []
    });

export default ReportIncident;