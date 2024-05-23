import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/UserStore';

const LoginPanel: React.FC = () => {
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
      <div>Login</div>
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
