export default defineConfig(({ command }) => ({
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
}));