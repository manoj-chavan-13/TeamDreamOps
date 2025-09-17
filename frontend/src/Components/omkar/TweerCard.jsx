import React, { useState } from 'react';

const TweetCard = ({ tweet }) => {
  const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    }
    
    
    


