// src/pages/LandingPage.tsx
import React from 'react';
import LoginPanel from '../components/LoginPanel';
import { LoginHeader } from '../components/Header';

const LoginPage: React.FC = () => {
  return (
    <div>
      <LoginHeader />
      <div className="login-container">
        <LoginPanel />
      </div>
    </div>
  );
};

export default LoginPage;
