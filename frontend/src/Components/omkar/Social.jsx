import React, { useState, useEffect } from 'react';
import TweetCard from './TweetCard.jsx';

// Mock social media data for ocean hazards
const mockTweets = [
  {
    id: 1,
    username: '@INCOISAlert',
    handle: 'INCOIS Official',
    time: '2h',
    verified: true,
    content: '🌊 TSUNAMI ALERT: Unusual wave activity detected in Bay of Bengal. Coastal areas of Tamil Nadu and Andhra Pradesh advised to stay vigilant. #TsunamiAlert #OceanSafety',
    hashtags: ['#TsunamiAlert', '#OceanSafety', '#BayOfBengal'],
    likes: 1240,
    retweets: 856,
    replies: 234,
    location: 'Bay of Bengal',
    hazardType: 'Tsunami',
    severity: 'High',
    image: null,
    engagement: 2330
  },
  {
    id: 2,
    username: '@ChennaiPort',
    handle: 'Chennai Port Trust',
    time: '4h',
    verified: true,
    content: '⚠ High tide warning for Chennai coast. Expected height: 2.5m at 18:30 IST. All fishing vessels advised to return to harbor immediately. #HighTide #ChennaiCoast #FishingSafety',
    hashtags: ['#HighTide', '#ChennaiCoast', '#FishingSafety'],
    likes: 567,
    retweets: 423,
    replies: 89,
    location: 'Chennai',
    hazardType: 'High Tide',
    severity: 'Medium',
    image: '/api/placeholder/400/200',
    engagement: 1079
  },
  {
    id: 3,
    username: '@CoastalWatch_IN',
    handle: 'Coastal Watch India',
    time: '6h',
    verified: false,
    content: '🌀 Cyclone Vardah approaching Visakhapatnam coast. Wind speeds up to 120 kmph recorded. Evacuation orders issued for low-lying areas. Stay safe! #CycloneVardah #Vizag #Evacuation',
    hashtags: ['#CycloneVardah', '#Vizag', '#Evacuation'],
    likes: 892,
    retweets: 645,
    replies: 156,
    location: 'Visakhapatnam',
    hazardType: 'Cyclone',
    severity: 'Extreme',
    image: '/api/placeholder/400/200',
    engagement: 1693
  },
  {
    id: 4,
    username: '@KeralaFisherman',
    handle: 'Kerala Fishermen Association',
    time: '8h',
    verified: false,
    content: 'Unusual swell patterns observed off Kochi coast. Our boats are experiencing 3-4m waves. Weather seems normal but ocean behavior is strange. #SwellSurge #KochiCoast #FishermenAlert',
    hashtags: ['#SwellSurge', '#KochiCoast', '#FishermenAlert'],
    likes: 234,
    retweets: 167,
    replies: 45,
    location: 'Kochi',
    hazardType: 'Swell Surge',
    severity: 'Medium',
    image: null,
    engagement: 446
  },
  {
    id: 5,
    username: '@PuriBeachPatrol',
    handle: 'Puri Beach Safety',
    time: '12h',
    verified: true,
    content: '🏖 Beach erosion accelerating near Puri temple. Approximately 15 meters of coastline lost in past 48 hours. Immediate intervention required. #CoastalErosion #PuriBeach #Heritage',
    hashtags: ['#CoastalErosion', '#PuriBeach', '#Heritage'],
    likes: 445,
    retweets: 289,
    replies: 67,
    location: 'Puri',
    hazardType: 'Coastal Erosion',
    severity: 'High',
    image: '/api/placeholder/400/200',
    engagement: 801
  }
];


const mockNews = [
  {
    id: 1,
    title: 'INCOIS Issues Tsunami Advisory for East Coast',
    source: 'The Hindu',
    time: '1h ago',
    summary: 'Indian National Centre for Ocean Information Services has issued a tsunami advisory following seismic activity in the Indian Ocean.',
    url: '#',
    category: 'Emergency Alert'
  },
  {
    id: 2,
    title: 'Cyclone Season Preparedness: Coastal States on High Alert',
    source: 'Times of India',
    time: '3h ago',
    summary: 'Meteorological department advises coastal states to prepare for an active cyclone season with multiple systems expected.',
    url: '#',
    category: 'Weather Update'
  },
  {
    id: 3,
    title: 'Fishermen Report Unusual Ocean Behavior Along Kerala Coast',
    source: 'Mathrubhumi',
    time: '5h ago',
    summary: 'Local fishermen communities report strange wave patterns and marine life behavior along the Kerala coastline.',
    url: '#',
    category: 'Community Report'
  }
];

