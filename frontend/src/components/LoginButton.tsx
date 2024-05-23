import React from 'react';
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import userStore from '../store/UserStore';

const LoginButton: React.FC = () => {
  const navigate = useNavigate();

  const responseMessage = (response: CredentialResponse) => {
    userStore.login(response);
    navigate('/home');
  };

  const errorMessage = () => {
    console.log('Login failed');
  };

  return (
    <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
  );
};

export default LoginButton;
