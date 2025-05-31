// vite.config.js is a config for Vite, which runs REACT frontend server during development.
// this config sets up plugins, enlist rules, and a proxy to connect frontend & backend
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import eslint from 'vite-plugin-eslint';



// this is to tell Vite PLEASE USE THESE PLUGINS!
export default defineConfig(({ mode }) => ({
  plugins: [
    react(), // addsd React support so Vite can handle .jsx and REACT features
    // eslint({ 
    //   lintOnStart: true, // Runs ESLint(linter) every time the dev server starts
    //   failOnError: mode === "production" // if it finds errors in development, shows warnings. in production, stops the build
    // })
  ],
  // To automatically open the app in the browser whenever the server starts,
  // uncomment the following lines:
  // server: {
  //   open: true
  // }

  // proxy is important because, to let servers go across from backend to frontend, you need CORS
  // permissions. Remember your backend port is 8000 and React frontend port is 5173.
  
  server: {
    proxy: {
      '/api': 'http://localhost:8000'
    },
  }
}));
