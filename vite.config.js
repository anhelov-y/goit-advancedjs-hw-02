import { defineConfig } from 'vite';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig({
  base: '',

  build: {
    rollupOptions: {
      input: {
        main: 'src/index.html',
        timer: 'src/1-timer.html',
        snackbar: 'src/2-snackbar.html',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
});