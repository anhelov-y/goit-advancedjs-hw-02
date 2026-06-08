import { defineConfig } from 'vite';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';

export default defineConfig(({ command }) => {
  return {
    // Якщо збірка йде на GitHub, беремо назву репозиторію, інакше — корінь
    base: command === 'build' ? '/goit-advancedjs-hw-02/' : '/',

    root: 'src',
    build: {
      sourcemap: true,
      rollupOptions: {
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: 'assets/[name]-[hash].js',
          chunkFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash].[ext]',
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [injectHTML(), FullReload(['./src/**/**.html'])],
  };
});