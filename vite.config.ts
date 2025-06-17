import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/admin_mock/',
  server: {
    open: true,
    port: 3007
  }
});
