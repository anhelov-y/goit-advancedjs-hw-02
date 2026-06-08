import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '',

  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        timer: './1-timer.html',
        snackbar: './2-snackbar.html',
      },
    },
    outDir: '../dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
});