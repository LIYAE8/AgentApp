import { fileURLToPath, URL } from 'node:url'
import { Config } from '@en/config';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  // proxy:{
  //   '/api': {
  //     target: 'http://localhost:3001',
  //     changeOrigin: true,
  //     // rewrite: (path) => path.replace(/^\/api/, ''),
  //   },
  // },
  server: {
    port: Config.ports.web,
  },
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
