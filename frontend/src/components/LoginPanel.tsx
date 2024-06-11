import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useTranslation } from 'react-i18next';
import store from '../store/RootStore';
import { User } from '../store/AuthStore';

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  picture: string;
}

const LoginPanel: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSuccessLogin = async (response: CredentialResponse) => {
    if (response.credential) {
      const decodedToken: DecodedToken = jwtDecode(response.credential);
      const user: User = {
        _id: "",
        ssoID: decodedToken.sub,
        name: decodedToken.name,
        email: decodedToken.email,
        avatar: decodedToken.picture,
        userToken: response.credential,
      };
      store.auth.saveUserToStorage(user);

      await store.auth.login();
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
        onSuccess={handleSuccessLogin} 
        onError={errorMessage}
      />
    </div>
  );
};

export default LoginPanel;
