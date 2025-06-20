import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  server: {
    host: true,
    strictPort: true,
    port: 10000,
  },
  preview: {
    allowedHosts: ['subtrackerfrontend.onrender.com'],
  },
})
