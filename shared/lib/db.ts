import { Client } from 'pg'
import * as dotenv from 'dotenv'
import mysql from 'mysql'
import { log } from 'console'
dotenv.config()

export const client = new Client({
	host: process.env.POSTGRESQL_HOST,
	database: process.env.POSTGRESQL_DATABASE,
	user: process.env.POSTGRESQL_USER,
	password: process.env.POSTGRESQL_PASSWORD,
	port: Number(process.env.POSTGRESQL_PORT) || 5432,
})

export const connection = mysql.createConnection({
	host: 'applefarm.cwq337zjtojp.ap-northeast-2.rds.amazonaws.com',
	user: 'applefarm',
	password: 'dbtls007!!',
	database: 'applefarm',
})

export class AppleFarmDBClient {
	private name: string

	constructor(name: string) {
		this.name = name
	}

	public async checkConnection(): Promise<void> {
		try {
			console.log('db연결 시도 :: check connection')

			connection.connect((err) => {
				if (err) {
					throw err
				} else {
					console.log('DB에 연결되었습니다.')
				}
			})
		} catch (err) {
			console.error('Error connecting to the database:', err)
			throw err
		}
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
		} catch (err) {
			console.error('Server startup failed:', err)
			process.exit(1)
		}
	}
}

export const applefarmDB = new AppleFarmDBClient('안녕하세요! 영주 부석사 아래 가족농원입니다! :)')
