import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'node:path'
import { execSync } from 'node:child_process'

// Real build metadata for the footer status line: which commit is live and when it was built.
const git = (cmd: string, fallback: string) => {
  try {
    return execSync(cmd, { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim() || fallback
  } catch {
    return fallback
  }
}

export default defineConfig({
  plugins: [react()],
  define: {
    __BUILD__: JSON.stringify({
      sha: git('git rev-parse --short HEAD', 'local'),
      branch: git('git rev-parse --abbrev-ref HEAD', 'main'),
      builtAt: new Date().toISOString(),
    }),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
  },
})
