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
  cons
