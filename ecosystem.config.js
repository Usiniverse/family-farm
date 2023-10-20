module.exports = {
	apps: [
		{
			name: 'applefarm',
			script: '/usr/local/share/.config/yarn/global/node_modules/ts-node/dist/bin.js', // Use the full path to ts-node
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
