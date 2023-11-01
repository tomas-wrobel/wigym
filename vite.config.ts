import legacy from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import {VitePWA} from "vite-plugin-pwa";
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		legacy(),
		VitePWA({
			"registerType": "autoUpdate",
			"manifest": {
				"name": "Wigym App",
				"short_name": "Wigym App",
				"icons": [
					{
						"src": "/android-chrome-192x192.png",
						"sizes": "192x192",
						"type": "image/png"
					},
					{
						"src": "/android-chrome-512x512.png",
						"sizes": "512x512",
						"type": "image/png"
					}
				],
				"theme_color": "#ffffff",
				"background_color": "#ffffff",
				"display": "standalone",
				"start_url": "/"
			}
		})
	]
});
