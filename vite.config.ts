/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import tsconfigPaths from 'vite-tsconfig-paths'
import * as path from 'path'

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
      '@': path.resolve(__dirname, './src')
    }
  }
})
