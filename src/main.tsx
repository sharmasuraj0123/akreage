import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThirdwebProvider } from 'thirdweb/react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThirdwebProvider>
  </StrictMode>,
);
