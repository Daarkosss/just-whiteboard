import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/UserStore';
import { useTranslation } from 'react-i18next';

const LoginPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const responseMessage = (response: CredentialResponse) => {
    userStore.login(response);
    navigate('/home');
  };

  const errorMessage = () => {
    console.log('Login failed');
  };

  return (
    <div className="login-panel">
      <div>{t('login')}</div>
      <GoogleLogin 
        shape="pill" 
        width={300} 
        locale="en" 
        onSuccess={responseMessage} 
        onError={errorMessage}
      />
    </div>
  );
};

export default LoginPanel;
