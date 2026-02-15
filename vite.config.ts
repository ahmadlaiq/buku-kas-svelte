import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
	plugins: [
		sveltekit(),
		nodePolyfills({
			include: ['events', 'fs', 'util', 'stream', 'path', 'crypto', 'dns', 'net', 'tls', 'child_process'],
			globals: {
				Buffer: true,
				global: true,
				process: true,
			},
            protocolImports: true,
		}),
	],
	ssr: {
        // Force bundling of these packages so polyfills are applied during build
		noExternal: ['@prisma/adapter-pg', 'pg', 'pg-connection-string', 'split2', 'pg-protocol', 'pg-int8', 'pg-types']
	},
	optimizeDeps: {
		exclude: ['@prisma/adapter-pg']
	},
    define: {
        global: 'globalThis',
    },
});
