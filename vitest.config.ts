import {coverageConfigDefaults} from 'vitest/config';
import {defineConfig} from 'vitest/config';

export default defineConfig({
	test: {
		coverage: {
			provider: 'v8',
			exclude: [
				'packages/client/src/*.{ts,tsx}',
				'packages/client/src/**/*.stories.{ts,tsx}',
				'packages/client/src/**/index.{ts,tsx}',
				'packages/client/src/**/MockApi.{ts,tsx}',
				'lib/**/*',
				'packages/server/**/*',
				...coverageConfigDefaults.exclude,
			],
		},
	},
});
