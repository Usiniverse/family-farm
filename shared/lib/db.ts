import { Client } from 'pg'
import * as dotenv from 'dotenv'
import mysql from 'mysql'
dotenv.config()

export const client = new Client({
	host: process.env.POSTGRESQL_HOST,
	database: process.env.POSTGRESQL_DATABASE,
	user: process.env.POSTGRESQL_USER,
	password: process.env.POSTGRESQL_PASSWORD,
	port: Number(process.env.POSTGRESQL_PORT) || 5432,
})

export const connection = mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	port: Number(process.env.MYSQL_PORT) || 3306,
})

export class AppleFarmDBClient {
	private name: string

	constructor(name: string) {
		this.name = name
	}

	public async checkDatabaseStatus() {
		try {
			console.log('db연결 시도 :: checkDatabase')
			connection.connect((err) => {
				if (err) {
					throw err
				} else {
					connection.query('SELECT NOW()', (err, rows, field) => {
						console.log('가족농원 OPEN! ::: ', rows)
					})
				}
			})
		} catch (err) {
			console.error('Error checking database status:', err)
			throw err
		}
	}

	public async startServer() {
		try {
			// await this.checkConnection()
			await this.checkDatabaseStatus()
		} catch (err) {
			console.error('Server startup failed:', err)
			process.exit(1)
		}
	}
}

export const applefarmDB = new AppleFarmDBClient('안녕하세요! 영주 부석사 아래 가족농원입니다! :)')
