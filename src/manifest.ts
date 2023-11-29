import { ManifestOptions } from 'vite-plugin-pwa';

export default {
    name: 'File Explorer',
    short_name: 'FilEx',
    description: 'Web-based file explorer app',
    display: 'standalone',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    icons: [
        {
            src: './images/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
        },
        {
            src: './images/android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
        },
    ],
} as Partial<ManifestOptions>;
