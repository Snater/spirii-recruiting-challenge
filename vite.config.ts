/// <reference types="vitest"/>
import {coverageConfigDefaults} from 'vitest/config';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	test: {
		environment: 'jsdom',
		coverage: {
			exclude: [
				'src/*.{ts,tsx}',
				'src/**/index.{ts,tsx}',
				'src/**/MockApi.{ts,tsx}',
				...coverageConfigDefaults.exclude,
			],
		},
		globals: true,
		setupFiles: './src/setupTests.ts',
	},
})