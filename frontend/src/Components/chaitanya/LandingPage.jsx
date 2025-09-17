import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
    const navigate = useNavigate();
    const [language, setLanguage] = useState('en');
    const [showCallPopup, setShowCallPopup] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleCallRequest = () => {
        if (phoneNumber.trim()) {
            setShowCallPopup(false);
            setShowSuccessMessage(true);
            setPhoneNumber('');
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } else {
            alert('Please enter your phone number');
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            {/* Header with INCOIS branding */}
            <header className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-blue-700 flex items-center justify-center text-white text-xl">
                                🌊
                            </div>
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold text-blue-800">OceanHazardWatch</h1>
                                <p className="text-xs text-blue-600">Powered by INCOIS, Ministry of Earth Sciences</p>
                            </div>
                </div>
                <div className="hidden md:flex items-center gap-6">
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
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-blue-700 hover:text-blue-900"
                            ></button>

                );
            
}
 export default LandingPage;



















































































































