import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import App from './App'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import { AuthProvider } from './AuthProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <MantineProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </MantineProvider>
  </React.StrictMode>,
)
