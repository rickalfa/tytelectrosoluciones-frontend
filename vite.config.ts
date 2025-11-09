import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({

     base: './',
  server: {
    // AÑADIMOS ESTA SECCIÓN DE PROXY

   

    proxy: {
      // Cualquier petición que empiece con '/api'
      '/api': {
        // Será redirigida a nuestro backend de XAMPP
        target: 'http://localhost/tytelectrosoluciones/public',
        // Necesario para que el backend acepte la petición
        changeOrigin: true,
      },
    },
  },
});