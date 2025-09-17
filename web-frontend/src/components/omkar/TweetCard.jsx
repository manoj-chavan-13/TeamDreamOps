import React, { useState } from 'react';

const TweetCard = ({ tweet }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getSeverityColor = (severity) => {
    switch(severity) {
      case 'Extreme': return '#e74c3c';
      case 'High': return '#f39c12';
      case 'Medium': return '#f1c40f';
      case 'Low': return '#27ae60';
      default: return '#95a5a6';
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case 'Extreme': return '🚨';
      case 'High': return '⚠️';
      case 'Medium': return '⚡';
      case 'Low': return '💡';
      default: return '📍';
    }
  };

  const getHazardIcon = (hazardType) => {
    switch(hazardType) {
      case 'Tsunami': return '🌊';
      case 'Cyclone': return '🌀';
      case 'High Tide': return '🌊';
      case 'Swell Surge': return '〰️';
      case 'Coastal Erosion': return '🏖️';
      default: return '⚠️';
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="tweet-card">
      {/* Tweet Header */}
      <div className="tweet-header">
        <div className="user-info">
          <div className="avatar">
            {tweet.username.charAt(1).toUpperCase()}
          </div>
          <div className="user-details">
            <div className="user-line">
              <span className="display-name">{tweet.handle}</span>
              {tweet.verified && <span className="verified">✓</span>}
              <span className="username">{tweet.username}</span>
              <span className="time">• {tweet.time}</span>
            </div>
            <div className="location">📍 {tweet.location}</div>
          </div>
        </div>
        
        <div className="hazard-info">
          <div className="hazard-type">
            {getHazardIcon(tweet.hazardType)} {tweet.hazardType}
          </div>
          <div 
            className="severity-badge"
            style={{ backgroundColor: getSeverityColor(tweet.severity) }}
          >
            {getSeverityIcon(tweet.severity)} {tweet.severity}
          </div>
        </div>
      </div>

      {/* Tweet Content */}
      <div className="tweet-content">
        <p className={`content-text ${isExpanded ? 'expanded' : ''}`}>
          {tweet.content.split(' ').map((word, index) => {
            if (word.startsWith('#')) {
              return <span key={index} className="hashtag">{word} </span>;
            }
            if (word.startsWith('@')) {
              return <span key={index} className="mention">{word} </span>;
            }
            return word + ' ';
          })}
        </p>
        
        {tweet.content.length > 200 && (
          <button 
            className="expand-btn"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>

      {/* Tweet Media */}
      {tweet.image && (
        <div className="tweet-media">
          <img src={tweet.image} alt="Hazard documentation" className="media-image" />
        </div>
      )}

      {/* Tweet Actions */}
      <div className="tweet-actions">
        <button className="action-btn reply">
          <span className="icon">💬</span>
          <span className="count">{formatNumber(tweet.replies)}</span>
        </button>
        
        <button className="action-btn retweet">
          <span className="icon">🔁</span>
          <span className="count">{formatNumber(tweet.retweets)}</span>
        </button>
        
        <button className="action-btn like">
          <span className="icon">❤️</span>
          <span className="count">{formatNumber(tweet.likes)}</span>
        </button>
        
        <button className="action-btn share">
          <span className="icon">📤</span>
        </button>
        
        <div className="engagement-score">
          <span className="engagement-label">Engagement:</span>
          <span className="engagement-value">{formatNumber(tweet.engagement)}</span>
        </div>
      </div>

      <style jsx>{`
        .tweet-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e1e8ed;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .tweet-card:hover {
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
          transform: translateY(-2px);
        }

        .tweet-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .user-info {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
        }

        .user-details {
          flex: 1;
        }

        .user-line {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.25rem;
        }

        .display-name {
          font-weight: 700;
          color: #14171a;
          font-size: 1rem;
        }

        .verified {
          color: #1da1f2;
          font-size: 0.9rem;
        }

        .username {
          color: #657786;
          font-size: 0.9rem;
        }

        .time {
          color: #657786;
          font-size: 0.9rem;
        }

        .location {
          color: #657786;
          font-size: 0.8rem;
        }

        .hazard-info {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 0.5rem;
        }

        .hazard-type {
          background: #f7f9fa;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #657786;
        }

        .severity-badge {
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .tweet-content {
          margin-bottom: 1rem;
        }

        .content-text {
          font-size: 1rem;
          line-height: 1.5;
          color: #14171a;
          margin: 0;
          max-height: 4.5em;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }

        .content-text.expanded {
          max-height: none;
        }

        .hashtag {
          color: #1da1f2;
          font-weight: 600;
          cursor: pointer;
        }

        .hashtag:hover {
          text-decoration: underline;
        }

        .mention {
          color: #1da1f2;
          font-weight: 600;
          cursor: pointer;
        }

        .mention:hover {
          text-decoration: underline;
        }

        .expand-btn {
          background: none;
          border: none;
          color: #1da1f2;
          font-size: 0.9rem;
          cursor: pointer;
          margin-top: 0.5rem;
        }

        .expand-btn:hover {
          text-decoration: underline;
        }

        .tweet-media {
          margin-bottom: 1rem;
          border-radius: 12px;
          overflow: hidden;
        }

        .media-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .tweet-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid #e1e8ed;
        }

        .action-btn {
          background: none;
          border: none;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
        }

        .action-btn:hover {
          background: #f7f9fa;
        }

        .action-btn.reply:hover {
          background: rgba(29, 161, 242, 0.1);
          color: #1da1f2;
        }

        .action-btn.retweet:hover {
          background: rgba(23, 191, 99, 0.1);
          color: #17bf63;
        }

        .action-btn.like:hover {
          background: rgba(224, 36, 94, 0.1);
          color: #e0245e;
        }

        .action-btn.share:hover {
          background: rgba(29, 161, 242, 0.1);
          color: #1da1f2;
        }

        .icon {
          font-size: 1.1rem;
        }

        .count {
          font-weight: 600;
          color: #657786;
        }

        .engagement-score {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 0.8rem;
        }

        .engagement-label {
          color: #657786;
          margin-bottom: 0.2rem;
        }

        .engagement-value {
          font-weight: 700;
          color: #1da1f2;
        }

        @media (max-width: 768px) {
          .tweet-card {
            padding: 1rem;
          }
          
          .tweet-header {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hazard-info {
            align-self: flex-start;
            flex-direction: row;
          }
          
          .tweet-actions {
            flex-wrap: wrap;
            gap: 0.5rem;
          }
          
          .action-btn {
            padding: 0.4rem 0.8rem;
          }
        }
      `}</style>
    </div>
  );
};

export default TweetCard;
