import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import legacy from '@vitejs/plugin-legacy'; // Importa el plugin legacy

export default defineConfig({
  plugins: [
    vue(),
    legacy(), // Agrega el plugin legacy para compatibilidad con navegadores antiguos
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      config: path.resolve(__dirname, './postcss.config.js'), // Especifica la ruta completa del archivo .cjs
    },
  },
});
