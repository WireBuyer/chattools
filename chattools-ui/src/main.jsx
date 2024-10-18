import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
=======
>>>>>>> e69c44ff88e811d7b9c1d62c2e53a5183687eea3
import { AuthProvider } from './AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<<<<<<< HEAD
    <MantineProvider defaultColorScheme="dark">
      <AuthProvider>
        <App />
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode>
=======
      <MantineProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
  </React.StrictMode>,
>>>>>>> e69c44ff88e811d7b9c1d62c2e53a5183687eea3
)
