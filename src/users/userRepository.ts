import { UserDTO } from './dtos/users'
import { CreateUserDTO } from './dtos/createUserDTO'
import { client } from '../../shared/lib/db'
export class UserRepository implements IUserRepository {
	async createUser(dto: CreateUserDTO): Promise<UserDTO> {
		const query = `INSERT INTO users (sns_id, email, name, birth, birthday, age, nickname, gender, password, phone, picture) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`
		const values = [
			dto.sns_id,
			dto.email,
			dto.name,
			dto.birth,
			dto.birthday,
			dto.age,
			dto.nickname,
			dto.gender,
			dto.password,
			dto.phone,
			dto.picture,
		]

		try {
			const result = await client.query(query, values)
			console.log('유저 DB생성 완료 :::', result.rows)

			client.end()

			return result.rows[0] as UserDTO
		} catch (err) {
			console.log(err)
			throw err
		}
	}

	async getUser(email: string): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE email = $1`
		const values = [email]

		try {
			const result = await client.query(query, values)
			console.log('유저 DB 조회 완료 :::', result.rows)
			return result.rows[0] as UserDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async getUserBySnsId(sns_id: string): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE sns_id = $1`
		const values = [sns_id]

		try {
			const result = await client.query(query, values)
			console.log('유저 DB 조회 완료 :::', result.rows)
			return result.rows[0] as UserDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	async getUserById(id: number): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE id = $1`
		const values = [id]

		try {
			const result = await client.query(query, values)
			console.log('유저 DB 조회 완료 :::', result.rows)
			return result.rows[0] as UserDTO
		} catch (error) {
			console.error(error)
			throw error
		}
	}

	// async updateUser(dto: updateUserDTO): Promise<UserDTO> {
	// 	const query = ``
	// 	const values = []
	// }

	// async dlelteUser(dto: updateUserDTO): Promise<UserDTO> {
	// 	const query = ``
	// 	const values = []
	// }
}

interface IUserRepository {
	createUser(dto: CreateUserDTO): Promise<UserDTO>
	getUser(email: string): Promise<UserDTO>
	getUserBySnsId(sns_id: string): Promise<UserDTO>
	getUserById(id: number): Promise<UserDTO>
	// updateUser(dto: updateUserDTO): Promise<UserDTO>
}
