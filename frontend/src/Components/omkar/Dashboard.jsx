import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedIncident, setSelectedIncident] = useState(null); 

  // Fetch incidents from the API
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/reports/get');
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setIncidents(data.data);
        } else {
          throw new Error('Failed to fetch incidents');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  // Filter incidents by severity and status
  const filteredIncidents = incidents.filter(incident => {
    const matchesSeverity = filterSeverity === 'All' || incident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' || incident.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  // Get severity badge color based on severity level
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Low':
        return 'bg-green-100 text-green-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Extreme/Emergency':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status badge color
  const getStatusColor = (status) => {
    switch(status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'verified':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get hazard type icon based on hazard type
  const getHazardIcon = (hazardType) => {
    const hazardIcons = {
      'Tsunami': '🌊',
      'Storm Surge': '🌪️',
      'High Waves': '🌊',
      'Rip Current': '↩️',
      'Algal Bloom': '🦠',
      'Oil Spill': '🛢️',
      'Marine Debris': '🗑️',
      'Coastal Erosion': '🏝️',
    };

    return hazardIcons[hazardType] || '⚠️';
  };

  // Handle view details click
  const handleViewDetails = (incident) => {
    setSelectedIncident(incident);
  };

  // Close detail view
  const closeDetailView = () => {
    setSelectedIncident(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex-shrink-0 flex items-center group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-sm">🌊</span>
                </div>
                <span className="text-gray-900 text-xl font-bold">INCOIS</span>
                <span className="ml-2 text-gray-500 text-sm">Ocean Monitor</span>
              </Link>
            </div>
            <div className="flex items-center space-x-1">
              <Link to="/incident" className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200">
                Report Hazard
              </Link>
              <Link to="/dashboard" className="text-blue-600 bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium">
                Dashboard
              </Link>
              <div className="ml-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex-grow py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
                Incident Reports
              </h1>
              <p className="text-gray-600">Monitor and manage ocean hazard reports in real-time</p>
            </div>
            <button
              onClick={() => navigate('/incident')}
              className="mt-4 lg:mt-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              + Report New Incident
            </button>
          </div>
          
          {/* Modern Status Filters */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/20 mb-6">
            <div className="flex flex-col space-y-4">
              <div className="flex flex-wrap gap-2">
                {['All', 'pending', 'verified', 'resolved', 'rejected'].map((status) => {
                  const isActive = filterStatus === status || (status === 'All' && filterStatus === 'All');
                  const colors = {
                    'All': 'from-slate-500 to-slate-600',
                    'pending': 'from-amber-500 to-orange-500',
                    'verified': 'from-blue-500 to-indigo-500',
                    'resolved': 'from-emerald-500 to-green-500',
                    'rejected': 'from-red-500 to-rose-500'
                  };
                  return (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200 ${
                        isActive 
                          ? `bg-gradient-to-r ${colors[status]} text-white shadow-lg transform scale-105` 
                          : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md border border-gray-200'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                      <span className="ml-2 px-2 py-0.5 rounded-full text-xs bg-black/10">
                        {status === 'All' ? incidents.length : incidents.filter(i => i.status === status).length}
                      </span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-4 sm:mb-0 flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                  Showing {filteredIncidents.length} of {incidents.length} incidents
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700">Filter by severity:</span>
                  <select
                    value={filterSeverity}
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    className="bg-white/80 text-gray-800 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="All">All Severities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Extreme/Emergency">Extreme</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {isLoading && (
          <div className="flex justify-center items-center p-10">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded mb-6">
            <p className="font-medium">Error loading incidents:</p>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && filteredIncidents.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">No incidents found.</p>
            <p className="mt-2 text-gray-500">Be the first to report an ocean hazard!</p>
          </div>
        )}

        {/* Modern Incidents Grid */}
        {!isLoading && !error && filteredIncidents.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredIncidents.map((incident, index) => (
              <div 
                key={incident._id} 
                className="group bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
                style={{animationDelay: `${index * 100}ms`}}
              >
                {/* Media with gradient overlay */}
                <div className="h-48 bg-gradient-to-br from-blue-100 to-indigo-100 relative overflow-hidden">
                  {incident.mediaUrl ? (
                    <>
                      <img 
                        src={`http://localhost:5000${incident.mediaUrl}`} 
                        alt={incident.hazardType} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl bg-gradient-to-br from-blue-50 to-indigo-100">
                      {getHazardIcon(incident.hazardType)}
                    </div>
                  )}
                  
                  {/* Status and Severity badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between">
                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${getStatusColor(incident.status)}`}>
                      {incident.status || 'Pending'}
                    </span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium backdrop-blur-sm ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </div>
                </div>
                
                {/* Content with better spacing */}
                <div className="p-5">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {incident.hazardType}
                    </h3>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      {new Date(incident.timeOfObservation || incident.createdAt).toLocaleDateString('en-US', { 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                    {incident.description}
                  </p>
                  
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <div className="w-4 h-4 bg-red-400 rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">📍</span>
                    </div>
                    <span className="flex-1 truncate">{incident.locationDescription}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>📍 {incident.latitude?.toFixed(4) || 'N/A'}, {incident.longitude?.toFixed(4) || 'N/A'}</div>
                    </div>
                    <button 
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                      onClick={() => handleViewDetails(incident)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        
        {/* Modern Incident Detail Modal */}
        {selectedIncident && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-white/20">
              <div className="flex justify-between items-center border-b border-gray-200 p-6">
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    {selectedIncident.hazardType}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">Incident Report Details</p>
                </div>
                <button 
                  className="w-10 h-10 bg-gray-100 hover:bg-red-100 hover:text-red-600 rounded-full flex items-center justify-center text-gray-500 transition-all duration-200"
                  onClick={closeDetailView}
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Left column - Enhanced Image */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden h-[350px] relative">
                  {selectedIncident.mediaUrl ? (
                    <>
                      <img 
                        src={`http://localhost:5000${selectedIncident.mediaUrl}`} 
                        alt={selectedIncident.hazardType} 
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-8xl bg-gradient-to-br from-blue-50 to-indigo-100">
                      {getHazardIcon(selectedIncident.hazardType)}
                    </div>
                  )}
                </div>
                
                {/* Right column - Enhanced Details */}
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-3">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium ${getSeverityColor(selectedIncident.severity)}`}>
                      🚨 {selectedIncident.severity} Severity
                    </span>
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-sm font-medium ${getStatusColor(selectedIncident.status)}`}>
                      📋 {selectedIncident.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      📝 Description
                    </h4>
                    <p className="text-gray-800 leading-relaxed">{selectedIncident.description}</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      📍 Location Details
                    </h4>
                    <p className="text-gray-800 mb-3">{selectedIncident.locationDescription}</p>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-white rounded-lg p-3">
                        <span className="text-gray-500">Latitude</span>
                        <p className="font-mono font-medium">{selectedIncident.latitude}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3">
                        <span className="text-gray-500">Longitude</span>
                        <p className="font-mono font-medium">{selectedIncident.longitude}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                      ⏰ Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Observed:</span>
                        <span className="font-medium">
                          {new Date(selectedIncident.timeOfObservation || selectedIncident.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reported:</span>
                        <span className="font-medium">
                          {new Date(selectedIncident.createdAt).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {selectedIncident.mediaType && (
                    <div className="bg-purple-50 rounded-xl p-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                        📷 Media Information
                      </h4>
                      <p className="text-gray-800 capitalize">{selectedIncident.mediaType}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 flex justify-end space-x-3">
                <button 
                  onClick={closeDetailView}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2.5 rounded-xl font-medium transition-all duration-200"
                >
                  Close
                </button>
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-200">
                  Take Action
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modern Stats and Info Section */}
        {!isLoading && !error && filteredIncidents.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Statistics Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Incident Statistics</h3>
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📊</span>
                </div>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {incidents.length}
                </p>
                <p className="text-sm text-gray-600 font-medium">Total reported incidents</p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      🚨 High Severity
                    </span>
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {incidents.filter(i => i.severity === 'High' || i.severity === 'Extreme/Emergency').length}
                    </span>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700 flex items-center">
                      📅 Last 7 days
                    </span>
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                      {incidents.filter(i => {
                        const date = new Date(i.createdAt);
                        const now = new Date();
                        const diffTime = Math.abs(now - date);
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                        return diffDays <= 7;
                      }).length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Top Hazard Types Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Top Hazard Types</h3>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">⚠️</span>
                </div>
              </div>
              
              <div className="space-y-4">
                {Object.entries(incidents.reduce((acc, incident) => {
                  acc[incident.hazardType] = (acc[incident.hazardType] || 0) + 1;
                  return acc;
                }, {}))
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([type, count], index) => {
                  const gradients = [
                    'from-blue-500 to-indigo-500',
                    'from-purple-500 to-pink-500',
                    'from-green-500 to-teal-500'
                  ];
                  return (
                    <div key={type} className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gradient-to-r ${gradients[index]} rounded-lg flex items-center justify-center`}>
                            <span className="text-white text-sm">{getHazardIcon(type)}</span>
                          </div>
                          <span className="font-medium text-gray-700">{type}</span>
                        </div>
                        <span className={`bg-gradient-to-r ${gradients[index]} text-white text-xs px-3 py-1 rounded-full font-bold`}>
                          {count}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Emergency Contacts Card */}
            <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 group">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Emergency Contacts</h3>
                <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">🚨</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4 hover:from-red-100 hover:to-rose-100 transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🏢</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">INCOIS Helpdesk</p>
                      <p className="text-sm text-gray-600">+91-40-2389 5000</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-4 hover:from-orange-100 hover:to-amber-100 transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">🚑</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Disaster Management</p>
                      <p className="text-sm text-gray-600">1078</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 hover:from-blue-100 hover:to-indigo-100 transition-all cursor-pointer">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-sm">⚓</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">Coast Guard</p>
                      <p className="text-sm text-gray-600">1554</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>

      {/* Modern Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white font-bold">🌊</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">INCOIS</h3>
                  <p className="text-blue-200 text-sm">Ocean Information Services</p>
                </div>
              </div>
              <p className="text-blue-100 text-sm leading-relaxed">
                Indian National Center for Ocean Information Services provides comprehensive ocean information and advisory services to society, industry, government and scientific community through cutting-edge technology and research.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200 flex items-center">
                    <span className="mr-2">🚨</span> Early Warning Systems
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200 flex items-center">
                    <span className="mr-2">🌊</span> Forecast Services
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200 flex items-center">
                    <span className="mr-2">📚</span> Research Publications
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200 flex items-center">
                    <span className="mr-2">📊</span> Data Services
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-white font-semibold text-sm mb-2">Headquarters</p>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    "Ocean Valley", Pragathi Nagar (BO)<br />
                    Nizampet (SO), Hyderabad - 500 090<br />
                    Telangana, India
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <p className="text-white font-semibold text-sm mb-2">24/7 Emergency Helpline</p>
                  <p className="text-blue-100 text-sm">+91-40-2389 5000</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/20">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-blue-200 text-sm">
                © 2025 Indian National Centre for Ocean Information Services. All rights reserved.
              </p>
              <div className="mt-4 sm:mt-0 flex space-x-6">
                <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Privacy Policy
                </a>
                <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Terms of Use
                </a>
                <a href="#" className="text-blue-200 hover:text-white text-sm transition-colors duration-200">
                  Accessibility
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;