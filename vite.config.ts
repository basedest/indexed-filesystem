import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import manifest from './src/manifest'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/indexed-filesystem/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'images/*.png'],
      manifest
   })
  ],
})
