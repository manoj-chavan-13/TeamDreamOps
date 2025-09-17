import React, { useState, useEffect } from 'react';
import TweetCard from './TweetCard.jsx';

// 
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