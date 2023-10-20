module.exports = {
	apps: [
		{
			name: 'applefarm',
			script: 'ts-node', // or path to ts-node if not in PATH
			args: 'index.ts',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			env: {
				NODE_ENV: 'development',
			},
			env_production: {
				NODE_ENV: 'production',
			},
		},
	],
}
