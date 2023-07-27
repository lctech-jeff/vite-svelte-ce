import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
      },
    }),
  ],
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    lib: {
      entry: './src/main.ce.ts',
      name: 'jeff-svelte-ce',
      fileName: 'jeff-svelte-ce',
    },
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
  },
  define: {
    'process.env': process.env,
  },
})
