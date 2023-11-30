import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { postRequest } from './authRequests.js';

import Hotjar from '@hotjar/browser';
const siteId = 3765543;
const hotjarVersion = 6;
Hotjar.init(siteId, hotjarVersion);
const verifyEmailPage = '/verifyEmail';
Hotjar.stateChange(verifyEmailPage);

const VerifyEmail = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const emailToken = searchParams.get('emailToken');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        if (!emailToken) {
          throw new Error('Email token not found');
        }

        const baseUrl = `${process.env.REACT_APP_SERVER_URL}`;
        const response = await postRequest(`${baseUrl}/auth/verify-email`, {
          emailToken: emailToken
        });

        setIsLoading(false);

        if (response.error) {
          setError(response.error);
        } else {
          // Handle success, e.g., redirect to a success page or show a success message
          console.log('Email verified successfully');
        }
      } catch (error) {
        setIsLoading(false);
        setError(error.message);
      }
    };

    verifyEmail();
  }, [emailToken]);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {!isLoading && error && <p>Error: {error}</p>}
      {!isLoading && !error && <p>Email verified successfully!</p>}
    </div>
  );
};

export default VerifyEmail;
