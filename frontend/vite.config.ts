import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Also proxying direct calls if needed, but usually /api prefix is better practice.
      // For now, let's proxy specific endpoints if they don't have /api prefix in the frontend calls?
      // Or better: update frontend to use /api prefix?
      // The backend defines /new-game, /move. Not /api/new-game.
      // So I should proxy /new-game, /move, /state directly.
      '/new-game': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/move': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/state': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
