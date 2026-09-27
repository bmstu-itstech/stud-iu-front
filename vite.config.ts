import { fileURLToPath, URL } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiProxyTarget =
    process.env.VITE_PROXY_TARGET || env.VITE_PROXY_TARGET || 'http://localhost:8000'

  const featureFlagsOverrides: Record<string, string> = {
    '/config/featureFlags': '/config/featureFlags.e2e.ts',
  }
  const alias = [
    ...(mode === 'e2e'
      ? Object.entries(featureFlagsOverrides).map(([find, replacement]) => ({
          find: new RegExp(`^@${find}$`),
          replacement: fileURLToPath(new URL(`./src${replacement}`, import.meta.url)),
        }))
      : []),
    { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
  ]

  return {
    plugins: [react()],
    resolve: {
      alias,
    },
    server: {
      port: 5173,
      proxy: {
        '/api': { target: apiProxyTarget, changeOrigin: true },
        '/media': { target: apiProxyTarget, changeOrigin: true },
      },
    },
  }
})
