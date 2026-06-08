import { defineConfig } from 'vite';
import { resolve } from 'path';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    root: 'src',
    base: command === 'serve' ? '/' : '/goit-advancedjs-hw-02/',
    
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
  };
});