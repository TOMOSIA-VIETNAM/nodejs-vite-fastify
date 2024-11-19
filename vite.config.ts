/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import tsconfigPaths from 'vite-tsconfig-paths'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  server: {
    port: 3000
  },
  plugins: [
    tsconfigPaths(),
    ...VitePluginNode({
      adapter: 'fastify',
      appPath: './src/server.ts',
      exportName: 'viteNodeApp',
      tsCompiler: 'esbuild'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
