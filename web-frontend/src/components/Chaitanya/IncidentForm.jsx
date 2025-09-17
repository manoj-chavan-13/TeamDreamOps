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

        // Create report object from form data
        const reportData = {
            ...formData,
            reportedAt: new Date().toISOString(),
            deviceInfo: {
                userAgent: navigator.userAgent,
                language: navigator.language
            }
        };

        if (isOfflineMode) {
            // Store report locally for later submission
            const newPendingReports = [...pendingReports, reportData];
            setPendingReports(newPendingReports);
            localStorage.setItem('pendingReports', JSON.stringify(newPendingReports));
            setIsSubmitting(false);
            setIsSuccess(true);
        } else {
            try {
                // Create FormData object to send to backend (includes files)
                const formDataToSend = new FormData();
                
                // Map form fields to match backend API expectations
                formDataToSend.append('hazardType', formData.hazardType);
                formDataToSend.append('severity', formData.hazardSeverity); // Changed to match backend field name
                formDataToSend.append('description', formData.description);
                formDataToSend.append('locationDescription', formData.locationDescription);
                formDataToSend.append('latitude', formData.latitude);
                formDataToSend.append('longitude', formData.longitude);
                formDataToSend.append('timeOfObservation', formData.observationTime); // Changed to match backend field name
                
                formDataToSend.append('deviceInfo', JSON.stringify({
                    userAgent: navigator.userAgent,
                    language: navigator.language
                }));
                
                // Append media file (backend expects 'media' field)
                if (formData.mediaFiles && formData.mediaFiles.length > 0) {
                    // For now, we'll just use the first file as our backend only supports one file
                    formDataToSend.append('media', formData.mediaFiles[0]);
                }
                
                console.log("Submitting report to backend:", Object.fromEntries(formDataToSend));
                
                // Send to backend API with correct endpoint
                const response = await fetch('http://localhost:5000/api/reports/upload', {
                    method: 'POST',
                    body: formDataToSend,
                });

            if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                
                const data = await response.json();
                console.log('Incident reported successfully:', data);
                
                setIsSubmitting(false);
                setIsSuccess(true);
            } catch (error) {
                console.error('Error submitting form:', error);
                setIsSubmitting(false);
                
                // Store failed submission for retry
                const newPendingReports = [...pendingReports, reportData];
                setPendingReports(newPendingReports);
                localStorage.setItem('pendingReports', JSON.stringify(newPendingReports));
            }
        }
    };

    const syncPendingReports = async () => {
        if (isOfflineMode || pendingReports.length === 0) return;
        
        setIsSubmitting(true);
        
        try {
            // In a real implementation, you would send the pending reports to your backend
            // const responses = await Promise.all(pendingReports.map(report => 
            //     fetch('your-api-endpoint', {
            //         method: 'POST',
            //         body: JSON.stringify(report),
            //         headers: { 'Content-Type': 'application/json' }
            //     })
            // ));
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Clear pending reports after successful sync
            setPendingReports([]);
            localStorage.removeItem('pendingReports');
            
            setIsSubmitting(false);
        } catch (error) {
            console.error('Error syncing reports:', error);
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
                <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-lg p-8">
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 text-3xl mb-6">✓</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Submitted Successfully</h2>
                        <p className="text-gray-600 mb-6">
                            {isOfflineMode ? 
                                "Your report has been saved offline and will be submitted when you're back online." :
                                "Thank you for helping protect our coasts and communities."
                            }
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button 
                                onClick={() => {
                                            setFormData({
                                        hazardType: '',
                                        specificHazardType: '',
                                        hazardSeverity: 'Medium',
                                        description: '',
                                        locationDescription: '',
                                        latitude: formData.latitude,
                                        longitude: formData.longitude,
                                        observationTime: new Date().toISOString().slice(0, 10),
                                        mediaFiles: []
                                    });
                                    setIsSuccess(false);
                                }}
                                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                Submit Another Report
                            </button>
                            <button 
                                onClick={() => navigate('/')}
                                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md hover:bg-blue-50 transition-colors"
                            >
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <button 
                            onClick={() => navigate('/')}
                            className="text-blue-600 hover:text-blue-800"
                        >
                            &larr; Back to Home
                        </button>
                        <h1 className="text-3xl font-bold text-gray-900">Report Ocean Hazard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="bg-white text-gray-800 border border-gray-300 rounded px-3 py-1 text-sm"
                        >
                            <option value="en">English</option>
                            <option value="hi">हिंदी</option>
                            <option value="ta">தமிழ்</option>
                            <option value="te">తెలుగు</option>
                            <option value="ml">മലയാളം</option>
                        </select>
                        {isOfflineMode && (
                            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                                <span className="mr-2">⚠️</span> Offline Mode
                            </div>
                        )}
                    </div>
                </div>

                {/* Pending Reports Banner */}
                {!isOfflineMode && pendingReports.length > 0 && (
                    <div className="bg-blue-100 border border-blue-300 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-blue-600 mr-2">📡</span>
                                <p className="text-blue-800">
                                    You have {pendingReports.length} pending report(s) to sync
                                </p>
                            </div>
                            <button 
                                onClick={syncPendingReports}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Syncing...' : 'Sync Now'}
                            </button>
                            </div>
                        </div>
                )}

                {/* Form */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6 bg-blue-700 text-white">
                        <h2 className="text-xl font-semibold">Report Details</h2>
                        <p className="text-blue-100 mt-1">
                            Please provide as much detail as possible to help authorities respond effectively
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="flex flex-col lg:flex-row gap-8">
                            {/* Left side - form fields */}
                            <div className="lg:w-1/2 space-y-8">
                        {/* Hazard Type Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hazard Information</h3>
                            
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Hazard Type *
                                    </label>
                                        <select
                                        name="hazardType"
                                        value={formData.hazardType}
                                        onChange={handleHazardTypeChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        >
                                            <option value="">Select hazard type</option>
                                        {hazardTypes.map(hazard => (
                                            <option key={hazard.type} value={hazard.label}>
                                                {hazard.label}
                                            </option>
                                            ))}
                                        </select>
                                    </div>

                                {formData.hazardType && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Specific Type *
                                        </label>
                                        <select 
                                            name="specificHazardType"
                                            value={formData.specificHazardType}
                                            onChange={handleInputChange}
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            <option value="">Select specific type</option>
                                            {hazardTypes.find(h => h.type === formData.hazardType)?.subtypes.map(subtype => (
                                                <option key={subtype} value={subtype}>
                                                    {subtype}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    )}
                                </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Severity
                                </label>
                                <div className="flex flex-wrap items-center gap-4">
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hazardSeverity" 
                                            value="Low"
                                            checked={formData.hazardSeverity === 'Low'}
                                            onChange={handleInputChange}
                                            className="text-blue-600"
                                        />
                                        <span className="ml-2">Low</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hazardSeverity" 
                                            value="Medium"
                                            checked={formData.hazardSeverity === 'Medium'}
                                            onChange={handleInputChange}
                                            className="text-blue-600"
                                        />
                                        <span className="ml-2">Medium</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hazardSeverity" 
                                            value="High"
                                            checked={formData.hazardSeverity === 'High'}
                                            onChange={handleInputChange}
                                            className="text-blue-600"
                                        />
                                        <span className="ml-2">High</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input 
                                            type="radio" 
                                            name="hazardSeverity" 
                                            value="Extreme/Emergency"
                                            checked={formData.hazardSeverity === 'Extreme/Emergency'}
                                            onChange={handleInputChange}
                                            className="text-blue-600"
                                        />
                                        <span className="ml-2">Extreme/Emergency</span>
                                    </label>
                                </div>
                            </div>

                            <div className="mt-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows="4"
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Please describe what you observed in detail"
                                    required
                                ></textarea>
                            </div>
                        </div>

                        {/* Location Section */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Location Description *
                                </label>
                                    <input
                                    type="text"
                                    name="locationDescription"
                                    value={formData.locationDescription}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g., Marina Beach, Chennai"
                                        required
                                    />
                                </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude
                                    </label>
                                    <input 
                                        type="text"
                                        name="latitude"
                                        value={formData.latitude}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 13.082680"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="text"
                                        name="longitude"
                                        value={formData.longitude}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="e.g., 80.270718"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Time of Observation *
                                </label>
                                        <input
                                    type="datetime-local"
                                    name="observationTime"
                                    value={formData.observationTime}
                                    onChange={handleInputChange}
                                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                            </div>
                        </div>


                            </div>
                            
                            {/* Right side - map and media upload */}
                            <div className="lg:w-1/2">
                                {/* Interactive Map */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Location on Map</h3>
                                    <div className="bg-blue-50 border border-blue-200 rounded-xl overflow-hidden h-[400px] relative">
                                        {/* This div would be replaced with an actual map component in a real implementation */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-200">
                                            {/* Simulated map features */}
                                            <div className="absolute top-5 right-5 bg-white rounded-md shadow-md p-2 z-10">
                                                <div className="flex flex-col gap-2">
                                                    <button className="p-2 hover:bg-gray-100 rounded">➕</button>
                                                    <button className="p-2 hover:bg-gray-100 rounded">➖</button>
                                                    <button className="p-2 hover:bg-gray-100 rounded">📍</button>
                                                </div>
                                            </div>
                                            
                                            {/* Map content simulation */}
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" className="h-full w-full opacity-40">
                                                <path d="M0,100 Q200,150 400,100 T800,100 L800,600 L0,600 Z" fill="#2563eb" />
                                                <path d="M0,150 Q200,200 400,150 T800,150 L800,600 L0,600 Z" fill="#3b82f6" />
                                                <path d="M0,200 Q200,250 400,200 T800,200 L800,600 L0,600 Z" fill="#60a5fa" />
                                            </svg>
                                            
                                            {/* Land simulation */}
                                            <div className="absolute top-0 left-0 right-0 h-[30%] bg-gradient-to-b from-green-100 to-green-50 opacity-70"></div>
                                            
                                            {/* Location marker */}
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl animate-bounce">
                                                📍
                                            </div>
                                            
                                            {/* Click instructions */}
                                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full text-sm text-gray-700 font-medium">
                                                Click to set incident location
                                            </div>
                                        </div>
                                        
                                        {/* In real implementation, you would use react-leaflet like this:
                                        <MapContainer 
                                            center={[formData.latitude || 20.5937, formData.longitude || 78.9629]} 
                                            zoom={6} 
                                            className="h-full"
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            {formData.latitude && formData.longitude && (
                                                <Marker position={[formData.latitude, formData.longitude]}>
                                                    <Popup>Incident Location</Popup>
                                                </Marker>
                                            )}
                                            <LocationMarker setPosition={(lat, lng) => {
                                                setFormData(prev => ({
                                                    ...prev,
                                                    latitude: lat.toFixed(6),
                                                    longitude: lng.toFixed(6)
                                                }));
                                            }} />
                                        </MapContainer>
                                        */}
                                    </div>
                                    <div className="flex justify-between items-center mt-2 text-sm text-gray-600">
                                        <div>
                                            Lat: {formData.latitude || '—'}, Lng: {formData.longitude || '—'}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                if (navigator.geolocation) {
                                                    navigator.geolocation.getCurrentPosition(
                                                        (position) => {
                                                            setFormData(prev => ({
                                                                ...prev,
                                                                latitude: position.coords.latitude.toFixed(6),
                                                                longitude: position.coords.longitude.toFixed(6)
                                                            }));
                                                        }
                                                    );
                                                }
                                            }}
                                            className="text-blue-600 hover:underline"
                                        >
                                            Use my location
                                        </button>
                                    </div>
                                </div>
                                
                                {/* Media Upload Section */}
                                <div className="mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Media Upload</h3>
                                    
                                    <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                                        <input 
                                            type="file"
                                            id="mediaUpload"
                                            multiple
                                            accept="image/*,video/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label 
                                            htmlFor="mediaUpload" 
                                            className="cursor-pointer block"
                                        >
                                            <div className="text-gray-500 mb-2">
                                                <span className="text-4xl block mb-2">📷</span>
                                                <span className="font-medium">Click to upload photos/videos</span>
                                            </div>
                                            <p className="text-gray-500 text-sm">
                                                Upload images or videos of the hazard to help authorities assess the situation
                                            </p>
                                        </label>
                                </div>

                                    {formData.mediaFiles.length > 0 && (
                                        <div className="mt-4">
                                            <p className="text-sm text-gray-700 mb-2">
                                                {formData.mediaFiles.length} file(s) selected
                                            </p>
                                            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                                {/* Here you would map through media files and show previews */}
                                                <div className="bg-gray-100 rounded-md h-20 flex items-center justify-center">
                                                    <span className="text-gray-500">Preview</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Submit Section */}
                        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 border-t border-gray-200 pt-6">
                            <p className="text-sm text-gray-500">
                                * Required fields
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button 
                                    type="button"
                                    onClick={() => navigate('/')}
                                    className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                    <button
                                        type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-blue-600 text-white px-6 py-3 rounded-md ${
                                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
                                    } transition-colors`}
                                >
                                    {isSubmitting ? 'Submitting...' : isOfflineMode ? 'Save for Later' : 'Submit Report'}
                                    </button>
                                </div>
                            </div>
                        </form>
                </div>

                {/* Disclaimer */}
                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>
                        This information will be shared with INCOIS to enhance ocean hazard monitoring and early warning systems.
                    </p>
                    <p className="mt-1">
                        In case of emergencies requiring immediate response, please contact local authorities directly.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default IncidentForm;
