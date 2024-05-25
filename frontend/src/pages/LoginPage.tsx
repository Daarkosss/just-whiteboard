// src/pages/LandingPage.tsx
import React from 'react';
import LoginPanel from '../components/LoginPanel';
import { useTranslation } from 'react-i18next';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="sticky-header">
        <h1 className='title'>
          {t('appTitle')}
        </h1>
      </div>
      <div className="login-container">
        <LoginPanel />
      </div>
    </div>
  );
};

export default LoginPage;
