import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import "./i18n/i18n";

const container = document.getElementById('root')!;
const root = ReactDOM.createRoot(container);

root.render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <App />
      <ToastContainer
        position="bottom-right"
        theme='colored'
      />
    </BrowserRouter>
  </GoogleOAuthProvider>
);
