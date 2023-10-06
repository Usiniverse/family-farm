import { Client } from 'pg'
import * as dotenv from 'dotenv'
dotenv.config()

export const client = new Client({
	host: process.env.POSTGRESQL_HOST,
	database: process.env.POSTGRESQL_DATABASE,
	user: process.env.POSTGRESQL_USER,
	password: process.env.POSTGRESQL_PASSWORD,
	port: Number(process.env.POSTGRESQL_PORT) || 5432,
})

export class AppleFarmDBClient {
	private name: string

	constructor(name: string) {
		this.name = name
	}

	public async checkConnection(): Promise<void> {
		try {
			console.log('db연결 시도 :: check connection')

			await client.connect()
			console.log('DB에 연결되었습니다.')
		} catch (err) {
			console.error('Error connecting to the database:', err)
			throw err
		}
	}

	public async checkDatabaseStatus() {
		try {
			console.log('db연결 시도 :: checkDatabase')
			const result = await client.query('SELECT NOW()')
			console.log('가족농원 OPEN! ::: ', result.rows[0].now)
			// const file = await client.query('SHOW hba_file;')
			// console.log('파일경로 ::: ', file)
		} catch (err) {
			console.error('Error checking database status:', err)
			throw err
		}
	}

	public async startServer() {
		try {
			await this.checkConnection()
			await this.checkDatabaseStatus()
			// Your server startup logic here
		} catch (err) {
			// Handle errors during server startup
			console.error('Server startup failed:', err)
			process.exit(1)
		}
	}
}

export const applefarmDB = new AppleFarmDBClient('안녕하세요! 영주 부석사 아래 가족농원입니다! :)')
