// import { defineConfig } from 'vite'
// import tailwindcss from '@tailwindcss/vite'
// export default defineConfig({
//   plugins: [
//     tailwindcss(),
//     base: '/', // Ensure the base is correct for deployment
//     build: {
//     outDir: 'dist', // Default output directory
//   }
//   ],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react(), tailwindcss(),],
  base: '/', // Ensure the base is correct for deployment
  build: {
    outDir: 'dist', // Default output directory
  },
});
