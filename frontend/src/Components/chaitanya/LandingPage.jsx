import React, { useState } from "react";
import { Navigate } from "react-router-dom";


function LandingPage(){
    const navigate= useNavigate();
    const [language, setLanguage] = useState('en');
    const [showCallPopUp, setshowCallPopUp] = useState('false');
    const[phonenumber, setPhoneNumber] = useState('');
    const[showSuccessMassage, setShowSuccessMassage] = useState('false');
    
    const handleCallRequest = () => {
        if(phonenumber.trim()){
            setShowSuccessMassage('false');
            setShowSuccessMassage('true');
            setPhoneNumber('');
// test
            //hide success 
        }
    
    }

    
    
}
 export default LandingPage;



















































































































