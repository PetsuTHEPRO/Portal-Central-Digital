import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Carrega as variáveis de ambiente baseadas no modo (development, production, etc.)
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [
      vue(),
      vueDevTools(),
    ],
    base: '/Portal-Central-Digital/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    // Configurações do servidor de desenvolvimento
    server: {
      port: env.VITE_PORT || 5173,
      host: env.VITE_HOST || 'localhost',
      open: env.VITE_OPEN_BROWSER === 'true',
    },
    // Configurações de build
    build: {
      outDir: env.VITE_BUILD_DIR || 'dist',
      sourcemap: env.VITE_SOURCEMAP === 'true' || mode === 'development',
    },
    // Define variáveis de ambiente que serão expostas para o cliente
    define: {
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION || '1.0.0'),
      __APP_NAME__: JSON.stringify(env.VITE_APP_NAME || 'Portal Central Digital'),
    },
    // Configuração para variáveis de ambiente
    envPrefix: 'VITE_', // Só variáveis que começam com VITE_ serão expostas ao cliente
  }
})
