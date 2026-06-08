import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  
  base: '',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        timer: resolve(__dirname, 'src/1-timer.html'),
        snackbar: resolve(__dirname, 'src/2-snackbar.html'),
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./**/*.html'])],
});