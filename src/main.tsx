import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { ThirdwebProvider } from 'thirdweb/react';
import { createThirdwebClient } from 'thirdweb';

const client = createThirdwebClient({
  clientId: "a32954d2274ff167331b829df4fd8e25",
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThirdwebProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThirdwebProvider>
  </StrictMode>,
);
