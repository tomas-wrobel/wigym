import react from '@vitejs/plugin-react';
import {VitePWA} from "vite-plugin-pwa";
import {defineConfig} from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
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
				"display": "standalone",
				"start_url": "/",
				"description": "Wigym App je aplikace pro studenty Wichterlova gymnázia",
				"shortcuts": [
					{
						"name": "Rozvrh",
						"url": "/timetable",
					},
					{
						"name": "Známky",
						"url": "/marks",
					}
				]
			}
		})
	]
});
