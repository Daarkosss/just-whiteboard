import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import "./i18n/i18n";
import { StoreProvider } from './store/StoreProvider';
import RootStore from './store/RootStore';

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

const store = new RootStore();

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <StoreProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
