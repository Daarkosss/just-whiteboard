import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import userStore from '../store/UserStore';
import { useTranslation } from 'react-i18next';

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

const LoginPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const responseMessage = (response: CredentialResponse) => {
    if (response.credential) {
      const decodedToken: DecodedToken = jwtDecode(response.credential);
      const user = {
        id: decodedToken.sub,
        name: decodedToken.name,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        token: response.credential,
      };

      userStore.setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/home');
    } else {
      console.error('No credential received');
    }
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
