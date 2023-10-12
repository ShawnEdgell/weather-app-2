import { defineConfig } from 'vite';
import ViteSvg from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [ViteSvg(),
  ],
  base: '/weather-app-2/',
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    target: 'esnext', 
    outDir: 'dist', 
    minify: 'terser',
    sourcemap: true
  },
  server: {
    port: 3000, 
    open: true,   
    strictPort: false, 
    cors: true,   
    https: false,  
    proxy: { 
    }
  },
  
});