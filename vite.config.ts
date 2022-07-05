import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginForArco from '@arco-plugins/vite-react'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginForArco(),
  ],
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, './src') }
    ],
    extensions: ['.ts', '.tsx', '.js', '.d.ts']
  }
})
