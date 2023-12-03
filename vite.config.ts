/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import eslint from 'vite-plugin-eslint';
import manifest from './src/app/manifest';

// https://vitejs.dev/config/
export default defineConfig({
    base: '/indexed-filesystem/',
    plugins: [
        react(),
        eslint({
            failOnError: false,
            failOnWarning: false,
        }),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'images/*.png'],
            manifest,
        }),
    ],
    resolve: {
        alias: {
            '@app': path.resolve('src/app'),
            '@processes': path.resolve('src/processes'),
            '@pages': path.resolve('src/pages'),
            '@widgets': path.resolve('src/widgets'),
            '@features': path.resolve('src/features'),
            '@entities': path.resolve('src/entities'),
            '@shared': path.resolve('src/shared'),
        },
    },
});
