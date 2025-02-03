import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(props => {
	const env = loadEnv(props.mode, process.cwd(), 'VITE');

	const envWithProcessPrefix = {
		'process.env': JSON.stringify(env),
	};

	return {
		plugins: [react()],
		define: envWithProcessPrefix,
	}
})