export default function Social() {
  const [tweets, setTweets] = useState(mockTweets);
  const [news, setNews] = useState(mockNews);
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');

  // Filter tweets based on hazard type and search
  const filteredTweets = tweets.filter(tweet => {
    const matchesFilter = activeFilter === 'All' || tweet.hazardType === activeFilter;
    const matchesSearch = searchTerm === '' || 
      tweet.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tweet.hashtags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  // Sort tweets
  const sortedTweets = [...filteredTweets].sort((a, b) => {
    switch(sortBy) {
      case 'engagement':
        return b.engagement - a.engagement;
      case 'severity':
        const severityOrder = { 'Extreme': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return severityOrder[b.severity] - severityOrder[a.severity];
      default:
        return b.id - a.id; // Recent first
    }
  });

  const hazardTypes = ['All', 'Tsunami', 'Cyclone', 'High Tide', 'Swell Surge', 'Coastal Erosion'];

  return (
    <div className="social-analytics-container">
      {/* Header */}
      <header className="social-header">
        <div className="header-content">
          <h1 className="page-title">
            🌊 Ocean Hazard Social Analytics
          </h1>
          <p className="page-subtitle">
            Real-time monitoring of ocean hazard discussions and community reports
          </p>
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="social-grid">
        {/* Left Sidebar - Simple Controls */}
        <aside className="left-sidebar">
          <div className="sidebar-section">
            <h3>🔍 Filters & Search</h3>
            <div className="search-box">
              <input
                type="text"
                placeholder="Search posts, hashtags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <div className="filter-section">
              <h4>Hazard Type</h4>
              <div className="filter-buttons">
                {hazardTypes.map(type => (
                  <button
                    key={type}
                    className={filter-btn ${activeFilter === type ? 'active' : ''}}
                    onClick={() => setActiveFilter(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="sort-section">
              <h4>Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="recent">Most Recent</option>
                <option value="engagement">Most Engaged</option>
                <option value="severity">Severity Level</option>
              </select>
            </div>
          </div>

          {/* Simple Analytics */}
          <div className="sidebar-section">
            <h3>📊 Quick Stats</h3>
            <div className="quick-stats">
              <div className="stat-card">
                <div className="stat-number">{filteredTweets.length}</div>
                <div className="stat-label">Total Posts</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {filteredTweets.filter(t => t.verified).length}
                </div>
                <div className="stat-label">Verified</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">
                  {filteredTweets.filter(t => t.severity === 'Extreme' || t.severity === 'High').length}
                </div>
                <div className="stat-label">High Priority</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="main-feed">
          <div className="feed-header">
            <h2>Live Hazard Feed</h2>
            <div className="feed-stats">
              <span className="stat">
                📊 {filteredTweets.length} Posts
              </span>
              <span className="stat">
                🔥 {filteredTweets.reduce((sum, tweet) => sum + tweet.engagement, 0)} Total Engagement
              </span>
              </div>
          </div>

          <div className="tweets-container">
            {sortedTweets.map(tweet => (
              <TweetCard key={tweet.id} tweet={tweet} />
            ))}
        </div>
        </main>

        {/* Right Sidebar - Simple Trending */}
        <aside className="right-sidebar">
          <div className="sidebar-section">
            <h3>🔥 Trending Now</h3>
            <div className="trending-simple">
              {['#TsunamiAlert', '#CycloneWatch', '#CoastalSafety', '#OceanHazard', '#EmergencyAlert'].map((hashtag, index) => (
                <div key={hashtag} className="trending-item-simple">
                  <span className="trend-rank">#{index + 1}</span>
                  <span className="trend-tag">{hashtag}</span>
                  <span className="trend-count">{Math.floor(Math.random() * 50) + 10}K</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sidebar-section">
            <h3>📰 Latest Alert</h3>
            <div className="alert-card">
              <div className="alert-badge">🚨 BREAKING</div>
              <div className="alert-title">Tsunami Warning Issued</div>
              <div className="alert-text">High wave activity detected in Bay of Bengal. Coastal areas advised to stay alert.</div>
              <div className="alert-time">5 minutes ago</div>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .social-analytics-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .social-header {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: 1.1rem;
          color: #7f8c8d;
          margin: 0;
        }

        .social-grid {
          display: grid;
          grid-template-columns: 300px 1fr 320px;
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          min-height: calc(100vh - 200px);
        }

        .left-sidebar, .right-sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          height: fit-content;
          position: sticky;
          top: 2rem;
        }

        .sidebar-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .sidebar-section h3 {
          margin: 0 0 1rem 0;
          color: #2c3e50;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e1e8ed;
          border-radius: 25px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #1da1f2;
          box-shadow: 0 0 0 3px rgba(29, 161, 242, 0.1);
        }

        .filter-section, .sort-section {
          margin-top: 1.5rem;
        }

        .filter-section h4, .sort-section h4 {
          margin: 0 0 0.75rem 0;
          color: #657786;
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .filter-buttons {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.5rem;
        }

        .filter-btn {
          padding: 0.4rem 0.8rem;
          border: 2px solid #e1e8ed;
          background: white;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: center;
          white-space: nowrap;
        }

        .filter-btn:hover {
          border-color: #1da1f2;
          background: #f7f9fa;
        }

        .filter-btn.active {
          background: #1da1f2;
          border-color: #1da1f2;
          color: white;
        }

        .sort-select {
          width: 100%;
          padding: 0.75rem;
          border: 2px solid #e1e8ed;
          border-radius: 8px;
          font-size: 0.9rem;
          background: white;
        }

        .main-feed {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          min-height: calc(100vh - 250px);
          overflow-y: auto;
        }

        .feed-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 2px solid #e1e8ed;
        }

        .feed-header h2 {
          margin: 0;
          color: #2c3e50;
          font-size: 1.5rem;
          font-weight: 700;
        }

        .feed-stats {
          display: flex;
          gap: 1rem;
        }

        .stat {
          background: #f7f9fa;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #657786;
        }

        .tweets-container {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        /* Simple Analytics Styles */
        .quick-stats {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0.75rem;
        }

        .stat-card {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        /* Simple Trending Styles */
        .trending-simple {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .trending-item-simple {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem;
          background: #f7f9fa;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .trending-item-simple:hover {
          background: #e1f5fe;
          transform: translateX(4px);
        }

        .trend-rank {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
        }

        .trend-tag {
          flex: 1;
          color: #1da1f2;
          font-weight: 700;
          font-size: 0.9rem;
        }

        .trend-count {
          color: #657786;
          font-size: 0.8rem;
          font-weight: 600;
        }

        /* Alert Card Styles */
        .alert-card {
          background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
          color: white;
          border-radius: 12px;
          padding: 1rem;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(231, 76, 60, 0); }
          100% { box-shadow: 0 0 0 0 rgba(231, 76, 60, 0); }
        }

        .alert-badge {
          background: rgba(255, 255, 255, 0.2);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          display: inline-block;
          margin-bottom: 0.5rem;
          animation: flash 1s infinite;
        }

        @keyframes flash {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0.7; }
        }

        .alert-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .alert-text {
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 0.5rem;
          opacity: 0.9;
        }

        .alert-time {
          font-size: 0.7rem;
          opacity: 0.8;
        }

        @media (max-width: 1200px) {
          .social-grid {
            grid-template-columns: 280px 1fr;
            gap: 1.5rem;
          }
          
          .right-sidebar {
            display: none;
          }
        }

        @media (max-width: 900px) {
          .social-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .left-sidebar, .right-sidebar {
            order: 2;
          }
          
          .main-feed {
            order: 1;
          }
          
          .right-sidebar {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .social-header {
            padding: 1rem;
          }
          
          .page-title {
            font-size: 1.8rem;
          }
          
          .social-grid {
            padding: 0 1rem;
          }
          
          .filter-buttons {
            grid-template-columns: 1fr;
          }
        }

        @media (min-width: 1400px) {
          .social-grid {
            grid-template-columns: 350px 1fr 380px;
            max-width: 1600px;
          }
        }

        @media (min-width: 1600px) {
          .social-grid {
            grid-template-columns: 400px 1fr 420px;
            max-width: 1800px;
          }
        }
      `}</style>
    </div>
  );
}