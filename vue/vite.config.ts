import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'
import path from 'path';
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

dotenv.config();

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    }
  },
  plugins: [vue()],
  server: {
    port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT) : 3000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
