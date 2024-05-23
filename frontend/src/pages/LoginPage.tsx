// src/pages/LandingPage.tsx
import React from 'react';
import LoginButton from '../components/LoginButton';

const LoginPage: React.FC = () => {
  return (
    <div>
      <div className="sticky-header">
        <h1 className='title'>
          Just Whiteboard
        </h1>
      </div>
      <div className="login-container">
        <LoginButton />
      </div>
    </div>
  );
};

export default LoginPage;
