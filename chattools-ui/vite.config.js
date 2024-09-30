import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  logLevel: 'info',
  server: {
    // port: 517,
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
      }
    }
  }
})
