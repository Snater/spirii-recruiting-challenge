/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
	collectCoverageFrom: [
		'src/**/*.{ts,tsx}',
		'!src/*.{ts,tsx}',
		'!src/**/index.{ts,tsx}',
		'!src/**/MockApi.{ts,tsx}',
	],
	setupFilesAfterEnv: ['./src/setupTests.ts'],
	testEnvironment: 'jsdom',
	transform: {
		'^.+.tsx?$': ['ts-jest',{}],
	},
};