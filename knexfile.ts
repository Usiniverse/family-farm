import { Knex } from 'knex'
import * as fs from 'fs'
import * as path from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

const migrationRootDir = path.join(process.cwd(), './migrations')
const migrationsDirs = fs
	.readdirSync(migrationRootDir, { withFileTypes: true })
	.filter((folder) => folder.isDirectory())
	.map((folder) => path.join(migrationRootDir, folder.name))

const defaultKnexConfig: Knex.Config = {
	client: 'pg',
	connection: {
		host: process.env.POSTGRESQL_HOST,
		database: process.env.POSTGRESQL_DATABASE,
		user: process.env.POSTGRESQL_USER,
		password: process.env.POSTGRESQL_PASSWORD,
		port: parseInt(process.env.POSTGRESQL_PORT || '5432'),
	},
	pool: {
		min: parseInt(process.env.POSTGRESQL_POOL_MIN || '1'),
		max: parseInt(process.env.POSTGRESQL_POOL_MAX || '10'),
	},
}

export default {
	...defaultKnexConfig,
	migrations: {
		directory: [...migrationsDirs, './migrations'],
	},
	seeds: {
		directory: './seeds',
	},
}
