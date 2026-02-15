import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		noExternal: ['@prisma/adapter-pg']
	},
	optimizeDeps: {
		exclude: ['@prisma/adapter-pg']
	}
});
