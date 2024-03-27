import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  bulid: {
    outDir: '../mistertoy-backend/public',
    emptyOutDir: true
  }
})