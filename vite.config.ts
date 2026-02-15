import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
	plugins: [
        sveltekit(),
        {
            name: 'node-polyfills',
            transform(code, id) {
                // Ensure global is available
                if (id.includes('node_modules')) {
                    return {
                        code: 'var global = globalThis;' + code,
                        map: null
                    }
                }
            }
        }
    ],
	ssr: {
		noExternal: ['@prisma/adapter-pg', 'pg', 'pg-connection-string', 'split2', 'pg-protocol', 'pg-int8', 'pg-types', 'postgres-array', 'postgres-bytea', 'postgres-date', 'postgres-interval']
	},
	optimizeDeps: {
		include: ['@prisma/adapter-pg', 'pg'],
        esbuildOptions: {
            define: {
                global: 'globalThis'
            },
            plugins: [
                {
                    name: 'node-modules-polyfill',
                    setup(build) {
                        build.onResolve({ filter: /^(fs|net|tls|dns|child_process)$/ }, args => ({
                            path: resolve(__dirname, 'src/lib/empty-module.js')
                        }));
                    }
                }
            ]
        }
	},
    resolve: {
        alias: {
            fs: resolve(__dirname, 'src/lib/empty-module.js'),
            net: resolve(__dirname, 'src/lib/empty-module.js'),
            tls: resolve(__dirname, 'src/lib/empty-module.js'),
            dns: resolve(__dirname, 'src/lib/empty-module.js'),
            child_process: resolve(__dirname, 'src/lib/empty-module.js'),
            stream: 'stream-browserify',
            events: 'events',
            util: 'util',
            path: 'path-browserify',
            buffer: 'buffer',
            process: 'process/browser',
            crypto: 'crypto-browserify',
            zlib: 'browserify-zlib',
            http: 'stream-http',
            https: 'https-browserify',
            assert: 'assert',
            url: 'url'
        }
    },
    define: {
        global: 'globalThis',
        'process.env': {},
        'process.version': '"v16.0.0"'
    },
});
