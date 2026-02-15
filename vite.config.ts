import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@prisma/adapter-pg']
	},
	optimizeDeps: {
		exclude: ['@prisma/adapter-pg', 'pg-native']
	},
	resolve: {
		alias: {
			stream: 'stream-browserify',
			crypto: 'crypto-browserify',
			zlib: 'browserify-zlib',
			path: 'path-browserify',
            events: 'events',
		}
	},
    define: {
        global: 'globalThis',
    },
});
