import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
   alias: {
  '@': path.resolve(__dirname, './src/app'),
  '@/lib': path.resolve(__dirname, './src/lib'),
},
  },
  server: {
    host: true, // Exposes to network for mobile testing
  }
});
