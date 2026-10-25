import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'], // Muestra la tabla en la terminal y crea los archivos HTML
      reportOnFailure: true, //linea agregada para que muestre el reporte de cobertura incluso si hay fallos en los tests
      include: ['src/utils/**', 'src/components/**', 'src/services/**'],
    },
  },
})