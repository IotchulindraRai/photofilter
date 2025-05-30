import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster position="bottom-center" toastOptions={{
      style: {
        background: '#4B5563',
        color: '#F9FAFB',
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
      },
      success: {
        duration: 3000,
        iconTheme: {
          primary: '#10B981',
          secondary: '#F9FAFB',
        },
      },
      error: {
        duration: 4000,
        iconTheme: {
          primary: '#EF4444',
          secondary: '#F9FAFB',
        },
      },
    }} />
  </StrictMode>
);