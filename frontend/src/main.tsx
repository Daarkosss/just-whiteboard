import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import "./i18n/i18n";

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

const clientId = '1062105740354-3ilga9bncos799lefe0a1ufsik9imm2c.apps.googleusercontent.com';

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
