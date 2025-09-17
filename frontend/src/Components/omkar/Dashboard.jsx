import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserCircle } from 'react-icons/fa';

import './Dashboard.css';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserData = async () =>{
            try{
                const token = localStorage.getItem('token');
                if(!token){
                    navigate ('/login');
                    return;
                }
            }
        }
    })
}


