import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const baseURL = process.env.REACT_APP_API_URL;

function ProtectedRoute({ children }) {
  const [isValidToken, setIsValidToken] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        await axios.get(baseURL + '/validatetoken', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setIsValidToken(true);
        
      } catch (error) {
        setIsValidToken(false);
        localStorage.removeItem('token');
      }
    };

    if (token) {
      validateToken();
    } else {
      setIsValidToken(false);
      localStorage.removeItem('token');
    }
  }, [token]);

  if (isValidToken === null) {
    return <div>Loading...</div>;
  }

  return isValidToken ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;