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