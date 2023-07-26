import { knex, Knex } from 'knex'
import Hoek from '@hapi/hoek'
import * as dotenv from "dotenv"
dotenv.config()

const defaultKnexConfig: Knex.Config = {
	client: 'pg',
	connection: {
		host: process.env.POSTGRESQL_HOST,
		database: process.env.POSTGRESQL_DATABASE,
		user: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PASSWORD,
		port: Number(process.env.POSTGRESQL_PORT) || 5432,
	},
	pool: {
		min: parseInt(process.env.POSTGRESQL_POOL_MIN || '1'),
		max: parseInt(process.env.POSTGRESQL_POOL_MAX || '10'),
	},
}

export class AppleFarmDBClient {
    private _knex: Knex
    private name: string

    constructor(name: string, options: Knex.Config = {}) {
        this.name = name
        this._knex = this.init(options)
    }

    public init(options: Knex.Config) {
        const mergedConfig = Hoek.applyToDefaults(defaultKnexConfig, options)

		this._knex = knex({
			...mergedConfig,
			acquireConnectionTimeout: 10 * 1000, // 10sec
		})

		console.debug(`DB 연결 완료 ::: `, this.name, options)
		return this._knex 
    }

    public async checkConnection(): Promise<void> {
        try {
            const raw = await this._knex.raw('SELECT NOW()')
            
            console.log(`${this.name}::Database CheckConnection`, raw.rows[0].now);
        } catch(err) {
            throw new Error('DB Error:: 사과챙겨!!')
        }
    }

    get knex(): Knex {
        return this._knex
    }

    toString(): string {
        return `AppleFarmDBClient_${this.name}`
    }
}

export const applefarmDB = new AppleFarmDBClient('안녕하세요! 영주 부석사 아래 가족농원입니다! :)', { debug: false })