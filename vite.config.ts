import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'prompt',
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon.svg'],
        manifest: {
          id: '/',
          name: 'Kirjakaveri - Suomen Kirjastot & Kirjat',
          short_name: 'Kirjakaveri',
          description: 'Löydä Suomen yli 700 yleistä kirjastoa, aukioloajat ja suosikkikirjasi helposti.',
          theme_color: '#003DA5',
          background_color: '#003DA5',
          display: 'standalone',
          display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
          orientation: 'portrait',
          launch_handler: {
            client_mode: 'focus-existing',
          },
          start_url: '/',
          scope: '/',
          prefer_related_applications: false,
          lang: 'fi',
          dir: 'ltr',
          categories: ['books', 'education', 'lifestyle'],
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/icon-512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
          shortcuts: [
            {
              name: 'Etsi Kirjastoja',
              short_name: 'Kirjastot',
              description: 'Löydä lähimmät kirjastot kartalta',
              url: '/?tab=map',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Hae Kirjoja',
              short_name: 'Kirjat',
              description: 'Hae Suomen kirjastojen teoksia',
              url: '/?tab=books',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
            {
              name: 'Lukupäiväkirja',
              short_name: 'Päiväkirja',
              description: 'Tarkastele lukulistojasi',
              url: '/?tab=diary',
              icons: [{ src: '/pwa-192x192.png', sizes: '192x192' }],
            },
          ],
          screenshots: [
            {
              src: '/screenshot-mobile.png',
              sizes: '1080x1920',
              type: 'image/png',
              form_factor: 'narrow',
              label: 'Kirjakaveri mobiilinäkymä - Suomen kirjastot ja aukioloajat',
            },
            {
              src: '/screenshot-desktop.png',
              sizes: '1920x1080',
              type: 'image/png',
              form_factor: 'wide',
              label: 'Kirjakaveri työpöytänäkymä - Karttahaku ja aukioloajat',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.kirjastot\.fi\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'kirjastot-api-cache',
                expiration: {
                  maxEntries: 50,
                  maxAgeSeconds: 60 * 60 * 24 * 7,
                },
              },
            },
            {
              urlPattern: /^https:\/\/tile\.openstreetmap\.org\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'map-tiles-cache',
                expiration: {
                  maxEntries: 200,
                  maxAgeSeconds: 60 * 60 * 24 * 30,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
