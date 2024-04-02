import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import nightwatchPlugin from 'vite-plugin-nightwatch'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'node:path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), nightwatchPlugin(), VueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
      '/@/app/components/ui': path.resolve(__dirname, 'src/app/components/ui')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/styles/variables.scss";
        @import "./src/assets/styles/mixins.scss";`
      }
    }
  }
})
