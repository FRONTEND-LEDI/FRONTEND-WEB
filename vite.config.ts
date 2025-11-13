
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, 
    port: 5173, 
     hmr: {
      overlay: true, // Muestra errores en pantalla
      protocol: 'ws', // Usar WebSocket para HMR
      host: 'localhost',
    },
    // Vigilar cambios en estos archivos
    watch: {
      usePolling: true, // Útil si tienes problemas en Windows/WSL
      interval: 100
    }
  },
  // Optimización de dependencias
  optimizeDeps: {
    include: ['react', 'react-dom', 'socket.io-client']
  }
  
})
