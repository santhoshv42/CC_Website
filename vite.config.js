import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // Ensures relative assets path for Hostinger static deployment
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
});
