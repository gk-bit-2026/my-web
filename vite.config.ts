import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This maps @ to the src/app folder
      '@': path.resolve(__dirname, './src/app'),
      // This specifically maps @/lib to the src/lib folder
      '@/lib': path.resolve(__dirname, './src/lib'),
    },
  },
});
