import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ['events', 'fs', 'util', 'stream', 'path', 'crypto', 'dns', 'net', 'tls'],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
		}),
	],
	ssr: {
		noExternal: ['@prisma/adapter-pg']
	},
	optimizeDeps: {
		exclude: ['@prisma/adapter-pg', 'pg-native']
	},
    define: {
        global: 'globalThis',
    },
});
