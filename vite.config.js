import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'schools.csv'],

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,csv}'],
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
        
        // 👇 THIS IS THE NEW FIX: Increase limit to 10 MB (in bytes)
        maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, 
      },

      manifest: {
        name: 'InsightEd',
        short_name: 'InsightEd',
        description: 'School Data Capture Tool',
        theme_color: '#004A99',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/InsightEd1.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/InsightEd1.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})