import React from "react";
import { useNavigate } from "react-router-dom";

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Note: In a real implementation, you would need to install and import these:
// npm install leaflet react-leaflet
// import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';

function ReportIncident() {
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
     // Available hazard types based on INCOIS requirements
    const hazardTypes = [
        {
            type: 'tsunami',
            label: 'Tsunami',
            subtypes: ['Wave observed', 'Coastal flooding', 'Receding shoreline', 'Precursor signs']
        },
        {
            type: 'stormSurge',
            label: 'Storm Surge',
            subtypes: ['Coastal flooding', 'High tide', 'Wave overtopping']
        },
        {
            type: 'highWaves',
            label: 'High Waves',
            subtypes: ['Breaking waves', 'Swells', 'Rogue waves']
        },
        {
            type: 'ripCurrent',
            label: 'Rip Current',
            subtypes: ['Visible current channel', 'People caught in current']
        },
        {
            type: 'algalBloom',
            label: 'Algal Bloom',
            subtypes: ['Red tide', 'Green/brown discoloration', 'Dead fish/marine life']
        },
        {
            type: 'oilSpill',
            label: 'Oil Spill',
            subtypes: ['Visible slick', 'Tar balls on beach', 'Affected wildlife']
        },
        {
            type: 'marineDebris',
            label: 'Marine Debris',
            subtypes: ['Floating debris', 'Plastic accumulation', 'Ghost nets/fishing gear']
        },
        {
            type: 'coastalErosion',
            label: 'Coastal Erosion',
            subtypes: ['Beach erosion', 'Cliff collapse', 'Infrastructure damage']
        }
    ];

    // Check for network connectivity
    useEffect(() => {
        const checkConnectivity = () => {
            setIsOfflineMode(!navigator.onLine);
        };

        window.addEventListener('online', checkConnectivity);
        window.addEventListener('offline', checkConnectivity);
        checkConnectivity();

        return () => {
            window.removeEventListener('online', checkConnectivity);
            window.removeEventListener('offline', checkConnectivity);
        };
    }, []);

    // Check for pending reports in local storage
    useEffect(() => {
        const storedReports = localStorage.getItem('pendingReports');
        if (storedReports) {
            try {
                setPendingReports(JSON.parse(storedReports));
            } catch (e) {
                console.error('Error parsing stored reports', e);
            }
        }
    }, []);

    // Initialize map when component mounts
    useEffect(() => {
        // This is a placeholder for map initialization
        // In a real implementation, you would initialize a mapping library here
        // such as Leaflet, Google Maps, or Mapbox
        console.log('Map would be initialized here');

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setFormData(prev => ({
                        ...prev,
                        latitude: position.coords.latitude.toFixed(6),
                        longitude: position.coords.longitude.toFixed(6)
                    }));
                },
                () => {
                    console.log('Geolocation permission denied or unavailable');
                }
            );
        }
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleHazardTypeChange = (e) => {
        const selectedType = e.target.value;
        setFormData(prev => ({
            ...prev,
            hazardType: selectedType,
            specificHazardType: '' // Reset subtype when type changes
        }));
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        
        // Preview logic would go here in a complete implementation
        
        setFormData(prev => ({
            ...prev,
            mediaFiles: files
        }));
    };

    // Handle form submission - connected to backend API
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        console.log("Form data being submitted:", formData);
}

}

export default ReportIncident;