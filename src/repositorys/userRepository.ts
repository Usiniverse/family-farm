import { UserDTO } from '../dtos/users/userDTO'
import { CreateUserDTO } from '../dtos/users/createUserDTO'
import { connection } from '../../shared/lib/db'
export class UserRepository implements IUserRepository {
	async createUser(dto: CreateUserDTO): Promise<UserDTO> {
		const query = `INSERT INTO users (sns_id, email, name, birth, birthday, age, nickname, gender, password, phone, picture) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`

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
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUser(email: string): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE email = ?`
		const values = [email]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			console.log('게시글 DB 생성 완료 :::', result)

			return result[0]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUserBySnsId(sns_id: string): Promise<UserDTO> {
		console.log('유저아이디 찾아보기', sns_id)

		const query = `SELECT * FROM users WHERE sns_id = ?`
		const values = [sns_id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			return result[0]
		} catch (e) {
			console.error(e)
			throw e
		}
	}

	async getUserById(id: number): Promise<UserDTO> {
		const query = `SELECT * FROM users WHERE id = ?`
		const values = [id]

		try {
			const result = await new Promise((resolve, reject) => {
				connection.query(query, values, (error, results) => {
					if (error) {
						reject(error)
					} else {
						resolve(results)
					}
				})
			})

			console.log('게시글 DB 생성 완료 :::', result)

			return result[0]
		} catch (e) {
			console.error(e)
			throw e
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
